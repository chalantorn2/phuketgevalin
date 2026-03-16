<?php
/**
 * Hotel Periods API - Phuket Gevalin
 * จัดการช่วงวันที่ราคาของโรงแรม
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
                $sql = "SELECT * FROM hotel_periods WHERE id = ?";
                if (!$showAll) $sql .= " AND status = 'active'";
                $period = $db->fetchOne($sql, [(int)$id]);
                if ($period) {
                    successResponse($period);
                } else {
                    errorResponse('Period not found', 404);
                }
            } elseif ($hotelId) {
                $sql = "SELECT * FROM hotel_periods WHERE hotel_id = ?";
                if (!$showAll) $sql .= " AND status = 'active'";
                $sql .= " ORDER BY sort_order ASC, start_date ASC";
                $periods = $db->fetchAll($sql, [(int)$hotelId]);
                successResponse($periods);
            } else {
                errorResponse('hotel_id is required');
            }
            break;

        case 'POST':
            $data = getJsonInput();
            $required = ['hotel_id', 'start_date', 'end_date'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            $id = $db->insert(
                "INSERT INTO hotel_periods (hotel_id, start_date, end_date, sort_order, status, created_at)
                 VALUES (?, ?, ?, ?, 'active', NOW())",
                [
                    (int)$data['hotel_id'],
                    $data['start_date'],
                    $data['end_date'],
                    (int)($data['sort_order'] ?? 0)
                ]
            );
            successResponse(['id' => $id], 'Period created successfully');
            break;

        case 'PUT':
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;
            if (!$id) errorResponse('Period ID is required');

            $db->execute(
                "UPDATE hotel_periods SET
                    start_date = COALESCE(?, start_date),
                    end_date = COALESCE(?, end_date),
                    sort_order = COALESCE(?, sort_order),
                    status = COALESCE(?, status),
                    updated_at = NOW()
                 WHERE id = ?",
                [
                    $data['start_date'] ?? null,
                    $data['end_date'] ?? null,
                    isset($data['sort_order']) ? (int)$data['sort_order'] : null,
                    $data['status'] ?? null,
                    (int)$id
                ]
            );
            successResponse(null, 'Period updated successfully');
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) errorResponse('Period ID is required');
            $db->execute("DELETE FROM hotel_periods WHERE id = ?", [(int)$id]);
            successResponse(null, 'Period deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Hotel Periods API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
