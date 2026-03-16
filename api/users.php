<?php
/**
 * Users API - Admin User Management
 * Requires super_admin session for all operations
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
startSecureSession();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

// Check authentication - must be logged in as super_admin
if (!isset($_SESSION['admin_id']) || !isset($_SESSION['admin_logged_in'])) {
    errorResponse('Not authenticated', 401);
}

if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super_admin') {
    errorResponse('Not authorized. Super admin access required.', 403);
}

try {
    switch ($method) {
        case 'GET':
            // List all admin users
            $users = $db->fetchAll(
                "SELECT id, username, email, role, status, last_login, created_at FROM admins ORDER BY created_at DESC"
            );
            successResponse($users);
            break;

        case 'POST':
            // Create new admin user
            $data = getJsonInput();

            $username = sanitize($data['username'] ?? '');
            $password = $data['password'] ?? '';
            $email = sanitize($data['email'] ?? '');
            $role = sanitize($data['role'] ?? 'admin');

            if (empty($username) || empty($password)) {
                errorResponse('Username and password are required');
            }

            if (strlen($password) < 8) {
                errorResponse('Password must be at least 8 characters');
            }

            if (!in_array($role, ['admin', 'super_admin'])) {
                errorResponse('Invalid role');
            }

            // Check if username already exists
            $existing = $db->fetchOne(
                "SELECT id FROM admins WHERE username = ?",
                [$username]
            );

            if ($existing) {
                errorResponse('Username already exists');
            }

            // Check if email already exists (if provided)
            if (!empty($email)) {
                $existingEmail = $db->fetchOne(
                    "SELECT id FROM admins WHERE email = ?",
                    [$email]
                );
                if ($existingEmail) {
                    errorResponse('Email already exists');
                }
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $id = $db->insert(
                "INSERT INTO admins (username, password, email, role, status, created_at) VALUES (?, ?, ?, ?, 'active', NOW())",
                [$username, $hashedPassword, $email, $role]
            );

            successResponse(['id' => $id], 'User created successfully');
            break;

        case 'PUT':
            // Update admin user
            $id = intval($_GET['id'] ?? 0);
            if ($id <= 0) {
                errorResponse('Invalid user ID');
            }

            $data = getJsonInput();

            // Check if user exists
            $user = $db->fetchOne("SELECT id, role FROM admins WHERE id = ?", [$id]);
            if (!$user) {
                errorResponse('User not found', 404);
            }

            $updates = [];
            $params = [];

            if (isset($data['username'])) {
                $username = sanitize($data['username']);
                if (empty($username)) {
                    errorResponse('Username cannot be empty');
                }
                // Check uniqueness
                $existing = $db->fetchOne(
                    "SELECT id FROM admins WHERE username = ? AND id != ?",
                    [$username, $id]
                );
                if ($existing) {
                    errorResponse('Username already exists');
                }
                $updates[] = "username = ?";
                $params[] = $username;
            }

            if (isset($data['email'])) {
                $email = sanitize($data['email']);
                if (!empty($email)) {
                    $existingEmail = $db->fetchOne(
                        "SELECT id FROM admins WHERE email = ? AND id != ?",
                        [$email, $id]
                    );
                    if ($existingEmail) {
                        errorResponse('Email already exists');
                    }
                }
                $updates[] = "email = ?";
                $params[] = $email;
            }

            if (isset($data['role'])) {
                $role = sanitize($data['role']);
                if (!in_array($role, ['admin', 'super_admin'])) {
                    errorResponse('Invalid role');
                }
                // Prevent demoting yourself
                if ($id == $_SESSION['admin_id'] && $role !== 'super_admin') {
                    errorResponse('Cannot change your own role');
                }
                $updates[] = "role = ?";
                $params[] = $role;
            }

            if (isset($data['status'])) {
                $status = sanitize($data['status']);
                if (!in_array($status, ['active', 'inactive'])) {
                    errorResponse('Invalid status');
                }
                // Prevent deactivating yourself
                if ($id == $_SESSION['admin_id'] && $status !== 'active') {
                    errorResponse('Cannot deactivate your own account');
                }
                $updates[] = "status = ?";
                $params[] = $status;
            }

            if (isset($data['password'])) {
                $password = $data['password'];
                if (strlen($password) < 8) {
                    errorResponse('Password must be at least 8 characters');
                }
                $updates[] = "password = ?";
                $params[] = password_hash($password, PASSWORD_DEFAULT);
            }

            if (empty($updates)) {
                errorResponse('No fields to update');
            }

            $params[] = $id;
            $db->execute(
                "UPDATE admins SET " . implode(', ', $updates) . " WHERE id = ?",
                $params
            );

            successResponse(null, 'User updated successfully');
            break;

        case 'DELETE':
            // Delete admin user
            $id = intval($_GET['id'] ?? 0);
            if ($id <= 0) {
                errorResponse('Invalid user ID');
            }

            // Prevent self-delete
            if ($id == $_SESSION['admin_id']) {
                errorResponse('Cannot delete your own account');
            }

            // Check if user exists
            $user = $db->fetchOne("SELECT id FROM admins WHERE id = ?", [$id]);
            if (!$user) {
                errorResponse('User not found', 404);
            }

            $db->execute("DELETE FROM admins WHERE id = ?", [$id]);
            successResponse(null, 'User deleted successfully');
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Users API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
