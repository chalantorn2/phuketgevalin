-- อัพเดทรูปรถแต่ละคัน (แก้ path ตามรูปจริงของคุณ)

-- Car (รถเก๋ง)
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 1; -- Toyota Camry
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 2; -- Toyota Altis

-- Van (รถตู้)
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 3; -- Toyota Commuter VIP
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 4; -- Hyundai H1

-- Bus (รถบัส)
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 5; -- บัส 20 ที่นั่ง
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 6; -- บัส 40 ที่นั่ง

-- Luxury (รถหรู)
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 7; -- Mercedes-Benz E-Class
UPDATE `transfers` SET `image` = '/image/waiting_image-01.jpg' WHERE `id` = 8; -- BMW 5 Series
