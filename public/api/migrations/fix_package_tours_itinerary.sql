-- Migration: Fix package_tours itinerary field structure
-- This script updates the itinerary field to properly store JSON with day, titles, descriptions, meals, and accommodation
-- Date: 2026-01-21

-- First, let's check what we have and convert it properly

-- Update sample data for package tour ID 4 (Chiangmai Doi Inthanon)
UPDATE package_tours 
SET itinerary = JSON_ARRAY(
    JSON_OBJECT(
        'day', '01',
        'title_th', 'เชียงใหม่ - วัดพระธาตุดอยสุเทพ',
        'title_en', 'Chiangmai - Wat Doi Suthep',
        'description_th', 'เดินทางจากเชียงใหม่ไปชมวัดพระธาตุดอยสุเทพ',
        'description_en', 'Travel from Chiangmai to visit Wat Doi Suthep',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', true, 'note', ''),
        'accommodation', 'โรงแรมที่เชียงใหม่'
    ),
    JSON_OBJECT(
        'day', '02',
        'title_th', 'ดอยอินทนนท์ - น้ำตกวชิรธาร',
        'title_en', 'Doi Inthanon - Wachirathan Waterfall',
        'description_th', 'ขึ้นสู่ยอดดอยอินทนนท์ สูงที่สุดในประเทศไทย ชมน้ำตกวชิรธาร',
        'description_en', 'Climb to Doi Inthanon, the highest peak in Thailand, see Wachirathan Waterfall',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', true, 'note', ''),
        'accommodation', 'โรงแรมที่เชียงใหม่'
    ),
    JSON_OBJECT(
        'day', '03',
        'title_th', 'นิมมาน - กรุงเทพฯ',
        'title_en', 'Nimman - Bangkok',
        'description_th', 'เดินเล่นย่านนิมมาน แล้วเดินทางกลับกรุงเทพฯ',
        'description_en', 'Explore Nimman area, then return to Bangkok',
        'meals', JSON_OBJECT('b', true, 'l', false, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    )
)
WHERE id = 4;

-- Update sample data for package tour ID 7 (Phi Phi Island)
UPDATE package_tours 
SET itinerary = JSON_ARRAY(
    JSON_OBJECT(
        'day', '01',
        'title_th', 'รับจากโรงแรม - เกาะพีพี',
        'title_en', 'Hotel Pickup - Phi Phi Island',
        'description_th', 'รถรับจากโรงแรม นำท่านไปท่าเรือแล้วเดินทางสู่เกาะพีพี',
        'description_en', 'Pick up from hotel, transfer to pier and travel to Phi Phi Island',
        'meals', JSON_OBJECT('b', false, 'l', true, 'd', true, 'note', 'อาหารบนเกาะพีพี'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '02',
        'title_th', 'เกาะพีพี - อ่าวมาหยา - เกาะไข่',
        'title_en', 'Phi Phi - Maya Bay - Khai Island',
        'description_th', 'ดำน้ำชมปะการัง ชมอ่าวมาหยาและพักผ่อนบนหาดเกาะไข่',
        'description_en', 'Snorkeling, visit Maya Bay, and relax on Khai Island beach',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '03',
        'title_th', 'กลับกรุงเทพฯ',
        'title_en', 'Return to Bangkok',
        'description_th', 'เดินทางกลับสู่กรุงเทพฯ',
        'description_en', 'Return journey to Bangkok',
        'meals', JSON_OBJECT('b', true, 'l', false, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    )
)
WHERE id = 7;

-- Update sample data for package tour ID 8 (James Bond Island)
UPDATE package_tours 
SET itinerary = JSON_ARRAY(
    JSON_OBJECT(
        'day', '01',
        'title_th', 'ภูเก็ต - เกาะเจมส์บอนด์',
        'title_en', 'Phuket - James Bond Island',
        'description_th', 'รถรับจากโรงแรม ไปท่าเรืออ่าวพังงา แล้วเดินทางไปเกาะเจมส์บอนด์',
        'description_en', 'Pick up from hotel, go to Phang Nga pier, then visit James Bond Island',
        'meals', JSON_OBJECT('b', false, 'l', true, 'd', true, 'note', 'อาหารบนเกาะ'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '02',
        'title_th', 'เกาะปันหยี - พายคายัค - ถ้ำลอด',
        'title_en', 'Panyi Village - Kayaking - Lod Cave',
        'description_th', 'ชมหมู่บ้านปันหยี เดินทางแบบไปหลังไปมา ดำน้ำหรือพายคายัค',
        'description_en', 'Visit Panyi village, sea canoeing or kayaking',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '03',
        'title_th', 'กลับภูเก็ต',
        'title_en', 'Return to Phuket',
        'description_th', 'เดินทางกลับสู่ภูเก็ต',
        'description_en', 'Return to Phuket',
        'meals', JSON_OBJECT('b', true, 'l', false, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    )
)
WHERE id = 8;

-- Update sample data for package tour ID 9 (Similan Islands)
UPDATE package_tours 
SET itinerary = JSON_ARRAY(
    JSON_OBJECT(
        'day', '01',
        'title_th', 'เกาะสิมิลัน - หินเรือใบ',
        'title_en', 'Similan Islands - Sail Rock',
        'description_th', 'เดินทางไปหาดทับละมู ชมหินเรือใบและเกาะสิมิลัน',
        'description_en', 'Travel to Tab Lamu pier, see Sail Rock and Similan Islands',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', true, 'note', 'อาหารเช้าและกลางวัน'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '02',
        'title_th', 'เกาะสิมิลัน - ดำน้ำ',
        'title_en', 'Similan Islands - Snorkeling',
        'description_th', 'ดำน้ำชมปะการังหลายแห่งที่น้ำใสที่สุดในไทย',
        'description_en', 'Snorkeling at multiple spots with the clearest water in Thailand',
        'meals', JSON_OBJECT('b', true, 'l', true, 'd', true, 'note', 'อาหารครบ'),
        'accommodation', ''
    ),
    JSON_OBJECT(
        'day', '03',
        'title_th', 'กลับภูเก็ต',
        'title_en', 'Return to Phuket',
        'description_th', 'เดินทางกลับสู่ภูเก็ต',
        'description_en', 'Return to Phuket',
        'meals', JSON_OBJECT('b', true, 'l', false, 'd', false, 'note', 'อิสระ'),
        'accommodation', ''
    )
)
WHERE id = 9;

-- Verify the data was updated correctly
SELECT 
    id, 
    name_th,
    JSON_LENGTH(itinerary) as itinerary_days,
    JSON_EXTRACT(itinerary, '$[0].day') as first_day,
    JSON_EXTRACT(itinerary, '$[0].title_th') as first_title
FROM package_tours
WHERE id IN (4, 7, 8, 9);
