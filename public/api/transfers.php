<?php
/**
 * Transfers API - Phuket Gevalin
 * Airport transfers and private car services
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
                    ? "SELECT * FROM transfers WHERE id = ?"
                    : "SELECT * FROM transfers WHERE id = ? AND status = 'active'";
                $transfer = $db->fetchOne($sql, [(int)$id]);

                if ($transfer) {
                    successResponse($transfer);
                } else {
                    errorResponse('Transfer not found', 404);
                }
            } else {
                $type = $_GET['type'] ?? null; // airport, private, hourly
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM transfers";
                $params = [];
                $conditions = [];

                if (!$showAll) {
                    $conditions[] = "status = 'active'";
                }

                if ($type) {
                    $conditions[] = "type = ?";
                    $params[] = $type;
                }

                if (!empty($conditions)) {
                    $sql .= " WHERE " . implode(" AND ", $conditions);
                }

                $sql .= " ORDER BY type, price ASC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;

                $transfers = $db->fetchAll($sql, $params);
                successResponse($transfers);
            }
            break;

        case 'POST':
            $data = getJsonInput();

            $required = ['name_th', 'name_en', 'type', 'price', 'vehicle_type', 'max_passengers'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO transfers (name_th, name_en, description_th, description_en, type, price, vehicle_type, max_passengers, image, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['type']),
                    (float)$data['price'],
                    sanitize($data['vehicle_type']),
                    (int)$data['max_passengers'],
                    sanitize($data['image'] ?? '')
                ]
            );

            successResponse(['id' => $id], 'Transfer created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Transfer ID is required');
            }

            $db->execute(
                "UPDATE transfers SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    description_th = COALESCE(?, description_th),
                    description_en = COALESCE(?, description_en),
                    type = COALESCE(?, type),
                    price = COALESCE(?, price),
                    vehicle_type = COALESCE(?, vehicle_type),
                    max_passengers = COALESCE(?, max_passengers),
                    image = COALESCE(?, image),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['name_th'] ?? null,
                    $data['name_en'] ?? null,
                    $data['description_th'] ?? null,
                    $data['description_en'] ?? null,
                    $data['type'] ?? null,
                    $data['price'] ?? null,
                    $data['vehicle_type'] ?? null,
                    $data['max_passengers'] ?? null,
                    $data['image'] ?? null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );

            successResponse(null, 'Transfer updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Transfer ID is required');
            }

            $db->execute(
                "UPDATE transfers SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Transfer deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Transfers API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
