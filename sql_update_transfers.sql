-- ลบข้อมูล transfers เดิมทั้งหมด
DELETE FROM `transfers`;

-- รีเซ็ต AUTO_INCREMENT
ALTER TABLE `transfers` AUTO_INCREMENT = 1;

-- เปลี่ยน enum type เพิ่ม flexibility
ALTER TABLE `transfers` MODIFY `type` VARCHAR(50) NOT NULL DEFAULT 'private';

-- ใส่ข้อมูลใหม่ Type ละ 2 คัน (car, van, bus, luxury)
INSERT INTO `transfers` (`name_th`, `name_en`, `description_th`, `description_en`, `type`, `price`, `vehicle_type`, `max_passengers`, `image`, `status`) VALUES

-- Car (รถเก๋ง) x 2
('รถเก๋ง Toyota Camry', 'Toyota Camry Sedan', 'รถเก๋งซีดานสุดหรู นั่งสบาย เหมาะสำหรับ 1-3 ท่าน พร้อมกระเป๋า 2 ใบ', 'Luxury sedan, comfortable ride for 1-3 passengers with 2 luggage', 'private', 800.00, 'car', 3, '/image/waiting_image-01.jpg', 'active'),
('รถเก๋ง Toyota Altis', 'Toyota Altis Sedan', 'รถเก๋งประหยัดน้ำมัน นั่งสบาย เหมาะสำหรับ 1-3 ท่าน พร้อมกระเป๋า 2 ใบ', 'Economy sedan, comfortable ride for 1-3 passengers with 2 luggage', 'private', 700.00, 'car', 3, '/image/waiting_image-01.jpg', 'active'),

-- Van (รถตู้) x 2
('รถตู้ VIP Toyota Commuter', 'VIP Van Toyota Commuter', 'รถตู้ VIP พร้อมเบาะปรับเอนได้ เหมาะสำหรับครอบครัวหรือกลุ่ม 5-9 ท่าน', 'VIP Van with reclining seats, suitable for families or groups 5-9 passengers', 'private', 1500.00, 'van', 9, '/image/waiting_image-01.jpg', 'active'),
('รถตู้ Hyundai H1', 'Hyundai H1 Van', 'รถตู้ Hyundai H1 นั่งสบาย เหมาะสำหรับกลุ่ม 5-7 ท่าน พร้อมกระเป๋า', 'Hyundai H1 Van, comfortable for groups of 5-7 passengers with luggage', 'private', 1300.00, 'van', 7, '/image/waiting_image-01.jpg', 'active'),

-- Bus (รถบัส) x 2
('รถบัสปรับอากาศ 20 ที่นั่ง', '20-Seat Air-Conditioned Bus', 'รถบัสปรับอากาศขนาดกลาง เหมาะสำหรับกรุ๊ปทัวร์ 10-20 ท่าน', 'Medium air-conditioned bus, suitable for tour groups of 10-20 passengers', 'private', 4000.00, 'bus', 20, '/image/waiting_image-01.jpg', 'active'),
('รถบัสปรับอากาศ 40 ที่นั่ง', '40-Seat Air-Conditioned Bus', 'รถบัสปรับอากาศขนาดใหญ่ เหมาะสำหรับกรุ๊ปทัวร์ 20-40 ท่าน', 'Large air-conditioned bus, suitable for tour groups of 20-40 passengers', 'private', 7000.00, 'bus', 40, '/image/waiting_image-01.jpg', 'active'),

-- Luxury (รถหรู) x 2
('รถหรู Mercedes-Benz E-Class', 'Mercedes-Benz E-Class', 'รถหรูระดับพรีเมียม นั่งสบายเหนือระดับ เหมาะสำหรับ VIP 1-3 ท่าน', 'Premium luxury car, superior comfort for VIP 1-3 passengers', 'private', 3500.00, 'luxury', 3, '/image/waiting_image-01.jpg', 'active'),
('รถหรู BMW 5 Series', 'BMW 5 Series', 'รถหรู BMW สัมผัสประสบการณ์การเดินทางระดับเฟิร์สคลาส เหมาะสำหรับ VIP 1-3 ท่าน', 'BMW luxury car, first-class travel experience for VIP 1-3 passengers', 'private', 3800.00, 'luxury', 3, '/image/waiting_image-01.jpg', 'active');
