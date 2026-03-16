-- =====================================================
-- Migration: Update Package Tours Data
-- Date: 2026-01-22
-- Description: ลบข้อมูลตัวอย่างเก่าและเพิ่มข้อมูลทัวร์ในประเทศ 3 รายการ
-- =====================================================

-- 1. ลบข้อมูลตัวอย่างเก่าทั้งหมด
DELETE FROM package_tours;

-- 2. Reset AUTO_INCREMENT
ALTER TABLE package_tours AUTO_INCREMENT = 1;

-- =====================================================
-- 3. เพิ่มข้อมูลทัวร์ในประเทศ 3 รายการ
-- =====================================================

-- ทัวร์ที่ 1: เชียงใหม่ - ดอยอินทนนท์ 3 วัน 2 คืน
INSERT INTO package_tours (
    name_th, name_en, description_th, description_en,
    location, duration, price, discount_price,
    image, gallery, rating, reviews, bestseller,
    highlights_th, highlights_en,
    itinerary,
    included_th, included_en, excluded_th, excluded_en,
    meeting_point_th, meeting_point_en,
    important_info_th, important_info_en,
    category, status, created_at
) VALUES (
    'ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน',
    'Chiangmai Doi Inthanon 3D2N Tour',
    'สัมผัสธรรมชาติและวัฒนธรรมล้านนาอย่างใกล้ชิด พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย ชมทะเลหมอกยามเช้า สักการะพระธาตุดอยสุเทพ เดินชมวัดเก่าแก่ และช้อปปิ้งย่านนิมมาน',
    'Experience Lanna nature and culture up close. Conquer Doi Inthanon, the highest peak in Thailand. Watch the morning sea of mist, pay respect at Wat Phra That Doi Suthep, explore ancient temples, and shop at Nimman area.',
    'เชียงใหม่, ประเทศไทย',
    '3 วัน 2 คืน',
    5990.00,
    6990.00,
    'https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1598935898639-81586f7d2129?q=80&w=1000&auto=format&fit=crop"]',
    4.8,
    256,
    1,
    '["พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย", "สักการะพระธาตุดอยสุเทพ วัดศักดิ์สิทธิ์คู่เมืองเชียงใหม่", "ชมน้ำตกวชิรธาร น้ำตกที่สวยที่สุดในภาคเหนือ", "ชมทะเลหมอกยามเช้าบนดอย", "เดินเล่นย่านนิมมาน คาเฟ่และร้านเก๋ๆ"]',
    '["Conquer Doi Inthanon, the highest peak in Thailand", "Pay respect at Wat Phra That Doi Suthep, the sacred temple of Chiang Mai", "Visit Wachirathan Waterfall, the most beautiful waterfall in Northern Thailand", "Watch the morning sea of mist on the mountain", "Explore Nimman area with trendy cafes and shops"]',
    '[{"day": "01", "title_th": "กรุงเทพฯ - เชียงใหม่ - วัดพระธาตุดอยสุเทพ", "title_en": "Bangkok - Chiang Mai - Wat Doi Suthep", "description_th": "เดินทางถึงเชียงใหม่ช่วงเช้า นำท่านขึ้นสักการะพระธาตุดอยสุเทพ ชมวิวเมืองเชียงใหม่จากมุมสูง จากนั้นรับประทานอาหารกลางวันแบบขันโตก ช่วงบ่ายเดินชมวัดเจดีย์หลวง วัดพระสิงห์ และเที่ยวตลาดวโรรส ค่ำรับประทานอาหารเย็นพร้อมชมการแสดงพื้นเมือง", "description_en": "Arrive in Chiang Mai in the morning. Visit Wat Phra That Doi Suthep and enjoy panoramic city views. Have Khantoke lunch. In the afternoon, explore Wat Chedi Luang, Wat Phra Singh, and Warorot Market. Dinner with traditional Lanna performance.", "meals": {"b": false, "l": true, "d": true, "note": "อาหารกลางวันขันโตก"}, "accommodation": "โรงแรม 4 ดาวในตัวเมืองเชียงใหม่"}, {"day": "02", "title_th": "ดอยอินทนนท์ - น้ำตกวชิรธาร - พระมหาธาตุเจดีย์", "title_en": "Doi Inthanon - Wachirathan Waterfall - Twin Pagodas", "description_th": "ออกเดินทางแต่เช้าสู่อุทยานแห่งชาติดอยอินทนนท์ ชมทะเลหมอกและพระอาทิตย์ขึ้นที่กิ่วแม่ปาน พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย (2,565 เมตร) สักการะพระมหาธาตุนภเมทนีดล และพระมหาธาตุนภพลภูมิสิริ ชมน้ำตกวชิรธาร และเดินศึกษาธรรมชาติเส้นทางกิ่วแม่ปาน", "description_en": "Early departure to Doi Inthanon National Park. Watch the sea of mist and sunrise at Kew Mae Pan. Conquer Doi Inthanon summit, Thailand''s highest point (2,565m). Visit the Twin Royal Pagodas. See Wachirathan Waterfall and walk the Kew Mae Pan Nature Trail.", "meals": {"b": true, "l": true, "d": true, "note": ""}, "accommodation": "โรงแรม 4 ดาวในตัวเมืองเชียงใหม่"}, {"day": "03", "title_th": "วัดอุโมงค์ - ย่านนิมมาน - กรุงเทพฯ", "title_en": "Wat Umong - Nimman Area - Bangkok", "description_th": "ช่วงเช้าชมวัดอุโมงค์ วัดเก่าแก่กว่า 700 ปี มีอุโมงค์ใต้ดินเป็นเอกลักษณ์ จากนั้นเดินเล่นช้อปปิ้งย่านนิมมาน แหล่งรวมคาเฟ่และร้านค้าเก๋ๆ รับประทานอาหารกลางวันอิสระตามอัธยาศัย ก่อนเดินทางกลับกรุงเทพฯ", "description_en": "Morning visit to Wat Umong, a 700-year-old temple famous for its underground tunnels. Then explore Nimman area with trendy cafes and unique shops. Free lunch on your own before returning to Bangkok.", "meals": {"b": true, "l": false, "d": false, "note": "อิสระมื้อกลางวัน"}, "accommodation": ""}]',
    '["รถตู้ปรับอากาศ VIP ตลอดการเดินทาง", "ที่พักโรงแรม 4 ดาว 2 คืน (พักห้องละ 2 ท่าน)", "อาหารตามรายการ (5 มื้อ)", "ค่าธรรมเนียมเข้าชมสถานที่ทุกแห่ง", "ไกด์ท้องถิ่นผู้ชำนาญ", "น้ำดื่มและผ้าเย็นบริการตลอดทาง", "ประกันการเดินทาง วงเงิน 1,000,000 บาท"]',
    '["VIP air-conditioned van throughout the trip", "4-star hotel accommodation for 2 nights (twin sharing)", "Meals as per itinerary (5 meals)", "All entrance fees", "Professional local guide", "Drinking water and cold towels", "Travel insurance coverage 1,000,000 Baht"]',
    '["ค่าใช้จ่ายส่วนตัวอื่นๆ", "ทิปไกด์และคนขับ (300 บาท/ท่าน)", "อาหารและเครื่องดื่มนอกเหนือรายการ", "ค่าธรรมเนียมสำหรับชาวต่างชาติ (ถ้ามี)"]',
    '["Personal expenses", "Tips for guide and driver (300 Baht/person)", "Food and drinks not mentioned in itinerary", "Additional fees for foreign nationals (if any)"]',
    'จุดนัดพบ: ปั๊ม ปตท. วิภาวดีรังสิต หรือรับที่โรงแรมในกรุงเทพฯ (เขตชั้นใน)',
    'Meeting point: PTT Gas Station Vibhavadi or hotel pickup in Bangkok (inner area)',
    'กรุณาเตรียมเสื้อกันหนาวสำหรับขึ้นดอยอินทนนท์ (อุณหภูมิประมาณ 5-15 องศา) / แนะนำใส่รองเท้าผ้าใบสำหรับเดินป่า / โปรแกรมอาจมีการปรับเปลี่ยนตามสภาพอากาศ',
    'Please bring warm clothing for Doi Inthanon (temperature around 5-15°C) / Sneakers recommended for nature walks / Program may change according to weather conditions',
    'domestic',
    'active',
    NOW()
);

