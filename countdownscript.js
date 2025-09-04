// Set your friend's birthday date here (YYYY, MM-1, DD) - Month is 0-indexed
const BIRTHDAY_DATE = new Date(2025, 8, 9); // Example: September 5, 2025

// Daily messages and gifts
const DAILY_CONTENT = {
    7: {
        header: "7 Days to Go! 🌟",
        message: "The countdown begins! I hope this brings a smile on your face. I hope you know there are people thinking of you and looking out for you!",
        gifts: ["Here is my manifestation of our trip again, and soon!",'<div class="photo-gift" onclick="openPhotoCollage()">📸 A photo collage of our memories - Click to view!</div>']
    },
    6: {
        header: "6 Days Left! 💫",
        message: "I decided if we cannot go to the photobooth shop any soon, I can for sure bring that to you!! Click on the link, it's safe",
        gifts: ["Here you go! I have a quick easy app for fun!!",'<div class="app-gift" onclick="openPhotobooth()">📷 Birthday Photobooth App - Let\'s take some fun pics!</div>']
    },
    5: {
        header: "5 Days Away! ✨",
        message: "Five days to go and it's time to tell you that you are important.",
        gifts: ["Sometimes self-care looks like this!!",'<div class="day5-gift" onclick="openDay5Image()">🖼️ A little Nykaa haul! </div>']
    },
    4: {
        header: "4 More Days! 🎭",
        message: "We are almost there, I hope you you feel a little excitement. I would call that a success",
        gifts: ["Time pass is the ultimate pass to easy life!! And I did something about it",'<div class="games-gift" onclick="openGamesApp()">🎮 Two Fun Birthday Games - Let\'s play!</div>']
    },
    3: {
        header: "3 Days Left! 🎪",
        message: "Look at us! We are just three days away",
        gifts: ["So, why should we ever stop at just one when it comes to self-care?",'<div class="photo-gift" onclick="openDay3GiftCard()">🎁 A special gift card for you - Click to reveal!</div>']
    },
    2: {
        header: "2 Days to Go! 🎊",
        message: "And the weekend too is about to begin for you so have fun!!",
        gifts: ["Because a little treat never hurts anybody!",'<div class="food-gift" onclick="openFoodGiftCard()">🍕 Food App Gift Card - Treat yourself! Click to view!</div>']
    },
    1: {
        header: "ONE DAY TO GOOOOOOO🎉",
        message: "And here we are celebrating your birthday again! Though we are apart, I wish we get to spend a few days together soon",
        gifts: ["Grocery emergency is a thing, if you think about it!",'<div class="food-gift" onclick="openGroceryGiftCard()">Grocery Emergency Gift Card! Click to open!</div>']
    },
    0: {
        header: "HAPPY HAPPY BIRTHDAY TO YOU!!!!!!!!",
        message: "There is so much to say but words always fail me when it's about expressing anything close to what your frienship means to me.",
        gifts: ["But I tried",'<div class="birthday-letter" onclick="openBdayLetter()">Sending all my wishes to you </div>']
    }
};

let currentDay = 0;
let balloonPopped = false;

// Initialize the page
function initializePage() {
   currentDay = calculateDaysRemaining();
    console.log('Current day:', currentDay); // Debug
    
    updateDisplay();
    resetBalloonForDay();
    
    // Check if today's balloon was already popped
    const today = new Date().toDateString();
    const lastPoppedDate = localStorage.getItem('lastPoppedDate');
    
    if (lastPoppedDate === today) {
        balloonPopped = true;
        showTodaysMessage(); // Show the message without animation
    }
}

function calculateDaysRemaining() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const birthday = new Date(BIRTHDAY_DATE);
    birthday.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const timeDiff = birthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Return days remaining (0 = birthday, 1-7 = countdown days)
    if (daysDiff <= 0) return 0; // It's the birthday!
    if (daysDiff > 7) return 7;  // More than 7 days = show day 7
    return daysDiff;
}
// Reset balloon visibility for the current day
function resetBalloonForDay() {
    const balloon = document.getElementById('dailyBalloon');
    if (balloon) {
        balloon.style.display = 'block';
        balloon.style.opacity = '1';
        balloon.classList.remove('popping');
        balloonPopped = false;
    }
}

