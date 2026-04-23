// Shared utilities and constants

const COLORS = {
    maroon: '#800000',
    gold: '#FFD700',
    white: '#FFFFFF',
    darkMaroon: '#660000'
};

const ROLES = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    SUPERVISOR: 'supervisor'
};

// Check authentication
function checkAuth() {
    const role = localStorage.getItem('userRole');
    if (!role) {
        window.location.href = 'index.html';
        return false;
    }
    return role;
}

// Logout function
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}

// Show confirmation modal
function showConfirmation(title, message, onConfirm, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">${title}</h2>
            <p class="text-gray-600 mb-6">${message}</p>
            <div class="flex gap-4">
                <button onclick="this.closest('.fixed').remove(); ${onCancel || 'null'}()" class="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400">
                    Cancel
                </button>
                <button onclick="this.closest('.fixed').remove(); ${onConfirm}()" class="flex-1 bg-[#800000] text-white font-bold py-2 rounded-lg hover:bg-[#660000]">
                    Confirm
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show error message
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

// Show success message
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

// Format timestamp
function getFormattedTimestamp() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    return now.toLocaleDateString('en-US', options);
}

// Student data
const STUDENTS = [
    {
        id: 'STU001',
        name: 'ANDAYA, JOHN BENEDICT G.',
        attendance: 83,
        participation: 100,
        quizzes: 90,
        assignment: 90,
        project: 100,
        majorExam: 95,
        finalGrade: 92,
        remarks: 'Passed'
    },
    {
        id: 'STU002',
        name: 'ARNAIZ, SAMUEL ANGELO M.',
        attendance: 90,
        participation: 90,
        quizzes: 80,
        assignment: 80,
        project: 90,
        majorExam: 80,
        finalGrade: 84,
        remarks: 'Passed'
    },
    {
        id: 'STU003',
        name: 'BAGAYAS, BOBSON ROB V.',
        attendance: 83,
        participation: 80,
        quizzes: 70,
        assignment: 70,
        project: 80,
        majorExam: 70,
        finalGrade: 74,
        remarks: 'Failed'
    }
];

// Calculate final grade
function calculateFinalGrade(attendance, participation, quizzes, assignment, project, majorExam) {
    const classPerformance = (attendance + participation + quizzes + assignment + project) / 5;
    const classPerformanceRaw = classPerformance * 0.70;
    const majorExamScore = majorExam * 0.30;
    const finalGrade = Math.round(classPerformanceRaw + majorExamScore);
    return {
        classPerformance: Math.round(classPerformance),
        finalGrade: finalGrade,
        remarks: finalGrade >= 75 ? 'Passed' : 'Failed'
    };
}

// Get user display name
function getUserDisplayName() {
    const userId = localStorage.getItem('userId') || 'User';
    return userId;
}

// Sidebar navigation template
function getSidebarHTML(role, activePage) {
    let menuItems = '';
    
    if (role === ROLES.ADMIN) {
        menuItems = `
            <a href="admin-dashboard.html" class="sidebar-item ${activePage === 'dashboard' ? 'active' : ''}">📊 Dashboard</a>
            <a href="user-management.html" class="sidebar-item ${activePage === 'users' ? 'active' : ''}">👥 User Management</a>
            <a href="create-user.html" class="sidebar-item ${activePage === 'create' ? 'active' : ''}">➕ Create User</a>
            <a href="roles-privileges.html" class="sidebar-item ${activePage === 'roles' ? 'active' : ''}">🔐 Roles & Privileges</a>
            <a href="audit-trail.html" class="sidebar-item ${activePage === 'audit' ? 'active' : ''}">📋 Audit Trail</a>
        `;
    } else if (role === ROLES.FACULTY) {
        menuItems = `
            <a href="faculty-dashboard.html" class="sidebar-item ${activePage === 'dashboard' ? 'active' : ''}">📊 Dashboard</a>
            <a href="my-subjects.html" class="sidebar-item ${activePage === 'subjects' ? 'active' : ''}">📚 My Subjects</a>
            <a href="my-students.html" class="sidebar-item ${activePage === 'students' ? 'active' : ''}">👨‍🎓 My Students</a>
            <a href="grade-encoding.html" class="sidebar-item ${activePage === 'grades' ? 'active' : ''}">📝 Grade Encoding</a>
        `;
    } else if (role === ROLES.SUPERVISOR) {
        menuItems = `
            <a href="supervisor-dashboard.html" class="sidebar-item ${activePage === 'dashboard' ? 'active' : ''}">📊 Dashboard</a>
            <a href="assign-subject.html" class="sidebar-item ${activePage === 'assign' ? 'active' : ''}">📌 Assign Subject</a>
            <a href="faculty-roster.html" class="sidebar-item ${activePage === 'roster' ? 'active' : ''}">👨‍💼 Faculty Roster</a>
            <a href="department-subjects.html" class="sidebar-item ${activePage === 'depts' ? 'active' : ''}">🏢 Department Subjects</a>
        `;
    }

    return `
        <aside class="w-64 bg-[#800000] text-white h-screen fixed left-0 top-0 overflow-y-auto">
            <div class="p-6 border-b border-[#FFD700]">
                <h1 class="text-2xl font-bold">UPHSD</h1>
                <p class="text-sm text-gray-300">Grading System</p>
            </div>
            <nav class="p-4 space-y-2">
                ${menuItems}
            </nav>
            <div class="absolute bottom-0 w-full p-4 border-t border-[#FFD700]">
                <button onclick="logout()" class="w-full bg-[#660000] text-white font-bold py-2 rounded-lg hover:bg-[#550000] transition">
                    🚪 Logout
                </button>
            </div>
        </aside>
    `;
}

