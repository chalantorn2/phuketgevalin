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

            if ($id) {
                $transfer = $db->fetchOne(
                    "SELECT * FROM transfers WHERE id = ? AND status = 'active'",
                    [(int)$id]
                );

                if ($transfer) {
                    successResponse($transfer);
                } else {
                    errorResponse('Transfer not found', 404);
                }
            } else {
                $type = $_GET['type'] ?? null; // airport, private, hourly
                $limit = (int)($_GET['limit'] ?? 20);
                $offset = (int)($_GET['offset'] ?? 0);

                $sql = "SELECT * FROM transfers WHERE status = 'active'";
                $params = [];

                if ($type) {
                    $sql .= " AND type = ?";
                    $params[] = $type;
                }

                $sql .= " ORDER BY price ASC LIMIT ? OFFSET ?";
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

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Transfers API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
