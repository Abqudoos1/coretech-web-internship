// Global State Architecture Database Initialization
let clientsDatabase = JSON.parse(localStorage.getItem('enterpriseClientsData')) || [];
let editModeState = null;

// DOM Target Nodes Selection
const clientForm = document.getElementById('clientForm');
const clientIdInput = document.getElementById('clientId');
const clientNameInput = document.getElementById('clientName');
const clientEmailInput = document.getElementById('clientEmail');
const clientPhoneInput = document.getElementById('clientPhone');
const clientCompanyInput = document.getElementById('clientCompany');
const projectTypeInput = document.getElementById('projectType');
const projectStatusInput = document.getElementById('projectStatus');

const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

const clientTableBody = document.getElementById('clientTableBody');
const searchClient = document.getElementById('searchClient');
const statusFilter = document.getElementById('statusFilter');

// Bind Observers
clientForm.addEventListener('submit', commitClientRecord);
searchClient.addEventListener('input', runUnifiedSearchEngine);
statusFilter.addEventListener('change', runUnifiedSearchEngine);
cancelBtn.addEventListener('click', clearFormStates);

// Execute view initialization
runUnifiedSearchEngine();

// Function: Process Creation & Updation
function commitClientRecord(event) {
    event.preventDefault();

    const name = clientNameInput.value.trim();
    const email = clientEmailInput.value.trim();
    const phone = clientPhoneInput.value.trim();
    const company = clientCompanyInput.value.trim();
    const project = projectTypeInput.value.trim();
    const status = projectStatusInput.value;

    if (!name || !email || !phone || !company || !project) {
        alert("Validation Fault: All workspace attributes are required.");
        return;
    }

    if (editModeState === null) {
        // --- CREATE ACTION ---
        const newRecord = { id: Date.now(), name, email, phone, company, project, status };
        clientsDatabase.push(newRecord);
    } else {
        // --- UPDATE ACTION ---
        clientsDatabase = clientsDatabase.map(item => {
            if (item.id === parseInt(editModeState)) {
                return { ...item, name, email, phone, company, project, status };
            }
            return item;
        });
    }

    commitLocalStorage();
    clearFormStates();
    runUnifiedSearchEngine();
}

// Function: Render Data Table Matrix based on Filters
function runUnifiedSearchEngine() {
    const searchQuery = searchClient.value.toLowerCase().trim();
    const statusQuery = statusFilter.value;

    clientTableBody.innerHTML = '';

    const filteredRecords = clientsDatabase.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery) || 
                              client.company.toLowerCase().includes(searchQuery) || 
                              client.email.toLowerCase().includes(searchQuery);
        const matchesStatus = (statusQuery === 'All') || (client.status === statusQuery);
        return matchesSearch && matchesStatus;
    });

    if (filteredRecords.length === 0) {
        clientTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">No enterprise records active.</td></tr>`;
        return;
    }

    filteredRecords.forEach(client => {
        const rowNode = document.createElement('tr');
        const statusClass = client.status.replace(' ', '-');
        
        rowNode.innerHTML = `
            <td><strong>${client.name}</strong><br><span style="color:#64748b; font-size:0.8rem;">${client.company}</span></td>
            <td>${client.email}<br><span style="color:#64748b; font-size:0.8rem;">${client.phone}</span></td>
            <td>${client.project}</td>
            <td><span class="badge ${statusClass}">${client.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="initiateEditPipeline(${client.id})">Edit</button>
                <button class="action-btn del-btn" onclick="purgeClientRecord(${client.id})">Delete</button>
            </td>
        `;
        clientTableBody.appendChild(rowNode);
    });
}

// Function: Load selected entry back into inputs for mutation
window.initiateEditPipeline = function(id) {
    const target = clientsDatabase.find(item => item.id === id);
    if (!target) return;

    editModeState = id;
    clientNameInput.value = target.name;
    clientEmailInput.value = target.email;
    clientPhoneInput.value = target.phone;
    clientCompanyInput.value = target.company;
    projectTypeInput.value = target.project;
    projectStatusInput.value = target.status;

    formTitle.textContent = "Modify Client Workspace";
    submitBtn.textContent = "Apply Structural Modifications";
    cancelBtn.classList.remove('hidden');
};

// Function: Delete targeted unique client block
window.purgeClientRecord = function(id) {
    if (confirm("System Alert: Are you sure you want to permanently delete this record structure?")) {
        clientsDatabase = clientsDatabase.filter(item => item.id !== id);
        commitLocalStorage();
        if (editModeState === id) clearFormStates();
        runUnifiedSearchEngine();
    }
};

// Reset interface logic parameters
function clearFormStates() {
    editModeState = null;
    clientForm.reset();
    formTitle.textContent = "Register New Client";
    submitBtn.textContent = "Save Client Record";
    cancelBtn.classList.add('hidden');
}

function commitLocalStorage() {
    localStorage.setItem('enterpriseClientsData', JSON.stringify(clientsDatabase));
}