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
            const script = document.createElement('script');
            script.textContent = converter.code;
            document.body.appendChild(script);
            window.convert = function() {
                const fileInput = document.getElementById('fileInput');
                const output = document.getElementById('output');
                if (fileInput.files.length === 0) {
                    output.textContent = 'Please select a file to convert.';
                    return;
                }
                const file = fileInput.files[0];

                // Validate file type
                const allowedTypes = converter.allowedTypes;
                if (!allowedTypes.includes(file.type)) {
                    output.textContent = 'Invalid file type. Please upload a valid file.';
                    return;
                }

                output.textContent = 'Converting...';
                convert(file);  // Call the dynamically loaded conversion function
                output.textContent = 'Conversion complete. Check your downloads.';
            };
        } else {
            document.getElementById('converter-title').textContent = 'Converter Not Found';
            document.getElementById('converter-name').textContent = 'Converter Not Found';
        }
    });
