-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 20, 2026 at 07:05 PM
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
(2, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@phuketgevalin.com', 'super_admin', 'active', '2026-01-20 08:06:03', '2026-01-19 21:09:49', '2026-01-20 08:06:03');

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
(1, 'ทัวร์เกาะพีพี และอ่าวมาหยา เรือสปีดโบ๊ท', 'Phi Phi Island & Maya Bay Speedboat Tour', 'สัมผัสประสบการณ์สุดพิเศษ ล่องเรือสปีดโบ๊ทชมความงดงามของหมู่เกาะพีพี อ่าวมาหยาที่โด่งดัง และดำน้ำดูปะการังน้ำใส', 'Experience an unforgettable speedboat journey to the stunning Phi Phi Islands, visit the famous Maya Bay, and enjoy snorkeling in crystal clear waters.', 'ภูเก็ต, ประเทศไทย', 'Phuket, Thailand', 'phuket', 'ทั้งวัน (8-9 ชม.)', 'Full Day (8-9 hours)', 2490.00, 3500.00, 'https://images.unsplash.com/photo-1598895015795-c49c55b5d141?q=80&w=1000&auto=format&fit=crop', NULL, 4.9, 856, 1, '[\"เรือสปีดโบ๊ท\", \"ดำน้ำตื้น\", \"อาหารกลางวัน\", \"รับส่งฟรี\"]', '[\"Speedboat\", \"Snorkeling\", \"Lunch Included\", \"Free Pickup\"]', '[\"ชมอ่าวมาหยาที่โด่งดังจากภาพยนตร์ The Beach\", \"ดำน้ำชมปะการังที่เกาะไผ่\", \"เที่ยวชมถ้ำไวกิ้งและอ่าวปิเละ\", \"พักผ่อนบนหาดทรายขาว\"]', '[\"Visit the famous Maya Bay from The Beach movie\", \"Snorkeling at Bamboo Island\", \"Explore Viking Cave and Pileh Lagoon\", \"Relax on white sandy beaches\"]', '[{\"time\":\"07:30\",\"title_th\":\"รับจากโรงแรม\",\"title_en\":\"Hotel Pickup\",\"description_th\":\"รถตู้ปรับอากาศรับจากโรงแรมในภูเก็ต\",\"description_en\":\"Air-conditioned van pickup from your hotel in Phuket\"},{\"time\":\"08:30\",\"title_th\":\"ออกเดินทางจากท่าเรือ\",\"title_en\":\"Departure from Pier\",\"description_th\":\"ขึ้นเรือสปีดโบ๊ทที่ท่าเรือรัษฎา\",\"description_en\":\"Board speedboat at Rassada Pier\"},{\"time\":\"09:30\",\"title_th\":\"เกาะไผ่\",\"title_en\":\"Bamboo Island\",\"description_th\":\"ดำน้ำดูปะการังและพักผ่อนบนชายหาด\",\"description_en\":\"Snorkeling and beach relaxation\"},{\"time\":\"11:00\",\"title_th\":\"อ่าวมาหยา\",\"title_en\":\"Maya Bay\",\"description_th\":\"ชมอ่าวมาหยาที่โด่งดัง ถ่ายรูปและเดินชายหาด\",\"description_en\":\"Visit the famous Maya Bay, photo opportunities\"},{\"time\":\"12:30\",\"title_th\":\"อาหารกลางวัน\",\"title_en\":\"Lunch\",\"description_th\":\"อาหารบุฟเฟ่ต์ที่เกาะพีพีดอน\",\"description_en\":\"Buffet lunch at Phi Phi Don\"},{\"time\":\"14:00\",\"title_th\":\"อ่าวปิเละ & ถ้ำไวกิ้ง\",\"title_en\":\"Pileh Lagoon & Viking Cave\",\"description_th\":\"ชมความงามของอ่าวปิเละและถ้ำไวกิ้ง\",\"description_en\":\"Explore Pileh Lagoon and Viking Cave\"},{\"time\":\"15:30\",\"title_th\":\"เดินทางกลับ\",\"title_en\":\"Return Journey\",\"description_th\":\"เรือออกเดินทางกลับภูเก็ต\",\"description_en\":\"Speedboat departs back to Phuket\"},{\"time\":\"17:00\",\"title_th\":\"ถึงภูเก็ต\",\"title_en\":\"Arrive Phuket\",\"description_th\":\"ส่งกลับโรงแรม\",\"description_en\":\"Transfer back to hotel\"}]', '[\"รถรับส่งจากโรงแรม\", \"เรือสปีดโบ๊ท\", \"อุปกรณ์ดำน้ำตื้น\", \"อาหารกลางวัน + เครื่องดื่ม\", \"ค่าธรรมเนียมอุทยาน\", \"ประกันการเดินทาง\", \"ไกด์พูดไทย/อังกฤษ\"]', '[\"Hotel pickup and drop-off\", \"Speedboat transportation\", \"Snorkeling equipment\", \"Lunch + drinks\", \"National park fees\", \"Travel insurance\", \"Thai/English guide\"]', '[\"ค่าใช้จ่ายส่วนตัว\", \"ทิปไกด์และคนขับ\", \"เครื่องดื่มแอลกอฮอล์\"]', '[\"Personal expenses\", \"Tips for guide and driver\", \"Alcoholic beverages\"]', NULL, NULL, NULL, NULL, 1, 'active', '2026-01-19 22:50:23', NULL),
(2, 'ทัวร์ 4 เกาะกระบี่', '4 Islands Krabi Tour', 'เที่ยวครบ 4 เกาะสวย ทะเลแหวก เกาะไก่ เกาะทับ เกาะปอดะ ดำน้ำดูปะการัง พร้อมอาหารกลางวัน', 'Visit 4 beautiful islands: Tub Island, Chicken Island, Poda Island, and the famous Separated Sea. Snorkeling included with lunch.', 'กระบี่, ประเทศไทย', 'Krabi, Thailand', 'krabi', 'ทั้งวัน (7-8 ชม.)', 'Full Day (7-8 hours)', 990.00, 1500.00, 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000&auto=format&fit=crop', NULL, 4.8, 1120, 1, '[\"เรือหางยาว\", \"ทะเลแหวก\", \"ดำน้ำตื้น\", \"อาหารกลางวัน\"]', '[\"Longtail Boat\", \"Separated Sea\", \"Snorkeling\", \"Lunch\"]', '[\"เดินบนทะเลแหวก ปรากฏการณ์ธรรมชาติสุดมหัศจรรย์\", \"ถ่ายรูปกับเกาะไก่รูปทรงแปลกตา\", \"ดำน้ำดูปะการังที่เกาะปอดะ\", \"พักผ่อนบนหาดทรายขาวละเอียด\"]', '[\"Walk on the amazing Separated Sea natural phenomenon\", \"Photo with unique Chicken Island rock formation\", \"Snorkeling at Poda Island coral reef\", \"Relax on fine white sandy beach\"]', '[{\"time\":\"08:00\",\"title_th\":\"รับจากที่พัก\",\"title_en\":\"Hotel Pickup\",\"description_th\":\"รถตู้รับจากที่พักในกระบี่\",\"description_en\":\"Van pickup from Krabi hotel\"},{\"time\":\"09:00\",\"title_th\":\"ออกเดินทาง\",\"title_en\":\"Departure\",\"description_th\":\"ขึ้นเรือหางยาวที่อ่าวนาง\",\"description_en\":\"Board longtail boat at Ao Nang\"},{\"time\":\"09:30\",\"title_th\":\"เกาะทับ - ทะเลแหวก\",\"title_en\":\"Tub Island - Separated Sea\",\"description_th\":\"เดินบนทะเลแหวก เชื่อมเกาะทับและเกาะไก่\",\"description_en\":\"Walk on Separated Sea connecting Tub and Chicken Island\"},{\"time\":\"11:00\",\"title_th\":\"เกาะปอดะ\",\"title_en\":\"Poda Island\",\"description_th\":\"ดำน้ำดูปะการังและพักผ่อนบนหาด\",\"description_en\":\"Snorkeling and beach relaxation\"},{\"time\":\"12:30\",\"title_th\":\"อาหารกลางวัน\",\"title_en\":\"Lunch\",\"description_th\":\"อาหารกล่องบนเกาะ\",\"description_en\":\"Lunch box on the island\"},{\"time\":\"14:00\",\"title_th\":\"เกาะไก่\",\"title_en\":\"Chicken Island\",\"description_th\":\"ถ่ายรูปและว่ายน้ำรอบเกาะ\",\"description_en\":\"Photo and swimming around the island\"},{\"time\":\"15:30\",\"title_th\":\"เดินทางกลับ\",\"title_en\":\"Return\",\"description_th\":\"เรือกลับอ่าวนาง\",\"description_en\":\"Boat returns to Ao Nang\"},{\"time\":\"16:30\",\"title_th\":\"ส่งกลับที่พัก\",\"title_en\":\"Hotel Drop-off\",\"description_th\":\"รถตู้ส่งกลับที่พัก\",\"description_en\":\"Van transfer back to hotel\"}]', '[\"รถรับส่งจากที่พัก\", \"เรือหางยาว\", \"อุปกรณ์ดำน้ำตื้น\", \"อาหารกลางวัน + น้ำดื่ม\", \"ค่าธรรมเนียมอุทยาน\", \"ประกันการเดินทาง\"]', '[\"Hotel pickup and drop-off\", \"Longtail boat\", \"Snorkeling equipment\", \"Lunch + drinking water\", \"National park fees\", \"Travel insurance\"]', '[\"ค่าใช้จ่ายส่วนตัว\", \"ทิปไกด์\", \"เครื่องดื่มเพิ่มเติม\"]', '[\"Personal expenses\", \"Guide tips\", \"Additional drinks\"]', NULL, NULL, NULL, NULL, 2, 'active', '2026-01-19 22:50:23', NULL),
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
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `category` varchar(100) NOT NULL COMMENT 'island, adventure, cultural, etc.',
  `image` varchar(500) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL COMMENT 'e.g. Full Day, Half Day',
  `includes` text DEFAULT NULL COMMENT 'What is included in the tour',
  `highlights` text DEFAULT NULL COMMENT 'Tour highlights',
  `itinerary` text DEFAULT NULL COMMENT 'Tour schedule',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_tours`
--

INSERT INTO `package_tours` (`id`, `name_th`, `name_en`, `description_th`, `description_en`, `price`, `category`, `image`, `duration`, `includes`, `highlights`, `itinerary`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ทัวร์ญี่ปุ่น โตเกียว ฟูจิ 5 วัน 3 คืน', 'Japan Tokyo Fuji 5D3N', 'สัมผัสความงามของภูเขาไฟฟูจิ และเมืองโตเกียว พร้อมช้อปปิ้งและชิมอาหารญี่ปุ่นแท้ๆ', 'Experience the beauty of Mt. Fuji and Tokyo city, with shopping and authentic Japanese cuisine', 29900.00, 'package', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop', '5 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง', 'ภูเขาไฟฟูจิ,โตเกียว,ชิบูย่า,อาซากุสะ,ช้อปปิ้งชินจูกุ', 'วันที่ 1: กรุงเทพฯ - โตเกียว|วันที่ 2: โตเกียว - ภูเขาไฟฟูจิ|วันที่ 3: โตเกียว - อาซากุสะ - ชิบูย่า|วันที่ 4: ช้อปปิ้งชินจูกุ - อิสระ|วันที่ 5: โตเกียว - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(2, 'ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส 8 วัน', 'Europe Italy Swiss France 8D', 'ท่องเที่ยว 3 ประเทศยุโรป อิตาลี สวิตเซอร์แลนด์ และฝรั่งเศส', 'Travel to 3 European countries: Italy, Switzerland and France', 89900.00, 'package', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop', '8 วัน 6 คืน', 'ตั๋วเครื่องบิน,โรงแรม 6 คืน,อาหาร 12 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง,วีซ่าเชงเก้น', 'หอไอเฟล,โคลอสเซียม,อินเทอร์ลาเคน,เวนิส,มิลาน', 'วันที่ 1: กรุงเทพฯ - โรม|วันที่ 2: โรม - โคลอสเซียม - วาติกัน|วันที่ 3: โรม - เวนิส|วันที่ 4: เวนิส - มิลาน|วันที่ 5: มิลาน - สวิส|วันที่ 6: อินเทอร์ลาเคน - จุงเฟรา|วันที่ 7: สวิส - ปารีส|วันที่ 8: ปารีส - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(3, 'ทัวร์สิงคโปร์ 3 วัน 2 คืน', 'Singapore 3D2N', 'เที่ยวสิงคโปร์ครบทุกไฮไลท์ Gardens by the Bay, Marina Bay Sands, Universal Studios', 'Visit all Singapore highlights: Gardens by the Bay, Marina Bay Sands, Universal Studios', 12900.00, 'package', 'https://images.unsplash.com/photo-1559592413-7cec430aa669?q=80&w=1000&auto=format&fit=crop', '3 วัน 2 คืน', 'ตั๋วเครื่องบิน,โรงแรม 2 คืน,อาหาร 4 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'Gardens by the Bay,Marina Bay Sands,Sentosa,Universal Studios,Orchard Road', 'วันที่ 1: กรุงเทพฯ - สิงคโปร์ - Marina Bay|วันที่ 2: Universal Studios - Sentosa|วันที่ 3: ช้อปปิ้ง - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(4, 'ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน', 'Chiangmai Doi Inthanon 3D2N', 'เที่ยวเชียงใหม่ พิชิตยอดดอยอินทนนท์ เดินชมธรรมชาติและวัฒนธรรมล้านนา', 'Visit Chiangmai, conquer Doi Inthanon peak, explore nature and Lanna culture', 5990.00, 'package', 'https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop', '3 วัน 2 คืน', 'รถตู้ VIP,โรงแรม 2 คืน,อาหาร 5 มื้อ,ค่าเข้าชม,ไกด์นำเที่ยว', 'ดอยอินทนนท์,วัดพระธาตุดอยสุเทพ,ย่านนิมมาน,ถนนคนเดิน', 'วันที่ 1: เชียงใหม่ - วัดพระธาตุดอยสุเทพ|วันที่ 2: ดอยอินทนนท์ - น้ำตกวชิรธาร|วันที่ 3: นิมมาน - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(5, 'ทัวร์บาหลี อินโดนีเซีย 4 วัน 3 คืน', 'Bali Indonesia 4D3N', 'สัมผัสเกาะสวรรค์บาหลี ชมวิหารและหาดสวยระดับโลก', 'Experience paradise island Bali, visit temples and world-class beaches', 19900.00, 'package', 'https://images.unsplash.com/photo-1474401915567-938829158739?q=80&w=1000&auto=format&fit=crop', '4 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'วิหารอูลูวาตู,นาขั้นบันไดเตกัลลาลัง,หาดคูตา,อูบุด', 'วันที่ 1: กรุงเทพฯ - บาหลี|วันที่ 2: อูบุด - นาขั้นบันได|วันที่ 3: อูลูวาตู - หาดคูตา|วันที่ 4: บาหลี - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(6, 'ทัวร์เวียดนาม ดานัง ฮอยอัน 4 วัน 3 คืน', 'Vietnam Danang Hoian 4D3N', 'เที่ยวเวียดนามกลาง ดานัง ฮอยอัน บานาฮิลล์ Golden Bridge', 'Visit central Vietnam: Danang, Hoi An, Ba Na Hills, Golden Bridge', 15900.00, 'package', 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1000&auto=format&fit=crop', '4 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 7 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'Golden Bridge,บานาฮิลล์,เมืองเก่าฮอยอัน,หาดหมีเคว', 'วันที่ 1: กรุงเทพฯ - ดานัง|วันที่ 2: บานาฮิลล์ - Golden Bridge|วันที่ 3: ฮอยอัน - เมืองเก่า|วันที่ 4: ดานัง - กรุงเทพฯ', 'active', '2026-01-20 08:55:11', NULL),
(7, 'ทัวร์เกาะพีพี เต็มวัน', 'Phi Phi Island Full Day Tour', 'ดำน้ำชมปะการัง ชมอ่าวมาหยา เกาะไผ่ เกาะไข่นอก พร้อมอาหารกลางวัน', 'Snorkeling, Maya Bay, Bamboo Island, Khai Island with lunch included', 1500.00, 'island', 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1000&auto=format&fit=crop', 'เต็มวัน (7:30-17:00)', 'รถรับส่ง,เรือสปีดโบท,อาหารกลางวัน,อุปกรณ์ดำน้ำ,ไกด์,ประกันภัย', 'อ่าวมาหยา,เกาะไผ่,ดำน้ำชมปะการัง,ถ้ำไวกิ้ง', '07:30 รับจากโรงแรม|09:00 ออกเดินทางจากท่าเรือ|10:00 เกาะพีพี|12:00 อาหารกลางวัน|14:00 เกาะไข่|16:30 เดินทางกลับ', 'active', '2026-01-20 08:55:11', NULL),
(8, 'ทัวร์เกาะเจมส์บอนด์ อ่าวพังงา', 'James Bond Island Phang Nga Bay', 'ล่องเรือชมเกาะเขาพิงกัน เกาะปันหยี ถ้ำลอด พายเรือคายัค', 'Visit Khao Phing Kan Island, Panyi Village, sea cave, kayaking', 1800.00, 'island', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop', 'เต็มวัน (8:00-17:30)', 'รถรับส่ง,เรือหางยาว,อาหารกลางวัน,เรือคายัค,ไกด์,ประกันภัย', 'เกาะเจมส์บอนด์,เกาะปันหยี,พายคายัค,ถ้ำลอด', '08:00 รับจากโรงแรม|09:30 ท่าเรืออ่าวปอ|10:30 เกาะเจมส์บอนด์|12:00 หมู่บ้านปันหยี|14:00 พายคายัค|17:00 เดินทางกลับ', 'active', '2026-01-20 08:55:11', NULL),
(9, 'ทัวร์เกาะสิมิลัน 1 วัน', 'Similan Islands Day Trip', 'ดำน้ำเกาะสิมิลัน น้ำใสที่สุดในประเทศไทย ชมปะการังและปลาสวยงาม', 'Snorkeling at Similan Islands, clearest water in Thailand, coral and tropical fish', 2800.00, 'island', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop', 'เต็มวัน (6:00-18:00)', 'รถรับส่ง,เรือสปีดโบท,อาหารเช้า-กลางวัน,อุปกรณ์ดำน้ำ,ค่าอุทยาน,ไกด์', 'หินเรือใบ,จุดดำน้ำ 4 จุด,หาดทรายขาว,น้ำทะเลใส', '06:00 รับจากโรงแรม|08:00 ออกเดินทาง|09:30 เกาะสิมิลัน|16:00 เดินทางกลับ', 'active', '2026-01-20 08:55:11', NULL);

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
(1, 'ทัวร์ 4 เกาะ พร้อมดำน้ำตื้น', '4 Islands Tour with Snorkeling', 'โปรโมชั่นพิเศษ', 'Special Offer', 'สัมผัสความงดงามของหมู่เกาะทะเลกระบี่ พร้อมดำน้ำชมปะการังและปลาสีสันสดใส', 'Experience the beauty of Krabi islands with snorkeling among colorful coral reefs and tropical fish', 'กระบี่, ประเทศไทย', 'Krabi, Thailand', 3990.00, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop', NULL, 1, 'active', NULL, NULL, '2026-01-19 21:23:41', NULL),
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
-- AUTO_INCREMENT for table `oneday_trips`
--
ALTER TABLE `oneday_trips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `package_tours`
--
ALTER TABLE `package_tours`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
