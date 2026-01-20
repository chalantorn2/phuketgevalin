<?php
/**
 * Package Tours API - Phuket Gevalin
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
                // Get single package tour
                $sql = $showAll
                    ? "SELECT * FROM package_tours WHERE id = ?"
                    : "SELECT * FROM package_tours WHERE id = ? AND status = 'active'";
                $packageTour = $db->fetchOne($sql, [(int)$id]);

                if ($packageTour) {
                    successResponse($packageTour);
                } else {
                    errorResponse('Package tour not found', 404);
                }
            } else {
                // List all package tours with optional filters
                $category = $_GET['category'] ?? null;
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM package_tours";
                $params = [];
                $conditions = [];

                if (!$showAll) {
                    $conditions[] = "status = 'active'";
                }

                if ($category) {
                    $conditions[] = "category = ?";
                    $params[] = $category;
                }

                if (!empty($conditions)) {
                    $sql .= " WHERE " . implode(" AND ", $conditions);
                }

                $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $packageTours = $db->fetchAll($sql, $params);

                // Get total count
                $countSql = "SELECT COUNT(*) as total FROM package_tours";
                $countParams = [];
                $countConditions = [];

                if (!$showAll) {
                    $countConditions[] = "status = 'active'";
                }
                if ($category) {
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

            $required = ['name_th', 'name_en', 'price', 'category'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO package_tours (name_th, name_en, description_th, description_en, price, category, image, duration, status, created_at)
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

            successResponse(['id' => $id], 'Package tour created successfully');
            break;

        case 'PUT':
            // Update package tour
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Package tour ID is required');
            }

            $db->execute(
                "UPDATE package_tours SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    description_th = COALESCE(?, description_th),
                    description_en = COALESCE(?, description_en),
                    price = COALESCE(?, price),
                    category = COALESCE(?, category),
                    image = COALESCE(?, image),
                    duration = COALESCE(?, duration),
                    status = COALESCE(?, status),
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
                    $data['status'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Package tour updated successfully');
            break;

        case 'DELETE':
            // Soft delete package tour
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Package tour ID is required');
            }

            $db->execute(
                "UPDATE package_tours SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Package tour deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Package Tours API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
