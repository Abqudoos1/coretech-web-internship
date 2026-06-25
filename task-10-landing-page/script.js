document.getElementById('landingContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Node pointers mapping
    const nameNode = document.getElementById('senderName');
    const emailNode = document.getElementById('senderEmail');
    const messageNode = document.getElementById('senderMessage');
    const bannerNode = document.getElementById('successMessage');

    let isPayloadValid = true;

    // 1. Name Check
    if (nameNode.value.trim() === '') {
        triggerErrorState(nameNode, 'nameError', 'Corporate identification name is required.');
        isPayloadValid = false;
    } else {
        clearErrorState(nameNode, 'nameError');
    }

    // 2. Email Schema Validation
    const emailFormatPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailNode.value.trim() === '') {
        triggerErrorState(emailNode, 'emailError', 'Business routing address cannot be empty.');
        isPayloadValid = false;
    } else if (!emailFormatPattern.test(emailNode.value.trim())) {
        triggerErrorState(emailNode, 'emailError', 'Invalid data transmission email pattern.');
        isPayloadValid = false;
    } else {
        clearErrorState(emailNode, 'emailError');
    }

    // 3. Message Length Verification
    if (messageNode.value.trim() === '') {
        triggerErrorState(messageNode, 'messageError', 'Execution criteria payload required.');
        isPayloadValid = false;
    } else if (messageNode.value.trim().length < 15) {
        triggerErrorState(messageNode, 'messageError', 'Describe architecture parameters comprehensively (Min 15 chars).');
        isPayloadValid = false;
    } else {
        clearErrorState(messageNode, 'messageError');
    }

    // Submission Allocation
    if (isPayloadValid) {
        bannerNode.classList.remove('hidden');
        document.getElementById('landingContactForm').reset();
        window.scrollTo({ top: bannerNode.offsetTop - 120, behavior: 'smooth' });
    } else {
        bannerNode.classList.add('hidden');
    }
});

function triggerErrorState(element, errorLogId, alertMsg) {
    element.classList.add('invalid');
    document.getElementById(errorLogId).textContent = alertMsg;
}

function clearErrorState(element, errorLogId) {
    element.classList.remove('invalid');
    document.getElementById(errorLogId).textContent = '';
}