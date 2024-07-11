// Extract the converter name from the URL
const urlParams = new URLSearchParams(window.location.search);
const converterName = urlParams.get('name');

// Load Converters from JSON
fetch('converters.json')
    .then(response => response.json())
    .then(data => {
        let converter;
        data.forEach(category => {
            category.converters.forEach(conv => {
                if (conv.name === converterName) {
                    converter = conv;
                }
            });
        });

        if (converter) {
            document.getElementById('converter-title').textContent = converter.name;
            document.getElementById('converter-name').textContent = `${converter.name} Converter`;

            // Dynamically add the conversion function
            const script = document.createElement('script');
            script.textContent = converter.code;
            document.body.appendChild(script);

            window.convert = function() {
                const fileInput = document.getElementById('file
