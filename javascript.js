let cars = [];
const carContainer = document.getElementById('carContainer');
const searchBar = document.getElementById('searchBar'); 
async function fetchCars() {
    try {
        const response = await fetch('cars.json');
        cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Error fetching car data:', error);
    }   
}                                                               
function displayCars(carList) {
    carContainer.innerHTML = '';
    carList.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <h2 class="car-name">${car.name} (${car.year})</h2>
            <p class="car-color"><strong>Color:</strong> ${car.color}</p>
            <p class="car-price"><strong>Price:</strong> $${car.price.toLocaleString()}</p>
            <p class="car-price"><strong>Price:</strong> ₹${Math.round(car.price * 90.17).toLocaleString()}</p>
            <div class="car-specifications">
                <h3>Specifications:</h3>
                <ul>
                    <li><strong>Engine:</strong> ${car.specifications.engine}</li>
                    <li><strong>Horsepower:</strong> ${car.specifications.horsepower} hp</li>
                    <li><strong>0-60 mph:</strong> ${car.specifications["0-60mph"]}</li>
                    <li><strong>Top Speed:</strong> ${car.specifications.top_speed}</li>
                </ul>   
            </div>
        `;
        carContainer.appendChild(carCard);
    });
}
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCars = cars.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.color.toLowerCase().includes(searchTerm) ||
        car.year.toString().includes(searchTerm)
    );
    displayCars(filteredCars);
});
window.onload = fetchCars;  

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('color') || 'default';
    
    // Set theme
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        document.getElementById('toggleDarkMode').classList.add('active');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        document.getElementById('toggleDarkMode').classList.remove('active');
    }
    
    // Set color theme
    if (savedColor !== 'default') {
        document.body.classList.add('theme-' + savedColor);
    }
    
    // Update active color button
    document.querySelectorAll('.color-btn').forEach(btn => {
        if (btn.dataset.theme === savedColor) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Dark Mode Toggle
const toggleDarkModeButton = document.getElementById('toggleDarkMode'); 
toggleDarkModeButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    toggleDarkModeButton.classList.toggle('active');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Color Picker Toggle
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    // Hover effect - preview color
    btn.addEventListener('mouseenter', () => {
        const theme = btn.dataset.theme;
        
        // Remove all theme classes
        document.body.classList.remove('theme-gold', 'theme-yellowgreen', 'theme-mediumspringgreen', 'theme-deepskyblue');
        
        // Add hovered theme class
        if (theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }
    });
    
    // Click effect - save color
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        
        // Update active button
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Save to localStorage
        localStorage.setItem('color', theme);
    });
    
    // Mouse leave - restore saved color
    btn.addEventListener('mouseleave', () => {
        const savedColor = localStorage.getItem('color') || 'default';
        
        // Remove all theme classes
        document.body.classList.remove('theme-gold', 'theme-yellowgreen', 'theme-mediumspringgreen', 'theme-deepskyblue');
        
        // Re-apply saved theme
        if (savedColor !== 'default') {
            document.body.classList.add('theme-' + savedColor);
        }
    });
});

// Initialize theme on page load
initializeTheme();


//mobile swipe support
let touchstartX = 0;
let touchendX = 0;  
function handleGesture() {
    if (touchendX < touchstartX) {
        carContainer.scrollBy({ left: 300, behavior: 'smooth' });
    }   
    if (touchendX > touchstartX) {
        carContainer.scrollBy({ left: -300, behavior: 'smooth' });
    }   
}
carContainer.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});
carContainer.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});



