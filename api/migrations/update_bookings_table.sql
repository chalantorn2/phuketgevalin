-- Migration: Add missing columns to bookings table
-- Date: 2026-03-16

-- Add checkout_date for hotel bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS checkout_date DATE NULL AFTER booking_date;

-- Add pickup_time for transfer bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_time VARCHAR(10) NULL AFTER pickup_location;

-- Add flight_number for transfer bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS flight_number VARCHAR(20) NULL AFTER pickup_time;

-- Add payment_status if not exists
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid' AFTER status;

-- Add admin_notes if not exists
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS admin_notes TEXT NULL AFTER payment_status;

-- Add updated_at if not exists
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NULL AFTER created_at;
