document.addEventListener('DOMContentLoaded', function() {
    fetch('converters.json')
        .then(response => response.json())
        .then(data => {
            const convertersContainer = document.getElementById('converters-container');
            data.forEach(category => {
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.category;
                convertersContainer.appendChild(categoryTitle);
                category.converters.forEach(converter => {
                    const converterDiv = document.createElement('div');
                    converterDiv.className = 'converter-item';
                    converterDiv.innerHTML = `
                        <i class="${converter.icon}"></i>
                        <span>${converter.name}</span>
                        <a href="converter.html?name=${encodeURIComponent(converter.name)}">Go to Converter</a>
                    `;
                    convertersContainer.appendChild(converterDiv);
                });
            });
        });
});
