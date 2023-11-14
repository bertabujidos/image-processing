// You can add this script section within the <script> tag in the HTML file

async function uploadImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (file) {
        // Create FormData to send the file to the Worker
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Send the image to the Worker for processing
            const response = await fetch('/process-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Display the processed and original images
                const result = await response.json();
                displayImages(result.original, result.processed);
            } else {
                console.error('Image processing failed');
            }
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }
}

function displayImages(originalUrl, processedUrl) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <h2>Original Image</h2>
        <img src="${originalUrl}" alt="Original Image" />
        <h2>Processed Image</h2>
        <img src="${processedUrl}" alt="Processed Image" />
    `;
}
