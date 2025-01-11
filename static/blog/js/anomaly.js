// anomaly-viz.js
function createAnomalyViz() {
    // Set the dimensions and margins of the graph
    const margin = {top: 40, right: 50, bottom: 60, left: 70};
    
    // Get the container width
    const container = document.getElementById('anomaly-viz');
    const containerWidth = container.offsetWidth;
    
    // Make width responsive to container
    const width = containerWidth - margin.left - margin.right;
    const height = Math.min(500, Math.max(400, containerWidth * 0.5)) - margin.top - margin.bottom;

    // Remove any existing SVG
    d3.select("#anomaly-viz").select("svg").remove();

    // Create tooltip div
    // const tooltip = d3.select("#anomaly-viz")
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0)
    //     .style("position", "absolute")
    //     .style("background-color", "rgba(0, 0, 0, 0.8)")
    //     .style("color", "white")
    //     .style("padding", "10px")
    //     .style("border-radius", "5px")
    //     .style("font-size", "12px")
    //     .style("pointer-events", "none")
    //     .style("z-index", "10")
    //     .style("max-width", "200px");

    // Create SVG container
    const svg = d3.select("#anomaly-viz")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load the data from JSON file
    d3.json("/blog/data/anomaly.json").then(function(jsonData) {
        const data = jsonData.api_metrics.map(d => ({
            ...d,
            timestamp: new Date(d.timestamp)
        }));

        // Create scales
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.timestamp))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.latency) * 1.1])
            .range([height, 0]);

        // Create line generator
        const line = d3.line()
            .x(d => x(d.timestamp))
            .y(d => y(d.latency));

        // Add grid lines
        svg.append("g")
            .attr("class", "grid")
            .attr("opacity", 0.1)
            .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat("")
            );

        // Add the line path
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#2171b5")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add anomaly points
        svg.selectAll(".anomaly")
            .data(data.filter(d => d.isAnomaly))
            .enter()
            .append("circle")
            .attr("class", "anomaly")
            .attr("cx", d => x(d.timestamp))
            .attr("cy", d => y(d.latency))
            .attr("r", 5)
            .attr("fill", "red")
            .attr("opacity", 0.7);

        // Add hover effects
        const bisect = d3.bisector(d => d.timestamp).left;

        const focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5)
            .style("fill", "#2171b5");

        const overlay = svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .style("opacity", 0)
            .on("mouseover", () => {
                focus.style("display", null);
                tooltip.style("opacity", 1);
            })
            .on("mouseout", () => {
                focus.style("display", "none");
                tooltip.style("opacity", 0);
            })
            .on("mousemove", mousemove);

        function mousemove(event) {
            const [mouseX] = d3.pointer(event);
            const x0 = x.invert(mouseX);
            const i = bisect(data, x0, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;

            focus.attr("transform", `translate(${x(d.timestamp)},${y(d.latency)})`);

            const tooltipHtml = `
                <strong>Time:</strong> ${d.timestamp.toLocaleTimeString()}<br/>
                <strong>Latency:</strong> ${d.latency.toFixed(1)}ms<br/>
                <strong>Requests:</strong> ${d.request_count}<br/>
                <strong>Error Rate:</strong> ${(d.error_rate * 100).toFixed(2)}%<br/>
                <strong>Status:</strong> ${d.isAnomaly ? '<span style="color: red">Anomaly</span>' : 'Normal'}
            `;

            tooltip
                .html(tooltipHtml)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 5}px`);
        }

        // Add the X Axis
        const xAxis = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .style("color", "white")
            .call(d3.axisBottom(x).ticks(6));

        // Add the Y Axis
        const yAxis = svg.append("g")
            .attr("class", "y-axis")
            .style("color", "white")
            .call(d3.axisLeft(y));

        // Add title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .style("color", "white")
            .text("API Latency with Detected Anomalies");

        // Add X axis label
        svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .style("fill", "white")
            .style("color", "white")
            .text("Time");

        // Add Y axis label
        svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .style("fill", "white")
            .style("color", "white")
            .text("Latency (ms)");

        // Add legend
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width - 100}, 0)`);

        // Normal point
        legend.append("line")
            .attr("x1", 0)
            .attr("x2", 20)
            .attr("y1", 0)
            .attr("y2", 0)
            .style("stroke", "#2171b5")
            .style("stroke-width", 2);

        legend.append("text")
            .attr("x", 25)
            .attr("y", 0)
            .attr("dy", "0.32em")
            .style("fill", "white")
            .text("Normal");

        // Anomaly point
        legend.append("circle")
            .attr("cx", 10)
            .attr("cy", 20)
            .attr("r", 5)
            .style("fill", "red")
            .style("opacity", 0.7);

        legend.append("text")
            .attr("x", 25)
            .attr("y", 20)
            .attr("dy", "0.32em")
            .style("fill", "white")
            .text("Anomaly");
    }).catch(error => {
        console.error("Error loading the data:", error);
    });
}

// Call the function when the window loads
window.addEventListener('load', createAnomalyViz);

// Debounce the resize event to prevent too many redraws
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced resize listener
window.addEventListener('resize', debounce(createAnomalyViz, 250));