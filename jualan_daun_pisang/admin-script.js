import { API_BASE_URL, API_ENDPOINTS } from './config.js';

// API Configuration
const API_BASE_URL = 'http://localhost/jualan_daun_pisang/api.php';

// Check Authentication
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'admin-login.html';
        return;
    }
}

// Global Variables
let currentSection = 'dashboard';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadDashboardData();
    
    // Setup logout button
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminToken');
            window.location.href = 'admin-login.html';
        });
    }
});

// API Functions
async function fetchFromAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(API_BASE_URL + endpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Data fetching functions
async function fetchOrders() {
    try {
        const data = await fetchFromAPI(API_ENDPOINTS.orders);
        return data.records || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

async function fetchProducts() {
    try {
        const data = await fetchFromAPI(API_ENDPOINTS.products);
        return data.records || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function fetchCustomers() {
    try {
        const data = await fetchFromAPI(API_ENDPOINTS.customers);
        return data.records || [];
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
}

// Initialize data
let orders = [
    {
        id: 'ORD001',
        customer: 'Sari Wulandari',
        products: '50 lembar Daun Pisang Besar',
        total: 50000,
        status: 'pending',
        date: '2024-01-15',
        phone: '+62 812-1111-1111',
        address: 'Jl. Pemuda No. 15, Semarang'
    },
    {
        id: 'ORD002',
        customer: 'Budi Santoso',
        products: '30 lembar Daun Pisang Sedang',
        total: 21000,
        status: 'processing',
        date: '2024-01-15',
        phone: '+62 812-2222-2222',
        address: 'Jl. Diponegoro No. 88, Semarang'
    },
    {
        id: 'ORD003',
        customer: 'Maya Indira',
        products: '100 lembar Daun Pisang Kecil',
        total: 50000,
        status: 'delivered',
        date: '2024-01-14',
        phone: '+62 812-3333-3333',
        address: 'Jl. Pandanaran No. 45, Semarang'
    },
    {
        id: 'ORD004',
        customer: 'Ahmad Rizki',
        products: '25 lembar Daun Pisang Besar',
        total: 25000,
        status: 'shipped',
        date: '2024-01-14',
        phone: '+62 812-4444-4444',
        address: 'Jl. Gajah Mada No. 12, Semarang'
    },
    {
        id: 'ORD005',
        customer: 'Dewi Sartika',
        products: '75 lembar Daun Pisang Sedang',
        total: 52500,
        status: 'cancelled',
        date: '2024-01-13',
        phone: '+62 812-5555-5555',
        address: 'Jl. Imam Bonjol No. 67, Semarang'
    }
];

let customers = [
    {
        name: 'Sari Wulandari',
        email: 'sari@email.com',
        phone: '+62 812-1111-1111',
        totalOrders: 15,
        totalSpent: 750000,
        joinDate: '2023-06-15'
    },
    {
        name: 'Budi Santoso',
        email: 'budi@email.com',
        phone: '+62 812-2222-2222',
        totalOrders: 8,
        totalSpent: 320000,
        joinDate: '2023-08-22'
    },
    {
        name: 'Maya Indira',
        email: 'maya@email.com',
        phone: '+62 812-3333-3333',
        totalOrders: 12,
        totalSpent: 580000,
        joinDate: '2023-05-10'
    },
    {
        name: 'Ahmad Rizki',
        email: 'ahmad@email.com',
        phone: '+62 812-4444-4444',
        totalOrders: 6,
        totalSpent: 240000,
        joinDate: '2023-09-05'
    },
    {
        name: 'Dewi Sartika',
        email: 'dewi@email.com',
        phone: '+62 812-5555-5555',
        totalOrders: 10,
        totalSpent: 450000,
        joinDate: '2023-07-18'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

// Initialize Admin Panel
function initializeAdmin() {
    setupEventListeners();
    loadOrdersTable();
    loadCustomersTable();
    initializeChart();
    showSection('dashboard');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Order filter
    const orderFilter = document.getElementById('orderFilter');
    if (orderFilter) {
        orderFilter.addEventListener('change', function() {
            filterOrders(this.value);
        });
    }

    // Customer search
    const customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('input', function() {
            searchCustomers(this.value);
        });
    }

    // Form submissions
    document.querySelectorAll('.modal-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });

    // Settings forms
    document.querySelectorAll('.settings-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsSubmission(this);
        });
    });
}

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update page title
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'orders': 'Manajemen Pesanan',
        'products': 'Manajemen Produk',
        'customers': 'Manajemen Pelanggan',
        'inventory': 'Manajemen Stok',
        'delivery': 'Manajemen Pengiriman',
        'reports': 'Laporan',
        'settings': 'Pengaturan'
    };
    pageTitle.textContent = titles[sectionName] || 'Dashboard';
    
    currentSection = sectionName;
}

// Load Orders Table
function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>Rp ${order.total.toLocaleString('id-ID')}</td>
            <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                ${order.status === 'pending' ? `<button class="btn btn-sm btn-danger" onclick="cancelOrder('${order.id}')"><i class="fas fa-times"></i></button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Customers Table
function loadCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${customer.name}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.totalOrders}</td>
            <td>Rp ${customer.totalSpent.toLocaleString('id-ID')}</td>
            <td>${formatDate(customer.joinDate)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewCustomer('${customer.email}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="contactCustomer('${customer.phone}')">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter Orders
function filterOrders(status) {
    const filteredOrders = status === 'all' ? orders : orders.filter(order => order.status === status);
    
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>Rp ${order.total.toLocaleString('id-ID')}</td>
            <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                ${order.status === 'pending' ? `<button class="btn btn-sm btn-danger" onclick="cancelOrder('${order.id}')"><i class="fas fa-times"></i></button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Search Customers
function searchCustomers(query) {
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.phone.includes(query)
    );
    
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = '';
    
    filteredCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${customer.name}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.totalOrders}</td>
            <td>Rp ${customer.totalSpent.toLocaleString('id-ID')}</td>
            <td>${formatDate(customer.joinDate)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewCustomer('${customer.email}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="contactCustomer('${customer.phone}')">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize Chart
function initializeChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Simple chart implementation (you can replace with Chart.js)
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    // Sample data
    const data = [120, 190, 300, 500, 200, 300, 450];
    const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    
    drawChart(ctx, data, labels, canvas.width, canvas.height);
}

// Simple Chart Drawing Function
function drawChart(ctx, data, labels, width, height) {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...data);
    const barWidth = chartWidth / data.length;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bars
    ctx.fillStyle = '#4CAF50';
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = height - padding - barHeight;
        const w = barWidth * 0.8;
        
        ctx.fillRect(x, y, w, barHeight);
        
        // Draw labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + w/2, height - padding + 20);
        
        // Draw values
        ctx.fillText(value.toString(), x + w/2, y - 5);
        
        ctx.fillStyle = '#4CAF50';
    });
}

// Order Management Functions
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    showAlert('success', `Melihat detail pesanan ${orderId}: ${order.customer} - ${order.products}`);
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const newStatus = prompt('Masukkan status baru (pending/processing/shipped/delivered/cancelled):', order.status);
    if (newStatus && ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(newStatus)) {
        order.status = newStatus;
        loadOrdersTable();
        showAlert('success', `Status pesanan ${orderId} berhasil diubah menjadi ${getStatusText(newStatus)}`);
    }
}

