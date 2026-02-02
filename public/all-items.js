// Pagination functionality
const itemsPerPage = 10;
let currentPage = 1;
const allItemsContainer = document.getElementById('all-items-container');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const reportBtn = document.getElementById('report-btn');

// Load items from localStorage or use sample data
let allItems = JSON.parse(localStorage.getItem('foundItems')) || [];

// Display items with pagination
function displayAllItems(page) {
    allItemsContainer.innerHTML = '';
    
    // Apply filters if any
    let filteredItems = [...allItems];
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory) {
        filteredItems = filteredItems.filter(item => item.type === selectedCategory);
    }
    
    if (searchTerm.trim() !== '') {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.location.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    // Display items
    itemsToShow.forEach(item => {
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
        allItemsContainer.appendChild(itemCard);
    });
    
    // Update pagination info
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page >= totalPages;
}

// Initialize the page
function init() {
    // Display initial items
    displayAllItems(currentPage);
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayAllItems(currentPage);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage * itemsPerPage < allItems.length) {
            currentPage++;
            displayAllItems(currentPage);
        }
    });
    
    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        displayAllItems(currentPage);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            displayAllItems(currentPage);
        }
    });
    
    categoryFilter.addEventListener('change', () => {
        currentPage = 1;
        displayAllItems(currentPage);
    });
    
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            window.location.href = 'index.html#report-modal';
        });
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);