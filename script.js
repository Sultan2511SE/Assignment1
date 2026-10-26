document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('createAccountForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            const usernameError = document.getElementById('usernameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');

            
            usernameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';

            let isValid = true;

            
            if (!usernameInput.value.trim()) {
                usernameError.textContent = 'Username is required.';
                isValid = false;
            }

            
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValue) {
                emailError.textContent = 'Email is required.';
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            
            const passwordValue = passwordInput.value;
            if (!passwordValue) {
                passwordError.textContent = 'Password is required.';
                isValid = false;
            } else if (passwordValue.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                isValid = false;
            }


            const confirmPasswordValue = confirmPasswordInput.value;
            if (!confirmPasswordValue) {
                confirmPasswordError.textContent = 'Please confirm your password.';
                isValid = false;
            } else if (passwordValue !== confirmPasswordValue) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                isValid = false;
            }

            if (isValid) {
                alert('Account created successfully!');
                
            }
        });
    }

    function updateDateTime() {
        const dateTimeElement = document.getElementById('currentDateTime');
        if (!dateTimeElement) return;

        const now = new Date();
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});


const cyberClubData = {
    clubName: "FortGame CyberClub",
    clubAddress: "Astana, Kazakhstan",
    vipSlotsLeft: 5,
    
    fetchClubStatus: function() {
        return `Club: ${this.clubName} | Available VIP Slots: ${this.vipSlotsLeft}`;
    },
    
    reserveSlot: function() {
        if (this.vipSlotsLeft > 0) {
            this.vipSlotsLeft--;
            return true;
        }
        return false;
    }
};

const pricingHeader = document.querySelector('main > section:first-child');
if (pricingHeader) {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'fc-club-status-info';
    statusDiv.className = 'text-info fw-bold mb-3';
    statusDiv.textContent = cyberClubData.fetchClubStatus();
    pricingHeader.appendChild(statusDiv);
}

const pricingPackages = [
    { zone: "Standard Room", price: 1000, type: "standard" },
    { zone: "VIP Room", price: 1800, type: "vip" },
    { zone: "PS Room", price: 2000, type: "ps" }
];

pricingPackages.forEach(pkg => {
    console.log(`Zone: ${pkg.zone}, Hourly Rate: ${pkg.price} KZT`);
});

const premiumZones = pricingPackages.filter(pkg => pkg.price > 1500);
console.log("Premium Zones (>1500 KZT):", premiumZones);

const notificationSound = new Audio('click.mp3');
notificationSound.volume = 0.5;

const interactiveElements = document.querySelectorAll('.btn, .room-link');

interactiveElements.forEach(element => {
    element.addEventListener('click', (event) => {
        
        notificationSound.currentTime = 0;
        notificationSound.play().catch(() => {
            
        });

        element.style.transition = "transform 0.15s ease";
        element.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            element.style.transform = "scale(1)";
        }, 150);
    });
}); 