// Header template
function getHeaderHTML(role) {
    return `
        <header class="bg-white border-b-4 border-[#800000] p-4 ml-64">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-[#800000]">UPHSD Grading System</h2>
                    <p class="text-sm text-gray-600">Role: <span class="font-semibold capitalize">${role}</span></p>
                </div>
                <div class="flex items-center gap-4">
                    <img src="https://placehold.co/48x48/800000/FFFFFF?text=${role.charAt(0).toUpperCase()}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div>
                        <p class="font-semibold text-gray-800">${getUserDisplayName()}</p>
                        <p class="text-xs text-gray-600">Last updated: ${getFormattedTimestamp()}</p>
                    </div>
                </div>
            </div>
        </header>
    `;
}

// Add shared styles
const style = document.createElement('style');
style.textContent = `
    .sidebar-item {
        display: block;
        padding: 12px 16px;
        color: white;
        text-decoration: none;
        border-left: 4px solid transparent;
        transition: all 0.3s ease;
        border-radius: 4px;
        margin-bottom: 4px;
    }
    
    .sidebar-item:hover {
        background-color: #660000;
        border-left-color: #FFD700;
    }
    
    .sidebar-item.active {
        background-color: #FFD700;
        color: #800000;
        font-weight: bold;
        border-left-color: #FFD700;
    }
    
    .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 20px;
        border-left: 4px solid #FFD700;
    }
    
    .card-title {
        font-size: 18px;
        font-weight: bold;
        color: #800000;
        margin-bottom: 12px;
    }
    
    .btn-primary {
        background-color: #800000;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease;
        min-height: 44px;
        min-width: 44px;
    }
    
    .btn-primary:hover {
        background-color: #660000;
    }
    
    .btn-primary:focus {
        outline: 3px solid #FFD700;
        outline-offset: 2px;
    }
    
    .btn-secondary {
        background-color: #f0f0f0;
        color: #333;
        padding: 10px 20px;
        border-radius: 6px;
        border: 1px solid #ddd;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease;
        min-height: 44px;
        min-width: 44px;
    }
    
    .btn-secondary:hover {
        background-color: #e0e0e0;
    }
    
    .focus-ring:focus {
        outline: 3px solid #FFD700;
        outline-offset: 2px;
    }
    
    .error-input {
        border-color: #ef4444 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
    }
    
    .data-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px;
    }
    
    .data-table thead {
        background-color: #800000;
        color: white;
    }
    
    .data-table th {
        padding: 12px;
        text-align: left;
        font-weight: bold;
    }
    
    .data-table td {
        padding: 12px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .data-table tbody tr:hover {
        background-color: #f9f9f9;
    }
    
    .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
    }
    
    .status-passed {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .status-failed {
        background-color: #fee2e2;
        color: #991b1b;
    }
    
    .grid-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 16px;
    }
    
    .profile-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 16px;
        text-align: center;
        border-top: 4px solid #800000;
    }
    
    .profile-card img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 12px;
    }
    
    .profile-card-name {
        font-weight: bold;
        color: #800000;
        margin-bottom: 4px;
    }
    
    .profile-card-id {
        font-size: 12px;
        color: #666;
    }
`;
document.head.appendChild(style);
