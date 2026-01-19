-- Phuket Gevalin Database Schema
-- Run this SQL to create the required tables

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Tours Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tours` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NOT NULL,
    `description_th` TEXT,
    `description_en` TEXT,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `category` VARCHAR(100) NOT NULL COMMENT 'island, adventure, cultural, etc.',
    `image` VARCHAR(500) DEFAULT NULL,
    `duration` VARCHAR(100) DEFAULT NULL COMMENT 'e.g. Full Day, Half Day',
    `includes` TEXT COMMENT 'What is included in the tour',
    `highlights` TEXT COMMENT 'Tour highlights',
    `itinerary` TEXT COMMENT 'Tour schedule',
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_category` (`category`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Hotels Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotels` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NOT NULL,
    `description_th` TEXT,
    `description_en` TEXT,
    `location` VARCHAR(255) NOT NULL,
    `address` TEXT,
    `price_per_night` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `rating` DECIMAL(2,1) DEFAULT 0.0,
    `image` VARCHAR(500) DEFAULT NULL,
    `amenities` TEXT COMMENT 'JSON array of amenities',
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_location` (`location`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Transfers Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `transfers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NOT NULL,
    `description_th` TEXT,
    `description_en` TEXT,
    `type` ENUM('airport', 'private', 'hourly') NOT NULL,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `vehicle_type` VARCHAR(100) NOT NULL COMMENT 'Sedan, SUV, Van, etc.',
    `max_passengers` INT NOT NULL DEFAULT 4,
    `image` VARCHAR(500) DEFAULT NULL,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_type` (`type`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Bookings Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `reference_code` VARCHAR(20) NOT NULL UNIQUE,
    `service_type` ENUM('tour', 'hotel', 'transfer') NOT NULL,
    `service_id` INT UNSIGNED NOT NULL,
    `customer_name` VARCHAR(255) NOT NULL,
    `customer_email` VARCHAR(255) NOT NULL,
    `customer_phone` VARCHAR(50) NOT NULL,
    `booking_date` DATE NOT NULL,
    `checkout_date` DATE DEFAULT NULL COMMENT 'For hotel bookings',
    `adults` INT NOT NULL DEFAULT 1,
    `children` INT NOT NULL DEFAULT 0,
    `pickup_location` VARCHAR(500) DEFAULT NULL,
    `pickup_time` TIME DEFAULT NULL,
    `flight_number` VARCHAR(50) DEFAULT NULL,
    `special_requests` TEXT,
    `total_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `status` ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    `payment_status` ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    `admin_notes` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_reference` (`reference_code`),
    INDEX `idx_email` (`customer_email`),
    INDEX `idx_status` (`status`),
    INDEX `idx_date` (`booking_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Contacts Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) DEFAULT NULL,
    `subject` VARCHAR(255) DEFAULT 'General Inquiry',
    `message` TEXT NOT NULL,
    `status` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    `admin_reply` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_status` (`status`),
    INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Settings Table (for site configuration)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` TEXT,
    `setting_type` ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Insert default settings
-- --------------------------------------------------------
INSERT INTO `settings` (`setting_key`, `setting_value`, `setting_type`) VALUES
('site_name', 'Phuket Gevalin', 'text'),
('site_email', 'info@phuketgevalin.com', 'text'),
('site_phone', '+66 XX XXX XXXX', 'text'),
('currency', 'THB', 'text'),
('timezone', 'Asia/Bangkok', 'text')
ON DUPLICATE KEY UPDATE `setting_key` = `setting_key`;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- Sample Data (Optional - uncomment to insert)
-- --------------------------------------------------------

/*
-- Sample Tours
INSERT INTO `tours` (`name_th`, `name_en`, `description_th`, `description_en`, `price`, `category`, `duration`) VALUES
('ทัวร์เกาะพีพี', 'Phi Phi Island Tour', 'เที่ยวเกาะพีพี ดำน้ำดูปะการัง', 'Visit Phi Phi Island, snorkeling and beach activities', 1500.00, 'island', 'Full Day'),
('ทัวร์เกาะเจมส์บอนด์', 'James Bond Island Tour', 'ล่องเรือชมเกาะเจมส์บอนด์', 'Cruise to famous James Bond Island', 1800.00, 'island', 'Full Day'),
('ทัวร์ภูเก็ตซิตี้', 'Phuket City Tour', 'เที่ยวชมเมืองเก่าภูเก็ต วัดฉลอง', 'Explore Old Town Phuket and Chalong Temple', 800.00, 'cultural', 'Half Day');

-- Sample Transfers
INSERT INTO `transfers` (`name_th`, `name_en`, `type`, `price`, `vehicle_type`, `max_passengers`) VALUES
('รถรับส่งสนามบิน - ป่าตอง (Sedan)', 'Airport - Patong (Sedan)', 'airport', 800.00, 'Sedan', 3),
('รถรับส่งสนามบิน - ป่าตอง (SUV)', 'Airport - Patong (SUV)', 'airport', 1000.00, 'SUV', 5),
('รถรับส่งสนามบิน - ป่าตอง (Van)', 'Airport - Patong (Van)', 'airport', 1200.00, 'Van', 10);
*/
