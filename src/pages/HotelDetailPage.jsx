import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Wind,
  Coffee,
  Droplets,
  Car,
  Dumbbell,
  Utensils,
  Check,
  ChevronLeft,
  Calendar,
  Users,
  ShieldCheck,
  Heart,
  Share2,
  Camera,
  BedDouble,
  Maximize,
  CheckCircle2,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { hotelsAPI, hotelRoomTypesAPI, hotelPeriodsAPI, hotelRoomPricesAPI } from "../services/api";

// Amenity icon mapping
const amenityIcons = {
  wifi: <Wifi size={18} />,
  pool: <Droplets size={18} />,
  restaurant: <Utensils size={18} />,
  fitness: <Dumbbell size={18} />,
  parking: <Car size={18} />,
  breakfast: <Coffee size={18} />,
  spa: <Wind size={18} />,
};

export default function HotelDetailPage({ hotelId, onBack }) {
  const { t, language } = useLanguage();
  const [hotel, setHotel] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      if (!hotelId) return;
      setLoading(true);
      try {
        const [hotelRes, roomTypesRes, periodsRes, pricesRes] = await Promise.all([
          hotelsAPI.getById(hotelId),
          hotelRoomTypesAPI.getByHotel(hotelId),
          hotelPeriodsAPI.getByHotel(hotelId),
          hotelRoomPricesAPI.getByHotel(hotelId)
        ]);

        if (hotelRes.success) setHotel(hotelRes.data);
        if (roomTypesRes.success) {
          setRoomTypes(roomTypesRes.data || []);
          if (roomTypesRes.data && roomTypesRes.data.length > 0) {
            setSelectedRoomId(roomTypesRes.data[0].id);
          }
        }
        if (periodsRes.success) setPeriods(periodsRes.data || []);
        if (pricesRes.success) setPrices(pricesRes.data || []);
      } catch (error) {
        console.error('Failed to fetch hotel data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  // Get price for a specific room type and period
  const getPrice = (roomTypeId, periodId) => {
    const priceEntry = prices.find(p =>
      parseInt(p.room_type_id) === parseInt(roomTypeId) &&
      parseInt(p.period_id) === parseInt(periodId)
    );
    return priceEntry ? parseFloat(priceEntry.price) : null;
  };

  // Get minimum price for a room type (for display in room cards)
  const getMinPrice = (roomTypeId) => {
    const roomPrices = prices.filter(p => parseInt(p.room_type_id) === parseInt(roomTypeId));
    if (roomPrices.length === 0) return null;
    return Math.min(...roomPrices.map(p => parseFloat(p.price)));
  };

  // Helper: compare dates as YYYY-MM-DD strings (avoids timezone issues)
  const isDateInRange = (checkDateStr, startDateStr, endDateStr) => {
    // Normalize to YYYY-MM-DD format
    const check = checkDateStr.substring(0, 10);
    const start = startDateStr.substring(0, 10);
    const end = endDateStr.substring(0, 10);
    return check >= start && check <= end;
  };

  // Find period that contains a specific date
  const findPeriodByDate = (dateStr) => {
    if (!dateStr || periods.length === 0) return null;

    return periods.find(period => {
      if (!period.start_date || !period.end_date) return false;
      return isDateInRange(dateStr, period.start_date, period.end_date);
    });
  };

  // Find price directly from prices array (which has start_date, end_date from JOIN)
  const findPriceByDateAndRoom = (dateStr, roomTypeId) => {
    if (!dateStr || !roomTypeId || prices.length === 0) return null;

    const priceEntry = prices.find(p => {
      if (parseInt(p.room_type_id) !== parseInt(roomTypeId)) return false;
      if (!p.start_date || !p.end_date) return false;
      return isDateInRange(dateStr, p.start_date, p.end_date);
    });

    return priceEntry ? parseFloat(priceEntry.price) : null;
  };

  // Calculate number of nights between two dates
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Get price for selected room based on check-in date period
  const getSelectedRoomPrice = () => {
    if (!selectedRoomId || !checkInDate) return null;

    console.log('=== Price Lookup Debug ===');
    console.log('checkInDate:', checkInDate);
    console.log('selectedRoomId:', selectedRoomId);
    console.log('prices array:', prices);
    console.log('periods array:', periods);

    // Try direct lookup first (uses prices array with JOIN data)
    const directPrice = findPriceByDateAndRoom(checkInDate, selectedRoomId);
    console.log('directPrice from findPriceByDateAndRoom:', directPrice);

    if (directPrice !== null) return directPrice;

    // Fallback to period lookup
    const period = findPeriodByDate(checkInDate);
    console.log('Found period:', period);

    if (!period) {
      console.log('No period found for date:', checkInDate);
      return null;
    }

    const priceFromPeriod = getPrice(selectedRoomId, period.id);
    console.log('priceFromPeriod:', priceFromPeriod);

    return priceFromPeriod;
  };

  // Get current period info for display
  const getCurrentPeriod = () => {
    if (!checkInDate) return null;
    return findPeriodByDate(checkInDate);
  };

  // Handle check-in date change
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    // Auto-set checkout to next day if empty or before check-in
    if (!checkOutDate || new Date(checkOutDate) <= new Date(date)) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay.toISOString().split('T')[0]);
    }
  };

  // Handle check-out date change
  const handleCheckOutChange = (date) => {
    if (new Date(date) > new Date(checkInDate)) {
      setCheckOutDate(date);
    }
  };

  // Format date for display
  const formatDateShort = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const day = d.getDate();
    const monthNames = language === 'TH'
      ? ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNames[d.getMonth()]}`;
  };

  // Helper function with fallback
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? (thText || enText) : (enText || thText);
  };

  // Parse amenities
  const parseAmenities = (amenitiesStr) => {
    if (!amenitiesStr) return [];
    return amenitiesStr.split(',').map(a => a.trim()).filter(a => a);
  };

  // Parse gallery
  const parseGallery = (galleryData) => {
    if (!galleryData) return [];
    if (Array.isArray(galleryData)) return galleryData;
    try {
      const parsed = JSON.parse(galleryData);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{language === 'TH' ? 'ไม่พบข้อมูลโรงแรม' : 'Hotel not found'}</p>
          <button onClick={onBack} className="text-primary-500 hover:underline cursor-pointer">
            {language === 'TH' ? 'กลับไปหน้าค้นหา' : 'Back to search'}
          </button>
        </div>
      </div>
    );
  }

  const hotelName = getLocalizedText(hotel.name_th, hotel.name_en);
  const hotelDescription = getLocalizedText(hotel.description_th, hotel.description_en);
  const amenities = parseAmenities(hotel.amenities);
  const gallery = [hotel.image, ...parseGallery(hotel.gallery)].filter(Boolean);
  const selectedRoom = roomTypes.find(r => r.id === selectedRoomId);
  const selectedRoomMinPrice = selectedRoom ? getMinPrice(selectedRoom.id) : 0;

  // Calculate price based on selected dates
  const nights = calculateNights(checkInDate, checkOutDate);
  const currentPeriod = getCurrentPeriod();
  const pricePerNight = getSelectedRoomPrice() || selectedRoomMinPrice || 0;
  const totalPrice = pricePerNight * (nights || 1);

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-20 animate-fade-in">
      {/* Gallery Modal */}
      {showGallery && gallery.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
          >
            <X size={32} />
          </button>
          <button
            onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)}
            className="absolute left-4 text-white hover:text-gray-300 text-4xl cursor-pointer"
          >
            &#8249;
          </button>
          <img
            src={gallery[galleryIndex]}
            alt={`Gallery ${galleryIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)}
            className="absolute right-4 text-white hover:text-gray-300 text-4xl cursor-pointer"
          >
            &#8250;
          </button>
          <div className="absolute bottom-4 text-white text-sm">
            {galleryIndex + 1} / {gallery.length}
          </div>
        </div>
      )}

      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={20} /> {language === 'TH' ? 'ย้อนกลับไปหน้าค้นหาที่พัก' : 'Back to search'}
        </button>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {hotelName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                  {[...Array(hotel.stars || 4)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary-500" />
                  {hotel.location}
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">
                    {hotel.rating || 4.5}
                  </span>
                  <span>{language === 'TH' ? 'ยอดเยี่ยม' : 'Excellent'} ({hotel.reviews || 0} {language === 'TH' ? 'รีวิว' : 'reviews'})</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors border border-gray-100 cursor-pointer">
                <Heart size={20} />
              </button>
              <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-primary-500 transition-colors border border-gray-100 cursor-pointer">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-10 relative shadow-sm border border-gray-100">
          <div className="md:col-span-2 h-full">
            <img
              src={gallery[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              alt="Main"
              onClick={() => { setGalleryIndex(0); setShowGallery(true); }}
            />
          </div>
          <div className="md:col-span-1 flex flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden">
              <img
                src={gallery[1] || gallery[0] || "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 1"
                onClick={() => { setGalleryIndex(1); setShowGallery(true); }}
              />
            </div>
            <div className="h-1/2 overflow-hidden">
              <img
                src={gallery[2] || gallery[0] || "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 2"
                onClick={() => { setGalleryIndex(2); setShowGallery(true); }}
              />
            </div>
          </div>
          <div
            className="md:col-span-1 h-full overflow-hidden relative group cursor-pointer"
            onClick={() => { setGalleryIndex(3); setShowGallery(true); }}
          >
            <img
              src={gallery[3] || gallery[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Sub 3"
            />
            {gallery.length > 4 && (
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                  <Camera size={16} /> {language === 'TH' ? 'ดูรูปทั้งหมด' : 'View all photos'} ({gallery.length})
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details & Rooms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description & Facilities */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'TH' ? 'รายละเอียดที่พัก' : 'About this hotel'}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                {hotelDescription}
              </p>

              {amenities.length > 0 && (
                <>
                  <h4 className="font-bold text-gray-900 mb-4">
                    {language === 'TH' ? 'สิ่งอำนวยความสะดวก' : 'Amenities'}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center flex-shrink-0">
                          {amenityIcons[amenity.toLowerCase()] || <Check size={18} />}
                        </div>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Price Table - Periods x Room Types */}
            {roomTypes.length > 0 && periods.length > 0 && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="text-primary-500" /> {language === 'TH' ? 'ตารางราคาตามช่วงวันที่' : 'Pricing Table by Date'}
                </h3>

                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full border-collapse min-w-[500px]">
                    <thead>
                      <tr>
                        <th className="text-left py-3 px-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 rounded-tl-xl">
                          {language === 'TH' ? 'ประเภทห้อง' : 'Room Type'}
                        </th>
                        {periods.map((period, idx) => (
                          <th
                            key={period.id}
                            className={`text-center py-3 px-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600 text-sm ${idx === periods.length - 1 ? 'rounded-tr-xl' : ''}`}
                          >
                            <div className="text-xs whitespace-nowrap">
                              {formatDateShort(period.start_date)} - {formatDateShort(period.end_date)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {roomTypes.map((roomType, rowIdx) => (
                        <tr
                          key={roomType.id}
                          className={`hover:bg-primary-50/30 transition-colors ${selectedRoomId === roomType.id ? 'bg-primary-50/50' : ''}`}
                        >
                          <td className={`py-4 px-4 border-b border-gray-100 ${rowIdx === roomTypes.length - 1 ? 'rounded-bl-xl' : ''}`}>
                            <div className="font-medium text-gray-900">
                              {getLocalizedText(roomType.name_th, roomType.name_en)}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Users size={12} /> {language === 'TH' ? 'สูงสุด' : 'Max'} {roomType.max_guests} {language === 'TH' ? 'ท่าน' : 'guests'}
                            </div>
                          </td>
                          {periods.map((period, colIdx) => {
                            const price = getPrice(roomType.id, period.id);
                            return (
                              <td
                                key={period.id}
                                className={`py-4 px-4 text-center border-b border-gray-100 ${rowIdx === roomTypes.length - 1 && colIdx === periods.length - 1 ? 'rounded-br-xl' : ''}`}
                              >
                                {price !== null ? (
                                  <span className="font-bold text-primary-600">
                                    ฿{price.toLocaleString()}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 text-sm">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  {language === 'TH' ? '* ราคาต่อคืน (บาท)' : '* Price per night (THB)'}
                </p>
              </section>
            )}

            {/* Room Selection */}
            {roomTypes.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BedDouble className="text-primary-500" /> {language === 'TH' ? 'เลือกห้องพัก' : 'Select Room'}
                </h3>

                <div className="space-y-6">
                  {roomTypes.map((room) => {
                    const minPrice = getMinPrice(room.id);
                    return (
                      <div
                        key={room.id}
                        className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${
                          selectedRoomId === room.id
                            ? "border-primary-500 shadow-xl shadow-primary-500/10 ring-1 ring-primary-500"
                            : "border-gray-100 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {/* Room Details */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">
                              {getLocalizedText(room.name_th, room.name_en)}
                            </h4>
                            {selectedRoomId === room.id && (
                              <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-1 rounded-full border border-primary-100 flex items-center gap-1">
                                <Check size={10} /> {language === 'TH' ? 'เลือกแล้ว' : 'Selected'}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Users size={14} className="text-primary-400" />{" "}
                              {language === 'TH' ? 'สูงสุด' : 'Max'} {room.max_guests} {language === 'TH' ? 'ท่าน' : 'guests'}
                            </div>
                            {room.description_en && (
                              <div className="text-gray-600">
                                {getLocalizedText(room.description_th, room.description_en)}
                              </div>
                            )}
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                            <div>
                              {minPrice ? (
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xs text-gray-500">{language === 'TH' ? 'เริ่มต้น' : 'From'}</span>
                                  <span className="text-xl font-bold text-primary-600">
                                    ฿{minPrice.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-gray-400">/ {language === 'TH' ? 'คืน' : 'night'}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">{language === 'TH' ? 'ติดต่อสอบถาม' : 'Contact for price'}</span>
                              )}
                            </div>
                            <button
                              onClick={() => setSelectedRoomId(room.id)}
                              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                selectedRoomId === room.id
                                  ? "bg-primary-500 text-white shadow-primary-500/30 shadow-lg"
                                  : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                              }`}
                            >
                              {selectedRoomId === room.id
                                ? (language === 'TH' ? 'เลือกแล้ว' : 'Selected')
                                : (language === 'TH' ? 'เลือกห้องนี้' : 'Select')}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-64 flex items-center justify-center text-gray-400 border border-gray-200">
              <div className="flex flex-col items-center">
                <MapPin size={32} className="mb-2" />
                <span>{language === 'TH' ? 'แผนที่ที่ตั้ง (Google Maps)' : 'Location Map (Google Maps)'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-cyan-300"></div>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {selectedRoom ? getLocalizedText(selectedRoom.name_th, selectedRoom.name_en) : hotelName}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary-600">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">/ {nights || 1} {language === 'TH' ? 'คืน' : 'nights'}</span>
                </div>
                {currentPeriod && (
                  <p className="text-xs text-primary-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDateShort(currentPeriod.start_date)} - {formatDateShort(currentPeriod.end_date)}
                    <span className="text-gray-400 ml-1">
                      (฿{pricePerNight.toLocaleString()}/{language === 'TH' ? 'คืน' : 'night'})
                    </span>
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {language === 'TH' ? 'รวมภาษีและค่าธรรมเนียมแล้ว' : 'Taxes and fees included'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">
                      {language === 'TH' ? 'เช็คอิน' : 'Check-in'}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => handleCheckInChange(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary-200 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">
                      {language === 'TH' ? 'เช็คเอาท์' : 'Check-out'}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => handleCheckOutChange(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Show nights count */}
                {nights > 0 && (
                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-700 flex items-center gap-2">
                      <Calendar size={16} /> {language === 'TH' ? 'จำนวนคืน' : 'Total nights'}
                    </span>
                    <span className="font-bold text-primary-600">{nights} {language === 'TH' ? 'คืน' : 'nights'}</span>
                  </div>
                )}

                {/* Price breakdown */}
                {nights > 0 && pricePerNight > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>฿{pricePerNight.toLocaleString()} x {nights} {language === 'TH' ? 'คืน' : 'nights'}</span>
                      <span>฿{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>{language === 'TH' ? 'รวมทั้งหมด' : 'Total'}</span>
                      <span className="text-primary-600">฿{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Warning if no date selected */}
                {!checkInDate && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700 flex items-center gap-2">
                    <Calendar size={14} />
                    {language === 'TH' ? 'กรุณาเลือกวันเช็คอินเพื่อดูราคา' : 'Please select check-in date to see price'}
                  </div>
                )}

                {/* Warning if date not in any period */}
                {checkInDate && !currentPeriod && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700 flex items-center gap-2">
                    <Calendar size={14} />
                    {language === 'TH' ? 'ช่วงวันที่เลือกยังไม่มีราคา กรุณาติดต่อสอบถาม' : 'No price available for selected dates. Please contact us.'}
                  </div>
                )}
              </div>

              <Button
                className="w-full !py-3.5 shadow-lg shadow-primary-500/30 mb-3"
                disabled={!checkInDate || !checkOutDate || nights <= 0}
              >
                {language === 'TH' ? 'จองที่พัก' : 'Book Now'}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
                <ShieldCheck size={14} /> {language === 'TH' ? 'ฟรีค่าธรรมเนียมการจอง' : 'Free booking fee'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
