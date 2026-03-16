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
                    // Parse gallery JSON
                    if (isset($hotel['gallery']) && is_string($hotel['gallery'])) {
                        $hotel['gallery'] = json_decode($hotel['gallery'], true) ?: [];
                    }
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

                $sql .= " ORDER BY stars DESC, rating DESC, created_at DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $hotels = $db->fetchAll($sql, $params);

                // Parse gallery JSON for each hotel
                foreach ($hotels as &$hotel) {
                    if (isset($hotel['gallery']) && is_string($hotel['gallery'])) {
                        $hotel['gallery'] = json_decode($hotel['gallery'], true) ?: [];
                    }
                }

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

            // Prepare gallery JSON
            $gallery = null;
            if (isset($data['gallery']) && is_array($data['gallery'])) {
                $gallery = json_encode($data['gallery'], JSON_UNESCAPED_UNICODE);
            }

            $id = $db->insert(
                "INSERT INTO hotels (name_th, name_en, description_th, description_en, location, address, price_per_night, rating, stars, reviews, image, gallery, amenities, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location']),
                    sanitize($data['address'] ?? ''),
                    (float)$data['price_per_night'],
                    (float)($data['rating'] ?? 4.0),
                    (int)($data['stars'] ?? 4),
                    (int)($data['reviews'] ?? 0),
                    sanitize($data['image'] ?? ''),
                    $gallery,
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

            // Build dynamic update query
            $fields = [];
            $params = [];

            $allowedFields = [
                'name_th', 'name_en', 'description_th', 'description_en',
                'location', 'address', 'price_per_night', 'rating', 'stars', 'reviews',
                'image', 'gallery', 'amenities', 'status'
            ];

            $numericFields = ['price_per_night', 'rating', 'stars', 'reviews'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $fields[] = "$field = ?";

                    if ($field === 'gallery' && is_array($data[$field])) {
                        $params[] = json_encode($data[$field], JSON_UNESCAPED_UNICODE);
                    } elseif (in_array($field, $numericFields)) {
                        if (in_array($field, ['price_per_night', 'rating'])) {
                            $params[] = (float)$data[$field];
                        } else {
                            $params[] = (int)$data[$field];
                        }
                    } else {
                        $params[] = sanitize($data[$field]);
                    }
                }
            }

            if (empty($fields)) {
                errorResponse('No fields to update');
            }

            $fields[] = "updated_at = NOW()";
            $params[] = (int)$id;

            $db->execute(
                "UPDATE hotels SET " . implode(', ', $fields) . " WHERE id = ?",
                $params
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