-- ทัวร์ที่ 2: ภูเก็ต - พังงา - เกาะพีพี 4 วัน 3 คืน
INSERT INTO package_tours (
    name_th, name_en, description_th, description_en,
    location, duration, price, discount_price,
    image, gallery, rating, reviews, bestseller,
    highlights_th, highlights_en,
    itinerary,
    included_th, included_en, excluded_th, excluded_en,
    meeting_point_th, meeting_point_en,
    important_info_th, important_info_en,
    category, status, created_at
) VALUES (
    'ทัวร์ภูเก็ต พังงา เกาะพีพี 4 วัน 3 คืน',
    'Phuket Phang Nga Phi Phi 4D3N Tour',
    'เที่ยวครบทะเลอันดามัน! ชมเกาะเจมส์บอนด์ที่อ่าวพังงา ดำน้ำดูปะการังเกาะพีพี ถ่ายรูปอ่าวมาหยาสุดอินเทรนด์ ล่องเรือชมพระอาทิตย์ตกที่แหลมพรหมเทพ พร้อมช้อปปิ้งถนนบางลา',
    'Complete Andaman Sea experience! Visit James Bond Island at Phang Nga Bay, snorkel at Phi Phi Island, capture photos at the iconic Maya Bay, cruise at sunset at Promthep Cape, and shop at Bangla Road.',
    'ภูเก็ต, ประเทศไทย',
    '4 วัน 3 คืน',
    8990.00,
    10990.00,
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=1000&auto=format&fit=crop"]',
    4.9,
    384,
    1,
    '["ชมเกาะเจมส์บอนด์ เกาะเขาพิงกันอันโด่งดัง", "ดำน้ำดูปะการังน้ำใสที่เกาะพีพี", "ถ่ายรูปอ่าวมาหยาที่โด่งดังจากหนัง The Beach", "พายเรือคายัคในถ้ำลอดอ่าวพังงา", "ชมพระอาทิตย์ตกที่แหลมพรหมเทพ", "ช้อปปิ้งและเดินเล่นถนนบางลา"]',
    '["Visit James Bond Island, the famous Khao Phing Kan", "Snorkeling in crystal clear water at Phi Phi Island", "Photo at the iconic Maya Bay from The Beach movie", "Kayaking through sea caves at Phang Nga Bay", "Sunset at Promthep Cape", "Shopping and nightlife at Bangla Road"]',
    '[{"day": "01", "title_th": "กรุงเทพฯ - ภูเก็ต - แหลมพรหมเทพ", "title_en": "Bangkok - Phuket - Promthep Cape", "description_th": "เดินทางถึงภูเก็ต นำท่านรับประทานอาหารกลางวันอาหารใต้ขึ้นชื่อ จากนั้นชมวัดฉลอง ไหว้หลวงพ่อแช่ม เที่ยวชมย่านเมืองเก่าภูเก็ต ถ่ายรูปบ้านชิโนโปรตุกีส ช่วงเย็นชมพระอาทิตย์ตกที่แหลมพรหมเทพ แวะช้อปปิ้งที่ Central Festival Phuket", "description_en": "Arrive in Phuket. Enjoy famous Southern Thai cuisine for lunch. Visit Wat Chalong to pay respect to Luang Por Chaem. Explore Phuket Old Town with Sino-Portuguese architecture. Evening sunset at Promthep Cape and shopping at Central Festival Phuket.", "meals": {"b": false, "l": true, "d": true, "note": ""}, "accommodation": "โรงแรม 4 ดาว หาดป่าตอง"}, {"day": "02", "title_th": "อ่าวพังงา - เกาะเจมส์บอนด์ - ถ้ำลอด", "title_en": "Phang Nga Bay - James Bond Island - Sea Cave", "description_th": "ออกเดินทางสู่อ่าวพังงา ล่องเรือชมทิวทัศน์เกาะหินปูนกลางทะเล ชมเกาะเขาพิงกัน (เกาะเจมส์บอนด์) จากภาพยนตร์ The Man with the Golden Gun พายเรือคายัคลอดถ้ำ ชมหมู่บ้านชาวเลเกาะปันหยี รับประทานอาหารกลางวันซีฟู้ดสดๆ", "description_en": "Depart to Phang Nga Bay. Cruise among limestone karsts. Visit Khao Phing Kan (James Bond Island) from ''The Man with the Golden Gun''. Kayak through sea caves. Visit the floating Muslim village at Koh Panyi. Fresh seafood lunch.", "meals": {"b": true, "l": true, "d": true, "note": "ซีฟู้ดสดที่เกาะปันหยี"}, "accommodation": "โรงแรม 4 ดาว หาดป่าตอง"}, {"day": "03", "title_th": "เกาะพีพี - อ่าวมาหยา - เกาะไผ่", "title_en": "Phi Phi Island - Maya Bay - Bamboo Island", "description_th": "เรือสปีดโบ๊ทนำท่านสู่เกาะพีพี ชมอ่าวมาหยาที่โด่งดังจากภาพยนตร์ The Beach ดำน้ำดูปะการังและปลาสีสันสดใสที่อ่าวปิเละ ลอดถ้ำไวกิ้ง พักผ่อนบนหาดทรายขาวเกาะไผ่ เล่นน้ำทะเลใสราวกระจก", "description_en": "Speedboat to Phi Phi Islands. Visit the famous Maya Bay from ''The Beach'' movie. Snorkeling at colorful coral reefs at Pileh Lagoon. See Viking Cave. Relax on the white sandy beach of Bamboo Island with crystal clear water.", "meals": {"b": true, "l": true, "d": true, "note": "อาหารกลางวันบนเกาะ"}, "accommodation": "โรงแรม 4 ดาว หาดป่าตอง"}, {"day": "04", "title_th": "อิสระ - กรุงเทพฯ", "title_en": "Free Time - Bangkok", "description_th": "ช่วงเช้าอิสระตามอัธยาศัย แนะนำเที่ยวชมวัดพระทอง นั่งช้าง หรือพักผ่อนที่ชายหาด ก่อนเดินทางกลับกรุงเทพฯ พร้อมความประทับใจ", "description_en": "Free morning at leisure. Recommend visiting Wat Phra Thong, elephant trekking, or relaxing at the beach before returning to Bangkok with wonderful memories.", "meals": {"b": true, "l": false, "d": false, "note": "อิสระมื้อกลางวัน"}, "accommodation": ""}]',
    '["รถตู้ปรับอากาศ VIP", "ที่พักโรงแรม 4 ดาว 3 คืน", "เรือสปีดโบ๊ทท่องเที่ยวเกาะพีพี", "เรือหางยาวอ่าวพังงา", "อุปกรณ์ดำน้ำตื้น", "อาหาร 9 มื้อตามรายการ", "ค่าธรรมเนียมอุทยานแห่งชาติ", "ไกด์มืออาชีพตลอดทริป", "ประกันการเดินทาง"]',
    '["VIP air-conditioned van", "4-star hotel for 3 nights", "Speedboat to Phi Phi Island", "Longtail boat at Phang Nga Bay", "Snorkeling equipment", "9 meals as per itinerary", "National park entrance fees", "Professional guide throughout", "Travel insurance"]',
    '["ค่าใช้จ่ายส่วนตัว", "ทิปไกด์และคนขับ (400 บาท/ท่าน)", "กิจกรรมเสริมอื่นๆ", "มินิบาร์ในห้องพัก"]',
    '["Personal expenses", "Tips for guide and driver (400 Baht/person)", "Optional activities", "Minibar in room"]',
    'จุดนัดพบ: สนามบินภูเก็ต หรือรับจากโรงแรมในภูเก็ต',
    'Meeting point: Phuket Airport or hotel pickup in Phuket',
    'กรุณาเตรียมชุดว่ายน้ำ ครีมกันแดด และยากันเมาเรือ / ไม่แนะนำสำหรับผู้ที่ตั้งครรภ์หรือมีโรคหัวใจ / โปรแกรมอาจเปลี่ยนแปลงตามสภาพอากาศและคลื่นทะเล',
    'Please bring swimwear, sunscreen, and motion sickness pills / Not recommended for pregnant women or those with heart conditions / Program may change according to weather and sea conditions',
    'domestic',
    'active',
    NOW()
);

