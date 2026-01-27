-- Migration: Add missing fields to hotels table
-- Date: 2026-01-22
-- Description: Add reviews, stars, gallery for full hotel functionality

-- Add new columns to hotels table
ALTER TABLE `hotels`
ADD COLUMN `stars` tinyint(1) DEFAULT 4 COMMENT 'Hotel star rating 1-5' AFTER `rating`,
ADD COLUMN `reviews` int(11) DEFAULT 0 COMMENT 'Number of reviews' AFTER `stars`,
ADD COLUMN `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of image URLs' AFTER `image`;

-- Add CHECK constraint for gallery JSON (if supported) 0917747371
-- ALTER TABLE `hotels` ADD CHECK (JSON_VALID(`gallery`) OR `gallery` IS NULL);

-- Update existing hotels with sample data
UPDATE `hotels` SET
  `stars` = CASE
    WHEN `rating` >= 4.5 THEN 5
    WHEN `rating` >= 4.0 THEN 4
    WHEN `rating` >= 3.0 THEN 3
    ELSE 3
  END,
  `reviews` = FLOOR(50 + RAND() * 450),
  `gallery` = '[]'
WHERE `stars` IS NULL;
