<?php
/**
 * Contact API - Phuket Gevalin
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'POST':
            // Submit contact form
            $data = getJsonInput();

            // Validate required fields
            $required = ['name', 'email', 'message'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Validate email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                errorResponse('Invalid email address');
            }

            // Basic spam protection - check message length
            if (strlen($data['message']) < 10) {
                errorResponse('Message is too short');
            }

            $id = $db->insert(
                "INSERT INTO contacts (name, email, phone, subject, message, status, created_at)
                 VALUES (?, ?, ?, ?, ?, 'unread', NOW())",
                [
                    sanitize($data['name']),
                    sanitize($data['email']),
                    sanitize($data['phone'] ?? ''),
                    sanitize($data['subject'] ?? 'General Inquiry'),
                    sanitize($data['message'])
                ]
            );

            // Send email notification to admin (optional)
            // sendContactNotification($data);

            successResponse(['id' => $id], 'Message sent successfully. We will contact you soon!');
            break;

        case 'GET':
            // List contacts (admin only)
            $status = $_GET['status'] ?? null;
            $limit = (int)($_GET['limit'] ?? 20);
            $offset = (int)($_GET['offset'] ?? 0);

            $sql = "SELECT * FROM contacts";
            $params = [];

            if ($status) {
                $sql .= " WHERE status = ?";
                $params[] = $status;
            }

            $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $contacts = $db->fetchAll($sql, $params);
            successResponse($contacts);
            break;

        case 'PUT':
            // Mark as read (admin only)
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Contact ID is required');
            }

            $db->execute(
                "UPDATE contacts SET status = 'read', updated_at = NOW() WHERE id = ?",
                [(int)$id]
            );

            successResponse(null, 'Contact marked as read');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Contact API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
