-- Migration: Fix transfer_routes table
-- เอา vehicle_type ออก เหลือแค่ ต้นทาง + ปลายทาง + ราคา

-- ลบตารางเก่า
DROP TABLE IF EXISTS `transfer_routes`;

-- สร้างตารางใหม่ (ไม่มี vehicle_type)
CREATE TABLE `transfer_routes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_location_id` int(10) UNSIGNED NOT NULL,
  `to_location_id` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_minutes` int(11) DEFAULT NULL COMMENT 'ระยะเวลาโดยประมาณ (นาที)',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_route` (`from_location_id`, `to_location_id`),
  KEY `from_location_id` (`from_location_id`),
  KEY `to_location_id` (`to_location_id`),
  CONSTRAINT `fk_route_from` FOREIGN KEY (`from_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_route_to` FOREIGN KEY (`to_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ข้อมูลเริ่มต้น: ราคาเส้นทาง (ไม่ผูกกับรถ)
INSERT INTO `transfer_routes` (`from_location_id`, `to_location_id`, `price`, `duration_minutes`) VALUES
-- สนามบินภูเก็ต (1) -> ต่างๆ
(1, 2, 700, 45),   -- สนามบิน -> ตัวเมืองภูเก็ต
(1, 3, 900, 50),   -- สนามบิน -> ป่าตอง
(1, 4, 1000, 55),  -- สนามบิน -> กะรน
(1, 5, 1100, 60),  -- สนามบิน -> กะตะ
(1, 9, 1800, 90),  -- สนามบิน -> เขาหลัก
-- ตัวเมืองภูเก็ต (2) -> ต่างๆ
(2, 3, 500, 30),   -- ตัวเมือง -> ป่าตอง
(2, 4, 600, 35),   -- ตัวเมือง -> กะรน
(2, 5, 700, 40),   -- ตัวเมือง -> กะตะ
-- ข้ามจังหวัด
(1, 6, 2500, 180), -- สนามบินภูเก็ต -> สนามบินกระบี่
(3, 7, 2800, 200), -- ป่าตอง -> อ่าวนาง
(1, 7, 3000, 210); -- สนามบินภูเก็ต -> อ่าวนาง
