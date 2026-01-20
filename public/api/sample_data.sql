-- =====================================================
-- Phuket Gevalin - Sample Data
-- Run this SQL to insert sample data
-- =====================================================

SET NAMES utf8mb4;

-- =====================================================
-- PACKAGE TOURS
-- =====================================================

INSERT INTO `package_tours` (`name_th`, `name_en`, `description_th`, `description_en`, `price`, `category`, `image`, `duration`, `includes`, `highlights`, `itinerary`, `status`) VALUES

-- Asia Tours
('ทัวร์ญี่ปุ่น โตเกียว ฟูจิ 5 วัน 3 คืน', 'Japan Tokyo Fuji 5D3N',
'สัมผัสความงามของภูเขาไฟฟูจิ และเมืองโตเกียว พร้อมช้อปปิ้งและชิมอาหารญี่ปุ่นแท้ๆ',
'Experience the beauty of Mt. Fuji and Tokyo city, with shopping and authentic Japanese cuisine',
29900, 'package',
'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
'5 วัน 3 คืน',
'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง',
'ภูเขาไฟฟูจิ,โตเกียว,ชิบูย่า,อาซากุสะ,ช้อปปิ้งชินจูกุ',
'วันที่ 1: กรุงเทพฯ - โตเกียว|วันที่ 2: โตเกียว - ภูเขาไฟฟูจิ|วันที่ 3: โตเกียว - อาซากุสะ - ชิบูย่า|วันที่ 4: ช้อปปิ้งชินจูกุ - อิสระ|วันที่ 5: โตเกียว - กรุงเทพฯ',
'active'),

('ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส 8 วัน', 'Europe Italy Swiss France 8D',
'ท่องเที่ยว 3 ประเทศยุโรป อิตาลี สวิตเซอร์แลนด์ และฝรั่งเศส',
'Travel to 3 European countries: Italy, Switzerland and France',
89900, 'package',
'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop',
'8 วัน 6 คืน',
'ตั๋วเครื่องบิน,โรงแรม 6 คืน,อาหาร 12 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว,ประกันเดินทาง,วีซ่าเชงเก้น',
'หอไอเฟล,โคลอสเซียม,อินเทอร์ลาเคน,เวนิส,มิลาน',
'วันที่ 1: กรุงเทพฯ - โรม|วันที่ 2: โรม - โคลอสเซียม - วาติกัน|วันที่ 3: โรม - เวนิส|วันที่ 4: เวนิส - มิลาน|วันที่ 5: มิลาน - สวิส|วันที่ 6: อินเทอร์ลาเคน - จุงเฟรา|วันที่ 7: สวิส - ปารีส|วันที่ 8: ปารีส - กรุงเทพฯ',
'active'),

('ทัวร์สิงคโปร์ 3 วัน 2 คืน', 'Singapore 3D2N',
'เที่ยวสิงคโปร์ครบทุกไฮไลท์ Gardens by the Bay, Marina Bay Sands, Universal Studios',
'Visit all Singapore highlights: Gardens by the Bay, Marina Bay Sands, Universal Studios',
12900, 'package',
'https://images.unsplash.com/photo-1559592413-7cec430aa669?q=80&w=1000&auto=format&fit=crop',
'3 วัน 2 คืน',
'ตั๋วเครื่องบิน,โรงแรม 2 คืน,อาหาร 4 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว',
'Gardens by the Bay,Marina Bay Sands,Sentosa,Universal Studios,Orchard Road',
'วันที่ 1: กรุงเทพฯ - สิงคโปร์ - Marina Bay|วันที่ 2: Universal Studios - Sentosa|วันที่ 3: ช้อปปิ้ง - กรุงเทพฯ',
'active'),

('ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน', 'Chiangmai Doi Inthanon 3D2N',
'เที่ยวเชียงใหม่ พิชิตยอดดอยอินทนนท์ เดินชมธรรมชาติและวัฒนธรรมล้านนา',
'Visit Chiangmai, conquer Doi Inthanon peak, explore nature and Lanna culture',
5990, 'package',
'https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop',
'3 วัน 2 คืน',
'รถตู้ VIP,โรงแรม 2 คืน,อาหาร 5 มื้อ,ค่าเข้าชม,ไกด์นำเที่ยว',
'ดอยอินทนนท์,วัดพระธาตุดอยสุเทพ,ย่านนิมมาน,ถนนคนเดิน',
'วันที่ 1: เชียงใหม่ - วัดพระธาตุดอยสุเทพ|วันที่ 2: ดอยอินทนนท์ - น้ำตกวชิรธาร|วันที่ 3: นิมมาน - กรุงเทพฯ',
'active'),

