-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 27, 2026 at 10:46 PM
-- Server version: 10.11.14-MariaDB-0+deb12u2-log
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phuketgevalin_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('super_admin','admin') DEFAULT 'admin',
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `email`, `role`, `status`, `last_login`, `created_at`, `updated_at`) VALUES
(2, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@phuketgevalin.com', 'super_admin', 'active', '2026-01-27 22:11:05', '2026-01-19 21:09:49', '2026-01-27 22:11:05');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(10) UNSIGNED NOT NULL,
  `reference_code` varchar(20) NOT NULL,
  `service_type` enum('tour','package_tour','hotel','transfer') NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `booking_date` date NOT NULL,
  `checkout_date` date DEFAULT NULL COMMENT 'For hotel bookings',
  `adults` int(11) NOT NULL DEFAULT 1,
  `children` int(11) NOT NULL DEFAULT 0,
  `pickup_location` varchar(500) DEFAULT NULL,
  `pickup_time` time DEFAULT NULL,
  `flight_number` varchar(50) DEFAULT NULL,
  `special_requests` text DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `payment_status` enum('unpaid','paid','refunded') DEFAULT 'unpaid',
  `admin_notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT 'General Inquiry',
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `admin_reply` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `price_per_night` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rating` decimal(2,1) DEFAULT 0.0,
  `image` varchar(500) DEFAULT NULL,
  `amenities` text DEFAULT NULL COMMENT 'JSON array of amenities',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name_th`, `name_en`, `description_th`, `description_en`, `location`, `address`, `price_per_night`, `rating`, `image`, `amenities`, `status`, `created_at`, `updated_at`) VALUES
(1, 'โรงแรม เดอะ ซูริน ภูเก็ต', 'The Surin Phuket', 'รีสอร์ทหรูริมหาดปันเซีย ที่พักระดับ 5 ดาวพร้อมวิวทะเลอันดามัน', 'Luxury beachfront resort at Pansea Beach, 5-star accommodation with Andaman Sea view', 'Phuket', '118 Moo 3, Choeng Thale, Thalang, Phuket 83110', 18900.00, 4.9, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,สปา,ฟิตเนส,ร้านอาหาร,WiFi ฟรี,หาดส่วนตัว,บัตเลอร์', 'active', '2026-01-20 08:55:11', NULL),
(2, 'โรงแรม อมารี ภูเก็ต', 'Amari Phuket', 'โรงแรมหรูหน้าหาดป่าตอง ใจกลางแหล่งช้อปปิ้งและความบันเทิง', 'Luxury hotel facing Patong Beach, in the heart of shopping and entertainment', 'Patong', '2 Moo 6, Meun-ngern Road, Patong, Phuket 83150', 5500.00, 4.7, 'https://images.unsplash.com/photo-1571896349842-68c8949139f1?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,สปา,ฟิตเนส,ร้านอาหาร 3 แห่ง,WiFi ฟรี,บาร์บนดาดฟ้า', 'active', '2026-01-20 08:55:11', NULL),
(3, 'บันยันทรี ภูเก็ต', 'Banyan Tree Phuket', 'รีสอร์ทหรูสุดพิเศษพร้อมวิลล่าส่วนตัวและสระว่ายน้ำในห้องพัก', 'Ultra-luxury resort with private villas and in-room pools', 'Bang Tao', '33, 33/27 Moo 4, Srisoonthorn Road, Cherngtalay', 25000.00, 4.9, 'https://images.unsplash.com/photo-1512918760513-95f192972701?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำส่วนตัว,สปาระดับโลก,กอล์ฟ,ร้านอาหาร 7 แห่ง,บัตเลอร์ 24 ชม.', 'active', '2026-01-20 08:55:11', NULL),
(4, 'อิบิส ภูเก็ต ป่าตอง', 'Ibis Phuket Patong', 'โรงแรมราคาประหยัดใจกลางป่าตอง ใกล้หาดและถนนบางลา', 'Budget-friendly hotel in the heart of Patong, near beach and Bangla Road', 'Patong', '162 Phang Muang Sai Kor Road, Patong, Phuket 83150', 1800.00, 4.2, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,ร้านอาหาร,WiFi ฟรี,ที่จอดรถ', 'active', '2026-01-20 08:55:11', NULL),
(5, 'ราวี วารินทร์ รีสอร์ท กระบี่', 'Rayavadee Krabi', 'รีสอร์ทหรูท่ามกลางธรรมชาติอ่าวพระนาง ล้อมรอบด้วยหินปูนและทะเล', 'Luxury resort amidst Railay nature, surrounded by limestone cliffs and sea', 'Krabi', '214 Moo 2, Tambon Ao-Nang, Amphur Muang, Krabi 81180', 15500.00, 4.8, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,สปา,ร้านอาหาร 3 แห่ง,กิจกรรมทางน้ำ,WiFi ฟรี', 'active', '2026-01-20 08:55:11', NULL),
(6, 'โฟร์ซีซั่นส์ เกาะสมุย', 'Four Seasons Koh Samui', 'รีสอร์ทวิลล่าหรูบนเนินเขา วิวอ่าวไทยแบบ 360 องศา', 'Luxury hillside villa resort, 360-degree Gulf of Thailand views', 'Koh Samui', '219 Moo 5, Angthong, Koh Samui, Surat Thani 84140', 28000.00, 4.9, 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำส่วนตัว,สปา,ฟิตเนส,โยคะ,ร้านอาหาร,บัตเลอร์', 'active', '2026-01-20 08:55:11', NULL),
(7, 'W เกาะสมุย', 'W Koh Samui', 'รีสอร์ทดีไซน์ทันสมัยริมหาดแม่น้ำ สไตล์คนรุ่นใหม่', 'Modern design resort on Maenam Beach, contemporary style', 'Koh Samui', '4/1 Moo 1, Tambol Maenam, Koh Samui, Surat Thani 84330', 12000.00, 4.7, 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,สปา,WET deck,WOOBAR,ฟิตเนส,กิจกรรมชายหาด', 'active', '2026-01-20 08:55:11', NULL),
(8, 'รอยัล คลิฟ บีช พัทยา', 'Royal Cliff Beach Pattaya', 'รีสอร์ทขนาดใหญ่บนหน้าผาวิวทะเล พร้อมสิ่งอำนวยความสะดวกครบครัน', 'Large resort on cliff with sea view, full facilities', 'Pattaya', '353 Phra Tamnuk Road, Pattaya, Chonburi 20150', 4500.00, 4.6, 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ 7 แห่ง,สปา,ฟิตเนส,ร้านอาหาร 11 แห่ง,บีชคลับ,เทนนิส', 'active', '2026-01-20 08:55:11', NULL),
(9, 'เดอะ เพนนินซูลา กรุงเทพฯ', 'The Peninsula Bangkok', 'โรงแรมหรูริมแม่น้ำเจ้าพระยา พร้อมวิวเมืองกรุงเทพฯ', 'Luxury hotel along Chao Phraya River, Bangkok city views', 'Bangkok', '333 Charoennakorn Road, Klongsan, Bangkok 10600', 8900.00, 4.9, 'https://images.unsplash.com/photo-1565031491338-45f963137636?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำริมแม่น้ำ,สปา,ฟิตเนส,ร้านอาหาร 5 แห่ง,เฮลิแพด,บัตเลอร์', 'active', '2026-01-20 08:55:11', NULL),
(10, 'โฟร์ซีซั่นส์ เชียงใหม่', 'Four Seasons Chiangmai', 'รีสอร์ทท่ามกลางนาข้าวและขุนเขา บรรยากาศล้านนาแท้', 'Resort surrounded by rice paddies and mountains, authentic Lanna atmosphere', 'Chiangmai', 'Mae Rim-Samoeng Old Road, Mae Rim, Chiangmai 50180', 18500.00, 4.9, 'https://images.unsplash.com/photo-1586611292717-f828b167408c?q=80&w=1000&auto=format&fit=crop', 'สระว่ายน้ำ,สปาล้านนา,ฟิตเนส,โยคะ,ทำอาหารไทย,ปั่นจักรยาน', 'active', '2026-01-20 08:55:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_periods`
--

CREATE TABLE `hotel_periods` (
  `id` int(10) UNSIGNED NOT NULL,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_periods`
--

INSERT INTO `hotel_periods` (`id`, `hotel_id`, `start_date`, `end_date`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-01-01', '2025-04-30', 0, 'active', '2026-01-27 11:21:53', '2026-01-27 22:44:17'),
(2, 1, '2025-05-01', '2025-10-31', 1, 'active', '2026-01-27 11:21:53', '2026-01-27 22:44:17'),
(3, 1, '2025-11-01', '2025-12-20', 2, 'active', '2026-01-27 11:21:53', '2026-01-27 22:44:17'),
(4, 1, '2025-12-21', '2025-12-31', 3, 'active', '2026-01-27 11:21:53', '2026-01-27 22:44:18');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_room_prices`
--

CREATE TABLE `hotel_room_prices` (
  `id` int(10) UNSIGNED NOT NULL,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `room_type_id` int(10) UNSIGNED NOT NULL,
  `period_id` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_room_prices`
--

INSERT INTO `hotel_room_prices` (`id`, `hotel_id`, `room_type_id`, `period_id`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1500.00, '2026-01-27 11:22:00', NULL),
(2, 1, 1, 2, 1800.00, '2026-01-27 11:22:00', NULL),
(3, 1, 1, 3, 2500.00, '2026-01-27 11:22:00', NULL),
(4, 1, 1, 4, 3500.00, '2026-01-27 11:22:00', NULL),
(5, 1, 2, 1, 2500.00, '2026-01-27 11:22:00', NULL),
(6, 1, 2, 2, 3000.00, '2026-01-27 11:22:00', NULL),
(7, 1, 2, 3, 4000.00, '2026-01-27 11:22:00', NULL),
(8, 1, 2, 4, 5500.00, '2026-01-27 11:22:00', NULL),
(9, 1, 3, 1, 3500.00, '2026-01-27 11:22:00', NULL),
(10, 1, 3, 2, 4200.00, '2026-01-27 11:22:00', NULL),
(11, 1, 3, 3, 5500.00, '2026-01-27 11:22:00', NULL),
(12, 1, 3, 4, 7500.00, '2026-01-27 11:22:00', NULL),
(13, 1, 4, 1, 5500.00, '2026-01-27 11:22:00', NULL),
(14, 1, 4, 2, 6500.00, '2026-01-27 11:22:00', NULL),
(15, 1, 4, 3, 8500.00, '2026-01-27 11:22:00', NULL),
(16, 1, 4, 4, 12000.00, '2026-01-27 11:22:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_room_types`
--

CREATE TABLE `hotel_room_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `hotel_id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `max_guests` int(11) DEFAULT 2,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_room_types`
--

INSERT INTO `hotel_room_types` (`id`, `hotel_id`, `name_th`, `name_en`, `description_th`, `description_en`, `max_guests`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'ห้องสแตนดาร์ด', 'Standard Room', 'ห้องพักขนาดมาตรฐาน พร้อมสิ่งอำนวยความสะดวกครบครัน', 'Standard room with full amenities', 2, 1, 'active', '2026-01-27 11:21:47', NULL),
(2, 1, 'ห้องดีลักซ์', 'Deluxe Room', 'ห้องพักขนาดใหญ่ วิวสวน พร้อมระเบียงส่วนตัว', 'Spacious room with garden view and private balcony', 2, 2, 'active', '2026-01-27 11:21:47', NULL),
(3, 1, 'ห้องซูพีเรีย', 'Superior Room', 'ห้องพักหรู วิวทะเล พร้อมอ่างอาบน้ำ', 'Luxury room with sea view and bathtub', 3, 3, 'active', '2026-01-27 11:21:47', NULL),
(4, 1, 'ห้องสวีท', 'Suite Room', 'ห้องสวีทขนาดใหญ่ มีห้องนั่งเล่นแยก วิวทะเลพาโนรามา', 'Large suite with separate living area and panoramic sea view', 4, 4, 'active', '2026-01-27 11:21:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `oneday_trips`
--

CREATE TABLE `oneday_trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `location_th` varchar(255) DEFAULT NULL,
  `location_en` varchar(255) DEFAULT NULL,
  `province_key` varchar(50) NOT NULL DEFAULT 'phuket' COMMENT 'Province key for filtering',
  `duration_th` varchar(100) DEFAULT NULL COMMENT 'e.g. ทั้งวัน, ครึ่งวัน',
  `duration_en` varchar(100) DEFAULT NULL COMMENT 'e.g. Full Day, Half Day',
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_price` decimal(10,2) DEFAULT NULL COMMENT 'Original price before discount',
  `image` varchar(500) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of image URLs' CHECK (json_valid(`gallery`)),
  `rating` decimal(2,1) DEFAULT 4.5,
  `reviews` int(11) DEFAULT 0,
  `bestseller` tinyint(1) DEFAULT 0,
  `tags_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of tags in Thai' CHECK (json_valid(`tags_th`)),
  `tags_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of tags in English' CHECK (json_valid(`tags_en`)),
  `highlights_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of highlights in Thai' CHECK (json_valid(`highlights_th`)),
  `highlights_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of highlights in English' CHECK (json_valid(`highlights_en`)),
  `itinerary` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of {time, title_th, title_en, description_th, description_en}' CHECK (json_valid(`itinerary`)),
  `included_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'What is included (Thai)' CHECK (json_valid(`included_th`)),
  `included_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'What is included (English)' CHECK (json_valid(`included_en`)),
  `excluded_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'What is not included (Thai)' CHECK (json_valid(`excluded_th`)),
  `excluded_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'What is not included (English)' CHECK (json_valid(`excluded_en`)),
  `meeting_point_th` varchar(500) DEFAULT NULL,
  `meeting_point_en` varchar(500) DEFAULT NULL,
  `important_info_th` text DEFAULT NULL,
  `important_info_en` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oneday_trips`
--

INSERT INTO `oneday_trips` (`id`, `title_th`, `title_en`, `description_th`, `description_en`, `location_th`, `location_en`, `province_key`, `duration_th`, `duration_en`, `price`, `discount_price`, `image`, `gallery`, `rating`, `reviews`, `bestseller`, `tags_th`, `tags_en`, `highlights_th`, `highlights_en`, `itinerary`, `included_th`, `included_en`, `excluded_th`, `excluded_en`, `meeting_point_th`, `meeting_point_en`, `important_info_th`, `important_info_en`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ทัวร์เกาะพีพี และอ่าวมาหยา เรือสปีดโบ๊ท Test', 'Phi Phi Island &amp;amp;amp;amp;amp;amp; Maya Bay Speedboat Tour', 'สัมผัสประสบการณ์สุดพิเศษ ล่องเรือสปีดโบ๊ทชมความงดงามของหมู่เกาะพีพี อ่าวมาหยาที่โด่งดัง และดำน้ำดูปะการังน้ำใส', 'Experience an unforgettable speedboat journey to the stunning Phi Phi Islands, visit the famous Maya Bay, and enjoy snorkeling in crystal clear waters.', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 'phuket', 'ทั้งวัน (8-9 ชม.)', 'Full Day (8-9 hours)', 2490.00, 3500.00, '/api/uploads/oneday_trips/69702bf1ab4fd_1768958961.jpg', '[\"\\/api\\/uploads\\/oneday_trips\\/69702bead91f9_1768958954.jpg\",\"\\/api\\/uploads\\/oneday_trips\\/69702bea8c33b_1768958954.jpg\",\"\\/api\\/uploads\\/oneday_trips\\/69702bf1e46cf_1768958961.jpg\"]', 4.9, 856, 1, '[\"เรือสปีดโบ๊ท\",\"ดำน้ำตื้น\",\"อาหารกลางวัน\",\"รับส่งฟรี\"]', '[\"Speedboat\",\"Snorkeling\",\"Lunch Included\",\"Free Pickup\"]', '[\"ชมอ่าวมาหยาที่โด่งดังจากภาพยนตร์ The Beach\",\"ดำน้ำชมปะการังที่เกาะไผ่\",\"เที่ยวชมถ้ำไวกิ้งและอ่าวปิเละ\",\"พักผ่อนบนหาดทรายขาว\",\"test\"]', '[\"Visit the famous Maya Bay from The Beach movie\",\"Snorkeling at Bamboo Island\",\"Explore Viking Cave and Pileh Lagoon\",\"Relax on white sandy beaches TestTestTestTestTest\",\"test\"]', '[{\"time\":\"07:30\",\"title_th\":\"รับจากโรงแรม\",\"title_en\":\"Hotel Pickup\",\"description_th\":\"รถตู้ปรับอากาศรับจากโรงแรมในภูเก็ต\",\"description_en\":\"Air-conditioned van pickup from your hotel in Phuket\"},{\"time\":\"08:30\",\"title_th\":\"ออกเดินทางจากท่าเรือ\",\"title_en\":\"Departure from Pier\",\"description_th\":\"ขึ้นเรือสปีดโบ๊ทที่ท่าเรือรัษฎา\",\"description_en\":\"Board speedboat at Rassada Pier\"},{\"time\":\"09:30\",\"title_th\":\"เกาะไผ่\",\"title_en\":\"Bamboo Island\",\"description_th\":\"ดำน้ำดูปะการังและพักผ่อนบนชายหาด\",\"description_en\":\"Snorkeling and beach relaxation\"},{\"time\":\"11:00\",\"title_th\":\"อ่าวมาหยา\",\"title_en\":\"Maya Bay\",\"description_th\":\"ชมอ่าวมาหยาที่โด่งดัง ถ่ายรูปและเดินชายหาด\",\"description_en\":\"Visit the famous Maya Bay, photo opportunities\"},{\"time\":\"12:30\",\"title_th\":\"อาหารกลางวัน\",\"title_en\":\"Lunch\",\"description_th\":\"อาหารบุฟเฟ่ต์ที่เกาะพีพีดอน\",\"description_en\":\"Buffet lunch at Phi Phi Don\"},{\"time\":\"14:00\",\"title_th\":\"อ่าวปิเละ & ถ้ำไวกิ้ง\",\"title_en\":\"Pileh Lagoon & Viking Cave\",\"description_th\":\"ชมความงามของอ่าวปิเละและถ้ำไวกิ้ง\",\"description_en\":\"Explore Pileh Lagoon and Viking Cave\"},{\"time\":\"15:30\",\"title_th\":\"เดินทางกลับ\",\"title_en\":\"Return Journey\",\"description_th\":\"เรือออกเดินทางกลับภูเก็ต\",\"description_en\":\"Speedboat departs back to Phuket\"},{\"time\":\"17:00\",\"title_th\":\"ถึงภูเก็ต\",\"title_en\":\"Arrive Phuket\",\"description_th\":\"ส่งกลับโรงแรม\",\"description_en\":\"Transfer back to hotel\"},{\"time\":\"test\",\"title_th\":\"test\",\"title_en\":\"test\",\"description_th\":\"test\",\"description_en\":\"test\"}]', '[\"รถรับส่งจากโรงแรม\",\"เรือสปีดโบ๊ท\",\"อุปกรณ์ดำน้ำตื้น\",\"อาหารกลางวัน + เครื่องดื่ม\",\"ค่าธรรมเนียมอุทยาน\",\"ประกันการเดินทาง\",\"ไกด์พูดไทย\\/อังกฤษ\",\"test\"]', '[\"Hotel pickup and drop-off\",\"Speedboat transportation\",\"Snorkeling equipment\",\"Lunch + drinks\",\"National park fees\",\"Travel insurance\",\"Thai\\/English guide\",\"test\"]', '[\"ค่าใช้จ่ายส่วนตัว\",\"ทิปไกด์และคนขับ\",\"เครื่องดื่มแอลกอฮอล์\",\"test\"]', '[\"Personal expenses\",\"Tips for guide and driver\",\"Alcoholic beverages\",\"test\"]', '', '', 'test', 'test', 1, 'active', '2026-01-19 22:50:23', '2026-01-21 08:29:34'),
(2, 'ทัวร์ 4 เกาะกระบี่', '4 Islands Krabi Tour', 'เที่ยวครบ 4 เกาะสวย ทะเลแหวก เกาะไก่ เกาะทับ เกาะปอดะ ดำน้ำดูปะการัง พร้อมอาหารกลางวัน', 'Visit 4 beautiful islands: Tub Island, Chicken Island, Poda Island, and the famous Separated Sea. Snorkeling included with lunch.', 'กระบี่, ประเทศไทย', 'Krabi, Thailand', 'krabi', 'ทั้งวัน (7-8 ชม.)', 'Full Day (7-8 hours)', 990.00, 1500.00, '/api/uploads/oneday_trips/69702c10920f9_1768958992.jpg', '[\"\\/api\\/uploads\\/oneday_trips\\/69702c10e2aad_1768958992.jpg\",\"\\/api\\/uploads\\/oneday_trips\\/69702c116c02d_1768958993.jpg\",\"\\/api\\/uploads\\/oneday_trips\\/69702c11adb39_1768958993.jpg\",\"\\/api\\/uploads\\/oneday_trips\\/69702c11ec0b6_1768958993.jpg\"]', 4.8, 1120, 1, '[\"เรือหางยาว\",\"ทะเลแหวก\",\"ดำน้ำตื้น\",\"อาหารกลางวัน\"]', '[\"Longtail Boat\",\"Separated Sea\",\"Snorkeling\",\"Lunch\"]', '[\"เดินบนทะเลแหวก ปรากฏการณ์ธรรมชาติสุดมหัศจรรย์\",\"ถ่ายรูปกับเกาะไก่รูปทรงแปลกตา\",\"ดำน้ำดูปะการังที่เกาะปอดะ\",\"พักผ่อนบนหาดทรายขาวละเอียด\"]', '[\"Walk on the amazing Separated Sea natural phenomenon\",\"Photo with unique Chicken Island rock formation\",\"Snorkeling at Poda Island coral reef\",\"Relax on fine white sandy beach\"]', '[{\"time\":\"08:00\",\"title_th\":\"รับจากที่พัก\",\"title_en\":\"Hotel Pickup\",\"description_th\":\"รถตู้รับจากที่พักในกระบี่\",\"description_en\":\"Van pickup from Krabi hotel\"},{\"time\":\"09:00\",\"title_th\":\"ออกเดินทาง\",\"title_en\":\"Departure\",\"description_th\":\"ขึ้นเรือหางยาวที่อ่าวนาง\",\"description_en\":\"Board longtail boat at Ao Nang\"},{\"time\":\"09:30\",\"title_th\":\"เกาะทับ - ทะเลแหวก\",\"title_en\":\"Tub Island - Separated Sea\",\"description_th\":\"เดินบนทะเลแหวก เชื่อมเกาะทับและเกาะไก่\",\"description_en\":\"Walk on Separated Sea connecting Tub and Chicken Island\"},{\"time\":\"11:00\",\"title_th\":\"เกาะปอดะ\",\"title_en\":\"Poda Island\",\"description_th\":\"ดำน้ำดูปะการังและพักผ่อนบนหาด\",\"description_en\":\"Snorkeling and beach relaxation\"},{\"time\":\"12:30\",\"title_th\":\"อาหารกลางวัน\",\"title_en\":\"Lunch\",\"description_th\":\"อาหารกล่องบนเกาะ\",\"description_en\":\"Lunch box on the island\"},{\"time\":\"14:00\",\"title_th\":\"เกาะไก่\",\"title_en\":\"Chicken Island\",\"description_th\":\"ถ่ายรูปและว่ายน้ำรอบเกาะ\",\"description_en\":\"Photo and swimming around the island\"},{\"time\":\"15:30\",\"title_th\":\"เดินทางกลับ\",\"title_en\":\"Return\",\"description_th\":\"เรือกลับอ่าวนาง\",\"description_en\":\"Boat returns to Ao Nang\"},{\"time\":\"16:30\",\"title_th\":\"ส่งกลับที่พัก\",\"title_en\":\"Hotel Drop-off\",\"description_th\":\"รถตู้ส่งกลับที่พัก\",\"description_en\":\"Van transfer back to hotel\"}]', '[\"รถรับส่งจากที่พัก\",\"เรือหางยาว\",\"อุปกรณ์ดำน้ำตื้น\",\"อาหารกลางวัน + น้ำดื่ม\",\"ค่าธรรมเนียมอุทยาน\",\"ประกันการเดินทาง\"]', '[\"Hotel pickup and drop-off\",\"Longtail boat\",\"Snorkeling equipment\",\"Lunch + drinking water\",\"National park fees\",\"Travel insurance\"]', '[\"ค่าใช้จ่ายส่วนตัว\",\"ทิปไกด์\",\"เครื่องดื่มเพิ่มเติม\"]', '[\"Personal expenses\",\"Guide tips\",\"Additional drinks\"]', '', '', '', '', 2, 'active', '2026-01-19 22:50:23', '2026-01-21 08:29:57'),
(3, 'ทัวร์อยุธยา เมืองมรดกโลก', 'Ayutthaya World Heritage Tour', 'เยือนอดีตราชธานีเก่าแก่ ชมวัดและโบราณสถานที่ได้รับการขึ้นทะเบียนเป็นมรดกโลก', 'Visit the ancient capital and UNESCO World Heritage Site. Explore historic temples and ruins.', 'พระนครศรีอยุธยา, ประเทศไทย', 'Ayutthaya, Thailand', 'ayutthaya', 'ทั้งวัน (9-10 ชม.)', 'Full Day (9-10 hours)', 890.00, 1290.00, 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop', NULL, 4.7, 342, 0, '[\"มรดกโลก\", \"ประวัติศาสตร์\", \"วัดเก่าแก่\", \"รถตู้ปรับอากาศ\"]', '[\"UNESCO Heritage\", \"Historical\", \"Ancient Temples\", \"AC Van\"]', '[\"ชมวัดมหาธาตุ เศียรพระในรากไม้\", \"เยือนวัดใหญ่ชัยมงคล เจดีย์ยักษ์\", \"ชมพระราชวังบางปะอิน สถาปัตยกรรมผสมผสาน\", \"ล่องเรือชมวิถีชีวิตริมน้ำ\"]', '[\"See Wat Mahathat Buddha head in tree roots\", \"Visit Wat Yai Chai Mongkol giant pagoda\", \"Explore Bang Pa-In Palace mixed architecture\", \"Boat cruise along the river\"]', '[{\"time\":\"07:00\",\"title_th\":\"รับจากกรุงเทพ\",\"title_en\":\"Bangkok Pickup\",\"description_th\":\"รถตู้ปรับอากาศรับจากโรงแรม\",\"description_en\":\"AC van pickup from Bangkok hotel\"},{\"time\":\"09:00\",\"title_th\":\"วัดมหาธาตุ\",\"title_en\":\"Wat Mahathat\",\"description_th\":\"ชมเศียรพระพุทธรูปในรากต้นโพธิ์\",\"description_en\":\"See Buddha head entwined in tree roots\"},{\"time\":\"10:30\",\"title_th\":\"วัดพระศรีสรรเพชญ์\",\"title_en\":\"Wat Phra Si Sanphet\",\"description_th\":\"เจดีย์ 3 องค์ เคยเป็นวัดในพระราชวัง\",\"description_en\":\"Three pagodas, former royal temple\"},{\"time\":\"12:00\",\"title_th\":\"อาหารกลางวัน\",\"title_en\":\"Lunch\",\"description_th\":\"อาหารไทยท้องถิ่น\",\"description_en\":\"Local Thai lunch\"},{\"time\":\"13:30\",\"title_th\":\"วัดใหญ่ชัยมงคล\",\"title_en\":\"Wat Yai Chai Mongkol\",\"description_th\":\"พระเจดีย์องค์ใหญ่และพระพุทธไสยาสน์\",\"description_en\":\"Large pagoda and reclining Buddha\"},{\"time\":\"15:00\",\"title_th\":\"พระราชวังบางปะอิน\",\"title_en\":\"Bang Pa-In Palace\",\"description_th\":\"พระราชวังฤดูร้อนอันงดงาม\",\"description_en\":\"Beautiful summer palace\"},{\"time\":\"17:00\",\"title_th\":\"เดินทางกลับ\",\"title_en\":\"Return Journey\",\"description_th\":\"ออกเดินทางกลับกรุงเทพ\",\"description_en\":\"Depart back to Bangkok\"},{\"time\":\"19:00\",\"title_th\":\"ถึงกรุงเทพ\",\"title_en\":\"Arrive Bangkok\",\"description_th\":\"ส่งกลับโรงแรม\",\"description_en\":\"Hotel drop-off\"}]', '[\"รถตู้ปรับอากาศ\", \"อาหารกลางวัน\", \"ค่าเข้าชมสถานที่\", \"น้ำดื่ม\", \"ไกด์ท้องถิ่น\", \"ประกันการเดินทาง\"]', '[\"Air-conditioned van\", \"Lunch\", \"Entrance fees\", \"Drinking water\", \"Local guide\", \"Travel insurance\"]', '[\"ค่าใช้จ่ายส่วนตัว\", \"ทิปไกด์\", \"เครื่องดื่มเพิ่มเติม\"]', '[\"Personal expenses\", \"Guide tips\", \"Additional drinks\"]', NULL, NULL, NULL, NULL, 3, 'active', '2026-01-19 22:50:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `package_tours`
--

CREATE TABLE `package_tours` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `location` varchar(255) DEFAULT '',
  `airline` varchar(255) DEFAULT '',
  `location_th` varchar(255) DEFAULT '',
  `location_en` varchar(255) DEFAULT '',
  `duration_th` varchar(100) DEFAULT '',
  `duration_en` varchar(100) DEFAULT '',
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `category` varchar(100) NOT NULL COMMENT 'island, adventure, cultural, etc.',
  `image` varchar(500) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `rating` decimal(2,1) DEFAULT 4.5,
  `reviews` int(11) DEFAULT 0,
  `bestseller` tinyint(1) DEFAULT 0,
  `tags_th` text DEFAULT NULL,
  `tags_en` text DEFAULT NULL,
  `highlights_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`highlights_th`)),
  `highlights_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`highlights_en`)),
  `duration` varchar(100) DEFAULT NULL COMMENT 'e.g. Full Day, Half Day',
  `includes` text DEFAULT NULL COMMENT 'What is included in the tour',
  `highlights` text DEFAULT NULL COMMENT 'Tour highlights',
  `itinerary` text DEFAULT NULL COMMENT 'Tour schedule',
  `included_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`included_th`)),
  `included_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`included_en`)),
  `excluded_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`excluded_th`)),
  `excluded_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`excluded_en`)),
  `meeting_point_th` text DEFAULT '',
  `meeting_point_en` text DEFAULT '',
  `important_info_th` text DEFAULT '',
  `important_info_en` text DEFAULT '',
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `included` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`included`)),
  `excluded` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`excluded`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_tours`
--

INSERT INTO `package_tours` (`id`, `name_th`, `name_en`, `description_th`, `description_en`, `location`, `airline`, `location_th`, `location_en`, `duration_th`, `duration_en`, `price`, `discount_price`, `category`, `image`, `gallery`, `rating`, `reviews`, `bestseller`, `tags_th`, `tags_en`, `highlights_th`, `highlights_en`, `duration`, `includes`, `highlights`, `itinerary`, `included_th`, `included_en`, `excluded_th`, `excluded_en`, `meeting_point_th`, `meeting_point_en`, `important_info_th`, `important_info_en`, `sort_order`, `status`, `created_at`, `updated_at`, `included`, `excluded`) VALUES
(1, 'ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน', 'Chiangmai Doi Inthanon 3D2N Tour', 'สัมผัสธรรมชาติและวัฒนธรรมล้านนาอย่างใกล้ชิด พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย ชมทะเลหมอกยามเช้า สักการะพระธาตุดอยสุเทพ เดินชมวัดเก่าแก่ และช้อปปิ้งย่านนิมมาน', 'Experience Lanna nature and culture up close. Conquer Doi Inthanon, the highest peak in Thailand. Watch the morning sea of mist, pay respect at Wat Phra That Doi Suthep, explore ancient temples, and shop at Nimman area.', 'เชียงใหม่, ประเทศไทย', '', '', '', '', '', 5990.00, 6990.00, 'domestic', 'https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop', '[\"https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1598935898639-81586f7d2129?q=80&w=1000&auto=format&fit=crop\"]', 4.8, 256, 1, NULL, NULL, '[\"พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย\", \"สักการะพระธาตุดอยสุเทพ วัดศักดิ์สิทธิ์คู่เมืองเชียงใหม่\", \"ชมน้ำตกวชิรธาร น้ำตกที่สวยที่สุดในภาคเหนือ\", \"ชมทะเลหมอกยามเช้าบนดอย\", \"เดินเล่นย่านนิมมาน คาเฟ่และร้านเก๋ๆ\"]', '[\"Conquer Doi Inthanon, the highest peak in Thailand\", \"Pay respect at Wat Phra That Doi Suthep, the sacred temple of Chiang Mai\", \"Visit Wachirathan Waterfall, the most beautiful waterfall in Northern Thailand\", \"Watch the morning sea of mist on the mountain\", \"Explore Nimman area with trendy cafes and shops\"]', '3 วัน 2 คืน', NULL, NULL, '[{\"day\": \"01\", \"title_th\": \"กรุงเทพฯ - เชียงใหม่ - วัดพระธาตุดอยสุเทพ\", \"title_en\": \"Bangkok - Chiang Mai - Wat Doi Suthep\", \"description_th\": \"เดินทางถึงเชียงใหม่ช่วงเช้า นำท่านขึ้นสักการะพระธาตุดอยสุเทพ ชมวิวเมืองเชียงใหม่จากมุมสูง จากนั้นรับประทานอาหารกลางวันแบบขันโตก ช่วงบ่ายเดินชมวัดเจดีย์หลวง วัดพระสิงห์ และเที่ยวตลาดวโรรส ค่ำรับประทานอาหารเย็นพร้อมชมการแสดงพื้นเมือง\", \"description_en\": \"Arrive in Chiang Mai in the morning. Visit Wat Phra That Doi Suthep and enjoy panoramic city views. Have Khantoke lunch. In the afternoon, explore Wat Chedi Luang, Wat Phra Singh, and Warorot Market. Dinner with traditional Lanna performance.\", \"meals\": {\"b\": false, \"l\": true, \"d\": true, \"note\": \"อาหารกลางวันขันโตก\"}, \"accommodation\": \"โรงแรม 4 ดาวในตัวเมืองเชียงใหม่\"}, {\"day\": \"02\", \"title_th\": \"ดอยอินทนนท์ - น้ำตกวชิรธาร - พระมหาธาตุเจดีย์\", \"title_en\": \"Doi Inthanon - Wachirathan Waterfall - Twin Pagodas\", \"description_th\": \"ออกเดินทางแต่เช้าสู่อุทยานแห่งชาติดอยอินทนนท์ ชมทะเลหมอกและพระอาทิตย์ขึ้นที่กิ่วแม่ปาน พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย (2,565 เมตร) สักการะพระมหาธาตุนภเมทนีดล และพระมหาธาตุนภพลภูมิสิริ ชมน้ำตกวชิรธาร และเดินศึกษาธรรมชาติเส้นทางกิ่วแม่ปาน\", \"description_en\": \"Early departure to Doi Inthanon National Park. Watch the sea of mist and sunrise at Kew Mae Pan. Conquer Doi Inthanon summit, Thailand\'s highest point (2,565m). Visit the Twin Royal Pagodas. See Wachirathan Waterfall and walk the Kew Mae Pan Nature Trail.\", \"meals\": {\"b\": true, \"l\": true, \"d\": true, \"note\": \"\"}, \"accommodation\": \"โรงแรม 4 ดาวในตัวเมืองเชียงใหม่\"}, {\"day\": \"03\", \"title_th\": \"วัดอุโมงค์ - ย่านนิมมาน - กรุงเทพฯ\", \"title_en\": \"Wat Umong - Nimman Area - Bangkok\", \"description_th\": \"ช่วงเช้าชมวัดอุโมงค์ วัดเก่าแก่กว่า 700 ปี มีอุโมงค์ใต้ดินเป็นเอกลักษณ์ จากนั้นเดินเล่นช้อปปิ้งย่านนิมมาน แหล่งรวมคาเฟ่และร้านค้าเก๋ๆ รับประทานอาหารกลางวันอิสระตามอัธยาศัย ก่อนเดินทางกลับกรุงเทพฯ\", \"description_en\": \"Morning visit to Wat Umong, a 700-year-old temple famous for its underground tunnels. Then explore Nimman area with trendy cafes and unique shops. Free lunch on your own before returning to Bangkok.\", \"meals\": {\"b\": true, \"l\": false, \"d\": false, \"note\": \"อิสระมื้อกลางวัน\"}, \"accommodation\": \"\"}]', '[\"รถตู้ปรับอากาศ VIP ตลอดการเดินทาง\", \"ที่พักโรงแรม 4 ดาว 2 คืน (พักห้องละ 2 ท่าน)\", \"อาหารตามรายการ (5 มื้อ)\", \"ค่าธรรมเนียมเข้าชมสถานที่ทุกแห่ง\", \"ไกด์ท้องถิ่นผู้ชำนาญ\", \"น้ำดื่มและผ้าเย็นบริการตลอดทาง\", \"ประกันการเดินทาง วงเงิน 1,000,000 บาท\"]', '[\"VIP air-conditioned van throughout the trip\", \"4-star hotel accommodation for 2 nights (twin sharing)\", \"Meals as per itinerary (5 meals)\", \"All entrance fees\", \"Professional local guide\", \"Drinking water and cold towels\", \"Travel insurance coverage 1,000,000 Baht\"]', '[\"ค่าใช้จ่ายส่วนตัวอื่นๆ\", \"ทิปไกด์และคนขับ (300 บาท/ท่าน)\", \"อาหารและเครื่องดื่มนอกเหนือรายการ\", \"ค่าธรรมเนียมสำหรับชาวต่างชาติ (ถ้ามี)\"]', '[\"Personal expenses\", \"Tips for guide and driver (300 Baht/person)\", \"Food and drinks not mentioned in itinerary\", \"Additional fees for foreign nationals (if any)\"]', 'จุดนัดพบ: ปั๊ม ปตท. วิภาวดีรังสิต หรือรับที่โรงแรมในกรุงเทพฯ (เขตชั้นใน)', 'Meeting point: PTT Gas Station Vibhavadi or hotel pickup in Bangkok (inner area)', 'กรุณาเตรียมเสื้อกันหนาวสำหรับขึ้นดอยอินทนนท์ (อุณหภูมิประมาณ 5-15 องศา) / แนะนำใส่รองเท้าผ้าใบสำหรับเดินป่า / โปรแกรมอาจมีการปรับเปลี่ยนตามสภาพอากาศ', 'Please bring warm clothing for Doi Inthanon (temperature around 5-15°C) / Sneakers recommended for nature walks / Program may change according to weather conditions', 0, 'active', '2026-01-22 13:50:16', NULL, NULL, NULL),
(2, 'ทัวร์ภูเก็ต พังงา เกาะพีพี 4 วัน 3 คืน', 'Phuket Phang Nga Phi Phi 4D3N Tour', 'เที่ยวครบทะเลอันดามัน! ชมเกาะเจมส์บอนด์ที่อ่าวพังงา ดำน้ำดูปะการังเกาะพีพี ถ่ายรูปอ่าวมาหยาสุดอินเทรนด์ ล่องเรือชมพระอาทิตย์ตกที่แหลมพรหมเทพ พร้อมช้อปปิ้งถนนบางลา', 'Complete Andaman Sea experience! Visit James Bond Island at Phang Nga Bay, snorkel at Phi Phi Island, capture photos at the iconic Maya Bay, cruise at sunset at Promthep Cape, and shop at Bangla Road.', 'ภูเก็ต, ประเทศไทย', '', '', '', '', '', 8990.00, 10990.00, 'domestic', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop', '[\"https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=1000&auto=format&fit=crop\"]', 4.9, 384, 1, NULL, NULL, '[\"ชมเกาะเจมส์บอนด์ เกาะเขาพิงกันอันโด่งดัง\", \"ดำน้ำดูปะการังน้ำใสที่เกาะพีพี\", \"ถ่ายรูปอ่าวมาหยาที่โด่งดังจากหนัง The Beach\", \"พายเรือคายัคในถ้ำลอดอ่าวพังงา\", \"ชมพระอาทิตย์ตกที่แหลมพรหมเทพ\", \"ช้อปปิ้งและเดินเล่นถนนบางลา\"]', '[\"Visit James Bond Island, the famous Khao Phing Kan\", \"Snorkeling in crystal clear water at Phi Phi Island\", \"Photo at the iconic Maya Bay from The Beach movie\", \"Kayaking through sea caves at Phang Nga Bay\", \"Sunset at Promthep Cape\", \"Shopping and nightlife at Bangla Road\"]', '4 วัน 3 คืน', NULL, NULL, '[{\"day\": \"01\", \"title_th\": \"กรุงเทพฯ - ภูเก็ต - แหลมพรหมเทพ\", \"title_en\": \"Bangkok - Phuket - Promthep Cape\", \"description_th\": \"เดินทางถึงภูเก็ต นำท่านรับประทานอาหารกลางวันอาหารใต้ขึ้นชื่อ จากนั้นชมวัดฉลอง ไหว้หลวงพ่อแช่ม เที่ยวชมย่านเมืองเก่าภูเก็ต ถ่ายรูปบ้านชิโนโปรตุกีส ช่วงเย็นชมพระอาทิตย์ตกที่แหลมพรหมเทพ แวะช้อปปิ้งที่ Central Festival Phuket\", \"description_en\": \"Arrive in Phuket. Enjoy famous Southern Thai cuisine for lunch. Visit Wat Chalong to pay respect to Luang Por Chaem. Explore Phuket Old Town with Sino-Portuguese architecture. Evening sunset at Promthep Cape and shopping at Central Festival Phuket.\", \"meals\": {\"b\": false, \"l\": true, \"d\": true, \"note\": \"\"}, \"accommodation\": \"โรงแรม 4 ดาว หาดป่าตอง\"}, {\"day\": \"02\", \"title_th\": \"อ่าวพังงา - เกาะเจมส์บอนด์ - ถ้ำลอด\", \"title_en\": \"Phang Nga Bay - James Bond Island - Sea Cave\", \"description_th\": \"ออกเดินทางสู่อ่าวพังงา ล่องเรือชมทิวทัศน์เกาะหินปูนกลางทะเล ชมเกาะเขาพิงกัน (เกาะเจมส์บอนด์) จากภาพยนตร์ The Man with the Golden Gun พายเรือคายัคลอดถ้ำ ชมหมู่บ้านชาวเลเกาะปันหยี รับประทานอาหารกลางวันซีฟู้ดสดๆ\", \"description_en\": \"Depart to Phang Nga Bay. Cruise among limestone karsts. Visit Khao Phing Kan (James Bond Island) from \'The Man with the Golden Gun\'. Kayak through sea caves. Visit the floating Muslim village at Koh Panyi. Fresh seafood lunch.\", \"meals\": {\"b\": true, \"l\": true, \"d\": true, \"note\": \"ซีฟู้ดสดที่เกาะปันหยี\"}, \"accommodation\": \"โรงแรม 4 ดาว หาดป่าตอง\"}, {\"day\": \"03\", \"title_th\": \"เกาะพีพี - อ่าวมาหยา - เกาะไผ่\", \"title_en\": \"Phi Phi Island - Maya Bay - Bamboo Island\", \"description_th\": \"เรือสปีดโบ๊ทนำท่านสู่เกาะพีพี ชมอ่าวมาหยาที่โด่งดังจากภาพยนตร์ The Beach ดำน้ำดูปะการังและปลาสีสันสดใสที่อ่าวปิเละ ลอดถ้ำไวกิ้ง พักผ่อนบนหาดทรายขาวเกาะไผ่ เล่นน้ำทะเลใสราวกระจก\", \"description_en\": \"Speedboat to Phi Phi Islands. Visit the famous Maya Bay from \'The Beach\' movie. Snorkeling at colorful coral reefs at Pileh Lagoon. See Viking Cave. Relax on the white sandy beach of Bamboo Island with crystal clear water.\", \"meals\": {\"b\": true, \"l\": true, \"d\": true, \"note\": \"อาหารกลางวันบนเกาะ\"}, \"accommodation\": \"โรงแรม 4 ดาว หาดป่าตอง\"}, {\"day\": \"04\", \"title_th\": \"อิสระ - กรุงเทพฯ\", \"title_en\": \"Free Time - Bangkok\", \"description_th\": \"ช่วงเช้าอิสระตามอัธยาศัย แนะนำเที่ยวชมวัดพระทอง นั่งช้าง หรือพักผ่อนที่ชายหาด ก่อนเดินทางกลับกรุงเทพฯ พร้อมความประทับใจ\", \"description_en\": \"Free morning at leisure. Recommend visiting Wat Phra Thong, elephant trekking, or relaxing at the beach before returning to Bangkok with wonderful memories.\", \"meals\": {\"b\": true, \"l\": false, \"d\": false, \"note\": \"อิสระมื้อกลางวัน\"}, \"accommodation\": \"\"}]', '[\"รถตู้ปรับอากาศ VIP\", \"ที่พักโรงแรม 4 ดาว 3 คืน\", \"เรือสปีดโบ๊ทท่องเที่ยวเกาะพีพี\", \"เรือหางยาวอ่าวพังงา\", \"อุปกรณ์ดำน้ำตื้น\", \"อาหาร 9 มื้อตามรายการ\", \"ค่าธรรมเนียมอุทยานแห่งชาติ\", \"ไกด์มืออาชีพตลอดทริป\", \"ประกันการเดินทาง\"]', '[\"VIP air-conditioned van\", \"4-star hotel for 3 nights\", \"Speedboat to Phi Phi Island\", \"Longtail boat at Phang Nga Bay\", \"Snorkeling equipment\", \"9 meals as per itinerary\", \"National park entrance fees\", \"Professional guide throughout\", \"Travel insurance\"]', '[\"ค่าใช้จ่ายส่วนตัว\", \"ทิปไกด์และคนขับ (400 บาท/ท่าน)\", \"กิจกรรมเสริมอื่นๆ\", \"มินิบาร์ในห้องพัก\"]', '[\"Personal expenses\", \"Tips for guide and driver (400 Baht/person)\", \"Optional activities\", \"Minibar in room\"]', 'จุดนัดพบ: สนามบินภูเก็ต หรือรับจากโรงแรมในภูเก็ต', 'Meeting point: Phuket Airport or hotel pickup in Phuket', 'กรุณาเตรียมชุดว่ายน้ำ ครีมกันแดด และยากันเมาเรือ / ไม่แนะนำสำหรับผู้ที่ตั้งครรภ์หรือมีโรคหัวใจ / โปรแกรมอาจเปลี่ยนแปลงตามสภาพอากาศและคลื่นทะเล', 'Please bring swimwear, sunscreen, and motion sickness pills / Not recommended for pregnant women or those with heart conditions / Program may change according to weather and sea conditions', 0, 'active', '2026-01-22 13:50:16', NULL, NULL, NULL),
(3, 'ทัวร์กระบี่ เกาะลันตา 4 เกาะ 3 วัน 2 คืน', 'Krabi Koh Lanta 4 Islands 3D2N Tour', 'เที่ยวครบกระบี่! เดินบนทะเลแหวกปรากฏการณ์ธรรมชาติมหัศจรรย์ ดำน้ำดูปะการัง 4 เกาะสวย ชิลล์ที่เกาะลันตา ชมถ้ำพระนางและหาดไร่เลย์ สวรรค์ของนักปีนผา', 'Complete Krabi experience! Walk on the Separated Sea natural phenomenon, snorkel at 4 beautiful islands, chill at Koh Lanta, explore Phra Nang Cave and Railay Beach, paradise for rock climbers.', 'กระบี่, ประเทศไทย', '', '', '', '', '', 6490.00, 7490.00, 'domestic', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop', '[\"https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1000&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1000&auto=format&fit=crop\"]', 4.7, 198, 0, NULL, NULL, '[\"เดินบนทะเลแหวก ปรากฏการณ์ธรรมชาติสุดมหัศจรรย์\", \"ดำน้ำดูปะการัง 4 เกาะสวย (ทับ ไก่ ปอดะ หม้อ)\", \"พักผ่อนบนเกาะลันตา บรรยากาศสงบเงียบ\", \"ชมถ้ำพระนางและหาดไร่เลย์สุดสวย\", \"ถ่ายรูปกับเกาะไก่รูปร่างแปลกตา\"]', '[\"Walk on the Separated Sea, amazing natural phenomenon\", \"Snorkeling at 4 beautiful islands (Tub, Chicken, Poda, Mor)\", \"Relax at Koh Lanta with peaceful atmosphere\", \"Explore Phra Nang Cave and beautiful Railay Beach\", \"Photo with the unique Chicken Island rock formation\"]', '3 วัน 2 คืน', NULL, NULL, '[{\"day\": \"01\", \"title_th\": \"กรุงเทพฯ - กระบี่ - หาดอ่าวนาง\", \"title_en\": \"Bangkok - Krabi - Ao Nang Beach\", \"description_th\": \"เดินทางถึงกระบี่ช่วงเช้า รับประทานอาหารกลางวันอาหารใต้รสเด็ด จากนั้นล่องเรือหางยาวชมถ้ำพระนาง ลงเล่นน้ำที่หาดไร่เลย์สุดสวย ชมหินปูนรูปร่างแปลกตา ค่ำรับประทานอาหารซีฟู้ดริมทะเลที่อ่าวนาง\", \"description_en\": \"Arrive in Krabi in the morning. Enjoy delicious Southern Thai lunch. Longtail boat to Phra Nang Cave and swim at beautiful Railay Beach. See unique limestone formations. Seafood dinner by the sea at Ao Nang.\", \"meals\": {\"b\": false, \"l\": true, \"d\": true, \"note\": \"ซีฟู้ดริมทะเล\"}, \"accommodation\": \"โรงแรม 4 ดาว อ่าวนาง\"}, {\"day\": \"02\", \"title_th\": \"4 เกาะ - ทะเลแหวก - เกาะปอดะ\", \"title_en\": \"4 Islands - Separated Sea - Poda Island\", \"description_th\": \"ออกเดินทางท่องเที่ยว 4 เกาะสุดคลาสสิก ชมทะเลแหวกที่เกาะทับ เดินบนสันทรายเชื่อมเกาะทับและเกาะไก่ ถ่ายรูปกับเกาะไก่รูปร่างแปลกตา ดำน้ำดูปะการังและปลาหลากสีที่เกาะปอดะ พักผ่อนบนหาดทรายขาวละเอียด รับประทานอาหารกลางวันแบบปิกนิกบนเกาะ\", \"description_en\": \"Classic 4 islands tour. See the Separated Sea at Tub Island. Walk on the sandbar connecting Tub and Chicken Islands. Photo with unique Chicken Island. Snorkeling at Poda Island with colorful fish. Relax on fine white sand beach. Picnic lunch on the island.\", \"meals\": {\"b\": true, \"l\": true, \"d\": true, \"note\": \"ปิกนิกบนเกาะ\"}, \"accommodation\": \"โรงแรม 4 ดาว อ่าวนาง\"}, {\"day\": \"03\", \"title_th\": \"เกาะลันตา - กรุงเทพฯ\", \"title_en\": \"Koh Lanta - Bangkok\", \"description_th\": \"ออกเดินทางสู่เกาะลันตา เกาะสวยบรรยากาศสงบ แวะชมเมืองเก่าลันตา บ้านศรีราชา จุดชมวิวและประภาคารเกาะลันตา ช่วงเที่ยงรับประทานอาหารอิสระ ก่อนเดินทางกลับกรุงเทพฯ\", \"description_en\": \"Travel to Koh Lanta, a beautiful peaceful island. Visit Lanta Old Town, Baan Sri Raya, viewpoint and Koh Lanta lighthouse. Free lunch before returning to Bangkok.\", \"meals\": {\"b\": true, \"l\": false, \"d\": false, \"note\": \"อิสระมื้อกลางวัน\"}, \"accommodation\": \"\"}]', '[\"รถตู้ปรับอากาศ\", \"ที่พักโรงแรม 4 ดาว 2 คืน\", \"เรือหางยาวทัวร์ 4 เกาะ\", \"อุปกรณ์ดำน้ำตื้น\", \"อาหาร 6 มื้อตามรายการ\", \"ค่าธรรมเนียมอุทยาน\", \"ไกด์ท้องถิ่น\", \"ประกันการเดินทาง\"]', '[\"Air-conditioned van\", \"4-star hotel for 2 nights\", \"Longtail boat 4 islands tour\", \"Snorkeling equipment\", \"6 meals as per itinerary\", \"National park fees\", \"Local guide\", \"Travel insurance\"]', '[\"ค่าใช้จ่ายส่วนตัว\", \"ทิปไกด์และคนขับ (300 บาท/ท่าน)\", \"กิจกรรมเสริม เช่น ปีนผา พายคายัค\", \"อาหารและเครื่องดื่มนอกรายการ\"]', '[\"Personal expenses\", \"Tips for guide and driver (300 Baht/person)\", \"Optional activities like rock climbing, kayaking\", \"Food and drinks not in itinerary\"]', 'จุดนัดพบ: สนามบินกระบี่ หรือรับที่โรงแรมในอ่าวนาง', 'Meeting point: Krabi Airport or hotel pickup in Ao Nang', 'ทะเลแหวกเกิดขึ้นเฉพาะช่วงน้ำลง (โปรดตรวจสอบตารางน้ำ) / กรุณาเตรียมชุดว่ายน้ำ ครีมกันแดด / โปรแกรมอาจปรับตามสภาพอากาศ', 'The Separated Sea only appears during low tide (please check tide schedule) / Please bring swimwear, sunscreen / Program may change according to weather', 0, 'active', '2026-01-22 13:50:16', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `title_th`, `title_en`, `subtitle_th`, `subtitle_en`, `description_th`, `description_en`, `location_th`, `location_en`, `price`, `image`, `link`, `sort_order`, `status`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'ทัวร์ 4 เกาะ พร้อมดำน้ำตื้น', '4 Islands Tour with Snorkeling', 'โปรโมชั่นพิเศษ', 'Special Offer', 'สัมผัสความงดงามของหมู่เกาะทะเลกระบี่ พร้อมดำน้ำชมปะการังและปลาสีสันสดใส', 'Experience the beauty of Krabi islands with snorkeling among colorful coral reefs and tropical fish', 'กระบี่, ประเทศไทย', 'Krabi, Thailand', 3990.00, '/api/uploads/promotions/696f76bb6f6ae_1768912571.jpg', '', 1, 'active', NULL, NULL, '2026-01-19 21:23:41', '2026-01-20 19:47:55'),
(2, 'เกาะพีพี & เกาะไม้ไผ่', 'Phi Phi & Bamboo Island', 'ขายดี', 'Best Seller', 'ล่องเรือเร็วสู่เกาะพีพี ชมอ่าวมาหยา และเกาะไม้ไผ่ น้ำใสราวกระจก', 'Speedboat trip to Phi Phi Islands, Maya Bay and crystal clear waters of Bamboo Island', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 5500.00, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop', NULL, 2, 'active', NULL, NULL, '2026-01-19 21:23:41', NULL),
(3, 'แพ็กเกจทัวร์ 3 วัน 2 คืน', '3 Days 2 Nights Package', 'แพ็กเกจสุดคุ้ม', 'Value Package', 'รวมที่พัก อาหาร และทัวร์ครบวงจร พร้อมรถรับส่งสนามบิน', 'All-inclusive package with accommodation, meals, tours and airport transfer', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 25900.00, 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=2000&auto=format&fit=crop', NULL, 3, 'active', NULL, NULL, '2026-01-19 21:23:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_type` enum('text','number','boolean','json') DEFAULT 'text',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `setting_key`, `setting_value`, `setting_type`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'Phuket Gevalin', 'text', '2026-01-19 19:27:32', NULL),
(2, 'site_email', 'info@phuketgevalin.com', 'text', '2026-01-19 19:27:32', NULL),
(3, 'site_phone', '+66 XX XXX XXXX', 'text', '2026-01-19 19:27:32', NULL),
(4, 'currency', 'THB', 'text', '2026-01-19 19:27:32', NULL),
(5, 'timezone', 'Asia/Bangkok', 'text', '2026-01-19 19:27:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_th` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `type` enum('airport','private','hourly') NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `vehicle_type` varchar(100) NOT NULL COMMENT 'Sedan, SUV, Van, etc.',
  `max_passengers` int(11) NOT NULL DEFAULT 4,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transfers`
--

INSERT INTO `transfers` (`id`, `name_th`, `name_en`, `description_th`, `description_en`, `type`, `price`, `vehicle_type`, `max_passengers`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'สนามบินภูเก็ต - ป่าตอง (ซีดาน)', 'Phuket Airport - Patong (Sedan)', 'รถซีดานรับส่งสนามบิน เหมาะสำหรับ 1-3 ท่าน พร้อมกระเป๋า 2 ใบ', 'Airport sedan transfer, suitable for 1-3 passengers with 2 luggage', 'airport', 800.00, 'Sedan', 3, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(2, 'สนามบินภูเก็ต - ป่าตอง (SUV)', 'Phuket Airport - Patong (SUV)', 'รถ SUV รับส่งสนามบิน เหมาะสำหรับ 1-4 ท่าน พร้อมกระเป๋า 4 ใบ', 'Airport SUV transfer, suitable for 1-4 passengers with 4 luggage', 'airport', 1000.00, 'SUV', 4, 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(3, 'สนามบินภูเก็ต - ป่าตอง (รถตู้ VIP)', 'Phuket Airport - Patong (VIP Van)', 'รถตู้ VIP รับส่งสนามบิน เหมาะสำหรับครอบครัวหรือกลุ่ม 5-9 ท่าน', 'VIP Van airport transfer, suitable for families or groups 5-9 passengers', 'airport', 1500.00, 'Van', 9, 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(4, 'สนามบินภูเก็ต - กะรน/กะตะ (ซีดาน)', 'Phuket Airport - Karon/Kata (Sedan)', 'รถซีดานรับส่งสนามบินไปกะรนหรือกะตะ', 'Sedan transfer from airport to Karon or Kata beach', 'airport', 900.00, 'Sedan', 3, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(5, 'สนามบินภูเก็ต - บางเทา/ลากูน่า (SUV)', 'Phuket Airport - Bang Tao/Laguna (SUV)', 'รถ SUV รับส่งสนามบินไปบางเทาหรือลากูน่า', 'SUV transfer from airport to Bang Tao or Laguna area', 'airport', 1100.00, 'SUV', 4, 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(6, 'รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (ซีดาน)', 'Private Phuket Tour Full Day (Sedan)', 'รถซีดานพร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง', 'Sedan with driver, customized Phuket tour 8-10 hours', 'private', 2500.00, 'Sedan', 3, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(7, 'รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (SUV)', 'Private Phuket Tour Full Day (SUV)', 'รถ SUV พร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง', 'SUV with driver, customized Phuket tour 8-10 hours', 'private', 3000.00, 'SUV', 4, 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(8, 'รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (รถตู้ VIP)', 'Private Phuket Tour Full Day (VIP Van)', 'รถตู้ VIP พร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง', 'VIP Van with driver, customized Phuket tour 8-10 hours', 'private', 4000.00, 'Van', 9, 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(9, 'เช่ารถพร้อมคนขับ รายชั่วโมง (ซีดาน)', 'Hourly Car Rental with Driver (Sedan)', 'รถซีดานพร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง', 'Sedan with driver, hourly rate, minimum 3 hours', 'hourly', 500.00, 'Sedan', 3, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(10, 'เช่ารถพร้อมคนขับ รายชั่วโมง (SUV)', 'Hourly Car Rental with Driver (SUV)', 'รถ SUV พร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง', 'SUV with driver, hourly rate, minimum 3 hours', 'hourly', 600.00, 'SUV', 4, 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(11, 'เช่ารถพร้อมคนขับ รายชั่วโมง (รถตู้ VIP)', 'Hourly Car Rental with Driver (VIP Van)', 'รถตู้ VIP พร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง', 'VIP Van with driver, hourly rate, minimum 3 hours', 'hourly', 800.00, 'Van', 9, 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(12, 'ภูเก็ต - กระบี่ (ซีดาน)', 'Phuket - Krabi (Sedan)', 'รถซีดานรับส่งระหว่างภูเก็ตและกระบี่', 'Sedan transfer between Phuket and Krabi', 'private', 2500.00, 'Sedan', 3, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL),
(13, 'ภูเก็ต - กระบี่ (รถตู้ VIP)', 'Phuket - Krabi (VIP Van)', 'รถตู้ VIP รับส่งระหว่างภูเก็ตและกระบี่ สะดวกสบายตลอดทาง', 'VIP Van transfer between Phuket and Krabi, comfortable journey', 'private', 3500.00, 'Van', 9, 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop', 'active', '2026-01-20 08:55:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transfer_locations`
--

CREATE TABLE `transfer_locations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `type` enum('airport','city','beach','hotel_zone','other') DEFAULT 'other',
  `province` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transfer_locations`
--

INSERT INTO `transfer_locations` (`id`, `name_th`, `name_en`, `type`, `province`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'สนามบินภูเก็ต (HKT)', 'Phuket Airport (HKT)', 'airport', 'Phuket', 1, 'active', '2026-01-26 18:30:26', NULL),
(2, 'ตัวเมืองภูเก็ต', 'Phuket Town', 'city', 'Phuket', 2, 'active', '2026-01-26 18:30:26', NULL),
(3, 'หาดป่าตอง', 'Patong Beach', 'beach', 'Phuket', 3, 'active', '2026-01-26 18:30:26', NULL),
(4, 'หาดกะรน', 'Karon Beach', 'beach', 'Phuket', 4, 'active', '2026-01-26 18:30:26', NULL),
(5, 'หาดกะตะ', 'Kata Beach', 'beach', 'Phuket', 5, 'active', '2026-01-26 18:30:26', NULL),
(6, 'สนามบินกระบี่ (KBV)', 'Krabi Airport (KBV)', 'airport', 'Krabi', 10, 'active', '2026-01-26 18:30:26', NULL),
(7, 'อ่าวนาง', 'Ao Nang', 'beach', 'Krabi', 11, 'active', '2026-01-26 18:30:26', NULL),
(8, 'ตัวเมืองกระบี่', 'Krabi Town', 'city', 'Krabi', 12, 'active', '2026-01-26 18:30:26', NULL),
(9, 'เขาหลัก', 'Khao Lak', 'beach', 'Phang Nga', 20, 'active', '2026-01-26 18:30:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transfer_routes`
--

CREATE TABLE `transfer_routes` (
  `id` int(10) UNSIGNED NOT NULL,
  `from_location_id` int(10) UNSIGNED NOT NULL,
  `to_location_id` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_minutes` int(11) DEFAULT NULL COMMENT 'ระยะเวลาโดยประมาณ (นาที)',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transfer_routes`
--

INSERT INTO `transfer_routes` (`id`, `from_location_id`, `to_location_id`, `price`, `duration_minutes`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 700.00, 45, 'active', '2026-01-26 19:11:11', NULL),
(2, 1, 3, 900.00, 50, 'active', '2026-01-26 19:11:11', NULL),
(3, 1, 4, 1000.00, 55, 'active', '2026-01-26 19:11:11', NULL),
(4, 1, 5, 1100.00, 60, 'active', '2026-01-26 19:11:11', NULL),
(5, 1, 9, 1800.00, 90, 'active', '2026-01-26 19:11:11', NULL),
(6, 2, 3, 500.00, 30, 'active', '2026-01-26 19:11:11', NULL),
(7, 2, 4, 600.00, 35, 'active', '2026-01-26 19:11:11', NULL),
(8, 2, 5, 700.00, 40, 'active', '2026-01-26 19:11:11', NULL),
(9, 1, 6, 2500.00, 180, 'active', '2026-01-26 19:11:11', NULL),
(10, 3, 7, 2800.00, 200, 'active', '2026-01-26 19:11:11', NULL),
(11, 1, 7, 3000.00, 210, 'active', '2026-01-26 19:11:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_code` (`reference_code`),
  ADD KEY `idx_reference` (`reference_code`),
  ADD KEY `idx_email` (`customer_email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_date` (`booking_date`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_location` (`location`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `hotel_periods`
--
ALTER TABLE `hotel_periods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `hotel_room_prices`
--
ALTER TABLE `hotel_room_prices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_price` (`hotel_id`,`room_type_id`,`period_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `room_type_id` (`room_type_id`),
  ADD KEY `period_id` (`period_id`);

--
-- Indexes for table `hotel_room_types`
--
ALTER TABLE `hotel_room_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `oneday_trips`
--
ALTER TABLE `oneday_trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_province` (`province_key`),
  ADD KEY `idx_bestseller` (`bestseller`),
  ADD KEY `idx_sort_order` (`sort_order`);

--
-- Indexes for table `package_tours`
--
ALTER TABLE `package_tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_sort_order` (`sort_order`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `transfer_locations`
--
ALTER TABLE `transfer_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfer_routes`
--
ALTER TABLE `transfer_routes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_route` (`from_location_id`,`to_location_id`),
  ADD KEY `from_location_id` (`from_location_id`),
  ADD KEY `to_location_id` (`to_location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hotel_periods`
--
ALTER TABLE `hotel_periods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hotel_room_prices`
--
ALTER TABLE `hotel_room_prices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `hotel_room_types`
--
ALTER TABLE `hotel_room_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `oneday_trips`
--
ALTER TABLE `oneday_trips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `package_tours`
--
ALTER TABLE `package_tours`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transfer_locations`
--
ALTER TABLE `transfer_locations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transfer_routes`
--
ALTER TABLE `transfer_routes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hotel_periods`
--
ALTER TABLE `hotel_periods`
  ADD CONSTRAINT `fk_period_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotel_room_prices`
--
ALTER TABLE `hotel_room_prices`
  ADD CONSTRAINT `fk_price_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_price_period` FOREIGN KEY (`period_id`) REFERENCES `hotel_periods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_price_roomtype` FOREIGN KEY (`room_type_id`) REFERENCES `hotel_room_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotel_room_types`
--
ALTER TABLE `hotel_room_types`
  ADD CONSTRAINT `fk_roomtype_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transfer_routes`
--
ALTER TABLE `transfer_routes`
  ADD CONSTRAINT `fk_route_from` FOREIGN KEY (`from_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_route_to` FOREIGN KEY (`to_location_id`) REFERENCES `transfer_locations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
