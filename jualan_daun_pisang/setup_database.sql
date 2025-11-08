-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS northwinddaun;

-- Use the database
USE northwinddaun;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample products
INSERT INTO products (name, description, price, stock, category) VALUES 
('Daun Pisang Besar', 'Daun pisang ukuran besar, cocok untuk acara besar', 1000.00, 100, 'Daun Pisang'),
('Daun Pisang Sedang', 'Daun pisang ukuran sedang, ideal untuk keperluan rumah tangga', 700.00, 150, 'Daun Pisang'),
('Daun Pisang Kecil', 'Daun pisang ukuran kecil, pas untuk wadah makanan', 500.00, 200, 'Daun Pisang'),
('Paket Daun Pisang Premium', 'Paket berisi 50 lembar daun pisang pilihan', 45000.00, 20, 'Paket');

-- Insert sample customers
INSERT INTO customers (name, email, phone, address) VALUES
('Sari Wulandari', 'sari@email.com', '+62812-1111-1111', 'Jl. Pemuda No. 15, Semarang'),
('Budi Santoso', 'budi@email.com', '+62812-2222-2222', 'Jl. Diponegoro No. 88, Semarang'),
('Maya Indira', 'maya@email.com', '+62812-3333-3333', 'Jl. Pandanaran No. 45, Semarang');