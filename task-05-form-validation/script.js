document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Preventing default browser form submission reloading
    event.preventDefault();

    // DOM Elements Extraction
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const successAlert = document.getElementById('successMessage');

    // Setting tracking flag to verify validation state
    let isFormValid = true;

    // --- 1. Full Name Validation ---
    if (fullName.value.trim() === '') {
        showError(fullName, 'nameError', 'Full name is required execution parameters.');
        isFormValid = false;
    } else {
        clearError(fullName, 'nameError');
    }

    // --- 2. Email Address Validation (Regex Check) ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'emailError', 'Email configuration cannot be empty.');
        isFormValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'emailError', 'Invalid email format schema.');
        isFormValid = false;
    } else {
        clearError(email, 'emailError');
    }

    // --- 3. Phone Number Validation (Min 10 Digits) ---
    // Extract numbers only to ensure formatting sanity
    const digitsOnly = phone.value.replace(/\D/g, '');
    if (phone.value.trim() === '') {
        showError(phone, 'phoneError', 'Contact string digits required.');
        isFormValid = false;
    } else if (digitsOnly.length < 10) {
        showError(phone, 'phoneError', 'Data error: Phone must contain at least 10 valid digits.');
        isFormValid = false;
    } else {
        clearError(phone, 'phoneError');
    }

    // --- 4. Message Area Validation (Min 20 Characters) ---
    if (message.value.trim() === '') {
        showError(message, 'messageError', 'Message context buffer cannot be empty.');
        isFormValid = false;
    } else if (message.value.trim().length < 20) {
        showError(message, 'messageError', `Required minimum 20 characters. Current length: ${message.value.trim().length}`);
        isFormValid = false;
    } else {
        clearError(message, 'messageError');
    }

    // --- 5. Global Validation Execution Check ---
    if (isFormValid) {
        // Unhide success alert container
        successAlert.classList.remove('hidden');
        
        // Reset local form input states
        document.getElementById('contactForm').reset();
        
        // Auto-scroll visualization screen up to show the success status clear
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        successAlert.classList.add('hidden');
    }
});

// Helper Function: Inject error messages and set styling parameters
function showError(inputElement, errorSpanId, errorMessage) {
    inputElement.classList.add('invalid');
    const errorSpan = document.getElementById(errorSpanId);
    errorSpan.textContent = errorMessage;
}

// Helper Function: Clear visualization error configurations
function clearError(inputElement, errorSpanId) {
    inputElement.classList.remove('invalid');
    const errorSpan = document.getElementById(errorSpanId);
    errorSpan.textContent = '';
}