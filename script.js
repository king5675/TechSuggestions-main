document.addEventListener('DOMContentLoaded', () => {
    const techForm = document.getElementById('techForm');
    const submitButton = document.getElementById('submitButton');

    // !!! IMPORTANT: Replace with your actual WhatsApp number !!!
    // Include country code, without '+', '00' or any special characters.
    // Example for a US number like +1 (123) 456-7890: '11234567890'
    // Example for an Indian number like +91 98765 43210: '919876543210'
    const whatsappNumber = '2348029214393'; // <--- REPLACE THIS!

    if (!techForm) {
        console.error('Form not found!');
        return;
    }

    techForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (whatsappNumber === 'YOUR_WHATSAPP_NUMBER_HERE' || whatsappNumber.trim() === '') {
            alert('Configuration error: WhatsApp number is not set. Please contact the website administrator.');
            console.error('WhatsApp number is not configured in script.js');
            return;
        }

        const nameInput = document.getElementById('name');
        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        const selectedSuggestions = [];
        document.querySelectorAll('input[name="techSuggestion"]:checked').forEach((checkbox) => {
            selectedSuggestions.push(checkbox.value);
        });

        const selectedResources = [];
        document.querySelectorAll('input[name="resource"]:checked').forEach((checkbox) => {
            selectedResources.push(checkbox.value);
        });

        if (selectedSuggestions.length === 0 && selectedResources.length === 0) {
            alert('Please select at least one tech area or resource preference.');
            return;
        }

        let message = `Hi! My name is ${name}.\n\nI'm interested in tech suggestions and resources:\n\n`;

        if (selectedSuggestions.length > 0) {
            message += "*AREAS OF INTEREST:*\n";
            selectedSuggestions.forEach(suggestion => {
                message += `  - ${suggestion}\n`;
            });
            message += "\n";
        }

        if (selectedResources.length > 0) {
            message += "*PREFERRED RESOURCES:*\n";
            selectedResources.forEach(resource => {
                message += `  - ${resource}\n`;
            });
            message += "\n";
        }
        
        message += "Could you please provide some guidance or suggestions? Thank you!\n\n> © 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝙲𝚘𝚍𝚎𝚡 𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕 𝚃𝚎𝚌𝚑";

        const encodedMessage = encodeURIComponent(message);
        // Ensure the number is clean (only digits) if it wasn't already
        const cleanWhatsAppNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanWhatsAppNumber}?text=${encodedMessage}`;

        // Provide feedback to user
        submitButton.disabled = true;
        submitButton.textContent = 'Redirecting...';

        // Open WhatsApp link
        window.open(whatsappURL, '_blank');

        // Reset button after a short delay, in case the redirect fails or user comes back
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send to WhatsApp';
            // techForm.reset(); // Optionally reset the form
        }, 3000);
    });
});

