<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$dbname = 'northwinddaun';
$username = 'root';
$password = '';

// Create users table if it doesn't exist
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    
    // Insert default admin user if not exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = 'admin'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $defaultPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES ('admin', ?)");
        $stmt->execute([$defaultPassword]);
    }
} catch(PDOException $e) {
    error_log("Error creating users table: " . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Handle API requests
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['REQUEST_URI'],'/'));
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Remove any prefix from the request path (like 'jualan_daun_pisang/api.php')
    while(count($request) > 0 && $request[0] != 'api.php') {
        array_shift($request);
    }
    array_shift($request); // remove 'api.php'

    // Handle authentication
    if (isset($request[0]) && $request[0] === 'auth') {
        if ($method === 'POST' && $input) {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$input['username']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($input['password'], $user['password'])) {
                // Generate a simple token (in production, use proper JWT)
                $token = bin2hex(random_bytes(32));
                echo json_encode([
                    'success' => true,
                    'token' => $token,
                    'message' => 'Login successful'
                ]);
                exit;
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ]);
                exit;
            }
        }
        return;
    }
    
    // Get the resource type (table name)
    $resource = isset($request[0]) ? $request[0] : null;
    $id = isset($request[1]) ? $request[1] : null;
    
    // Basic routing
    switch($method) {
        case 'GET':
            if ($resource && $id) {
                // Get single record
                $stmt = $pdo->prepare("SELECT * FROM $resource WHERE id = ?");
                $stmt->execute([$id]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
            } else if ($resource) {
                // Get all records
                $stmt = $pdo->prepare("SELECT * FROM $resource");
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode(['records' => $result]);
            break;
            
        case 'POST':
            if ($resource && $input) {
                $fields = implode(',', array_keys($input));
                $values = implode(',', array_fill(0, count($input), '?'));
                $stmt = $pdo->prepare("INSERT INTO $resource ($fields) VALUES ($values)");
                $stmt->execute(array_values($input));
                $result = ['id' => $pdo->lastInsertId()];
                echo json_encode($result);
            }
            break;
            
        case 'PUT':
            if ($resource && $id && $input) {
                $fields = array_map(function($item) {
                    return "$item=?";
                }, array_keys($input));
                $stmt = $pdo->prepare("UPDATE $resource SET " . implode(',', $fields) . " WHERE id=?");
                $values = array_values($input);
                $values[] = $id;
                $stmt->execute($values);
                echo json_encode(['affected' => $stmt->rowCount()]);
            }
            break;
            
        case 'DELETE':
            if ($resource && $id) {
                $stmt = $pdo->prepare("DELETE FROM $resource WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['affected' => $stmt->rowCount()]);
            }
            break;
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
