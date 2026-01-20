<?php
/**
 * Authentication API - Phuket Gevalin Admin
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
startSecureSession();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

try {
    if ($method === 'GET') {
        $action = $_GET['action'] ?? '';

        if ($action === 'check') {
            if (isset($_SESSION['admin_id']) && isset($_SESSION['admin_logged_in'])) {
                successResponse([
                    'logged_in' => true,
                    'admin_id' => $_SESSION['admin_id'],
                    'username' => $_SESSION['admin_username']
                ]);
            } else {
                successResponse(['logged_in' => false]);
            }
        } else {
            errorResponse('Invalid action');
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $action = $data['action'] ?? '';

        switch ($action) {
            case 'login':
                $username = sanitize($data['username'] ?? '');
                $password = $data['password'] ?? '';

                if (empty($username) || empty($password)) {
                    errorResponse('Username and password are required');
                }

                $admin = $db->fetchOne(
                    "SELECT * FROM admins WHERE username = ? AND status = 'active'",
                    [$username]
                );

                if (!$admin) {
                    errorResponse('Invalid username or password', 401);
                }

                if (!password_verify($password, $admin['password'])) {
                    errorResponse('Invalid username or password', 401);
                }

                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_role'] = $admin['role'];

                $db->execute(
                    "UPDATE admins SET last_login = NOW() WHERE id = ?",
                    [$admin['id']]
                );

                successResponse([
                    'admin_id' => $admin['id'],
                    'username' => $admin['username'],
                    'role' => $admin['role']
                ], 'Login successful');
                break;

            case 'logout':
                session_destroy();
                successResponse(null, 'Logged out successfully');
                break;

            case 'register':
                $adminCount = $db->fetchOne("SELECT COUNT(*) as count FROM admins");

                if ($adminCount && $adminCount['count'] > 0) {
                    if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super_admin') {
                        errorResponse('Not authorized to create new admin', 403);
                    }
                }

                $username = sanitize($data['username'] ?? '');
                $password = $data['password'] ?? '';
                $email = sanitize($data['email'] ?? '');

                if (empty($username) || empty($password)) {
                    errorResponse('Username and password are required');
                }

                if (strlen($password) < 8) {
                    errorResponse('Password must be at least 8 characters');
                }

                $existing = $db->fetchOne(
                    "SELECT id FROM admins WHERE username = ?",
                    [$username]
                );

                if ($existing) {
                    errorResponse('Username already exists');
                }

                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $role = ($adminCount && $adminCount['count'] > 0) ? 'admin' : 'super_admin';

                $id = $db->insert(
                    "INSERT INTO admins (username, password, email, role, status, created_at)
                     VALUES (?, ?, ?, ?, 'active', NOW())",
                    [$username, $hashedPassword, $email, $role]
                );

                successResponse(['id' => $id], 'Admin created successfully');
                break;

            default:
                errorResponse('Invalid action');
        }
    } else {
        errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Auth API Error: " . $e->getMessage());
    errorResponse('Server error', 500);
}
