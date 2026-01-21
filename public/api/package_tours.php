<?php
/**
 * Package Tours API - Phuket Gevalin
 * CRUD operations for Package Tours
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            // Get package tour by ID or list all package tours
            $id = $_GET['id'] ?? null;
            $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

            if ($id) {
                // Get single package tour with all details
                $sql = $showAll
                    ? "SELECT * FROM package_tours WHERE id = ?"
                    : "SELECT * FROM package_tours WHERE id = ? AND status = 'active'";
                $packageTour = $db->fetchOne($sql, [(int)$id]);

                if ($packageTour) {
                    // Parse JSON fields
                    $jsonFields = ['gallery', 'itinerary', 'included', 'excluded'];
                    foreach ($jsonFields as $field) {
                        if (isset($packageTour[$field]) && is_string($packageTour[$field])) {
                            $packageTour[$field] = json_decode($packageTour[$field], true);
                        }
                    }
                    successResponse($packageTour);
                } else {
                    errorResponse('Package tour not found', 404);
                }
            } else {
                // List all package tours with optional filters
                $category = $_GET['category'] ?? null;
                $limit = (int)($_GET['limit'] ?? 50);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM package_tours";
                $params = [];
                $conditions = [];

                if (!$showAll) {
                    $conditions[] = "status = 'active'";
                }

                if ($category && $category !== 'all') {
                    $conditions[] = "category = ?";
                    $params[] = $category;
                }

                if (!empty($conditions)) {
                    $sql .= " WHERE " . implode(" AND ", $conditions);
                }

                $sql .= " ORDER BY id DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $packageTours = $db->fetchAll($sql, $params);

                // Parse JSON fields for each tour
                $jsonFields = ['gallery', 'itinerary', 'included', 'excluded'];
                foreach ($packageTours as &$tour) {
                    foreach ($jsonFields as $field) {
                        if (isset($tour[$field]) && is_string($tour[$field])) {
                            $tour[$field] = json_decode($tour[$field], true);
                        }
                    }
                }

                // Get total count
                $countSql = "SELECT COUNT(*) as total FROM package_tours";
                $countParams = [];
                $countConditions = [];

                if (!$showAll) {
                    $countConditions[] = "status = 'active'";
                }
                if ($category && $category !== 'all') {
                    $countConditions[] = "category = ?";
                    $countParams[] = $category;
                }
                if (!empty($countConditions)) {
                    $countSql .= " WHERE " . implode(" AND ", $countConditions);
                }
                $total = $db->fetchOne($countSql, $countParams);

                successResponse([
                    'package_tours' => $packageTours,
                    'total' => $total['total'] ?? 0,
                    'limit' => $limit,
                    'offset' => $offset
                ]);
            }
            break;

        case 'POST':
            // Create new package tour (admin only)
            $data = getJsonInput();

            $required = ['name_th', 'name_en', 'price'];
            foreach ($required as $field) {
                if (empty($data[$field]) && $data[$field] !== 0) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Prepare JSON fields
            $jsonFields = ['gallery', 'itinerary', 'included', 'excluded'];
            foreach ($jsonFields as $field) {
                if (isset($data[$field]) && is_array($data[$field])) {
                    $data[$field] = json_encode($data[$field], JSON_UNESCAPED_UNICODE);
                }
            }

            $id = $db->insert(
                "INSERT INTO package_tours (
                    name_th, name_en, description_th, description_en,
                    location, duration,
                    price, discount_price,
                    image, gallery, rating, reviews,
                    highlights, itinerary, included, excluded,
                    category, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location'] ?? ''),
                    sanitize($data['duration'] ?? ''),
                    (float)$data['price'],
                    $data['discount_price'] ? (float)$data['discount_price'] : null,
                    sanitize($data['image'] ?? ''),
                    $data['gallery'] ?? null,
                    (float)($data['rating'] ?? 4.5),
                    (int)($data['reviews'] ?? 0),
                    sanitize($data['highlights'] ?? ''),
                    $data['itinerary'] ?? null,
                    $data['included'] ?? null,
                    $data['excluded'] ?? null,
                    sanitize($data['category'] ?? 'package'),
                    $data['status'] ?? 'active'
                ]
            );

            successResponse(['id' => $id], 'Package tour created successfully');
            break;

        case 'PUT':
            // Update package tour
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Package tour ID is required');
            }

            // Build update query dynamically
            $fields = [];
            $params = [];

            $allowedFields = [
                'name_th', 'name_en', 'description_th', 'description_en',
                'location', 'duration',
                'price', 'discount_price',
                'image', 'gallery', 'rating', 'reviews',
                'highlights', 'itinerary', 'included', 'excluded',
                'category', 'status'
            ];

            $jsonFields = ['gallery', 'itinerary', 'included', 'excluded'];
            $numericFields = ['price', 'discount_price', 'rating', 'reviews'];

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
                "UPDATE package_tours SET " . implode(', ', $fields) . " WHERE id = ?",
                $params
            );

            successResponse(null, 'Package tour updated successfully');
            break;

        case 'DELETE':
            // Soft delete package tour
            $id = $_GET['id'] ?? null;
            $hardDelete = isset($_GET['hard']) && $_GET['hard'] === 'true';

            if (!$id) {
                errorResponse('Package tour ID is required');
            }

            if ($hardDelete) {
                $db->execute("DELETE FROM package_tours WHERE id = ?", [(int)$id]);
                successResponse(null, 'Package tour permanently deleted');
            } else {
                $db->execute(
                    "UPDATE package_tours SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                    [(int)$id]
                );
                successResponse(null, 'Package tour deleted successfully');
            }
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Package Tours API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
