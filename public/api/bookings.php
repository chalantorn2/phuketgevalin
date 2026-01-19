<?php
/**
 * Bookings API - Phuket Gevalin
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            // Get booking by ID or reference code
            $id = $_GET['id'] ?? null;
            $ref = $_GET['ref'] ?? null;

            if ($id) {
                $booking = $db->fetchOne(
                    "SELECT * FROM bookings WHERE id = ?",
                    [(int)$id]
                );
            } elseif ($ref) {
                $booking = $db->fetchOne(
                    "SELECT * FROM bookings WHERE reference_code = ?",
                    [$ref]
                );
            } else {
                errorResponse('Booking ID or reference code is required');
            }

            if ($booking) {
                successResponse($booking);
            } else {
                errorResponse('Booking not found', 404);
            }
            break;

        case 'POST':
            // Create new booking
            $data = getJsonInput();

            // Validate required fields
            $required = ['service_type', 'service_id', 'customer_name', 'customer_email', 'customer_phone', 'booking_date'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Validate email
            if (!filter_var($data['customer_email'], FILTER_VALIDATE_EMAIL)) {
                errorResponse('Invalid email address');
            }

            // Generate reference code
            $refCode = 'PG' . date('Ymd') . strtoupper(substr(md5(uniqid()), 0, 6));

            // Calculate total price
            $totalPrice = (float)($data['total_price'] ?? 0);

            $id = $db->insert(
                "INSERT INTO bookings (
                    reference_code, service_type, service_id,
                    customer_name, customer_email, customer_phone,
                    booking_date, adults, children, pickup_location, special_requests,
                    total_price, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())",
                [
                    $refCode,
                    sanitize($data['service_type']),
                    (int)$data['service_id'],
                    sanitize($data['customer_name']),
                    sanitize($data['customer_email']),
                    sanitize($data['customer_phone']),
                    $data['booking_date'],
                    (int)($data['adults'] ?? 1),
                    (int)($data['children'] ?? 0),
                    sanitize($data['pickup_location'] ?? ''),
                    sanitize($data['special_requests'] ?? ''),
                    $totalPrice
                ]
            );

            // Send email notification (optional)
            // sendBookingNotification($refCode, $data);

            successResponse([
                'id' => $id,
                'reference_code' => $refCode
            ], 'Booking created successfully');
            break;

        case 'PUT':
            // Update booking status (admin only)
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Booking ID is required');
            }

            $status = $data['status'] ?? null;
            $allowedStatus = ['pending', 'confirmed', 'cancelled', 'completed'];

            if (!in_array($status, $allowedStatus)) {
                errorResponse('Invalid status. Allowed: ' . implode(', ', $allowedStatus));
            }

            $db->execute(
                "UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?",
                [$status, (int)$id]
            );

            successResponse(null, 'Booking updated successfully');
            break;

        case 'DELETE':
            // Cancel booking
            $id = $_GET['id'] ?? null;

            if (!$id) {
                errorResponse('Booking ID is required');
            }

            $db->execute(
                "UPDATE bookings SET status = 'cancelled', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Booking cancelled successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Bookings API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