function updateDisplay() {
    const daysElement = document.getElementById('daysRemaining');
    const balloonText = document.getElementById('balloonText');
    
    if (currentDay === 0) {
        daysElement.textContent = "🎂 IT'S YOUR BIRTHDAY! 🎂";
    const daysElement = document.getElementById('daysRemaining');
    const balloonText = document.getElementById('balloonText');
    const balloon = document.getElementById('dailyBalloon');
    
    if (currentDay === 0) {
        daysElement.textContent = "🎂 IT'S YOUR BIRTHDAY! 🎂";
        balloonText.textContent = "Birthday Surprise!";
        balloon.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e, #fff59d)';
    } else {
        daysElement.textContent = `${currentDay} Day${currentDay === 1 ? '' : 's'} to Go!`;
        balloonText.textContent = `Day ${8 - currentDay} Gift`;
        
        // Different colors for different days
        if (currentDay <= 2) {
            balloon.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a6f, #ff8a80)';
        } else if (currentDay <= 4) {
            balloon.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d, #73d0c4)';
        } else {
            balloon.style.background = 'linear-gradient(45deg, #a8e6cf, #7fcdcd, #81c784)';
        }
    }
}
}

function popBalloon() {
    if (balloonPopped) {
        // If already popped, just show the message again
        showTodaysMessage();
        return;
    }
    
    console.log('Popping balloon for day:', currentDay); // Debug
    
    const balloon = document.getElementById('dailyBalloon');
    balloon.classList.add('popping');
    
    setTimeout(() => {
        balloon.style.display = 'none';
        showTodaysMessage();
        
        // Mark today's balloon as popped
        const today = new Date().toDateString();
        localStorage.setItem('lastPoppedDate', today);
        balloonPopped = true;
    }, 600);
}

// Show today's specific message
function showTodaysMessage() {
    const content = DAILY_CONTENT[currentDay];
    
    if (!content) {
        console.error('No content found for day:', currentDay);
        return;
    }
    
    console.log('Showing message for day:', currentDay); // Debug
    
    document.getElementById('messageHeader').textContent = content.header;
    
    let messageHTML = `<p>${content.message}</p>`;
    
    if (content.gifts && content.gifts.length > 0) {
        messageHTML += '<h4 style="margin: 20px 0 10px 0; color: #b08d57;">Today\'s Gifts:</h4>';
        content.gifts.forEach(gift => {
            if (gift.includes('<div')) {
                // It's an HTML gift (clickable)
                messageHTML += gift;
            } else {
                // It's a regular text gift
                messageHTML += `<div class="gift-item">${gift}</div>`;
            }
        });
    }
    
    document.getElementById('messageBody').innerHTML = messageHTML;
    document.getElementById('messagePopup').style.display = 'flex';
}

// Close message popup
function closeMessage() {
    document.getElementById('messagePopup').style.display = 'none';
}

function goHome() {
    window.location.href = 'index.html';
}

function showAllDays() {
    // This could show a summary of all days - implement later if needed
    alert('This feature shows all previous days - coming soon!');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);

function openPhotoCollage() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <img src="assets/TripManifestation.png" alt="Our Memory Collage" class="collage-image">
            <p class="photo-caption">💕 And we are gonna do this all over again soon! 💕</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Add click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

function closePhotoPopup() {
    const popup = document.querySelector('.photo-popup');
    if (popup) {
        popup.remove();
    }
}
// Function to open the photobooth app
function openPhotobooth() {
    //The url for the photobooth
    const photoboothURL = "https://wondrous-stroopwafel-41bfb9.netlify.app/"; 
    
    // Option 1: Open in new tab (recommended)
    window.open(photoboothURL, '_blank');
    
}

