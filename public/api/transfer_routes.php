<?php

/**
 * Transfer Routes API - Phuket Gevalin
 * จัดการราคาเส้นทางรับ-ส่ง (ต้นทาง + ปลายทาง + ราคา)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            $fromId = $_GET['from'] ?? null;
            $toId = $_GET['to'] ?? null;
            $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

            if ($id) {
                // Get single route
                $sql = "SELECT r.*,
                        fl.name_th as from_name_th, fl.name_en as from_name_en,
                        tl.name_th as to_name_th, tl.name_en as to_name_en
                        FROM transfer_routes r
                        LEFT JOIN transfer_locations fl ON r.from_location_id = fl.id
                        LEFT JOIN transfer_locations tl ON r.to_location_id = tl.id
                        WHERE r.id = ?";
                if (!$showAll) {
                    $sql .= " AND r.status = 'active'";
                }
                $route = $db->fetchOne($sql, [(int)$id]);

                if ($route) {
                    successResponse($route);
                } else {
                    errorResponse('Route not found', 404);
                }
            } elseif ($fromId && $toId) {
                // Get route between two locations (check both directions)
                $sql = "SELECT r.*,
                        fl.name_th as from_name_th, fl.name_en as from_name_en,
                        tl.name_th as to_name_th, tl.name_en as to_name_en
                        FROM transfer_routes r
                        LEFT JOIN transfer_locations fl ON r.from_location_id = fl.id
                        LEFT JOIN transfer_locations tl ON r.to_location_id = tl.id
                        WHERE ((r.from_location_id = ? AND r.to_location_id = ?)
                           OR (r.from_location_id = ? AND r.to_location_id = ?))";

                $params = [(int)$fromId, (int)$toId, (int)$toId, (int)$fromId];

                if (!$showAll) {
                    $sql .= " AND r.status = 'active'";
                }

                $sql .= " LIMIT 1";

                $route = $db->fetchOne($sql, $params);
                if ($route) {
                    successResponse($route);
                } else {
                    successResponse(null, 'Route not found');
                }
            } else {
                // Get all routes
                $sql = "SELECT r.*,
                        fl.name_th as from_name_th, fl.name_en as from_name_en,
                        tl.name_th as to_name_th, tl.name_en as to_name_en
                        FROM transfer_routes r
                        LEFT JOIN transfer_locations fl ON r.from_location_id = fl.id
                        LEFT JOIN transfer_locations tl ON r.to_location_id = tl.id";

                if (!$showAll) {
                    $sql .= " WHERE r.status = 'active'";
                }

                $sql .= " ORDER BY fl.sort_order ASC, tl.sort_order ASC";

                $routes = $db->fetchAll($sql);
                successResponse($routes);
            }
            break;

        case 'POST':
            $data = getJsonInput();

            $required = ['from_location_id', 'to_location_id', 'price'];
            foreach ($required as $field) {
                if (empty($data[$field]) && $data[$field] !== 0) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Check if route already exists
            $existing = $db->fetchOne(
                "SELECT id FROM transfer_routes
                 WHERE from_location_id = ? AND to_location_id = ?",
                [(int)$data['from_location_id'], (int)$data['to_location_id']]
            );

            if ($existing) {
                errorResponse('This route already exists');
            }

            $id = $db->insert(
                "INSERT INTO transfer_routes (from_location_id, to_location_id, price, duration_minutes, status, created_at)
                 VALUES (?, ?, ?, ?, 'active', NOW())",
                [
                    (int)$data['from_location_id'],
                    (int)$data['to_location_id'],
                    (float)$data['price'],
                    isset($data['duration_minutes']) ? (int)$data['duration_minutes'] : null
                ]
            );

            successResponse(['id' => $id], 'Route created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Route ID is required');
            }

            $db->execute(
                "UPDATE transfer_routes SET
                    from_location_id = COALESCE(?, from_location_id),
                    to_location_id = COALESCE(?, to_location_id),
                    price = COALESCE(?, price),
                    duration_minutes = COALESCE(?, duration_minutes),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    isset($data['from_location_id']) ? (int)$data['from_location_id'] : null,
                    isset($data['to_location_id']) ? (int)$data['to_location_id'] : null,
                    isset($data['price']) ? (float)$data['price'] : null,
                    isset($data['duration_minutes']) ? (int)$data['duration_minutes'] : null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Route updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Route ID is required');
            }

            $db->execute(
                "DELETE FROM transfer_routes WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Route deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Transfer Routes API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
