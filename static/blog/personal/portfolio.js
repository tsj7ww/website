const portfolioItems = [
    {
        title: 'Data Analysis Project',
        description: 'Analysis of customer behavior using Python and Pandas',
        image: 'images/project1.jpg',
        link: '#'
    },
    {
        title: 'Web Development',
        description: 'Full-stack application built with modern technologies',
        image: 'images/project2.jpg',
        link: '#'
    },
    {
        title: 'Data Visualization',
        description: 'Interactive dashboards using D3.js',
        image: 'images/project3.jpg',
        link: '#'
    }
];

function renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" class="project-link">View Project</a>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

document.addEventListener('DOMContentLoaded', renderPortfolio);