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

-- Insert sample products
INSERT INTO products (name, description, price, stock, category) VALUES 
('Daun Pisang Besar', 'Daun pisang ukuran besar, cocok untuk acara besar', 1000.00, 100, 'Daun Pisang'),
('Daun Pisang Sedang', 'Daun pisang ukuran sedang, ideal untuk keperluan rumah tangga', 700.00, 150, 'Daun Pisang'),
('Daun Pisang Kecil', 'Daun pisang ukuran kecil, pas untuk wadah makanan', 500.00, 200, 'Daun Pisang');