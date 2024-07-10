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
            window.convert = function() {
                const fileInput = document.getElementById('fileInput');
                const output = document.getElementById('output');
                if (fileInput.files.length === 0) {
                    output.textContent = 'Please select a file to convert.';
                    return;
                }
                const file = fileInput.files[0];
                output.textContent = 'Converting...';
                eval(converter.code);  // Evaluate the conversion code
                output.textContent = 'Conversion complete.';
            };
        } else {
            document.getElementById('converter-title').textContent = 'Converter Not Found';
            document.getElementById('converter-name').textContent = 'Converter Not Found';
        }
    });

function convertDOCXtoPDF(file) {
    // Placeholder for DOCX to PDF conversion logic
    console.log('Converting DOCX to PDF...', file);
}

function convertPDFtoDOCX(file) {
    // Placeholder for PDF to DOCX conversion logic
    console.log('Converting PDF to DOCX...', file);
}

function convertPNGtoJPG(file) {
    // Placeholder for PNG to JPG conversion logic
    console.log('Converting PNG to JPG...', file);
}

function convertJPGtoPNG(file) {
    // Placeholder for JPG to PNG conversion logic
    console.log('Converting JPG to PNG...', file);
}

function convertMP3toWAV(file) {
    // Placeholder for MP3 to WAV conversion logic
    console.log('Converting MP3 to WAV...', file);
}

function convertWAVtoMP3(file) {
    // Placeholder for WAV to MP3 conversion logic
    console.log('Converting WAV to MP3...', file);
}