function cancelOrder(orderId) {
    if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'cancelled';
            loadOrdersTable();
            showAlert('success', `Pesanan ${orderId} berhasil dibatalkan`);
        }
    }
}

function exportOrders() {
    showAlert('success', 'Data pesanan berhasil diekspor ke file Excel');
}

// Product Management Functions
function showAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

function editProduct(productType) {
    showAlert('info', `Mengedit produk ${productType}`);
}

function deleteProduct(productType) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        showAlert('success', `Produk ${productType} berhasil dihapus`);
    }
}

// Customer Management Functions
function viewCustomer(email) {
    const customer = customers.find(c => c.email === email);
    if (!customer) return;
    
    showAlert('info', `Melihat detail pelanggan: ${customer.name}`);
}

function contactCustomer(phone) {
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
    window.open(whatsappUrl, '_blank');
}

// Inventory Management Functions
function showAddStockModal() {
    document.getElementById('addStockModal').style.display = 'block';
}

function addStock(productType) {
    const amount = prompt(`Masukkan jumlah stok yang akan ditambahkan untuk ${productType}:`);
    if (amount && !isNaN(amount) && parseInt(amount) > 0) {
        showAlert('success', `Berhasil menambahkan ${amount} lembar stok untuk ${productType}`);
    }
}

