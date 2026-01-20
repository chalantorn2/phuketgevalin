-- Migration: Rename tours table to package_tours
-- Date: 2026-01-20
-- Description: เปลี่ยนชื่อ table tours เป็น package_tours เพื่อความชัดเจน

-- 1. Rename table
RENAME TABLE `tours` TO `package_tours`;

-- 2. Update bookings service_type enum to include package_tour
ALTER TABLE `bookings`
MODIFY COLUMN `service_type` ENUM('tour', 'package_tour', 'hotel', 'transfer') NOT NULL;

-- 3. Update existing bookings that have service_type = 'tour' to 'package_tour'
UPDATE `bookings` SET `service_type` = 'package_tour' WHERE `service_type` = 'tour';

-- 4. Finally remove old 'tour' from enum (optional - can keep for backward compatibility)
-- ALTER TABLE `bookings`
-- MODIFY COLUMN `service_type` ENUM('package_tour', 'hotel', 'transfer') NOT NULL;
