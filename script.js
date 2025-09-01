let attempts = 3;

// Correct answers (you'll change these to your friend's actual answers)
const correctAnswers = {
    answer1: "starbucks", // Cafe
    answer2: "barista", // Cafe part 2  
    answer3: "qutab minar" // Delhi visit
};

function showSecurityQuestions() {
    document.querySelector('.welcome-section').style.display = 'none';
    document.getElementById('securitySection').style.display = 'block';
}

function checkAnswers() {
    const userAnswers = {
        answer1: document.getElementById('answer1').value.toLowerCase().trim(),
        answer2: document.getElementById('answer2').value.toLowerCase().trim(),
        answer3: document.getElementById('answer3').value.toLowerCase().trim()
    };
    
    const allCorrect = 
        userAnswers.answer1 === correctAnswers.answer1 &&
        userAnswers.answer2 === correctAnswers.answer2 &&
        userAnswers.answer3 === correctAnswers.answer3;
    
    if (allCorrect) {
        // Success! Show the fancy success message
        showSuccessMessage();
    } else {
        attempts--;
        const errorMsg = document.getElementById('errorMessage');
        const attemptsText = document.getElementById('attemptsText');
        
        if (attempts > 0) {
            errorMsg.textContent = `Not quite right! Try again. 💭`;
            errorMsg.style.display = 'block';
            attemptsText.textContent = `Attempts remaining: ${attempts}`;
        } else {
            errorMsg.textContent = `Sorry, no more attempts left! 😔`;
            document.querySelector('.submit-btn').disabled = true;
            attemptsText.textContent = `No attempts remaining`;
        }

    }

    function showSuccessMessage() {
    // Hide the security questions
    document.getElementById('securitySection').style.display = 'none';
    
    // Show success message with nice animation
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="success-section">
            <h2>🎉 Welcome! 🎉</h2>
            <div class="success-message">
                <p>Perfect! You got all the answers right!</p>
                <p>Get ready for your amazing birthday countdown...</p>
            </div>
            <div class="loading-animation">
                <div class="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>
        </div>
    `;
    
    // THIS IS THE REDIRECT - after 3 seconds, go to countdown page
    setTimeout(() => {
        window.location.href = 'countdown.html';
    }, 3000);
}}