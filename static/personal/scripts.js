// Data for Projects
const projects = {
    project1: {
      title: "Optimizing Customer Retention",
      summary: "Used predictive analytics to forecast customer churn and improve retention by 20%.",
      githubLink: "https://github.com/your-profile/project1",
      graphData: [20, 40, 60, 80],
    },
    project2: {
      title: "Fraud Detection System",
      summary: "Developed an ML-based anomaly detection system, reducing fraud by 30%.",
      githubLink: "https://github.com/your-profile/project2",
      graphData: [10, 30, 50, 70],
    },
    project3: {
      title: "Climate Impact Model",
      summary: "Created a model to analyze policy impact on carbon emissions over 5 years.",
      githubLink: "https://github.com/your-profile/project3",
      graphData: [15, 35, 55, 75],
    },
  };
  
  // Modal Handling
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.id;
  
      const project = projects[projectId];
      document.getElementById('projectModalLabel').innerText = project.title;
      document.getElementById('project-summary').innerText = project.summary;
      document.getElementById('project-github-link').href = project.githubLink;
  
      const container = document.getElementById('d3-container');
      container.innerHTML = '';
  
      const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '300');
      const data = project.graphData;
  
      const xScale = d3.scaleBand().domain(data.map((_, i) => i)).range([0, 300]).padding(0.3);
      const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([300, 0]);
  
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => 300 - yScale(d))
        .attr('fill', '#007bff')
        .on('mouseover', function () {
          d3.select(this).attr('fill', '#0056b3');
        })
        .on('mouseout', function () {
          d3.select(this).attr('fill', '#007bff');
        });
    });
  });