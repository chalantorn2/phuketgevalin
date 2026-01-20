<?php
/**
 * One Day Trips API - Phuket Gevalin
 * CRUD operations for One Day Trip tours
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            // Get trip by ID or list all trips
            $id = $_GET['id'] ?? null;

            if ($id) {
                // Get single trip with all details
                $trip = $db->fetchOne(
                    "SELECT * FROM oneday_trips WHERE id = ?",
                    [(int)$id]
                );

                if ($trip) {
                    // Parse JSON fields
                    $jsonFields = ['gallery', 'tags_th', 'tags_en', 'highlights_th', 'highlights_en',
                                   'itinerary', 'included_th', 'included_en', 'excluded_th', 'excluded_en'];
                    foreach ($jsonFields as $field) {
                        if (isset($trip[$field]) && is_string($trip[$field])) {
                            $trip[$field] = json_decode($trip[$field], true);
                        }
                    }
                    successResponse($trip);
                } else {
                    errorResponse('Trip not found', 404);
                }
            } else {
                // List all trips
                $showAll = isset($_GET['all']) && $_GET['all'] === 'true';
                $province = $_GET['province'] ?? null;

                $sql = "SELECT * FROM oneday_trips";
                $params = [];
                $conditions = [];

                if (!$showAll) {
                    $conditions[] = "status = 'active'";
                }

                if ($province && $province !== 'all') {
                    $conditions[] = "province_key = ?";
                    $params[] = $province;
                }

                if (!empty($conditions)) {
                    $sql .= " WHERE " . implode(' AND ', $conditions);
                }

                $sql .= " ORDER BY sort_order ASC, created_at DESC";

                $trips = $db->fetchAll($sql, $params);

                // Parse JSON fields for each trip
                $jsonFields = ['gallery', 'tags_th', 'tags_en', 'highlights_th', 'highlights_en',
                               'itinerary', 'included_th', 'included_en', 'excluded_th', 'excluded_en'];
                foreach ($trips as &$trip) {
                    foreach ($jsonFields as $field) {
                        if (isset($trip[$field]) && is_string($trip[$field])) {
                            $trip[$field] = json_decode($trip[$field], true);
                        }
                    }
                }

                successResponse($trips);
            }
            break;

        case 'POST':
            // Create new trip (admin only)
            $data = getJsonInput();

            $required = ['title_th', 'title_en', 'price'];
            foreach ($required as $field) {
                if (empty($data[$field]) && $data[$field] !== 0) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Get max sort order
            $maxOrder = $db->fetchOne("SELECT MAX(sort_order) as max_order FROM oneday_trips");
            $sortOrder = ($maxOrder['max_order'] ?? 0) + 1;

            // Prepare JSON fields
            $jsonFields = ['gallery', 'tags_th', 'tags_en', 'highlights_th', 'highlights_en',
                           'itinerary', 'included_th', 'included_en', 'excluded_th', 'excluded_en'];
            foreach ($jsonFields as $field) {
                if (isset($data[$field]) && is_array($data[$field])) {
                    $data[$field] = json_encode($data[$field], JSON_UNESCAPED_UNICODE);
                }
            }

            $id = $db->insert(
                "INSERT INTO oneday_trips (
                    title_th, title_en, description_th, description_en,
                    location_th, location_en, province_key,
                    duration_th, duration_en, price, discount_price,
                    image, gallery, rating, reviews, bestseller,
                    tags_th, tags_en, highlights_th, highlights_en,
                    itinerary, included_th, included_en, excluded_th, excluded_en,
                    meeting_point_th, meeting_point_en, important_info_th, important_info_en,
                    sort_order, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
                [
                    sanitize($data['title_th']),
                    sanitize($data['title_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location_th'] ?? ''),
                    sanitize($data['location_en'] ?? ''),
                    sanitize($data['province_key'] ?? 'phuket'),
                    sanitize($data['duration_th'] ?? ''),
                    sanitize($data['duration_en'] ?? ''),
                    (float)$data['price'],
                    $data['discount_price'] ? (float)$data['discount_price'] : null,
                    sanitize($data['image'] ?? ''),
                    $data['gallery'] ?? null,
                    (float)($data['rating'] ?? 4.5),
                    (int)($data['reviews'] ?? 0),
                    (int)($data['bestseller'] ?? 0),
                    $data['tags_th'] ?? null,
                    $data['tags_en'] ?? null,
                    $data['highlights_th'] ?? null,
                    $data['highlights_en'] ?? null,
                    $data['itinerary'] ?? null,
                    $data['included_th'] ?? null,
                    $data['included_en'] ?? null,
                    $data['excluded_th'] ?? null,
                    $data['excluded_en'] ?? null,
                    sanitize($data['meeting_point_th'] ?? ''),
                    sanitize($data['meeting_point_en'] ?? ''),
                    sanitize($data['important_info_th'] ?? ''),
                    sanitize($data['important_info_en'] ?? ''),
                    (int)($data['sort_order'] ?? $sortOrder),
                    $data['status'] ?? 'active'
                ]
            );

            successResponse(['id' => $id], 'Trip created successfully');
            break;

        case 'PUT':
            // Update trip
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Trip ID is required');
            }

            // Build update query dynamically
            $fields = [];
            $params = [];

            $allowedFields = [
                'title_th', 'title_en', 'description_th', 'description_en',
                'location_th', 'location_en', 'province_key',
                'duration_th', 'duration_en', 'price', 'discount_price',
                'image', 'gallery', 'rating', 'reviews', 'bestseller',
                'tags_th', 'tags_en', 'highlights_th', 'highlights_en',
                'itinerary', 'included_th', 'included_en', 'excluded_th', 'excluded_en',
                'meeting_point_th', 'meeting_point_en', 'important_info_th', 'important_info_en',
                'sort_order', 'status'
            ];

            $jsonFields = ['gallery', 'tags_th', 'tags_en', 'highlights_th', 'highlights_en',
                           'itinerary', 'included_th', 'included_en', 'excluded_th', 'excluded_en'];

            $numericFields = ['price', 'discount_price', 'rating', 'reviews', 'bestseller', 'sort_order'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $fields[] = "$field = ?";

                    if (in_array($field, $jsonFields) && is_array($data[$field])) {
                        $params[] = json_encode($data[$field], JSON_UNESCAPED_UNICODE);
                    } elseif (in_array($field, $numericFields)) {
                        if ($field === 'discount_price' && empty($data[$field])) {
                            $params[] = null;
                        } elseif (in_array($field, ['price', 'rating', 'discount_price'])) {
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
                "UPDATE oneday_trips SET " . implode(', ', $fields) . " WHERE id = ?",
                $params
            );

            successResponse(null, 'Trip updated successfully');
            break;

        case 'DELETE':
            // Delete trip (soft delete by setting status to inactive, or hard delete)
            $id = $_GET['id'] ?? null;
            $hardDelete = isset($_GET['hard']) && $_GET['hard'] === 'true';

            if (!$id) {
                errorResponse('Trip ID is required');
            }

            if ($hardDelete) {
                $db->execute("DELETE FROM oneday_trips WHERE id = ?", [(int)$id]);
                successResponse(null, 'Trip permanently deleted');
            } else {
                $db->execute(
                    "UPDATE oneday_trips SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                    [(int)$id]
                );
                successResponse(null, 'Trip deleted successfully');
            }
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("One Day Trips API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