('ทัวร์บาหลี อินโดนีเซีย 4 วัน 3 คืน', 'Bali Indonesia 4D3N',
'สัมผัสเกาะสวรรค์บาหลี ชมวิหารและหาดสวยระดับโลก',
'Experience paradise island Bali, visit temples and world-class beaches',
19900, 'package',
'https://images.unsplash.com/photo-1474401915567-938829158739?q=80&w=1000&auto=format&fit=crop',
'4 วัน 3 คืน',
'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 6 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว',
'วิหารอูลูวาตู,นาขั้นบันไดเตกัลลาลัง,หาดคูตา,อูบุด',
'วันที่ 1: กรุงเทพฯ - บาหลี|วันที่ 2: อูบุด - นาขั้นบันได|วันที่ 3: อูลูวาตู - หาดคูตา|วันที่ 4: บาหลี - กรุงเทพฯ',
'active'),

('ทัวร์เวียดนาม ดานัง ฮอยอัน 4 วัน 3 คืน', 'Vietnam Danang Hoian 4D3N',
'เที่ยวเวียดนามกลาง ดานัง ฮอยอัน บานาฮิลล์ Golden Bridge',
'Visit central Vietnam: Danang, Hoi An, Ba Na Hills, Golden Bridge',
15900, 'package',
'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1000&auto=format&fit=crop',
'4 วัน 3 คืน',
'ตั๋วเครื่องบิน,โรงแรม 3 คืน,อาหาร 7 มื้อ,รถนำเที่ยว,ไกด์นำเที่ยว',
'Golden Bridge,บานาฮิลล์,เมืองเก่าฮอยอัน,หาดหมีเคว',
'วันที่ 1: กรุงเทพฯ - ดานัง|วันที่ 2: บานาฮิลล์ - Golden Bridge|วันที่ 3: ฮอยอัน - เมืองเก่า|วันที่ 4: ดานัง - กรุงเทพฯ',
'active'),

-- Island Package Tours (Phuket)
('ทัวร์เกาะพีพี เต็มวัน', 'Phi Phi Island Full Day Tour',
'ดำน้ำชมปะการัง ชมอ่าวมาหยา เกาะไผ่ เกาะไข่นอก พร้อมอาหารกลางวัน',
'Snorkeling, Maya Bay, Bamboo Island, Khai Island with lunch included',
1500, 'island',
'https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1000&auto=format&fit=crop',
'เต็มวัน (7:30-17:00)',
'รถรับส่ง,เรือสปีดโบท,อาหารกลางวัน,อุปกรณ์ดำน้ำ,ไกด์,ประกันภัย',
'อ่าวมาหยา,เกาะไผ่,ดำน้ำชมปะการัง,ถ้ำไวกิ้ง',
'07:30 รับจากโรงแรม|09:00 ออกเดินทางจากท่าเรือ|10:00 เกาะพีพี|12:00 อาหารกลางวัน|14:00 เกาะไข่|16:30 เดินทางกลับ',
'active'),

('ทัวร์เกาะเจมส์บอนด์ อ่าวพังงา', 'James Bond Island Phang Nga Bay',
'ล่องเรือชมเกาะเขาพิงกัน เกาะปันหยี ถ้ำลอด พายเรือคายัค',
'Visit Khao Phing Kan Island, Panyi Village, sea cave, kayaking',
1800, 'island',
'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop',
'เต็มวัน (8:00-17:30)',
'รถรับส่ง,เรือหางยาว,อาหารกลางวัน,เรือคายัค,ไกด์,ประกันภัย',
'เกาะเจมส์บอนด์,เกาะปันหยี,พายคายัค,ถ้ำลอด',
'08:00 รับจากโรงแรม|09:30 ท่าเรืออ่าวปอ|10:30 เกาะเจมส์บอนด์|12:00 หมู่บ้านปันหยี|14:00 พายคายัค|17:00 เดินทางกลับ',
'active'),

