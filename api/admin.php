<?php
/**
 * Admin API - Phuket Gevalin
 * Dashboard statistics and management
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
startSecureSession();

// Check authentication
if (!isset($_SESSION['admin_id']) || !isset($_SESSION['admin_logged_in'])) {
    errorResponse('Unauthorized', 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = Database::getInstance();

try {
    switch ($action) {
        case 'dashboard':
            $stats = [];

            $packageTours = $db->fetchOne("SELECT COUNT(*) as count FROM package_tours WHERE status = 'active'");
            $stats['total_package_tours'] = $packageTours['count'] ?? 0;

            $hotels = $db->fetchOne("SELECT COUNT(*) as count FROM hotels WHERE status = 'active'");
            $stats['total_hotels'] = $hotels['count'] ?? 0;

            $transfers = $db->fetchOne("SELECT COUNT(*) as count FROM transfers WHERE status = 'active'");
            $stats['total_transfers'] = $transfers['count'] ?? 0;

            $bookings = $db->fetchOne("SELECT COUNT(*) as count FROM bookings");
            $stats['total_bookings'] = $bookings['count'] ?? 0;

            $pending = $db->fetchOne("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
            $stats['pending_bookings'] = $pending['count'] ?? 0;

            $today = $db->fetchOne(
                "SELECT COUNT(*) as count FROM bookings WHERE DATE(created_at) = CURDATE()"
            );
            $stats['today_bookings'] = $today['count'] ?? 0;

            $contacts = $db->fetchOne("SELECT COUNT(*) as count FROM contacts WHERE status = 'unread'");
            $stats['unread_contacts'] = $contacts['count'] ?? 0;

            $revenue = $db->fetchOne(
                "SELECT SUM(total_price) as total FROM bookings
                 WHERE status IN ('confirmed', 'completed')
                 AND MONTH(created_at) = MONTH(CURDATE())
                 AND YEAR(created_at) = YEAR(CURDATE())"
            );
            $stats['monthly_revenue'] = $revenue['total'] ?? 0;

            $recentBookings = $db->fetchAll(
                "SELECT b.*,
                 CASE
                    WHEN b.service_type = 'package_tour' THEN (SELECT name_en FROM package_tours WHERE id = b.service_id)
                    WHEN b.service_type = 'hotel' THEN (SELECT name_en FROM hotels WHERE id = b.service_id)
                    WHEN b.service_type = 'transfer' THEN (SELECT name_en FROM transfers WHERE id = b.service_id)
                 END as service_name
                 FROM bookings b
                 ORDER BY created_at DESC LIMIT 10"
            );
            $stats['recent_bookings'] = $recentBookings;

            successResponse($stats);
            break;

        case 'bookings':
            $status = $_GET['status'] ?? null;
            $limit = (int)($_GET['limit'] ?? 50);
            $offset = (int)($_GET['offset'] ?? 0);

            $sql = "SELECT b.*,
                    CASE
                        WHEN b.service_type = 'package_tour' THEN (SELECT name_en FROM package_tours WHERE id = b.service_id)
                        WHEN b.service_type = 'hotel' THEN (SELECT name_en FROM hotels WHERE id = b.service_id)
                        WHEN b.service_type = 'transfer' THEN (SELECT name_en FROM transfers WHERE id = b.service_id)
                    END as service_name
                    FROM bookings b";
            $params = [];

            if ($status) {
                $sql .= " WHERE b.status = ?";
                $params[] = $status;
            }

            $sql .= " ORDER BY b.created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $bookings = $db->fetchAll($sql, $params);

            $countSql = "SELECT COUNT(*) as total FROM bookings";
            if ($status) {
                $countSql .= " WHERE status = ?";
                $total = $db->fetchOne($countSql, [$status]);
            } else {
                $total = $db->fetchOne($countSql);
            }

            successResponse([
                'bookings' => $bookings,
                'total' => $total['total'] ?? 0,
                'limit' => $limit,
                'offset' => $offset
            ]);
            break;

        case 'contacts':
            $status = $_GET['status'] ?? null;
            $limit = (int)($_GET['limit'] ?? 50);
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

        case 'package_tours':
            $packageTours = $db->fetchAll("SELECT * FROM package_tours ORDER BY created_at DESC");
            successResponse($packageTours);
            break;

        case 'hotels':
            $hotels = $db->fetchAll("SELECT * FROM hotels ORDER BY created_at DESC");
            successResponse($hotels);
            break;

        case 'transfers':
            $transfers = $db->fetchAll("SELECT * FROM transfers ORDER BY created_at DESC");
            successResponse($transfers);
            break;

        default:
            errorResponse('Invalid action');
    }
} catch (Exception $e) {
    error_log("Admin API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
