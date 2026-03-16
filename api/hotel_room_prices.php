<?php
/**
 * Hotel Room Prices API - Phuket Gevalin
 * จัดการราคาห้องพักตามช่วงวันที่
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

            if ($id) {
                $sql = "SELECT p.*, rt.name_th as room_name_th, rt.name_en as room_name_en,
                        pd.start_date, pd.end_date
                        FROM hotel_room_prices p
                        LEFT JOIN hotel_room_types rt ON p.room_type_id = rt.id
                        LEFT JOIN hotel_periods pd ON p.period_id = pd.id
                        WHERE p.id = ?";
                $price = $db->fetchOne($sql, [(int)$id]);
                if ($price) {
                    successResponse($price);
                } else {
                    errorResponse('Price not found', 404);
                }
            } elseif ($hotelId) {
                // Get price table for hotel (all room types x all periods)
                $sql = "SELECT p.*, rt.name_th as room_name_th, rt.name_en as room_name_en, rt.sort_order as room_sort,
                        pd.start_date, pd.end_date, pd.sort_order as period_sort
                        FROM hotel_room_prices p
                        LEFT JOIN hotel_room_types rt ON p.room_type_id = rt.id
                        LEFT JOIN hotel_periods pd ON p.period_id = pd.id
                        WHERE p.hotel_id = ?
                        ORDER BY rt.sort_order ASC, pd.sort_order ASC";
                $prices = $db->fetchAll($sql, [(int)$hotelId]);
                successResponse($prices);
            } else {
                errorResponse('hotel_id is required');
            }
            break;

        case 'POST':
            $data = getJsonInput();
            $required = ['hotel_id', 'room_type_id', 'period_id', 'price'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || $data[$field] === '') {
                    errorResponse("Field '$field' is required");
                }
            }

            // Check if already exists
            $existing = $db->fetchOne(
                "SELECT id FROM hotel_room_prices WHERE hotel_id = ? AND room_type_id = ? AND period_id = ?",
                [(int)$data['hotel_id'], (int)$data['room_type_id'], (int)$data['period_id']]
            );

            if ($existing) {
                // Update existing
                $db->execute(
                    "UPDATE hotel_room_prices SET price = ?, updated_at = NOW() WHERE id = ?",
                    [(float)$data['price'], (int)$existing['id']]
                );
                successResponse(['id' => $existing['id']], 'Price updated successfully');
            } else {
                // Insert new
                $id = $db->insert(
                    "INSERT INTO hotel_room_prices (hotel_id, room_type_id, period_id, price, created_at)
                     VALUES (?, ?, ?, ?, NOW())",
                    [
                        (int)$data['hotel_id'],
                        (int)$data['room_type_id'],
                        (int)$data['period_id'],
                        (float)$data['price']
                    ]
                );
                successResponse(['id' => $id], 'Price created successfully');
            }
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;
            if (!$id) errorResponse('Price ID is required');

            $db->execute(
                "UPDATE hotel_room_prices SET
                    price = COALESCE(?, price),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    isset($data['price']) ? (float)$data['price'] : null,
                    (int)$id
                ]
            );
            successResponse(null, 'Price updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) errorResponse('Price ID is required');
            $db->execute("DELETE FROM hotel_room_prices WHERE id = ?", [(int)$id]);
            successResponse(null, 'Price deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Hotel Room Prices API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