('ทัวร์เกาะสิมิลัน 1 วัน', 'Similan Islands Day Trip',
'ดำน้ำเกาะสิมิลัน น้ำใสที่สุดในประเทศไทย ชมปะการังและปลาสวยงาม',
'Snorkeling at Similan Islands, clearest water in Thailand, coral and tropical fish',
2800, 'island',
'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop',
'เต็มวัน (6:00-18:00)',
'รถรับส่ง,เรือสปีดโบท,อาหารเช้า-กลางวัน,อุปกรณ์ดำน้ำ,ค่าอุทยาน,ไกด์',
'หินเรือใบ,จุดดำน้ำ 4 จุด,หาดทรายขาว,น้ำทะเลใส',
'06:00 รับจากโรงแรม|08:00 ออกเดินทาง|09:30 เกาะสิมิลัน|16:00 เดินทางกลับ',
'active');

-- =====================================================
-- HOTELS
-- =====================================================

INSERT INTO `hotels` (`name_th`, `name_en`, `description_th`, `description_en`, `location`, `address`, `price_per_night`, `rating`, `image`, `amenities`, `status`) VALUES

-- Phuket Hotels
('โรงแรม เดอะ ซูริน ภูเก็ต', 'The Surin Phuket',
'รีสอร์ทหรูริมหาดปันเซีย ที่พักระดับ 5 ดาวพร้อมวิวทะเลอันดามัน',
'Luxury beachfront resort at Pansea Beach, 5-star accommodation with Andaman Sea view',
'Phuket', '118 Moo 3, Choeng Thale, Thalang, Phuket 83110',
18900, 4.9,
'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,สปา,ฟิตเนส,ร้านอาหาร,WiFi ฟรี,หาดส่วนตัว,บัตเลอร์',
'active'),

('โรงแรม อมารี ภูเก็ต', 'Amari Phuket',
'โรงแรมหรูหน้าหาดป่าตอง ใจกลางแหล่งช้อปปิ้งและความบันเทิง',
'Luxury hotel facing Patong Beach, in the heart of shopping and entertainment',
'Patong', '2 Moo 6, Meun-ngern Road, Patong, Phuket 83150',
5500, 4.7,
'https://images.unsplash.com/photo-1571896349842-68c8949139f1?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,สปา,ฟิตเนส,ร้านอาหาร 3 แห่ง,WiFi ฟรี,บาร์บนดาดฟ้า',
'active'),

('บันยันทรี ภูเก็ต', 'Banyan Tree Phuket',
'รีสอร์ทหรูสุดพิเศษพร้อมวิลล่าส่วนตัวและสระว่ายน้ำในห้องพัก',
'Ultra-luxury resort with private villas and in-room pools',
'Bang Tao', '33, 33/27 Moo 4, Srisoonthorn Road, Cherngtalay',
25000, 4.9,
'https://images.unsplash.com/photo-1512918760513-95f192972701?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำส่วนตัว,สปาระดับโลก,กอล์ฟ,ร้านอาหาร 7 แห่ง,บัตเลอร์ 24 ชม.',
'active'),

('อิบิส ภูเก็ต ป่าตอง', 'Ibis Phuket Patong',
'โรงแรมราคาประหยัดใจกลางป่าตอง ใกล้หาดและถนนบางลา',
'Budget-friendly hotel in the heart of Patong, near beach and Bangla Road',
'Patong', '162 Phang Muang Sai Kor Road, Patong, Phuket 83150',
1800, 4.2,
'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,ร้านอาหาร,WiFi ฟรี,ที่จอดรถ',
'active'),

-- Krabi Hotels
('ราวี วารินทร์ รีสอร์ท กระบี่', 'Rayavadee Krabi',
'รีสอร์ทหรูท่ามกลางธรรมชาติอ่าวพระนาง ล้อมรอบด้วยหินปูนและทะเล',
'Luxury resort amidst Railay nature, surrounded by limestone cliffs and sea',
'Krabi', '214 Moo 2, Tambon Ao-Nang, Amphur Muang, Krabi 81180',
15500, 4.8,
'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,สปา,ร้านอาหาร 3 แห่ง,กิจกรรมทางน้ำ,WiFi ฟรี',
'active'),

