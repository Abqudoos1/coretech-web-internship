// Hardware Memory Local Product Catalog Storage
const localProductsDatabase = [
    { id: 1, name: "Mechanical Tech Keyboard", price: 85, category: "electronics", desc: "RGB backlit tactile actuation gaming keyboard engineered for high data operations.", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400" },
    { id: 2, name: "Wireless Developer Mouse", price: 45, category: "electronics", desc: "Ergonomic layout high precision tracking interface with programmable macros.", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400" },
    { id: 3, name: "Premium Noise ANC Headset", price: 180, category: "electronics", desc: "Acoustic insulation parameters matching studio runtime monitoring standards.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" },
    { id: 4, name: "Minimalist Leather Backpack", price: 95, category: "accessories", desc: "Waterproof canvas shielding with dedicated compartment for workstation laptops.", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400" },
    { id: 5, name: "Technical Fiber Smart Watch", price: 210, category: "electronics", desc: "Real-time vitals diagnostics trackers sync via bluetooth subsystems architecture.", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" },
    { id: 6, name: "Ergonomic Lumbar Office Chair", price: 340, category: "accessories", desc: "Sustained execution support systems built with mesh frame airflow membranes.", img: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=400" },
    { id: 7, name: "Breathable Knit Runner Shoes", price: 120, category: "apparel", desc: "Shock absorption sole parameters optimized for long performance runs.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" },
    { id: 8, name: "Hydro Matte Thermal Flask", price: 30, category: "apparel", desc: "Double-wall insulation tech maintaining operational temperatures for hours.", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400" }
];

// Document Object Model Targets Extraction
const productGrid = document.getElementById('productGrid');
const productSearch = document.getElementById('productSearch');
const categoryFilter = document.getElementById('categoryFilter');
const priceSort = document.getElementById('priceSort');
const inventoryStatus = document.getElementById('inventoryStatus');

// Register Control Observers
productSearch.addEventListener('input', runUnifiedFiltersEngine);
categoryFilter.addEventListener('change', runUnifiedFiltersEngine);
priceSort.addEventListener('change', runUnifiedFiltersEngine);

// Execution initialization
runUnifiedFiltersEngine();

// Centralized Filtering Matrix Engine
function runUnifiedFiltersEngine() {
    // Read states
    const searchString = productSearch.value.toLowerCase().trim();
    const activeCategory = categoryFilter.value;
    const sortingStrategy = priceSort.value;

    // --- Layer 1: Filter arrays based on Text Inputs ---
    let runtimeFilteredCollection = localProductsDatabase.filter(product => {
        return product.name.toLowerCase().includes(searchString) || 
               product.desc.toLowerCase().includes(searchString);
    });

    // --- Layer 2: Filter subset via Category Select Selection ---
    if (activeCategory !== 'all') {
        runtimeFilteredCollection = runtimeFilteredCollection.filter(product => {
            return product.category === activeCategory;
        });
    }

    // --- Layer 3: Re-index structural positions via Sorting Strategy ---
    if (sortingStrategy === 'lowToHigh') {
        runtimeFilteredCollection.sort((alpha, beta) => alpha.price - beta.price);
    } else if (sortingStrategy === 'highToLow') {
        runtimeFilteredCollection.sort((alpha, beta) => beta.price - alpha.price);
    }

    // Update Status Counters and Mount Grid
    inventoryStatus.textContent = `Displaying ${runtimeFilteredCollection.length} matching product records`;
    renderProductsTemplateGrid(runtimeFilteredCollection);
}

// Function: Build component items inside the screen grid framework
function renderProductsTemplateGrid(productsArray) {
    productGrid.innerHTML = ''; // Clear canvas nodes

    if (productsArray.length === 0) {
        productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px; font-size: 0.95rem;">No products match the specified tracking constraints.</div>`;
        return;
    }

    productsArray.forEach(product => {
        const productCardNode = document.createElement('article');
        productCardNode.className = 'product-card';
        
        productCardNode.innerHTML = `
            <div class="img-container">
                <img src="${product.img}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-details">
                <span class="tag-cat">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="price-box">$${product.price}</div>
            </div>
        `;
        
        productGrid.appendChild(productCardNode);
    });
}