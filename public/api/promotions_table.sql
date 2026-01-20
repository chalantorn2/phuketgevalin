-- Table structure for promotions (Homepage Highlights)
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `subtitle_th` varchar(255) DEFAULT NULL,
  `subtitle_en` varchar(255) DEFAULT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `location_th` varchar(255) DEFAULT NULL,
  `location_en` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `image` varchar(500) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL COMMENT 'Link to tour/service page',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `start_date` date DEFAULT NULL COMMENT 'Promotion start date',
  `end_date` date DEFAULT NULL COMMENT 'Promotion end date',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default promotions (based on current hardcoded data)
INSERT INTO `promotions` (`title_th`, `title_en`, `subtitle_th`, `subtitle_en`, `description_th`, `description_en`, `location_th`, `location_en`, `price`, `image`, `sort_order`, `status`) VALUES
('ทัวร์ 4 เกาะ พร้อมดำน้ำตื้น', '4 Islands Tour with Snorkeling', 'โปรโมชั่นพิเศษ', 'Special Offer', 'สัมผัสความงดงามของหมู่เกาะทะเลกระบี่ พร้อมดำน้ำชมปะการังและปลาสีสันสดใส', 'Experience the beauty of Krabi islands with snorkeling among colorful coral reefs and tropical fish', 'กระบี่, ประเทศไทย', 'Krabi, Thailand', 3990.00, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop', 1, 'active'),
('เกาะพีพี & เกาะไม้ไผ่', 'Phi Phi & Bamboo Island', 'ขายดี', 'Best Seller', 'ล่องเรือเร็วสู่เกาะพีพี ชมอ่าวมาหยา และเกาะไม้ไผ่ น้ำใสราวกระจก', 'Speedboat trip to Phi Phi Islands, Maya Bay and crystal clear waters of Bamboo Island', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 5500.00, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop', 2, 'active'),
('แพ็กเกจทัวร์ 3 วัน 2 คืน', '3 Days 2 Nights Package', 'แพ็กเกจสุดคุ้ม', 'Value Package', 'รวมที่พัก อาหาร และทัวร์ครบวงจร พร้อมรถรับส่งสนามบิน', 'All-inclusive package with accommodation, meals, tours and airport transfer', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 25900.00, 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=2000&auto=format&fit=crop', 3, 'active');
