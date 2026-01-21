-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 21, 2026 at 08:57 AM
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
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_tours`
--

INSERT INTO `package_tours` (`id`, `name_th`, `name_en`, `description_th`, `description_en`, `location`, `airline`, `location_th`, `location_en`, `duration_th`, `duration_en`, `price`, `discount_price`, `category`, `image`, `gallery`, `rating`, `reviews`, `bestseller`, `tags_th`, `tags_en`, `highlights_th`, `highlights_en`, `duration`, `includes`, `highlights`, `itinerary`, `included_th`, `included_en`, `excluded_th`, `excluded_en`, `meeting_point_th`, `meeting_point_en`, `important_info_th`, `important_info_en`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ทัวร์ญี่ปุ่น โตเกียว ฟูจิ 5 วัน 3 คืน', 'Japan Tokyo Fuji 5D3N', 'สัมผัสความงามของภูเขาไฟฟูจิ และเมืองโตเกียว พร้อมช้อปปิ้งและชิมอาหารญี่ปุ่นแท้ๆ', 'Experience the beauty of Mt. Fuji and Tokyo city, with shopping and authentic Japanese cuisine', '', '', '', '', '', '', 29900.00, NULL, 'package', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '5 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง', 'ภูเขาไฟฟูจิ,โตเกียว,ชิบูย่า,อาซากุสะ,ช้อปปิ้งชินจูกุ', 'วันที่ 1: กรุงเทพฯ - โตเกียว|วันที่ 2: โตเกียว - ภูเขาไฟฟูจิ|วันที่ 3: โตเกียว - อาซากุสะ - ชิบูย่า|วันที่ 4: ช้อปปิ้งชินจูกุ - อิสระ|วันที่ 5: โตเกียว - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(2, 'ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส 8 วัน', 'Europe Italy Swiss France 8D', 'ท่องเที่ยว 3 ประเทศยุโรป อิตาลี สวิตเซอร์แลนด์ และฝรั่งเศส', 'Travel to 3 European countries: Italy, Switzerland and France', '', '', '', '', '', '', 89900.00, NULL, 'package', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '8 วัน 6 คืน', 'ตั๋วเครื่องบิน,โรงแรม 6 คืน,อาหาร 12 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง,วีซ่าเชงเก้น', 'หอไอเฟล,โคลอสเซียม,อินเทอร์ลาเคน,เวนิส,มิลาน', 'วันที่ 1: กรุงเทพฯ - โรม|วันที่ 2: โรม - โคลอสเซียม - วาติกัน|วันที่ 3: โรม - เวนิส|วันที่ 4: เวนิส - มิลาน|วันที่ 5: มิลาน - สวิส|วันที่ 6: อินเทอร์ลาเคน - จุงเฟรา|วันที่ 7: สวิส - ปารีส|วันที่ 8: ปารีส - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(3, 'ทัวร์สิงคโปร์ 3 วัน 2 คืน', 'Singapore 3D2N', 'เที่ยวสิงคโปร์ครบทุกไฮไลท์ Gardens by the Bay, Marina Bay Sands, Universal Studios', 'Visit all Singapore highlights: Gardens by the Bay, Marina Bay Sands, Universal Studios', '', '', '', '', '', '', 12900.00, NULL, 'package', 'https://images.unsplash.com/photo-1559592413-7cec430aa669?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '3 วัน 2 คืน', 'ตั๋วเครื่องบิน,โรงแรม 2 คืน,อาหาร 4 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'Gardens by the Bay,Marina Bay Sands,Sentosa,Universal Studios,Orchard Road', 'วันที่ 1: กรุงเทพฯ - สิงคโปร์ - Marina Bay|วันที่ 2: Universal Studios - Sentosa|วันที่ 3: ช้อปปิ้ง - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(4, 'ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน', 'Chiangmai Doi Inthanon 3D2N', 'เที่ยวเชียงใหม่ พิชิตยอดดอยอินทนนท์ เดินชมธรรมชาติและวัฒนธรรมล้านนา', 'Visit Chiangmai, conquer Doi Inthanon peak, explore nature and Lanna culture', '', '', '', '', '', '', 5990.00, NULL, 'package', 'https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '3 วัน 2 คืน', 'รถตู้ VIP,โรงแรม 2 คืน,อาหาร 5 มื้อ,ค่าเข้าชม,ไกด์นำเที่ยว', 'ดอยอินทนนท์,วัดพระธาตุดอยสุเทพ,ย่านนิมมาน,ถนนคนเดิน', 'วันที่ 1: เชียงใหม่ - วัดพระธาตุดอยสุเทพ|วันที่ 2: ดอยอินทนนท์ - น้ำตกวชิรธาร|วันที่ 3: นิมมาน - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(5, 'ทัวร์บาหลี อินโดนีเซีย 4 วัน 3 คืน', 'Bali Indonesia 4D3N', 'สัมผัสเกาะสวรรค์บาหลี ชมวิหารและหาดสวยระดับโลก', 'Experience paradise island Bali, visit temples and world-class beaches', '', '', '', '', '', '', 19900.00, NULL, 'package', 'https://images.unsplash.com/photo-1474401915567-938829158739?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '4 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'วิหารอูลูวาตู,นาขั้นบันไดเตกัลลาลัง,หาดคูตา,อูบุด', 'วันที่ 1: กรุงเทพฯ - บาหลี|วันที่ 2: อูบุด - นาขั้นบันได|วันที่ 3: อูลูวาตู - หาดคูตา|วันที่ 4: บาหลี - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(6, 'ทัวร์เวียดนาม ดานัง ฮอยอัน 4 วัน 3 คืน', 'Vietnam Danang Hoian 4D3N', 'เที่ยวเวียดนามกลาง ดานัง ฮอยอัน บานาฮิลล์ Golden Bridge', 'Visit central Vietnam: Danang, Hoi An, Ba Na Hills, Golden Bridge', '', '', '', '', '', '', 15900.00, NULL, 'package', 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, '4 วัน 3 คืน', 'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 7 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว', 'Golden Bridge,บานาฮิลล์,เมืองเก่าฮอยอัน,หาดหมีเคว', 'วันที่ 1: กรุงเทพฯ - ดานัง|วันที่ 2: บานาฮิลล์ - Golden Bridge|วันที่ 3: ฮอยอัน - เมืองเก่า|วันที่ 4: ดานัง - กรุงเทพฯ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(7, 'ทัวร์เกาะพีพี เต็มวัน', 'Phi Phi Island Full Day Tour', 'ดำน้ำชมปะการัง ชมอ่าวมาหยา เกาะไผ่ เกาะไข่นอก พร้อมอาหารกลางวัน', 'Snorkeling, Maya Bay, Bamboo Island, Khai Island with lunch included', '', '', '', '', '', '', 1500.00, NULL, 'island', 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, 'เต็มวัน (7:30-17:00)', 'รถรับส่ง,เรือสปีดโบท,อาหารกลางวัน,อุปกรณ์ดำน้ำ,ไกด์,ประกันภัย', 'อ่าวมาหยา,เกาะไผ่,ดำน้ำชมปะการัง,ถ้ำไวกิ้ง', '07:30 รับจากโรงแรม|09:00 ออกเดินทางจากท่าเรือ|10:00 เกาะพีพี|12:00 อาหารกลางวัน|14:00 เกาะไข่|16:30 เดินทางกลับ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(8, 'ทัวร์เกาะเจมส์บอนด์ อ่าวพังงา', 'James Bond Island Phang Nga Bay', 'ล่องเรือชมเกาะเขาพิงกัน เกาะปันหยี ถ้ำลอด พายเรือคายัค', 'Visit Khao Phing Kan Island, Panyi Village, sea cave, kayaking', '', '', '', '', '', '', 1800.00, NULL, 'island', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, 'เต็มวัน (8:00-17:30)', 'รถรับส่ง,เรือหางยาว,อาหารกลางวัน,เรือคายัค,ไกด์,ประกันภัย', 'เกาะเจมส์บอนด์,เกาะปันหยี,พายคายัค,ถ้ำลอด', '08:00 รับจากโรงแรม|09:30 ท่าเรืออ่าวปอ|10:30 เกาะเจมส์บอนด์|12:00 หมู่บ้านปันหยี|14:00 พายคายัค|17:00 เดินทางกลับ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL),
(9, 'ทัวร์เกาะสิมิลัน 1 วัน', 'Similan Islands Day Trip', 'ดำน้ำเกาะสิมิลัน น้ำใสที่สุดในประเทศไทย ชมปะการังและปลาสวยงาม', 'Snorkeling at Similan Islands, clearest water in Thailand, coral and tropical fish', '', '', '', '', '', '', 2800.00, NULL, 'island', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop', NULL, 4.5, 0, 0, NULL, NULL, NULL, NULL, 'เต็มวัน (6:00-18:00)', 'รถรับส่ง,เรือสปีดโบท,อาหารเช้า-กลางวัน,อุปกรณ์ดำน้ำ,ค่าอุทยาน,ไกด์', 'หินเรือใบ,จุดดำน้ำ 4 จุด,หาดทรายขาว,น้ำทะเลใส', '06:00 รับจากโรงแรม|08:00 ออกเดินทาง|09:30 เกาะสิมิลัน|16:00 เดินทางกลับ', NULL, NULL, NULL, NULL, '', '', '', '', 0, 'active', '2026-01-20 08:55:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `package_tours`
--
ALTER TABLE `package_tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `package_tours`
--
ALTER TABLE `package_tours`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
