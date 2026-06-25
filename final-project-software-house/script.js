document.getElementById('projectPipelineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mapping inputs references
    const nameNode = document.getElementById('devName');
    const emailNode = document.getElementById('devEmail');
    const msgNode = document.getElementById('devMessage');
    const bannerNode = document.getElementById('successNotification');

    let isFormCompliant = true;

    // 1. Validation Name Parameters
    if (nameNode.value.trim() === '') {
        renderInputError(nameNode, 'nameErr', 'Identity specification parameters cannot be null.');
        isFormCompliant = false;
    } else {
        clearInputError(nameNode, 'nameErr');
    }

    // 2. Email Pattern Schema Verification
    const emailPatternMatch = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailNode.value.trim() === '') {
        renderInputError(emailNode, 'emailErr', 'System communication routing address is required.');
        isFormCompliant = false;
    } else if (!emailPatternMatch.test(emailNode.value.trim())) {
        renderInputError(emailNode, 'emailErr', 'Malformed email structure schema mismatch.');
        isFormCompliant = false;
    } else {
        clearInputError(emailNode, 'emailErr');
    }

    // 3. Project Specifications Text Boundary Verification
    if (msgNode.value.trim() === '') {
        renderInputError(msgNode, 'msgErr', 'Context specifications parameters required.');
        isFormCompliant = false;
    } else if (msgNode.value.trim().length < 20) {
        renderInputError(msgNode, 'msgErr', `Buffer overflow alert: Minimum 20 characters required. Current length: ${msgNode.value.trim().length}`);
        isFormCompliant = false;
    } else {
        clearInputError(msgNode, 'msgErr');
    }

    // Checking validation execution results
    if (isFormCompliant) {
        bannerNode.classList.remove('hidden');
        document.getElementById('projectPipelineForm').reset();
        window.scrollTo({ top: bannerNode.offsetTop - 140, behavior: 'smooth' });
    } else {
        bannerNode.classList.add('hidden');
    }
});

function renderInputError(element, errorId, message) {
    element.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}

function clearInputError(element, errorId) {
    element.classList.remove('invalid');
    document.getElementById(errorId).textContent = '';
}