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
    case 'package_tours':
        require_once __DIR__ . '/package_tours.php';
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

    case 'hotel_room_types':
        require_once __DIR__ . '/hotel_room_types.php';
        break;

    case 'hotel_periods':
        require_once __DIR__ . '/hotel_periods.php';
        break;

    case 'hotel_room_prices':
        require_once __DIR__ . '/hotel_room_prices.php';
        break;

    case 'transfers':
        require_once __DIR__ . '/transfers.php';
        break;

    case 'transfer_locations':
        require_once __DIR__ . '/transfer_locations.php';
        break;

    case 'transfer_routes':
        require_once __DIR__ . '/transfer_routes.php';
        break;

    case 'oneday_trips':
        require_once __DIR__ . '/oneday_trips.php';
        break;

    case 'auth':
        require_once __DIR__ . '/auth.php';
        break;

    case 'admin':
        require_once __DIR__ . '/admin.php';
        break;

    case 'promotions':
        require_once __DIR__ . '/promotions.php';
        break;

    case 'upload':
        require_once __DIR__ . '/upload.php';
        break;

    default:
        errorResponse('Endpoint not found', 404);
}