-- ทัวร์ที่ 3: กระบี่ - เกาะลันตา - 4 เกาะ 3 วัน 2 คืน
INSERT INTO package_tours (
    name_th, name_en, description_th, description_en,
    location, duration, price, discount_price,
    image, gallery, rating, reviews, bestseller,
    highlights_th, highlights_en,
    itinerary,
    included_th, included_en, excluded_th, excluded_en,
    meeting_point_th, meeting_point_en,
    important_info_th, important_info_en,
    category, status, created_at
) VALUES (
    'ทัวร์กระบี่ เกาะลันตา 4 เกาะ 3 วัน 2 คืน',
    'Krabi Koh Lanta 4 Islands 3D2N Tour',
    'เที่ยวครบกระบี่! เดินบนทะเลแหวกปรากฏการณ์ธรรมชาติมหัศจรรย์ ดำน้ำดูปะการัง 4 เกาะสวย ชิลล์ที่เกาะลันตา ชมถ้ำพระนางและหาดไร่เลย์ สวรรค์ของนักปีนผา',
    'Complete Krabi experience! Walk on the Separated Sea natural phenomenon, snorkel at 4 beautiful islands, chill at Koh Lanta, explore Phra Nang Cave and Railay Beach, paradise for rock climbers.',
    'กระบี่, ประเทศไทย',
    '3 วัน 2 คืน',
    6490.00,
    7490.00,
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1000&auto=format&fit=crop"]',
    4.7,
    198,
    0,
    '["เดินบนทะเลแหวก ปรากฏการณ์ธรรมชาติสุดมหัศจรรย์", "ดำน้ำดูปะการัง 4 เกาะสวย (ทับ ไก่ ปอดะ หม้อ)", "พักผ่อนบนเกาะลันตา บรรยากาศสงบเงียบ", "ชมถ้ำพระนางและหาดไร่เลย์สุดสวย", "ถ่ายรูปกับเกาะไก่รูปร่างแปลกตา"]',
    '["Walk on the Separated Sea, amazing natural phenomenon", "Snorkeling at 4 beautiful islands (Tub, Chicken, Poda, Mor)", "Relax at Koh Lanta with peaceful atmosphere", "Explore Phra Nang Cave and beautiful Railay Beach", "Photo with the unique Chicken Island rock formation"]',
    '[{"day": "01", "title_th": "กรุงเทพฯ - กระบี่ - หาดอ่าวนาง", "title_en": "Bangkok - Krabi - Ao Nang Beach", "description_th": "เดินทางถึงกระบี่ช่วงเช้า รับประทานอาหารกลางวันอาหารใต้รสเด็ด จากนั้นล่องเรือหางยาวชมถ้ำพระนาง ลงเล่นน้ำที่หาดไร่เลย์สุดสวย ชมหินปูนรูปร่างแปลกตา ค่ำรับประทานอาหารซีฟู้ดริมทะเลที่อ่าวนาง", "description_en": "Arrive in Krabi in the morning. Enjoy delicious Southern Thai lunch. Longtail boat to Phra Nang Cave and swim at beautiful Railay Beach. See unique limestone formations. Seafood dinner by the sea at Ao Nang.", "meals": {"b": false, "l": true, "d": true, "note": "ซีฟู้ดริมทะเล"}, "accommodation": "โรงแรม 4 ดาว อ่าวนาง"}, {"day": "02", "title_th": "4 เกาะ - ทะเลแหวก - เกาะปอดะ", "title_en": "4 Islands - Separated Sea - Poda Island", "description_th": "ออกเดินทางท่องเที่ยว 4 เกาะสุดคลาสสิก ชมทะเลแหวกที่เกาะทับ เดินบนสันทรายเชื่อมเกาะทับและเกาะไก่ ถ่ายรูปกับเกาะไก่รูปร่างแปลกตา ดำน้ำดูปะการังและปลาหลากสีที่เกาะปอดะ พักผ่อนบนหาดทรายขาวละเอียด รับประทานอาหารกลางวันแบบปิกนิกบนเกาะ", "description_en": "Classic 4 islands tour. See the Separated Sea at Tub Island. Walk on the sandbar connecting Tub and Chicken Islands. Photo with unique Chicken Island. Snorkeling at Poda Island with colorful fish. Relax on fine white sand beach. Picnic lunch on the island.", "meals": {"b": true, "l": true, "d": true, "note": "ปิกนิกบนเกาะ"}, "accommodation": "โรงแรม 4 ดาว อ่าวนาง"}, {"day": "03", "title_th": "เกาะลันตา - กรุงเทพฯ", "title_en": "Koh Lanta - Bangkok", "description_th": "ออกเดินทางสู่เกาะลันตา เกาะสวยบรรยากาศสงบ แวะชมเมืองเก่าลันตา บ้านศรีราชา จุดชมวิวและประภาคารเกาะลันตา ช่วงเที่ยงรับประทานอาหารอิสระ ก่อนเดินทางกลับกรุงเทพฯ", "description_en": "Travel to Koh Lanta, a beautiful peaceful island. Visit Lanta Old Town, Baan Sri Raya, viewpoint and Koh Lanta lighthouse. Free lunch before returning to Bangkok.", "meals": {"b": true, "l": false, "d": false, "note": "อิสระมื้อกลางวัน"}, "accommodation": ""}]',
    '["รถตู้ปรับอากาศ", "ที่พักโรงแรม 4 ดาว 2 คืน", "เรือหางยาวทัวร์ 4 เกาะ", "อุปกรณ์ดำน้ำตื้น", "อาหาร 6 มื้อตามรายการ", "ค่าธรรมเนียมอุทยาน", "ไกด์ท้องถิ่น", "ประกันการเดินทาง"]',
    '["Air-conditioned van", "4-star hotel for 2 nights", "Longtail boat 4 islands tour", "Snorkeling equipment", "6 meals as per itinerary", "National park fees", "Local guide", "Travel insurance"]',
    '["ค่าใช้จ่ายส่วนตัว", "ทิปไกด์และคนขับ (300 บาท/ท่าน)", "กิจกรรมเสริม เช่น ปีนผา พายคายัค", "อาหารและเครื่องดื่มนอกรายการ"]',
    '["Personal expenses", "Tips for guide and driver (300 Baht/person)", "Optional activities like rock climbing, kayaking", "Food and drinks not in itinerary"]',
    'จุดนัดพบ: สนามบินกระบี่ หรือรับที่โรงแรมในอ่าวนาง',
    'Meeting point: Krabi Airport or hotel pickup in Ao Nang',
    'ทะเลแหวกเกิดขึ้นเฉพาะช่วงน้ำลง (โปรดตรวจสอบตารางน้ำ) / กรุณาเตรียมชุดว่ายน้ำ ครีมกันแดด / โปรแกรมอาจปรับตามสภาพอากาศ',
    'The Separated Sea only appears during low tide (please check tide schedule) / Please bring swimwear, sunscreen / Program may change according to weather',
    'domestic',
    'active',
    NOW()
);

-- =====================================================
-- สรุปข้อมูลที่เพิ่ม:
-- 1. ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน - ฿5,990
-- 2. ทัวร์ภูเก็ต พังงา เกาะพีพี 4 วัน 3 คืน - ฿8,990
-- 3. ทัวร์กระบี่ เกาะลันตา 4 เกาะ 3 วัน 2 คืน - ฿6,490
-- =====================================================