-- Samui Hotels
('โฟร์ซีซั่นส์ เกาะสมุย', 'Four Seasons Koh Samui',
'รีสอร์ทวิลล่าหรูบนเนินเขา วิวอ่าวไทยแบบ 360 องศา',
'Luxury hillside villa resort, 360-degree Gulf of Thailand views',
'Koh Samui', '219 Moo 5, Angthong, Koh Samui, Surat Thani 84140',
28000, 4.9,
'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำส่วนตัว,สปา,ฟิตเนส,โยคะ,ร้านอาหาร,บัตเลอร์',
'active'),

('W เกาะสมุย', 'W Koh Samui',
'รีสอร์ทดีไซน์ทันสมัยริมหาดแม่น้ำ สไตล์คนรุ่นใหม่',
'Modern design resort on Maenam Beach, contemporary style',
'Koh Samui', '4/1 Moo 1, Tambol Maenam, Koh Samui, Surat Thani 84330',
12000, 4.7,
'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,สปา,WET deck,WOOBAR,ฟิตเนส,กิจกรรมชายหาด',
'active'),

-- Pattaya Hotels
('รอยัล คลิฟ บีช พัทยา', 'Royal Cliff Beach Pattaya',
'รีสอร์ทขนาดใหญ่บนหน้าผาวิวทะเล พร้อมสิ่งอำนวยความสะดวกครบครัน',
'Large resort on cliff with sea view, full facilities',
'Pattaya', '353 Phra Tamnuk Road, Pattaya, Chonburi 20150',
4500, 4.6,
'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ 7 แห่ง,สปา,ฟิตเนส,ร้านอาหาร 11 แห่ง,บีชคลับ,เทนนิส',
'active'),

-- Bangkok Hotels
('เดอะ เพนนินซูลา กรุงเทพฯ', 'The Peninsula Bangkok',
'โรงแรมหรูริมแม่น้ำเจ้าพระยา พร้อมวิวเมืองกรุงเทพฯ',
'Luxury hotel along Chao Phraya River, Bangkok city views',
'Bangkok', '333 Charoennakorn Road, Klongsan, Bangkok 10600',
8900, 4.9,
'https://images.unsplash.com/photo-1565031491338-45f963137636?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำริมแม่น้ำ,สปา,ฟิตเนส,ร้านอาหาร 5 แห่ง,เฮลิแพด,บัตเลอร์',
'active'),

-- Chiangmai Hotels
('โฟร์ซีซั่นส์ เชียงใหม่', 'Four Seasons Chiangmai',
'รีสอร์ทท่ามกลางนาข้าวและขุนเขา บรรยากาศล้านนาแท้',
'Resort surrounded by rice paddies and mountains, authentic Lanna atmosphere',
'Chiangmai', 'Mae Rim-Samoeng Old Road, Mae Rim, Chiangmai 50180',
18500, 4.9,
'https://images.unsplash.com/photo-1586611292717-f828b167408c?q=80&w=1000&auto=format&fit=crop',
'สระว่ายน้ำ,สปาล้านนา,ฟิตเนส,โยคะ,ทำอาหารไทย,ปั่นจักรยาน',
'active');

-- =====================================================
-- TRANSFERS
-- =====================================================

INSERT INTO `transfers` (`name_th`, `name_en`, `description_th`, `description_en`, `type`, `price`, `vehicle_type`, `max_passengers`, `image`, `status`) VALUES

-- Airport Transfers - Phuket
('สนามบินภูเก็ต - ป่าตอง (ซีดาน)', 'Phuket Airport - Patong (Sedan)',
'รถซีดานรับส่งสนามบิน เหมาะสำหรับ 1-3 ท่าน พร้อมกระเป๋า 2 ใบ',
'Airport sedan transfer, suitable for 1-3 passengers with 2 luggage',
'airport', 800, 'Sedan', 3,
'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
'active'),

