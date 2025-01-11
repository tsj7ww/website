// survival-curve.js
function createSurvivalCurve() {
    // Set the dimensions and margins of the graph
    const margin = {top: 40, right: 50, bottom: 60, left: 70};
    
    // Get the container width
    const container = document.getElementById('survival-curve');
    const containerWidth = container.offsetWidth;
    
    // Make width responsive to container
    const width = containerWidth - margin.left - margin.right;
    const height = Math.min(500, Math.max(400, containerWidth * 0.5)) - margin.top - margin.bottom;

    // Remove any existing SVG
    d3.select("#survival-curve").select("svg").remove();

    // Create tooltip div
    // const tooltip = d3.select("#survival-curve")
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0)
    //     .style("position", "relative")
    //     .style("background-color", "rgba(0, 0, 0, 0.8)")
    //     .style("color", "white")
    //     .style("padding", "10px")
    //     .style("border-radius", "5px")
    //     .style("font-size", "12px")
    //     .style("pointer-events", "none")
    //     .style("z-index", "10")
    //     .style("max-width", "200px");

    // Create SVG container with viewBox for better responsiveness
    const svg = d3.select("#survival-curve")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set default styles for all text elements
    svg.style("color", "white")
       .style("font-family", "system-ui, sans-serif");

    // Load the data
    d3.json("/blog/data/survival.json").then(function(data) {
        const survivalData = data.survival_data;

        // Create scales
        const x = d3.scaleLinear()
            .domain([0, d3.max(survivalData, d => d.time)])
            .range([0, width])
            .nice();

        const y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0])
            .nice();

        // Create the line generator
        const line = d3.line()
            .x(d => x(d.time))
            .y(d => y(d.survival_prob));

        // Create confidence interval area
        const area = d3.area()
            .x(d => x(d.time))
            .y0(d => y(d.lower_ci))
            .y1(d => y(d.upper_ci));

        // Add confidence interval
        svg.append("path")
            .datum(survivalData)
            .attr("class", "confidence-interval")
            .attr("d", area)
            .attr("fill", "#e1f3f8")
            .attr("opacity", 0.5);

        // Add the line
        svg.append("path")
            .datum(survivalData)
            .attr("class", "survival-line")
            .attr("fill", "none")
            .attr("stroke", "#2171b5")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add grid lines
        svg.append("g")
            .attr("class", "grid")
            .attr("opacity", 0.1)
            .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat("")
            );

        // Add invisible overlay for tooltip
        const bisect = d3.bisector(d => d.time).left;

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
            const i = bisect(survivalData, x0, 1);
            const d0 = survivalData[i - 1];
            const d1 = survivalData[i];
            const d = x0 - d0.time > d1.time - x0 ? d1 : d0;

            focus.attr("transform", `translate(${x(d.time)},${y(d.survival_prob)})`);

            const tooltipHtml = `
                <strong>Time:</strong> ${d.time} days<br/>
                <strong>Survival Rate:</strong> ${(d.survival_prob * 100).toFixed(1)}%<br/>
                <strong>95% CI:</strong> [${(d.lower_ci * 100).toFixed(1)}%, ${(d.upper_ci * 100).toFixed(1)}%]
            `;

            const tooltipX = event.pageX;
            const tooltipY = event.pageY;
            
            tooltip
                .html(tooltipHtml)
                .style("left", `${tooltipX + 5}px`)
                .style("top", `${tooltipY - 5}px`);
        }

        // Add the X Axis with white text
        const xAxis = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => d + " days"));

        xAxis.selectAll(".tick text")
            .style("fill", "white")
            .style("color", "white");

        // Add the Y Axis with white text
        const yAxis = svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickFormat(d3.format(".0%")));

        yAxis.selectAll(".tick text")
            .style("fill", "white")
            .style("color", "white");

        // Style all axis lines and ticks
        svg.selectAll(".x-axis path, .x-axis line, .y-axis path, .y-axis line")
            .style("stroke", "white");

        // Add X axis label
        svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", height + margin.bottom - 10)
            .style("fill", "white")
            .style("color", "white")
            .text("Time Since Customer Sign-up (Days)");

        // Add Y axis label
        svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height/2)
            .style("fill", "white")
            .style("color", "white")
            .text("Survival Probability");

        // Add title
        svg.append("text")
            .attr("class", "title")
            .attr("x", width/2)
            .attr("y", -margin.top/2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .style("color", "white")
            .text("Customer Survival Analysis");
    });
}

// Call the function when the window loads
window.addEventListener('load', createSurvivalCurve);

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
window.addEventListener('resize', debounce(createSurvivalCurve, 250));