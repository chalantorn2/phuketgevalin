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
                    booking_date, checkout_date, adults, children,
                    pickup_location, pickup_time, flight_number,
                    special_requests, total_price, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())",
                [
                    $refCode,
                    sanitize($data['service_type']),
                    (int)$data['service_id'],
                    sanitize($data['customer_name']),
                    sanitize($data['customer_email']),
                    sanitize($data['customer_phone']),
                    $data['booking_date'],
                    $data['checkout_date'] ?? null,
                    (int)($data['adults'] ?? 1),
                    (int)($data['children'] ?? 0),
                    sanitize($data['pickup_location'] ?? ''),
                    sanitize($data['pickup_time'] ?? ''),
                    sanitize($data['flight_number'] ?? ''),
                    sanitize($data['special_requests'] ?? ''),
                    $totalPrice
                ]
            );

            // Send email notification
            sendBookingEmail($refCode, $data, $totalPrice);

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

/**
 * Send booking notification email
 */
function sendBookingEmail($refCode, $data, $totalPrice) {
    $to = 'chalantorn.work@gmail.com';
    $subject = "New Booking #{$refCode} - Phuket Gevalin";

    $serviceType = ucfirst(str_replace('_', ' ', $data['service_type'] ?? ''));
    $serviceName = $data['service_name'] ?? $serviceType;
    $customerName = $data['customer_name'] ?? '';
    $customerEmail = $data['customer_email'] ?? '';
    $customerPhone = $data['customer_phone'] ?? '';
    $bookingDate = $data['booking_date'] ?? '';
    $checkoutDate = $data['checkout_date'] ?? '';
    $adults = $data['adults'] ?? 1;
    $children = $data['children'] ?? 0;
    $pickupLocation = $data['pickup_location'] ?? '';
    $pickupTime = $data['pickup_time'] ?? '';
    $flightNumber = $data['flight_number'] ?? '';
    $roomName = $data['room_name'] ?? '';
    $specialRequests = $data['special_requests'] ?? '';

    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0ea5e9, #06b6d4); color: #fff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; }
            .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
            .content { padding: 24px; }
            .ref-code { background: #f0f9ff; border: 2px dashed #0ea5e9; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 20px; }
            .ref-code span { font-size: 28px; font-weight: bold; color: #0369a1; letter-spacing: 3px; }
            table { width: 100%; border-collapse: collapse; }
            table td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
            table td:first-child { color: #888; width: 140px; }
            table td:last-child { font-weight: 600; color: #333; }
            .total { background: #f0f9ff; border-radius: 8px; padding: 16px; text-align: center; margin-top: 20px; }
            .total span { font-size: 24px; font-weight: bold; color: #0369a1; }
            .footer { background: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #999; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Booking Received!</h1>
                <p>Phuket Gevalin Travel</p>
            </div>
            <div class='content'>
                <div class='ref-code'>
                    <p style='margin:0 0 4px;color:#666;font-size:12px;'>REFERENCE CODE</p>
                    <span>{$refCode}</span>
                </div>

                <h3 style='margin:0 0 12px;color:#333;'>Booking Details</h3>
                <table>
                    <tr><td>Service Type</td><td>{$serviceType}</td></tr>
                    <tr><td>Service</td><td>{$serviceName}</td></tr>
                    <tr><td>Date</td><td>{$bookingDate}" . ($checkoutDate ? " to {$checkoutDate}" : "") . "</td></tr>";

    if ($roomName) {
        $body .= "<tr><td>Room</td><td>{$roomName}</td></tr>";
    }
    if ($pickupLocation) {
        $body .= "<tr><td>Route</td><td>{$pickupLocation}</td></tr>";
    }
    if ($pickupTime) {
        $body .= "<tr><td>Pickup Time</td><td>{$pickupTime}</td></tr>";
    }
    if ($flightNumber) {
        $body .= "<tr><td>Flight</td><td>{$flightNumber}</td></tr>";
    }

    $body .= "
                    <tr><td>Adults</td><td>{$adults}</td></tr>
                    <tr><td>Children</td><td>{$children}</td></tr>
                </table>

                <h3 style='margin:20px 0 12px;color:#333;'>Customer Information</h3>
                <table>
                    <tr><td>Name</td><td>{$customerName}</td></tr>
                    <tr><td>Email</td><td>{$customerEmail}</td></tr>
                    <tr><td>Phone</td><td>{$customerPhone}</td></tr>";

    if ($specialRequests) {
        $body .= "<tr><td>Requests</td><td>{$specialRequests}</td></tr>";
    }

    $body .= "
                </table>

                <div class='total'>
                    <p style='margin:0 0 4px;color:#666;font-size:12px;'>TOTAL PRICE</p>
                    <span>฿" . number_format($totalPrice, 0) . "</span>
                </div>
            </div>
            <div class='footer'>
                &copy; " . date('Y') . " Phuket Gevalin Travel. All rights reserved.
            </div>
        </div>
    </body>
    </html>";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Phuket Gevalin <noreply@phuketgevalin.com>\r\n";

    @mail($to, $subject, $body, $headers);
}
