-- ============================================
-- ตัวอย่างข้อมูลระบบราคาโรงแรม
-- Phuket Gevalin - Sample Hotel Pricing Data
-- ============================================

-- หมายเหตุ: เปลี่ยน hotel_id = 1 เป็น id ของโรงแรมที่มีอยู่จริงในระบบ

-- ============================================
-- 1. สร้างตาราง (ถ้ายังไม่มี)
-- ============================================

CREATE TABLE IF NOT EXISTS hotel_room_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT NOT NULL,
    name_th VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_th TEXT,
    description_en TEXT,
    max_guests INT DEFAULT 2,
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hotel_periods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hotel_room_prices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT NOT NULL,
    room_type_id INT NOT NULL,
    period_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_room_period (hotel_id, room_type_id, period_id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES hotel_room_types(id) ON DELETE CASCADE,
    FOREIGN KEY (period_id) REFERENCES hotel_periods(id) ON DELETE CASCADE
);

-- ============================================
-- 2. เพิ่มประเภทห้องพัก (Room Types)
-- ============================================

INSERT INTO hotel_room_types (hotel_id, name_th, name_en, description_th, description_en, max_guests, sort_order, status) VALUES
(1, 'ห้องสแตนดาร์ด', 'Standard Room', 'ห้องพักขนาดมาตรฐาน พร้อมสิ่งอำนวยความสะดวกครบครัน', 'Standard room with full amenities', 2, 1, 'active'),
(1, 'ห้องดีลักซ์', 'Deluxe Room', 'ห้องพักขนาดใหญ่ วิวสวน พร้อมระเบียงส่วนตัว', 'Spacious room with garden view and private balcony', 2, 2, 'active'),
(1, 'ห้องซูพีเรีย', 'Superior Room', 'ห้องพักหรู วิวทะเล พร้อมอ่างอาบน้ำ', 'Luxury room with sea view and bathtub', 3, 3, 'active'),
(1, 'ห้องสวีท', 'Suite Room', 'ห้องสวีทขนาดใหญ่ มีห้องนั่งเล่นแยก วิวทะเลพาโนรามา', 'Large suite with separate living area and panoramic sea view', 4, 4, 'active');

-- ============================================
-- 3. เพิ่มช่วงวันที่ราคา (Periods)
-- ============================================

INSERT INTO hotel_periods (hotel_id, start_date, end_date, sort_order, status) VALUES
(1, '2025-01-01', '2025-04-30', 1, 'active'),   -- Low Season
(1, '2025-05-01', '2025-10-31', 2, 'active'),   -- Green Season
(1, '2025-11-01', '2025-12-20', 3, 'active'),   -- High Season
(1, '2025-12-21', '2025-12-31', 4, 'active');   -- Peak Season

-- ============================================
-- 4. เพิ่มราคาห้องตามช่วงเวลา (Prices)
-- ============================================
-- หมายเหตุ: ต้องแก้ room_type_id และ period_id ให้ตรงกับ id ที่ได้จากการ insert ด้านบน
-- ถ้า insert ครั้งแรก จะได้ room_type_id = 1,2,3,4 และ period_id = 1,2,3,4

INSERT INTO hotel_room_prices (hotel_id, room_type_id, period_id, price) VALUES
-- Standard Room (room_type_id = 1)
(1, 1, 1, 1500),   -- Low Season: ฿1,500
(1, 1, 2, 1800),   -- Green Season: ฿1,800
(1, 1, 3, 2500),   -- High Season: ฿2,500
(1, 1, 4, 3500),   -- Peak Season: ฿3,500

-- Deluxe Room (room_type_id = 2)
(1, 2, 1, 2500),   -- Low Season: ฿2,500
(1, 2, 2, 3000),   -- Green Season: ฿3,000
(1, 2, 3, 4000),   -- High Season: ฿4,000
(1, 2, 4, 5500),   -- Peak Season: ฿5,500

-- Superior Room (room_type_id = 3)
(1, 3, 1, 3500),   -- Low Season: ฿3,500
(1, 3, 2, 4200),   -- Green Season: ฿4,200
(1, 3, 3, 5500),   -- High Season: ฿5,500
(1, 3, 4, 7500),   -- Peak Season: ฿7,500

-- Suite Room (room_type_id = 4)
(1, 4, 1, 5500),   -- Low Season: ฿5,500
(1, 4, 2, 6500),   -- Green Season: ฿6,500
(1, 4, 3, 8500),   -- High Season: ฿8,500
(1, 4, 4, 12000);  -- Peak Season: ฿12,000

-- ============================================
-- ผลลัพธ์ตารางราคา:
-- ============================================
-- | ประเภทห้อง | 1ม.ค.-30เม.ย. | 1พ.ค.-31ต.ค. | 1พ.ย.-20ธ.ค. | 21-31ธ.ค. |
-- |-----------|---------------|--------------|--------------|-----------|
-- | Standard  | ฿1,500        | ฿1,800       | ฿2,500       | ฿3,500    |
-- | Deluxe    | ฿2,500        | ฿3,000       | ฿4,000       | ฿5,500    |
-- | Superior  | ฿3,500        | ฿4,200       | ฿5,500       | ฿7,500    |
-- | Suite     | ฿5,500        | ฿6,500       | ฿8,500       | ฿12,000   |
-- ============================================