// Alternative: Show popup before opening (optional)
function showPhotoboothPopup(url) {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>🎉 Special (Hanging by a thread) Photobooth! 📸</h3>           
            <div class="popup-buttons">
                <button class="photobooth-btn" onclick="window.open('${url}', '_blank'); closePhotoPopup();">
                    Every moment is let's take a picture moment 📸
                </button>
                <button class="cancel-btn" onclick="closePhotoPopup()">
                    Maybe Later
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

// Function to open day 5 image
function openDay5Image() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <img src="assets/Nykaa1.jpg" alt="Day 5 Special Image" class="giftcard1-image" onerror="handleDay5ImageError(this)">
            <p class="photo-caption">💖 Something special for day 5! 💖</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

// Handle if day 5 image doesn't load
function handleDay5ImageError(img) {
    const currentSrc = img.src;
    if (currentSrc.includes('.jpg')) {
        img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
        img.src = currentSrc.replace('.png', '.jpeg');
    } else {
        img.alt = "Day 5 image not found!";
        img.style.display = 'none';
        img.parentElement.innerHTML += '<p style="color: red;">Day 5 image not found. Check if day5-image.jpg/png exists in assets folder.</p>';
    }
}
// Function to open the games app
function openGamesApp() {
    const gamesURL = "https://zesty-bublanina-8728ca.netlify.app/"; // 
    
    // Option 1: Direct open
    window.open(gamesURL, '_blank');
    
    // Option 2: Show popup first (uncomment if you prefer this)
    // showGamesPopup(gamesURL);
}

// Function to open the direct link
function openDirectLink() {
    const directURL = "https://zesty-bublanina-8728ca.netlify.app/"; 
    
    window.open(directURL, '_blank');
}

//Show game popup first
function showGamesPopup(url) {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>🎮 Birthday Game Time! 🎉</h3>            
            <div class="games-preview">
                <div class="game-item">🎯 Game 1: tic-tac-toe</div>
                <div class="game-item">🎪 Game 2: Hangman</div>
            </div>
            <p>Ready to have some fun?</p>
            <div class="popup-buttons">
                <button class="games-btn" onclick="window.open('${url}', '_blank'); closePhotoPopup();">
                    Let's Play! 🎮
                </button>
                <button class="cancel-btn" onclick="closePhotoPopup()">
                    Maybe Later
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}
// Function to open day 3 gift card
function openDay3GiftCard() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>🎁 Double the fun! 🎁</h3>
            <img src="assets/Nykaa2.jpg" alt="Special Gift Card" class="collage-image" onerror="handleDay3ImageError(this)">
            <p class="photo-caption">We gotta do it time to time. </p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

// Handle if day 3 image doesn't load
function handleDay3ImageError(img) {
    const currentSrc = img.src;
    if (currentSrc.includes('.jpg')) {
        img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
        img.src = currentSrc.replace('.png', '.jpeg');
    } else {
        img.alt = "Gift card image not found!";
        img.style.display = 'none';
        img.parentElement.innerHTML += '<p style="color: red;">Gift card image not found. Check if Nykaa2.png exists in assets folder.</p>';
    }
}
// Function to open food gift card
function openFoodGiftCard() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>🍕 Your Food Gift Card! 🎉</h3>
            <img src="assets/Zomato.jpg" alt="Food App Gift Card" class="collage-image" onerror="handleFoodCardError(this)">
            <p class="photo-caption">Because when everything fails, good food works</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

// Handle if food gift card image doesn't load
function handleFoodCardError(img) {
    const currentSrc = img.src;
    if (currentSrc.includes('.jpg')) {
        img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
        img.src = currentSrc.replace('.png', '.jpeg');
    } else {
        img.alt = "Food gift card image not found!";
        img.style.display = 'none';
        img.parentElement.innerHTML += '<p style="color: red;">Food gift card image not found. Check if Zomato.png exists in assets folder.</p>';
    }
}
// Function to open grocery gift card
function openGroceryGiftCard() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>Your Grocery Gift Card 🎉</h3>
            <img src="assets/JioMart.png" alt="Food App Gift Card" class="collage-image" onerror="handleGroceryCardError(this)">
            <p class="photo-caption">For when you cannot make a run to the store</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

// Handle if grocert gift card image doesn't load
function handleGroceryCardError(img) {
    const currentSrc = img.src;
    if (currentSrc.includes('.jpg')) {
        img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
        img.src = currentSrc.replace('.png', '.jpeg');
    } else {
        img.alt = "Grocery gift card image not found!";
        img.style.display = 'none';
        img.parentElement.innerHTML += '<p style="color: red;">Grocery gift card image not found. Check if JioMart.png exists in assets folder.</p>';
    }
}

// Function to open birthday card
function openBdayLetter() {
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="photo-popup-content">
            <button class="close-photo-btn" onclick="closePhotoPopup()">&times;</button>
            <h3>The closer you are, the shorter the letter.</h3>
            <img src="assets/HBD.png" alt="Birthday Letter" class="collage-image" onerror="handleBirthdayCardError(this)">
            <p class="photo-caption">September 9, 2025</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Click outside to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePhotoPopup();
    });
}

// Handle if image doesn't load
function handleBirthdayCardError(img) {
    const currentSrc = img.src;
    if (currentSrc.includes('.jpg')) {
        img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
        img.src = currentSrc.replace('.png', '.jpeg');
    } else {
        img.alt = "Birthday Letter cannot be found!";
        img.style.display = 'none';
        img.parentElement.innerHTML += '<p style="color: red;">Birthday card image not found. Check if HBD.png exists in assets folder.</p>';
    }
}
function debugBalloon() {
    const balloon = document.getElementById('dailyBalloon');
    console.log('Balloon element:', balloon);
    
    if (balloon) {
        balloon.style.display = 'block';
        balloon.style.visibility = 'visible';
        balloon.style.opacity = '1';
        console.log('Balloon should now be visible');
    } else {
        console.log('ERROR: Balloon element not found!');
    }
    
    balloonPopped = false;
    localStorage.removeItem('lastPoppedDate');
}