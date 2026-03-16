<?php
/**
 * Transfer Locations API - Phuket Gevalin
 * จัดการสถานที่รับ-ส่ง
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
                    ? "SELECT * FROM transfer_locations WHERE id = ?"
                    : "SELECT * FROM transfer_locations WHERE id = ? AND status = 'active'";
                $location = $db->fetchOne($sql, [(int)$id]);

                if ($location) {
                    successResponse($location);
                } else {
                    errorResponse('Location not found', 404);
                }
            } else {
                $sql = "SELECT * FROM transfer_locations";
                $params = [];

                if (!$showAll) {
                    $sql .= " WHERE status = 'active'";
                }

                $sql .= " ORDER BY sort_order ASC, name_en ASC";

                $locations = $db->fetchAll($sql, $params);
                successResponse($locations);
            }
            break;

        case 'POST':
            $data = getJsonInput();

            $required = ['name_th', 'name_en'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO transfer_locations (name_th, name_en, type, province, sort_order, status, created_at)
                 VALUES (?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['type'] ?? 'other'),
                    sanitize($data['province'] ?? ''),
                    (int)($data['sort_order'] ?? 0)
                ]
            );

            successResponse(['id' => $id], 'Location created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Location ID is required');
            }

            $db->execute(
                "UPDATE transfer_locations SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    type = COALESCE(?, type),
                    province = COALESCE(?, province),
                    sort_order = COALESCE(?, sort_order),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['name_th'] ?? null,
                    $data['name_en'] ?? null,
                    $data['type'] ?? null,
                    $data['province'] ?? null,
                    isset($data['sort_order']) ? (int)$data['sort_order'] : null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Location updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Location ID is required');
            }

            // Soft delete
            $db->execute(
                "UPDATE transfer_locations SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Location deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Transfer Locations API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
