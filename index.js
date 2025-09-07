// This function generates a random password based on user-selected options
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    // Character sets for each option
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allowedChars = ''; // Will hold all possible characters for the password
    let password = '';     // The password to be generated

    // Add character sets to allowedChars based on user choices
    allowedChars += includeLowercase ? lowercaseChars : '';
    allowedChars += includeUppercase ? uppercaseChars : '';
    allowedChars += includeNumbers ? numberChars : '';
    allowedChars += includeSymbols ? symbolChars : '';

    // Error handling: check for valid length and at least one character type
    if (length <= 0) {
        return { error: 'Password length must be at least 1' };
    }
    if (allowedChars.length === 0) {
        return { error: 'At least one character type must be selected' };
    }

    // Generate the password by picking random characters from allowedChars
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    // Return the generated password in an object
    return { password };
}

// Wait until the HTML page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and result/error display elements
    const form = document.getElementById('passwordForm');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    // Listen for the form's submit event
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from reloading the page

        // Get the current values from the form inputs
        const length = parseInt(document.getElementById('length').value, 10);
        const includeLowercase = document.getElementById('lowercase').checked;
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;

        // Generate the password using the user's choices
        const output = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

        // Display the result or error message
        if (output.error) {
            result.textContent = '';
            error.textContent = output.error;
        } else {
            result.textContent = output.password;
            error.textContent = '';
        }
    });
});