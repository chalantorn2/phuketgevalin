<?php
/**
 * API Router - Phuket Gevalin
 */

require_once __DIR__ . '/config.php';

// Set CORS headers
setCorsHeaders();

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['_route'] ?? '';

// Test endpoint
if ($path === 'test' || $path === '') {
    try {
        $db = Database::getInstance();
        $conn = $db->getConnection();

        successResponse([
            'status' => 'connected',
            'server' => 'Phuket Gevalin API',
            'version' => '1.0.0',
            'php_version' => PHP_VERSION,
            'database' => 'Connected',
            'timestamp' => date('Y-m-d H:i:s')
        ], 'API is working!');
    } catch (Exception $e) {
        errorResponse('Database connection failed: ' . $e->getMessage(), 500);
    }
}

// Route to appropriate handler
switch ($path) {
    case 'tours':
        require_once __DIR__ . '/tours.php';
        break;

    case 'bookings':
        require_once __DIR__ . '/bookings.php';
        break;

    case 'contact':
        require_once __DIR__ . '/contact.php';
        break;

    case 'hotels':
        require_once __DIR__ . '/hotels.php';
        break;

    case 'transfers':
        require_once __DIR__ . '/transfers.php';
        break;

    case 'auth':
        require_once __DIR__ . '/auth.php';
        break;

    case 'admin':
        require_once __DIR__ . '/admin.php';
        break;

    default:
        errorResponse('Endpoint not found', 404);
}
