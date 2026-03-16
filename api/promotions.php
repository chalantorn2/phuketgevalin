<?php
/**
 * Promotions API - Phuket Gevalin
 * Homepage Highlight Slider Management
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    switch ($method) {
        case 'GET':
            // Get promotion by ID or list all promotions
            $id = $_GET['id'] ?? null;

            if ($id) {
                // Get single promotion
                $promotion = $db->fetchOne(
                    "SELECT * FROM promotions WHERE id = ?",
                    [(int)$id]
                );

                if ($promotion) {
                    successResponse($promotion);
                } else {
                    errorResponse('Promotion not found', 404);
                }
            } else {
                // List all promotions (active only for public, all for admin)
                $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

                $sql = "SELECT * FROM promotions";
                $params = [];

                if (!$showAll) {
                    $sql .= " WHERE status = 'active'";
                    $sql .= " AND (start_date IS NULL OR start_date <= CURDATE())";
                    $sql .= " AND (end_date IS NULL OR end_date >= CURDATE())";
                }

                $sql .= " ORDER BY sort_order ASC, created_at DESC";

                $promotions = $db->fetchAll($sql, $params);

                successResponse($promotions);
            }
            break;

        case 'POST':
            // Create new promotion (admin only)
            $data = getJsonInput();

            $required = ['title_th', 'title_en', 'price'];
            foreach ($required as $field) {
                if (empty($data[$field]) && $data[$field] !== 0) {
                    errorResponse("Field '$field' is required");
                }
            }

            // Get max sort order
            $maxOrder = $db->fetchOne("SELECT MAX(sort_order) as max_order FROM promotions");
            $sortOrder = ($maxOrder['max_order'] ?? 0) + 1;

            $id = $db->insert(
                "INSERT INTO promotions (title_th, title_en, subtitle_th, subtitle_en, description_th, description_en, location_th, location_en, price, image, link, sort_order, status, start_date, end_date, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
                [
                    sanitize($data['title_th']),
                    sanitize($data['title_en']),
                    sanitize($data['subtitle_th'] ?? ''),
                    sanitize($data['subtitle_en'] ?? ''),
                    sanitize($data['description_th'] ?? ''),
                    sanitize($data['description_en'] ?? ''),
                    sanitize($data['location_th'] ?? ''),
                    sanitize($data['location_en'] ?? ''),
                    (float)$data['price'],
                    sanitize($data['image'] ?? ''),
                    sanitize($data['link'] ?? ''),
                    (int)($data['sort_order'] ?? $sortOrder),
                    $data['status'] ?? 'active',
                    $data['start_date'] ?? null,
                    $data['end_date'] ?? null
                ]
            );

            successResponse(['id' => $id], 'Promotion created successfully');
            break;

        case 'PUT':
            // Update promotion
            $data = getJsonInput();
            $id = $_GET['id'] ?? $data['id'] ?? null;

            if (!$id) {
                errorResponse('Promotion ID is required');
            }

            // Build update query dynamically
            $fields = [];
            $params = [];

            $allowedFields = [
                'title_th', 'title_en', 'subtitle_th', 'subtitle_en',
                'description_th', 'description_en', 'location_th', 'location_en',
                'price', 'image', 'link', 'sort_order', 'status', 'start_date', 'end_date'
            ];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $fields[] = "$field = ?";
                    if (in_array($field, ['price', 'sort_order'])) {
                        $params[] = $field === 'price' ? (float)$data[$field] : (int)$data[$field];
                    } elseif (in_array($field, ['start_date', 'end_date'])) {
                        $params[] = $data[$field] ?: null;
                    } else {
                        $params[] = sanitize($data[$field]);
                    }
                }
            }

            if (empty($fields)) {
                errorResponse('No fields to update');
            }

            $fields[] = "updated_at = NOW()";
            $params[] = (int)$id;

            $db->execute(
                "UPDATE promotions SET " . implode(', ', $fields) . " WHERE id = ?",
                $params
            );

            successResponse(null, 'Promotion updated successfully');
            break;

        case 'DELETE':
            // Delete promotion (soft delete by setting status to inactive, or hard delete)
            $id = $_GET['id'] ?? null;
            $hardDelete = isset($_GET['hard']) && $_GET['hard'] === 'true';

            if (!$id) {
                errorResponse('Promotion ID is required');
            }

            if ($hardDelete) {
                $db->execute("DELETE FROM promotions WHERE id = ?", [(int)$id]);
                successResponse(null, 'Promotion permanently deleted');
            } else {
                $db->execute(
                    "UPDATE promotions SET status = 'inactive', updated_at = NOW() WHERE id = ?",
                    [(int)$id]
                );
                successResponse(null, 'Promotion deleted successfully');
            }
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Promotions API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
