-- Migration: Create hotel pricing tables
-- ตารางช่วงวันที่และราคาห้องพักโรงแรม

-- ตาราง Room Types ของแต่ละโรงแรม
CREATE TABLE IF NOT EXISTS `hotel_room_types` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `max_guests` int(11) DEFAULT 2,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `fk_roomtype_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ตารางช่วงวันที่ (Periods)
CREATE TABLE IF NOT EXISTS `hotel_periods` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `fk_period_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ตารางราคาห้องพัก (Room Prices)
CREATE TABLE IF NOT EXISTS `hotel_room_prices` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `room_type_id` int(10) UNSIGNED NOT NULL,
  `period_id` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_price` (`hotel_id`, `room_type_id`, `period_id`),
  KEY `hotel_id` (`hotel_id`),
  KEY `room_type_id` (`room_type_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `fk_price_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_price_roomtype` FOREIGN KEY (`room_type_id`) REFERENCES `hotel_room_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_price_period` FOREIGN KEY (`period_id`) REFERENCES `hotel_periods` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