function adjustStock(productType) {
    const newAmount = prompt(`Masukkan jumlah stok baru untuk ${productType}:`);
    if (newAmount && !isNaN(newAmount) && parseInt(newAmount) >= 0) {
        showAlert('success', `Stok ${productType} berhasil disesuaikan menjadi ${newAmount} lembar`);
    }
}

// Delivery Management Functions
function scheduleDelivery() {
    showAlert('info', 'Membuka form penjadwalan pengiriman');
}

function completeDelivery(deliveryId) {
    if (confirm('Apakah pengiriman ini sudah selesai?')) {
        showAlert('success', `Pengiriman #${deliveryId} berhasil diselesaikan`);
    }
}

function trackDelivery(deliveryId) {
    showAlert('info', `Melacak pengiriman #${deliveryId}`);
}

function startDelivery(deliveryId) {
    if (confirm('Mulai pengiriman sekarang?')) {
        showAlert('success', `Pengiriman #${deliveryId} dimulai`);
    }
}

function editDelivery(deliveryId) {
    showAlert('info', `Mengedit pengiriman #${deliveryId}`);
}

// Reports Functions
function generateReport() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        showAlert('error', 'Silakan pilih rentang tanggal');
        return;
    }
    
    showAlert('success', `Laporan berhasil dibuat untuk periode ${startDate} sampai ${endDate}`);
}

function downloadSalesReport() {
    showAlert('success', 'Laporan penjualan berhasil diunduh');
}

function downloadStockReport() {
    showAlert('success', 'Laporan stok berhasil diunduh');
}

// Form Handling
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const modalId = form.closest('.modal').id;
    
    // Simulate form processing
    setTimeout(() => {
        closeModal(modalId);
        
        if (modalId === 'addProductModal') {
            showAlert('success', 'Produk baru berhasil ditambahkan');
        } else if (modalId === 'addStockModal') {
            showAlert('success', 'Stok berhasil ditambahkan');
        }
        
        form.reset();
    }, 1000);
}

function handleSettingsSubmission(form) {
    // Simulate settings save
    setTimeout(() => {
        showAlert('success', 'Pengaturan berhasil disimpan');
    }, 1000);
}

// Utility Functions
function getStatusText(status) {
    const statusTexts = {
        'pending': 'Menunggu',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'delivered': 'Terkirim',
        'cancelled': 'Dibatalkan'
    };
    return statusTexts[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showAlert(type, message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    // Insert at top of main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alert, mainContent.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
    
    // Scroll to top to show alert
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Real-time Updates (simulate)
function startRealTimeUpdates() {
    setInterval(() => {
        // Update stats randomly
        updateStats();
    }, 30000); // Update every 30 seconds
}

function updateStats() {
    // Simulate real-time stat updates
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (stat.textContent.includes('Rp')) {
            // Update revenue
            const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 100000);
            stat.textContent = `Rp ${newValue.toLocaleString('id-ID')}`;
        } else if (!stat.textContent.includes('lembar')) {
            // Update order count
            const currentValue = parseInt(stat.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3);
            stat.textContent = newValue.toString();
        }
    });
}

// Initialize real-time updates
document.addEventListener('DOMContentLoaded', function() {
    startRealTimeUpdates();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + number keys for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        const sections = ['dashboard', 'orders', 'products', 'customers', 'inventory', 'delivery', 'reports', 'settings'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            showSection(sections[sectionIndex]);
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector(`[data-section="${sections[sectionIndex]}"]`).classList.add('active');
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Print functionality
function printReport() {
    window.print();
}

// Export to CSV
function exportToCSV(data, filename) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function convertToCSV(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
}