<?php
/**
 * Hotel Room Types API - Phuket Gevalin
 * จัดการประเภทห้องพักของโรงแรม
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            $hotelId = $_GET['hotel_id'] ?? null;
            $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

            if ($id) {
                $sql = "SELECT * FROM hotel_room_types WHERE id = ?";
                if (!$showAll) $sql .= " AND status = 'active'";
                $roomType = $db->fetchOne($sql, [(int)$id]);
                if ($roomType) {
                    successResponse($roomType);
                } else {
                    errorResponse('Room type not found', 404);
                }
            } elseif ($hotelId) {
                $sql = "SELECT * FROM hotel_room_types WHERE hotel_id = ?";
                if (!$showAll) $sql .= " AND status = 'active'";
                $sql .= " ORDER BY sort_order ASC";
                $roomTypes = $db->fetchAll($sql, [(int)$hotelId]);
                successResponse($roomTypes);
            } else {
                errorResponse('hotel_id is required');
            }
            break;

        case 'POST':
            $data = getJsonInput();
            $required = ['hotel_id', 'name_th', 'name_en'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO hotel_room_types (hotel_id, name_th, name_en, description_th, description_en, max_guests, sort_order, status, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW())",
                [
                    (int)$data['hotel_id'],
                    sanitize($data['name_th']),
                    sanitize($data['name_en']),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    (int)($data['max_guests'] ?? 2),
                    (int)($data['sort_order'] ?? 0)
                ]
            );
            successResponse(['id' => $id], 'Room type created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;
            if (!$id) errorResponse('Room type ID is required');

            $db->execute(
                "UPDATE hotel_room_types SET
                    name_th = COALESCE(?, name_th),
                    name_en = COALESCE(?, name_en),
                    description_th = COALESCE(?, description_th),
                    description_en = COALESCE(?, description_en),
                    max_guests = COALESCE(?, max_guests),
                    sort_order = COALESCE(?, sort_order),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['name_th'] ?? null,
                    $data['name_en'] ?? null,
                    $data['description_th'] ?? null,
                    $data['description_en'] ?? null,
                    isset($data['max_guests']) ? (int)$data['max_guests'] : null,
                    isset($data['sort_order']) ? (int)$data['sort_order'] : null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );
            successResponse(null, 'Room type updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) errorResponse('Room type ID is required');
            $db->execute("DELETE FROM hotel_room_types WHERE id = ?", [(int)$id]);
            successResponse(null, 'Room type deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Hotel Room Types API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