('สนามบินภูเก็ต - ป่าตอง (SUV)', 'Phuket Airport - Patong (SUV)',
'รถ SUV รับส่งสนามบิน เหมาะสำหรับ 1-4 ท่าน พร้อมกระเป๋า 4 ใบ',
'Airport SUV transfer, suitable for 1-4 passengers with 4 luggage',
'airport', 1000, 'SUV', 4,
'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop',
'active'),

('สนามบินภูเก็ต - ป่าตอง (รถตู้ VIP)', 'Phuket Airport - Patong (VIP Van)',
'รถตู้ VIP รับส่งสนามบิน เหมาะสำหรับครอบครัวหรือกลุ่ม 5-9 ท่าน',
'VIP Van airport transfer, suitable for families or groups 5-9 passengers',
'airport', 1500, 'Van', 9,
'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
'active'),

('สนามบินภูเก็ต - กะรน/กะตะ (ซีดาน)', 'Phuket Airport - Karon/Kata (Sedan)',
'รถซีดานรับส่งสนามบินไปกะรนหรือกะตะ',
'Sedan transfer from airport to Karon or Kata beach',
'airport', 900, 'Sedan', 3,
'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
'active'),

('สนามบินภูเก็ต - บางเทา/ลากูน่า (SUV)', 'Phuket Airport - Bang Tao/Laguna (SUV)',
'รถ SUV รับส่งสนามบินไปบางเทาหรือลากูน่า',
'SUV transfer from airport to Bang Tao or Laguna area',
'airport', 1100, 'SUV', 4,
'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop',
'active'),

-- Private Car Tours
('รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (ซีดาน)', 'Private Phuket Tour Full Day (Sedan)',
'รถซีดานพร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง',
'Sedan with driver, customized Phuket tour 8-10 hours',
'private', 2500, 'Sedan', 3,
'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
'active'),

('รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (SUV)', 'Private Phuket Tour Full Day (SUV)',
'รถ SUV พร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง',
'SUV with driver, customized Phuket tour 8-10 hours',
'private', 3000, 'SUV', 4,
'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop',
'active'),

('รถส่วนตัวเที่ยวภูเก็ต เต็มวัน (รถตู้ VIP)', 'Private Phuket Tour Full Day (VIP Van)',
'รถตู้ VIP พร้อมคนขับ เที่ยวภูเก็ตตามใจคุณ 8-10 ชั่วโมง',
'VIP Van with driver, customized Phuket tour 8-10 hours',
'private', 4000, 'Van', 9,
'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
'active'),

-- Hourly Rental
('เช่ารถพร้อมคนขับ รายชั่วโมง (ซีดาน)', 'Hourly Car Rental with Driver (Sedan)',
'รถซีดานพร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง',
'Sedan with driver, hourly rate, minimum 3 hours',
'hourly', 500, 'Sedan', 3,
'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
'active'),

('เช่ารถพร้อมคนขับ รายชั่วโมง (SUV)', 'Hourly Car Rental with Driver (SUV)',
'รถ SUV พร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง',
'SUV with driver, hourly rate, minimum 3 hours',
'hourly', 600, 'SUV', 4,
'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop',
'active'),

('เช่ารถพร้อมคนขับ รายชั่วโมง (รถตู้ VIP)', 'Hourly Car Rental with Driver (VIP Van)',
'รถตู้ VIP พร้อมคนขับ คิดค่าบริการรายชั่วโมง ขั้นต่ำ 3 ชั่วโมง',
'VIP Van with driver, hourly rate, minimum 3 hours',
'hourly', 800, 'Van', 9,
'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
'active'),

-- Long Distance
('ภูเก็ต - กระบี่ (ซีดาน)', 'Phuket - Krabi (Sedan)',
'รถซีดานรับส่งระหว่างภูเก็ตและกระบี่',
'Sedan transfer between Phuket and Krabi',
'private', 2500, 'Sedan', 3,
'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
'active'),

('ภูเก็ต - กระบี่ (รถตู้ VIP)', 'Phuket - Krabi (VIP Van)',
'รถตู้ VIP รับส่งระหว่างภูเก็ตและกระบี่ สะดวกสบายตลอดทาง',
'VIP Van transfer between Phuket and Krabi, comfortable journey',
'private', 3500, 'Van', 9,
'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
'active');
