-- Migration: Create transfer_locations and transfer_routes tables
-- สร้างตารางสถานที่รับ-ส่ง และราคาเส้นทาง

-- ตารางสถานที่ (Locations)
CREATE TABLE IF NOT EXISTS `transfer_locations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `type` enum('airport','city','beach','hotel_zone','other') DEFAULT 'other',
  `province` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ตารางราคาเส้นทาง (Routes)
CREATE TABLE IF NOT EXISTS `transfer_routes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_location_id` int(10) UNSIGNED NOT NULL,
  `to_location_id` int(10) UNSIGNED NOT NULL,
  `vehicle_type` varchar(50) NOT NULL COMMENT 'Sedan, SUV, Van, Minibus',
  `max_passengers` int(11) NOT NULL DEFAULT 3,
  `price` decimal(10,2) NOT NULL,
  `duration_minutes` int(11) DEFAULT NULL COMMENT 'ระยะเวลาโดยประมาณ (นาที)',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `from_location_id` (`from_location_id`),
  KEY `to_location_id` (`to_location_id`),
  CONSTRAINT `fk_route_from_location` FOREIGN KEY (`from_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_route_to_location` FOREIGN KEY (`to_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ข้อมูลเริ่มต้น: สถานที่
INSERT INTO `transfer_locations` (`name_th`, `name_en`, `type`, `province`, `sort_order`) VALUES
('สนามบินภูเก็ต (HKT)', 'Phuket Airport (HKT)', 'airport', 'Phuket', 1),
('ตัวเมืองภูเก็ต', 'Phuket Town', 'city', 'Phuket', 2),
('หาดป่าตอง', 'Patong Beach', 'beach', 'Phuket', 3),
('หาดกะรน', 'Karon Beach', 'beach', 'Phuket', 4),
('หาดกะตะ', 'Kata Beach', 'beach', 'Phuket', 5),
('สนามบินกระบี่ (KBV)', 'Krabi Airport (KBV)', 'airport', 'Krabi', 10),
('อ่าวนาง', 'Ao Nang', 'beach', 'Krabi', 11),
('ตัวเมืองกระบี่', 'Krabi Town', 'city', 'Krabi', 12),
('เขาหลัก', 'Khao Lak', 'beach', 'Phang Nga', 20);

-- ข้อมูลเริ่มต้น: ราคาเส้นทาง (สนามบินภูเก็ต)
INSERT INTO `transfer_routes` (`from_location_id`, `to_location_id`, `vehicle_type`, `max_passengers`, `price`, `duration_minutes`) VALUES
-- สนามบินภูเก็ต -> ต่างๆ (Sedan)
(1, 2, 'Sedan', 3, 700, 45),
(1, 3, 'Sedan', 3, 900, 50),
(1, 4, 'Sedan', 3, 1000, 55),
(1, 5, 'Sedan', 3, 1100, 60),
-- สนามบินภูเก็ต -> ต่างๆ (SUV)
(1, 2, 'SUV', 5, 900, 45),
(1, 3, 'SUV', 5, 1100, 50),
(1, 4, 'SUV', 5, 1200, 55),
(1, 5, 'SUV', 5, 1300, 60),
-- สนามบินภูเก็ต -> ต่างๆ (Van)
(1, 2, 'Van', 10, 1200, 45),
(1, 3, 'Van', 10, 1500, 50),
(1, 4, 'Van', 10, 1600, 55),
(1, 5, 'Van', 10, 1700, 60),
-- ภูเก็ต -> กระบี่ (ข้ามจังหวัด)
(1, 6, 'Sedan', 3, 2500, 180),
(1, 6, 'SUV', 5, 3000, 180),
(1, 6, 'Van', 10, 3800, 180),
(3, 7, 'Sedan', 3, 2800, 200),
(3, 7, 'SUV', 5, 3300, 200),
(3, 7, 'Van', 10, 4200, 200),
-- สนามบินภูเก็ต -> เขาหลัก
(1, 9, 'Sedan', 3, 1800, 90),
(1, 9, 'SUV', 5, 2200, 90),
(1, 9, 'Van', 10, 2800, 90);
