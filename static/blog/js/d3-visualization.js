// Load the CSV file and create a scatter plot with a trendline
d3.csv("/blog/data/example.csv").then(data => {
    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };

    // Parse the data
    data.forEach(d => {
        d.X = +d.X; // Convert X to number
        d.Y = +d.Y; // Convert Y to number
    });

    // Function to get current theme
    const getTheme = () => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    };

    // Create SVG container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.X) * 1.1]) // Add padding
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Y) * 1.1]) // Add padding
        .range([height, 0]);

    // Draw scatter points
    const dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.X))
        .attr("cy", d => y(d.Y))
        .attr("r", 6);

    // Add axes
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    // Add trendline
    const xMean = d3.mean(data, d => d.X);
    const yMean = d3.mean(data, d => d.Y);
    const slope = d3.sum(data, d => (d.X - xMean) * (d.Y - yMean)) /
                  d3.sum(data, d => (d.X - xMean) ** 2);
    const intercept = yMean - slope * xMean;

    const trendlineData = [
        { X: d3.min(data, d => d.X), Y: d3.min(data, d => d.X) * slope + intercept },
        { X: d3.max(data, d => d.X), Y: d3.max(data, d => d.X) * slope + intercept }
    ];

    const trendline = svg.append("line")
        .attr("x1", x(trendlineData[0].X))
        .attr("y1", y(trendlineData[0].Y))
        .attr("x2", x(trendlineData[1].X))
        .attr("y2", y(trendlineData[1].Y))
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");

    // Apply theme styles
    const applyTheme = theme => {
        const isDark = theme === "dark";
        svg.style("background-color", isDark ? "#2e2e2e" : "#ffffff");
        dots.attr("fill", isDark ? "orange" : "steelblue");
        xAxis.selectAll("line, path").attr("stroke", isDark ? "#ffffff" : "#000000");
        yAxis.selectAll("line, path").attr("stroke", isDark ? "#ffffff" : "#000000");
        svg.selectAll("text").attr("fill", isDark ? "#ffffff" : "#000000");
        trendline.attr("stroke", isDark ? "#ff5733" : "#333333");
    };

    // Initial theme application
    applyTheme(getTheme());

    // Listen for theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        applyTheme(e.matches ? "dark" : "light");
    });
});