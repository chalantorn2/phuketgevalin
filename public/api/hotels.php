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
            $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

            if ($id) {
                $sql = $showAll
                    ? "SELECT * FROM hotels WHERE id = ?"
                    : "SELECT * FROM hotels WHERE id = ? AND status = 'active'";
                $hotel = $db->fetchOne($sql, [(int)$id]);

                if ($hotel) {
                    successResponse($hotel);
                } else {
                    errorResponse('Hotel not found', 404);
                }
            } else {
                $location = $_GET['location'] ?? null;
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM hotels";
                $params = [];
                $conditions = [];

                if (!$showAll) {
                    $conditions[] = "status = 'active'";
                }

                if ($location) {
                    $conditions[] = "location = ?";
                    $params[] = $location;
                }

                if (!empty($conditions)) {
                    $sql .= " WHERE " . implode(" AND ", $conditions);
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
                "INSERT INTO hotels (name_th, name_en, description_th, description_en, location, address, price_per_night, rating, image, amenities, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location']),
                    sanitize($data['address'] ?? ''),
                    (float)$data['price_per_night'],
                    (float)($data['rating'] ?? 0),
                    sanitize($data['image'] ?? ''),
                    sanitize($data['amenities'] ?? '')
                ]
            );

            successResponse(['id' => $id], 'Hotel created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Hotel ID is required');
            }

            $db->execute(
                "UPDATE hotels SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    description_th = COALESCE(?, description_th),
                    description_en = COALESCE(?, description_en),
                    location = COALESCE(?, location),
                    address = COALESCE(?, address),
                    price_per_night = COALESCE(?, price_per_night),
                    rating = COALESCE(?, rating),
                    image = COALESCE(?, image),
                    amenities = COALESCE(?, amenities),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['name_th'] ?? null,
                    $data['name_en'] ?? null,
                    $data['description_th'] ?? null,
                    $data['description_en'] ?? null,
                    $data['location'] ?? null,
                    $data['address'] ?? null,
                    $data['price_per_night'] ?? null,
                    $data['rating'] ?? null,
                    $data['image'] ?? null,
                    $data['amenities'] ?? null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Hotel updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Hotel ID is required');
            }

            $db->execute(
                "UPDATE hotels SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Hotel deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Hotels API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
