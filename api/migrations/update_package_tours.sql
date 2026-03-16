-- Migration: Update package_tours table for new fields
-- Run this script to update the package_tours table

-- Add new columns (run each line separately if needed)

ALTER TABLE package_tours ADD COLUMN location VARCHAR(255) DEFAULT '' AFTER description_en;
ALTER TABLE package_tours ADD COLUMN airline VARCHAR(255) DEFAULT '' AFTER location;
ALTER TABLE package_tours ADD COLUMN discount_price DECIMAL(10,2) DEFAULT NULL AFTER price;
ALTER TABLE package_tours ADD COLUMN gallery JSON DEFAULT NULL AFTER image;
ALTER TABLE package_tours ADD COLUMN rating DECIMAL(2,1) DEFAULT 4.5 AFTER gallery;
ALTER TABLE package_tours ADD COLUMN reviews INT DEFAULT 0 AFTER rating;
ALTER TABLE package_tours ADD COLUMN highlights TEXT DEFAULT NULL AFTER reviews;
ALTER TABLE package_tours ADD COLUMN itinerary JSON DEFAULT NULL AFTER highlights;
ALTER TABLE package_tours ADD COLUMN included JSON DEFAULT NULL AFTER itinerary;
ALTER TABLE package_tours ADD COLUMN excluded JSON DEFAULT NULL AFTER included;

-- Note: If columns already exist, these commands will show errors - that's OK, just skip them

-- Verify table structure:
-- DESCRIBE package_tours;

-- Expected fields:
-- id, name_th, name_en, description_th, description_en, location, airline,
-- duration, price, discount_price, image, gallery, rating, reviews,
-- highlights (text - comma separated), itinerary (JSON), included (JSON), excluded (JSON),
-- category, status, created_at, updated_at
