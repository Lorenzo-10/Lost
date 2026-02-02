// Sample data for found items
let foundItems = [
    {
        id: 1,
        type: "id-card",
        typeLabel: "National ID Card",
        name: "John M. Smith",
        number: "*****6789",
        location: "Central Park, New York",
        contact: "+1 (555) 123-4567",
        description: "Found near the fountain in Central Park. Blue wallet with this ID card inside.",
        image: "https://via.placeholder.com/300x200?text=ID+Card",
        date: new Date().toISOString()
    },
    {
        id: 2,
        type: "passport",
        typeLabel: "Passport",
        name: "Sarah Johnson",
        number: "*****4321",
        location: "Grand Central Station, New York",
        contact: "+1 (555) 987-6543",
        description: "Found on a bench near the main concourse. US passport with blue cover.",
        image: "https://via.placeholder.com/300x200?text=Passport",
        date: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
        id: 3,
        type: "driver-license",
        typeLabel: "Driver's License",
        name: "Robert K. Davis",
        number: "*****5678",
        location: "Brooklyn Bridge, New York",
        contact: "+1 (555) 456-7890",
        description: "Found on the pedestrian walkway. California driver's license.",
        image: "https://via.placeholder.com/300x200?text=Driver's+License",
        date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
        id: 4,
        type: "health-insurance",
        typeLabel: "Health Insurance Card",
        name: "Maria Garcia",
        number: "*****9012",
        location: "Times Square, New York",
        contact: "+1 (555) 234-5678",
        description: "Found near the subway entrance. Blue Cross Blue Shield insurance card.",
        image: "https://via.placeholder.com/300x200?text=Insurance+Card",
        date: new Date(Date.now() - 259200000).toISOString() // 3 days ago
    },
    {
        id: 5,
        type: "id-card",
        typeLabel: "National ID Card",
        name: "David Wilson",
        number: "*****3456",
        location: "Empire State Building, New York",
        contact: "+1 (555) 345-6789",
        description: "Found in the observation deck. ID card with red state seal.",
        image: "https://via.placeholder.com/300x200?text=ID+Card",
        date: new Date(Date.now() - 345600000).toISOString() // 4 days ago
    },
    {
        id: 6,
        type: "passport",
        typeLabel: "Passport",
        name: "Emily Chen",
        number: "*****7890",
        location: "Statue of Liberty, New York",
        contact: "+1 (555) 678-9012",
        description: "Found near the ferry terminal. Chinese passport with red cover.",
        image: "https://via.placeholder.com/300x200?text=Passport",
        date: new Date(Date.now() - 432000000).toISOString() // 5 days ago
    },
    {
        id: 7,
        type: "other",
        typeLabel: "Other Document",
        name: "James Brown",
        number: "*****1234",
        location: "Central Library, New York",
        contact: "+1 (555) 789-0123",
        description: "Found in the reading room. University ID card with photo.",
        image: "https://via.placeholder.com/300x200?text=University+ID",
        date: new Date(Date.now() - 518400000).toISOString() // 6 days ago
    }
];

// DOM Elements
const itemsContainer = document.getElementById('items-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const viewAllBtn = document.getElementById('view-all-btn');
const reportBtn = document.getElementById('report-btn');
const modal = document.getElementById('report-modal');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancel-btn');
const reportForm = document.getElementById('report-form');
const contactForm = document.getElementById('contact-form');
const docImageInput = document.getElementById('doc-image');
const imagePreview = document.getElementById('image-preview');

// Display found items
function displayItems(items) {
    itemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const formattedDate = new Date(item.date).toLocaleString();
        
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.typeLabel}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-meta">
                    <span class="item-type">${item.typeLabel}</span>
                    <span class="item-date">${formattedDate}</span>
                </div>
                <p class="item-description">${item.description.replace(/\n/g, '<br>')}</p>
                <div class="item-contact">
                    <p><strong>Found Location:</strong> ${item.location}</p>
                    <p><strong>Contact:</strong> ${item.contact}</p>
                </div>
            </div>
        `;
        
        itemsContainer.appendChild(itemCard);
    });
}

// Search functionality
function searchItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    let filteredItems = foundItems;
    
    // Apply category filter
    if (selectedCategory) {
        filteredItems = filteredItems.filter(item => item.type === selectedCategory);
    }
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.location.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayItems(filteredItems);
}

// Modal functions
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Image preview
function handleImageUpload(event) {
    imagePreview.innerHTML = '';
    
    const files = event.target.files;
    if (files.length > 3) {
        alert('Maximum 3 images allowed');
        event.target.value = '';
        return;
    }
    
    Array.from(files).forEach(file => {
        if (!file.type.match('image.*')) {
            alert('Only image files are allowed');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file); // Read as base64
    });
}

// Form submission
function handleReportSubmit(e) {
    e.preventDefault();
    
    const docType = document.getElementById('doc-type').value;
    const docName = document.getElementById('doc-name').value;
    const docNumber = document.getElementById('doc-number').value;
    const foundLocation = document.getElementById('found-location').value;
    const contactPhone = document.getElementById('contact-phone').value;
    const additionalInfo = document.getElementById('additional-info').value;
    const verifyCheck = document.getElementById('verify-check').checked;
    
    if (!docType || !foundLocation || !contactPhone || !verifyCheck) {
        alert('Please fill in all required fields and confirm verification');
        return;
    }

    // Handle image upload
    const processImageUpload = () => {
        return new Promise((resolve) => {
            if (docImageInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resolve(e.target.result); // This is the base64 string
                };
                reader.readAsDataURL(docImageInput.files[0]);
            } else {
                resolve("https://via.placeholder.com/300x200?text=No+Image");
            }
        });
    };

    processImageUpload().then(imageData => {
        const newItem = {
            id: Date.now(),
            type: docType,
            typeLabel: document.getElementById('doc-type').options[document.getElementById('doc-type').selectedIndex].text,
            name: docName || "Name not visible",
            number: docNumber ? docNumber.replace(/.(?=.{4})/g, '*') : "****",
            location: foundLocation,
            contact: contactPhone,
            description: additionalInfo || "No additional information provided",
            image: imageData, // Now using base64 string
            date: new Date().toISOString()
        };
        
        foundItems.unshift(newItem);
        localStorage.setItem('foundItems', JSON.stringify(foundItems));
        
        showThankYouMessage();
        closeModal();
        reportForm.reset();
        imagePreview.innerHTML = '';
        
        // Update display with new item
        displayItems(foundItems.slice(0, 7));
    });
}

function showThankYouMessage() {
    const msg = document.createElement('div');
    msg.className = 'thank-you-message';
    msg.textContent = 'Thank you for your kindness!';
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 3000);
}

// Initialize the page
function init() {
    // Load items from localStorage if available
    const savedItems = localStorage.getItem('foundItems');
    if (savedItems) {
        foundItems = JSON.parse(savedItems);
    }
    
    // Display initial items
    displayItems(foundItems.slice(0, 7));
    
    // Event listeners
    searchBtn.addEventListener('click', searchItems);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchItems();
    });
    categoryFilter.addEventListener('change', searchItems);
    
    reportBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    docImageInput.addEventListener('change', handleImageUpload);
    reportForm.addEventListener('submit', handleReportSubmit);
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            localStorage.setItem('foundItems', JSON.stringify(foundItems));
            window.location.href = 'all-items.html';
        });
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);