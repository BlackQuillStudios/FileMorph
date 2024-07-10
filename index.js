// Load Converters from JSON and create links dynamically
fetch('converters.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('converters-container');
        data.forEach(category => {
            const section = document.createElement('section');
            section.innerHTML = `
                <h3>${category.category}</h3>
                <div class="conversion-container">
                    ${category.converters.map(converter => `
                        <div class="conversion-box">
                            <h3><i class="${converter.icon}"></i> ${converter.name}</h3>
                            <a href="converter.html?name=${encodeURIComponent(converter.name)}">Go to Converter</a>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(section);
        });
    });
