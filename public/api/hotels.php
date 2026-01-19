<?php
/**
 * Hotels API - Phuket Gevalin
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;

            if ($id) {
                $hotel = $db->fetchOne(
                    "SELECT * FROM hotels WHERE id = ? AND status = 'active'",
                    [(int)$id]
                );

                if ($hotel) {
                    successResponse($hotel);
                } else {
                    errorResponse('Hotel not found', 404);
                }
            } else {
                $location = $_GET['location'] ?? null;
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM hotels WHERE status = 'active'";
                $params = [];

                if ($location) {
                    $sql .= " AND location = ?";
                    $params[] = $location;
                }

                $sql .= " ORDER BY rating DESC, created_at DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $hotels = $db->fetchAll($sql, $params);
                successResponse($hotels);
            }
            break;

        case 'POST':
            $data = getJsonInput();

            $required = ['name_th', 'name_en', 'location', 'price_per_night'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO hotels (name_th, name_en, description_th, description_en, location, price_per_night, rating, image, amenities, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location']),
                    (float)$data['price_per_night'],
                    (float)($data['rating'] ?? 0),
                    sanitize($data['image'] ?? ''),
                    sanitize($data['amenities'] ?? '')
                ]
            );

            successResponse(['id' => $id], 'Hotel created successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Hotels API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
