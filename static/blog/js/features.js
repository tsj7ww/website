// feature-viz.js
function createFeatureViz() {
    // Set the dimensions and margins of the graph
    const margin = {top: 40, right: 50, bottom: 60, left: 70};
    
    // Get the container width
    const container = document.getElementById('feature-viz');
    const containerWidth = container.offsetWidth;
    
    // Make width responsive to container
    const width = containerWidth - margin.left - margin.right;
    const height = Math.min(500, Math.max(400, containerWidth * 0.5)) - margin.top - margin.bottom;

    // Remove any existing SVG and controls
    d3.select("#feature-viz").selectAll("*").remove();

    // Create feature selector
    const selectorContainer = d3.select("#feature-viz")
        .append("div")
        .style("margin-bottom", "20px")
        .style("display", "flex")
        .style("justify-content", "center");

    const selector = selectorContainer
        .append("select")
        .style("width", "300px")
        .style("padding", "8px")
        .style("background-color", "#2a2a2a")
        .style("color", "white")
        .style("border", "1px solid #444")
        .style("border-radius", "4px")
        .style("font-size", "14px");

    // Create tooltip div
    // const tooltip = d3.select("#feature-viz")
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
    const svg = d3.select("#feature-viz")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load the data
    d3.json("/blog/data/features.json").then(function(data) {
        // Add options to selector
        selector.selectAll("option")
            .data(Object.keys(data))
            .enter()
            .append("option")
            .text(d => d.replace(/_/g, ' ').toUpperCase())
            .attr("value", d => d);

        function updateVisualization(feature) {
            const stats = data[feature];
            
            // Create scales
            const x = d3.scaleLinear()
                .domain([stats.min, stats.max])
                .range([0, width])
                .nice();

            // Clear previous visualization
            svg.selectAll("*").remove();

            // Add grid lines
            svg.append("g")
                .attr("class", "grid")
                .attr("opacity", 0.1)
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .tickSize(-height)
                    .tickFormat("")
                );

            // Create box plot
            const boxHeight = height * 0.3;
            const yOffset = height / 2;

            // Box
            svg.append("rect")
                .attr("x", x(stats.q25))
                .attr("y", yOffset - boxHeight/2)
                .attr("width", x(stats.q75) - x(stats.q25))
                .attr("height", boxHeight)
                .attr("fill", "#2171b5")
                .attr("opacity", 0.7);

            // Median line
            svg.append("line")
                .attr("x1", x(stats.mean))
                .attr("x2", x(stats.mean))
                .attr("y1", yOffset - boxHeight/2)
                .attr("y2", yOffset + boxHeight/2)
                .attr("stroke", "white")
                .attr("stroke-width", 2);

            // Whiskers
            svg.append("line")
                .attr("x1", x(stats.min))
                .attr("x2", x(stats.q25))
                .attr("y1", yOffset)
                .attr("y2", yOffset)
                .attr("stroke", "white")
                .attr("stroke-width", 1);

            svg.append("line")
                .attr("x1", x(stats.q75))
                .attr("x2", x(stats.max))
                .attr("y1", yOffset)
                .attr("y2", yOffset)
                .attr("stroke", "white")
                .attr("stroke-width", 1);

            // End caps
            svg.append("line")
                .attr("x1", x(stats.min))
                .attr("x2", x(stats.min))
                .attr("y1", yOffset - boxHeight/4)
                .attr("y2", yOffset + boxHeight/4)
                .attr("stroke", "white")
                .attr("stroke-width", 1);

            svg.append("line")
                .attr("x1", x(stats.max))
                .attr("x2", x(stats.max))
                .attr("y1", yOffset - boxHeight/4)
                .attr("y2", yOffset + boxHeight/4)
                .attr("stroke", "white")
                .attr("stroke-width", 1);

            // Add distribution curve
            const distributionPoints = 100;
            const gaussianKernel = (x, mean, std) => (
                Math.exp(-0.5 * Math.pow((x - mean) / std, 2)) / (std * Math.sqrt(2 * Math.PI))
            );

            const curve = Array.from({length: distributionPoints}, (_, i) => {
                const x_val = stats.min + (i / (distributionPoints - 1)) * (stats.max - stats.min);
                return {
                    x: x_val,
                    y: gaussianKernel(x_val, stats.mean, stats.std)
                };
            });

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(curve, d => d.y)])
                .range([boxHeight/2, 0]);

            const line = d3.line()
                .x(d => x(d.x))
                .y(d => yOffset - yScale(d.y))
                .curve(d3.curveBasis);

            // Add distribution curve
            svg.append("path")
                .datum(curve)
                .attr("fill", "none")
                .attr("stroke", "#4292c6")
                .attr("stroke-width", 2)
                .attr("d", line);

            // Mirror the curve
            svg.append("path")
                .datum(curve)
                .attr("fill", "none")
                .attr("stroke", "#4292c6")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(d => x(d.x))
                    .y(d => yOffset + yScale(d.y))
                    .curve(d3.curveBasis)
                );

            // Add the X Axis
            const xAxis = svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Style axis text
            xAxis.selectAll("text")
                .style("fill", "white");
            xAxis.selectAll("path")
                .style("stroke", "white");
            xAxis.selectAll("line")
                .style("stroke", "white");

            // Add title
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -margin.top / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("fill", "white")
                .text(feature.replace(/_/g, ' ').toUpperCase());

            // Add labels
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("fill", "white")
                .text("Value");

            // Add statistics summary
            const statsText = [
                `Mean: ${stats.mean.toFixed(2)}`,
                `Std Dev: ${stats.std.toFixed(2)}`,
                `Range: [${stats.min.toFixed(2)}, ${stats.max.toFixed(2)}]`
            ];

            svg.selectAll(".stat-text")
                .data(statsText)
                .enter()
                .append("text")
                .attr("class", "stat-text")
                .attr("x", width - 20)
                .attr("y", (d, i) => 20 + i * 20)
                .attr("text-anchor", "end")
                .style("fill", "white")
                .style("font-size", "12px")
                .text(d => d);
        }

        // Set up change handler
        selector.on("change", function() {
            updateVisualization(this.value);
        });

        // Initialize with first feature
        updateVisualization(Object.keys(data)[0]);
    }).catch(error => {
        console.error("Error loading the data:", error);
        // Add error message to the container
        d3.select("#feature-viz")
            .append("div")
            .style("color", "red")
            .style("text-align", "center")
            .style("padding", "20px")
            .text("Error loading visualization data");
    });
}

// Call the function when the window loads
window.addEventListener('load', createFeatureViz);

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
window.addEventListener('resize', debounce(createFeatureViz, 250));