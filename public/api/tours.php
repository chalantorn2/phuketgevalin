<?php
/**
 * Tours API - Phuket Gevalin
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            // Get tour by ID or list all tours
            $id = $_GET['id'] ?? null;

            if ($id) {
                // Get single tour
                $tour = $db->fetchOne(
                    "SELECT * FROM tours WHERE id = ? AND status = 'active'",
                    [(int)$id]
                );

                if ($tour) {
                    successResponse($tour);
                } else {
                    errorResponse('Tour not found', 404);
                }
            } else {
                // List all tours with optional filters
                $category = $_GET['category'] ?? null;
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM tours WHERE status = 'active'";
                $params = [];

                if ($category) {
                    $sql .= " AND category = ?";
                    $params[] = $category;
                }

                $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $tours = $db->fetchAll($sql, $params);

                // Get total count
                $countSql = "SELECT COUNT(*) as total FROM tours WHERE status = 'active'";
                $countParams = [];
                if ($category) {
                    $countSql .= " AND category = ?";
                    $countParams[] = $category;
                }
                $total = $db->fetchOne($countSql, $countParams);

                successResponse([
                    'tours' => $tours,
                    'total' => $total['total'] ?? 0,
                    'limit' => $limit,
                    'offset' => $offset
                ]);
            }
            break;

        case 'POST':
            // Create new tour (admin only)
            $data = getJsonInput();

            $required = ['name_th', 'name_en', 'price', 'category'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO tours (name_th, name_en, description_th, description_en, price, category, image, duration, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    (float)$data['price'],
                    sanitize($data['category']),
                    sanitize($data['image'] ?? ''),
                    sanitize($data['duration'] ?? '')
                ]
            );

            successResponse(['id' => $id], 'Tour created successfully');
            break;

        case 'PUT':
            // Update tour
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Tour ID is required');
            }

            $db->execute(
                "UPDATE tours SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    description_th = COALESCE(?, description_th),
                    description_en = COALESCE(?, description_en),
                    price = COALESCE(?, price),
                    category = COALESCE(?, category),
                    image = COALESCE(?, image),
                    duration = COALESCE(?, duration),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['name_th'] ?? null,
                    $data['name_en'] ?? null,
                    $data['description_th'] ?? null,
                    $data['description_en'] ?? null,
                    $data['price'] ?? null,
                    $data['category'] ?? null,
                    $data['image'] ?? null,
                    $data['duration'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Tour updated successfully');
            break;

        case 'DELETE':
            // Soft delete tour
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Tour ID is required');
            }

            $db->execute(
                "UPDATE tours SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Tour deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Tours API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
