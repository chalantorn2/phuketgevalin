<?php
/**
 * File Upload API - Phuket Gevalin
 * Handle image uploads for promotions, tours, etc.
 */

// Show errors for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once __DIR__ . '/config.php';
setCorsHeaders();

// Upload directory
$uploadDir = __DIR__ . '/uploads/';
$uploadUrl = '/api/uploads/';

// Allowed file types
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$maxFileSize = 5 * 1024 * 1024; // 5MB

$method = $_SERVER['REQUEST_METHOD'];

try {
    // Create uploads directory if not exists
    if (!file_exists($uploadDir)) {
        if (!@mkdir($uploadDir, 0755, true)) {
            errorResponse('Cannot create uploads directory');
        }
    }

    // Check if directory is writable
    if (!is_writable($uploadDir)) {
        errorResponse('Uploads directory is not writable');
    }

    switch ($method) {
        case 'POST':
            // Debug: Check if FILES array is populated
            if (empty($_FILES)) {
                errorResponse('No files received. Check server upload settings.');
            }

            // Check if file was uploaded
            if (!isset($_FILES['image'])) {
                errorResponse('No image field in upload. Fields received: ' . implode(', ', array_keys($_FILES)));
            }

            if ($_FILES['image']['error'] === UPLOAD_ERR_NO_FILE) {
                errorResponse('No file uploaded');
            }

            $file = $_FILES['image'];

            // Check for upload errors
            if ($file['error'] !== UPLOAD_ERR_OK) {
                $errorMessages = [
                    UPLOAD_ERR_INI_SIZE => 'File exceeds server limit (upload_max_filesize)',
                    UPLOAD_ERR_FORM_SIZE => 'File exceeds form limit',
                    UPLOAD_ERR_PARTIAL => 'File partially uploaded',
                    UPLOAD_ERR_NO_TMP_DIR => 'Missing temp folder',
                    UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
                    UPLOAD_ERR_EXTENSION => 'Upload blocked by PHP extension',
                ];
                errorResponse($errorMessages[$file['error']] ?? 'Upload error code: ' . $file['error']);
            }

            // Check file size
            if ($file['size'] > $maxFileSize) {
                errorResponse('File size exceeds 5MB limit. Size: ' . round($file['size'] / 1024 / 1024, 2) . 'MB');
            }

            // Check file type using multiple methods
            $mimeType = '';

            // Method 1: finfo (preferred)
            if (function_exists('finfo_open')) {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $mimeType = finfo_file($finfo, $file['tmp_name']);
                finfo_close($finfo);
            }
            // Method 2: mime_content_type (fallback)
            elseif (function_exists('mime_content_type')) {
                $mimeType = mime_content_type($file['tmp_name']);
            }
            // Method 3: Use uploaded mime type (less secure, last resort)
            else {
                $mimeType = $file['type'];
            }

            if (!in_array($mimeType, $allowedTypes)) {
                errorResponse('Invalid file type: ' . $mimeType . '. Allowed: JPG, PNG, WebP, GIF');
            }

            // Get file extension
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($extension, $allowedExtensions)) {
                errorResponse('Invalid file extension: ' . $extension);
            }

            // Generate unique filename
            $folder = $_POST['folder'] ?? 'general';
            $folder = preg_replace('/[^a-zA-Z0-9_-]/', '', $folder);

            $folderPath = $uploadDir . $folder . '/';
            if (!file_exists($folderPath)) {
                if (!@mkdir($folderPath, 0755, true)) {
                    errorResponse('Cannot create folder: ' . $folder);
                }
            }

            $filename = uniqid() . '_' . time() . '.' . $extension;
            $filepath = $folderPath . $filename;
            $fileUrl = $uploadUrl . $folder . '/' . $filename;

            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                errorResponse('Failed to save file. Check directory permissions.');
            }

            // Verify file was saved
            if (!file_exists($filepath)) {
                errorResponse('File was not saved properly');
            }

            successResponse([
                'url' => $fileUrl,
                'filename' => $filename,
                'size' => $file['size'],
                'type' => $mimeType
            ], 'File uploaded successfully');
            break;

        case 'DELETE':
            $filename = $_GET['file'] ?? '';
            $folder = $_GET['folder'] ?? 'general';

            if (empty($filename)) {
                errorResponse('Filename is required');
            }

            $folder = preg_replace('/[^a-zA-Z0-9_-]/', '', $folder);
            $filename = basename($filename);

            $filepath = $uploadDir . $folder . '/' . $filename;

            if (file_exists($filepath)) {
                if (unlink($filepath)) {
                    successResponse(null, 'File deleted successfully');
                } else {
                    errorResponse('Failed to delete file');
                }
            } else {
                errorResponse('File not found', 404);
            }
            break;

        default:
            errorResponse('Method not allowed', 405);
    }
} catch (Exception $e) {
    error_log("Upload API Error: " . $e->getMessage());
    errorResponse('Server error: ' . $e->getMessage(), 500);
}
