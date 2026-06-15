// Global Component Node References
const usersGrid = document.getElementById('usersGrid');
const searchInput = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');

// Central Memory Storage Array to keep original API data state
let globalUsersCache = [];

// Event Driver Activation Initialization
document.addEventListener('DOMContentLoaded', initializeDataSync);
searchInput.addEventListener('input', executeLiveSearchFilter);

// Asynchronous Function: Pull pipeline metadata from target REST server
async function initializeDataSync() {
    const apiTargetEndpoint = 'https://jsonplaceholder.typicode.com/users';
    
    try {
        const networkResponse = await fetch(apiTargetEndpoint);
        
        // Throw runtime exception if response is faulty
        if (!networkResponse.ok) {
            throw new Error(`HTTP network error configuration status: ${networkResponse.status}`);
        }
        
        // Parse network chunk data streams into structured JSON objects
        globalUsersCache = await networkResponse.json();
        
        // Terminate setup alerts display state
        statusMessage.classList.add('hidden');
        
        // Enable search operational filters
        searchInput.disabled = false;
        
        // Execute primary visualization rendering engine
        renderUserDashboardGrid(globalUsersCache);
        
    } catch (runtimeException) {
        console.error('API Error Exception Stack:', runtimeException);
        statusMessage.className = 'status-box error';
        statusMessage.textContent = `Execution Failure: Unable to fetch data components (${runtimeException.message})`;
    }
}

// Function: Process data array maps to transform into UI Document Fragments
function renderUserDashboardGrid(usersArray) {
    // Purging active view nodes
    usersGrid.innerHTML = '';
    
    if (usersArray.length === 0) {
        usersGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; font-size: 0.95rem;">No technical matching profiles detected.</div>`;
        return;
    }

    usersArray.forEach(user => {
        const cardElement = document.createElement('div');
        cardElement.className = 'user-card';
        
        cardElement.innerHTML = `
            <h3>${user.name}</h3>
            <div class="user-meta-info">
                <span><strong>📧 Email:</strong> ${user.email.toLowerCase()}</span>
                <span><strong>📞 Phone:</strong> ${user.phone.split(' ')[0]}</span>
                <span><strong>🌐 Web:</strong> ${user.website}</span>
                <span><strong>📍 City:</strong> ${user.address.city}</span>
            </div>
        `;
        
        usersGrid.appendChild(cardElement);
    });
}

// Function: Local text matching parser algorithm
function executeLiveSearchFilter(event) {
    const userQueryString = event.target.value.toLowerCase().trim();
    
    // Filter array memory snapshot without hitting network server again
    const matchedResults = globalUsersCache.filter(user => {
        return user.name.toLowerCase().includes(userQueryString);
    });
    
    renderUserDashboardGrid(matchedResults);
}