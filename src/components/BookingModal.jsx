import { useState } from "react";
import {
  X,
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  MapPin,
  Clock,
  Plane,
  Copy,
  Check,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { bookingsAPI } from "../services/api";

const STEPS = [
  { en: "Booking Details", th: "รายละเอียดการจอง" },
  { en: "Your Information", th: "ข้อมูลผู้จอง" },
  { en: "Confirm & Book", th: "ยืนยันการจอง" },
];

export default function BookingModal({
  isOpen,
  onClose,
  serviceType, // 'tour' | 'package_tour' | 'hotel' | 'transfer'
  serviceId,
  serviceName,
  serviceImage,
  // Pre-filled data from the page
  initialDate = "",
  initialCheckout = "",
  initialAdults = 1,
  initialChildren = 0,
  pricePerUnit = 0,
  priceLabel = "", // e.g. "per person", "per night", "per trip"
  // Transfer-specific
  pickupLocation = "",
  dropoffLocation = "",
  // Hotel-specific
  roomName = "",
  nights = 0,
}) {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Step 1: Booking details
  const [bookingDate, setBookingDate] = useState(initialDate);
  const [checkoutDate, setCheckoutDate] = useState(initialCheckout);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [pickupTime, setPickupTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  // Step 2: Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const isTransfer = serviceType === "transfer";
  const isHotel = serviceType === "hotel";

  // Calculate total
  const calculateTotal = () => {
    if (isHotel) {
      const n = nights || 1;
      return pricePerUnit * n;
    }
    if (isTransfer) {
      return pricePerUnit;
    }
    return pricePerUnit * (adults + children);
  };

  const totalPrice = calculateTotal();

  // Validation
  const isStep1Valid = () => {
    if (!bookingDate) return false;
    if (isHotel && !checkoutDate) return false;
    return true;
  };

  const isStep2Valid = () => {
    if (!customerName.trim()) return false;
    if (!customerEmail.trim() || !/\S+@\S+\.\S+/.test(customerEmail))
      return false;
    if (!customerPhone.trim()) return false;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const data = {
        service_type: serviceType,
        service_id: serviceId,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim(),
        booking_date: bookingDate,
        checkout_date: isHotel ? checkoutDate : undefined,
        adults,
        children,
        pickup_location: isTransfer
          ? `${pickupLocation} → ${dropoffLocation}`
          : "",
        pickup_time: isTransfer ? pickupTime : undefined,
        flight_number: isTransfer ? flightNumber : undefined,
        special_requests: specialRequests.trim(),
        total_price: totalPrice,
        service_name: serviceName,
        room_name: isHotel ? roomName : undefined,
      };

      const response = await bookingsAPI.create(data);

      if (response.success) {
        setReferenceCode(response.data.reference_code);
        setSuccess(true);
      } else {
        setError(response.message || "Booking failed");
      }
    } catch (err) {
      setError(
        language === "TH"
          ? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep(1);
    setSuccess(false);
    setReferenceCode("");
    setError("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setSpecialRequests("");
    setPickupTime("");
    setFlightNumber("");
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  // Success Screen
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "TH" ? "จองสำเร็จ!" : "Booking Confirmed!"}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === "TH"
              ? "เราจะติดต่อกลับทางอีเมลเร็วๆ นี้"
              : "We will contact you via email shortly"}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">
              {language === "TH" ? "รหัสการจอง" : "Reference Code"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-bold text-primary-600 tracking-widest">
                {referenceCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                title="Copy"
              >
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} className="text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {language === "TH"
                ? "กรุณาบันทึกรหัสนี้ไว้สำหรับตรวจสอบสถานะ"
                : "Please save this code to check your booking status"}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition cursor-pointer"
          >
            {language === "TH" ? "ปิด" : "Close"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden relative flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-cyan-300 z-10"></div>

        {/* Header */}
        <div className="px-6 pt-8 pb-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X size={20} className="text-gray-400" />
          </button>

          <h2 className="text-xl font-bold text-gray-900 pr-8">
            {language === "TH" ? "จองบริการ" : "Book Service"}
          </h2>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${step === i + 1 ? "text-gray-900" : "text-gray-400"}`}
                >
                  {language === "TH" ? s.th : s.en}
                </span>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Service Summary Bar */}
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            {serviceImage && (
              <img
                src={serviceImage}
                alt=""
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {serviceName}
              </p>
              {roomName && (
                <p className="text-xs text-primary-600">{roomName}</p>
              )}
              {isTransfer && pickupLocation && (
                <p className="text-xs text-gray-500 truncate">
                  {pickupLocation} → {dropoffLocation}
                </p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary-600">
                ฿{totalPrice.toLocaleString()}
              </p>
              {priceLabel && (
                <p className="text-[10px] text-gray-400">{priceLabel}</p>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* STEP 1: Booking Details */}
          {step === 1 && (
            <div className="space-y-4 pb-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  <Calendar size={12} className="inline mr-1" />
                  {isHotel
                    ? language === "TH"
                      ? "วันเช็คอิน"
                      : "Check-in Date"
                    : language === "TH"
                      ? "วันที่เดินทาง"
                      : "Travel Date"}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Checkout (Hotel only) */}
              {isHotel && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    <Calendar size={12} className="inline mr-1" />
                    {language === "TH" ? "วันเช็คเอาท์" : "Check-out Date"}
                  </label>
                  <input
                    type="date"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    min={bookingDate || new Date().toISOString().split("T")[0]}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                  />
                </div>
              )}

              {/* Guests (not for transfer) */}
              {!isTransfer && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Users size={12} className="inline mr-1" />
                      {language === "TH" ? "ผู้ใหญ่" : "Adults"}
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="px-3 py-3 text-gray-400 hover:text-primary-500 cursor-pointer"
                        disabled={adults <= 1}
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="px-3 py-3 text-gray-400 hover:text-primary-500 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Users size={12} className="inline mr-1" />
                      {language === "TH" ? "เด็ก" : "Children"}
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="px-3 py-3 text-gray-400 hover:text-primary-500 cursor-pointer"
                        disabled={children <= 0}
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold">
                        {children}
                      </span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="px-3 py-3 text-gray-400 hover:text-primary-500 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Transfer-specific: Pickup Time & Flight */}
              {isTransfer && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Clock size={12} className="inline mr-1" />
                      {language === "TH" ? "เวลารับ" : "Pickup Time"}
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Plane size={12} className="inline mr-1" />
                      {language === "TH"
                        ? "เที่ยวบิน (ถ้ามี)"
                        : "Flight Number (optional)"}
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="e.g. TG123"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: Customer Info */}
          {step === 2 && (
            <div className="space-y-4 pb-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  <User size={12} className="inline mr-1" />
                  {language === "TH" ? "ชื่อ-นามสกุล" : "Full Name"} *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={
                    language === "TH" ? "กรอกชื่อ-นามสกุล" : "Enter full name"
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  <Mail size={12} className="inline mr-1" />
                  {language === "TH" ? "อีเมล" : "Email"} *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  <Phone size={12} className="inline mr-1" />
                  {language === "TH" ? "เบอร์โทรศัพท์" : "Phone Number"} *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={
                    language === "TH" ? "08x-xxx-xxxx" : "+66 8x-xxx-xxxx"
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  <MessageSquare size={12} className="inline mr-1" />
                  {language === "TH"
                    ? "คำขอพิเศษ (ไม่บังคับ)"
                    : "Special Requests (optional)"}
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                  placeholder={
                    language === "TH"
                      ? "เช่น ต้องการ car seat, อาหารพิเศษ ฯลฯ"
                      : "e.g. car seat needed, dietary requirements, etc."
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Summary */}
          {step === 3 && (
            <div className="space-y-4 pb-4">
              {/* Booking Details */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-gray-900 text-sm">
                  {language === "TH"
                    ? "รายละเอียดการจอง"
                    : "Booking Details"}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {isHotel
                        ? language === "TH"
                          ? "เช็คอิน"
                          : "Check-in"
                        : language === "TH"
                          ? "วันที่"
                          : "Date"}
                    </span>
                    <span className="font-medium">{bookingDate}</span>
                  </div>
                  {isHotel && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar size={14} />
                        {language === "TH" ? "เช็คเอาท์" : "Check-out"}
                      </span>
                      <span className="font-medium">{checkoutDate}</span>
                    </div>
                  )}
                  {isHotel && nights > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        {language === "TH" ? "จำนวนคืน" : "Nights"}
                      </span>
                      <span className="font-medium">
                        {nights} {language === "TH" ? "คืน" : "nights"}
                      </span>
                    </div>
                  )}
                  {!isTransfer && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Users size={14} />
                        {language === "TH" ? "จำนวนคน" : "Guests"}
                      </span>
                      <span className="font-medium">
                        {adults}{" "}
                        {language === "TH" ? "ผู้ใหญ่" : "adults"}
                        {children > 0 &&
                          `, ${children} ${language === "TH" ? "เด็ก" : "children"}`}
                      </span>
                    </div>
                  )}
                  {isTransfer && pickupLocation && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {language === "TH" ? "เส้นทาง" : "Route"}
                      </span>
                      <span className="font-medium text-right">
                        {pickupLocation} → {dropoffLocation}
                      </span>
                    </div>
                  )}
                  {isTransfer && pickupTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock size={14} />
                        {language === "TH" ? "เวลารับ" : "Pickup Time"}
                      </span>
                      <span className="font-medium">{pickupTime}</span>
                    </div>
                  )}
                  {isTransfer && flightNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Plane size={14} />
                        {language === "TH" ? "เที่ยวบิน" : "Flight"}
                      </span>
                      <span className="font-medium">{flightNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-gray-900 text-sm">
                  {language === "TH" ? "ข้อมูลผู้จอง" : "Contact Information"}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <User size={14} />
                      {language === "TH" ? "ชื่อ" : "Name"}
                    </span>
                    <span className="font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Mail size={14} />
                      {language === "TH" ? "อีเมล" : "Email"}
                    </span>
                    <span className="font-medium">{customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Phone size={14} />
                      {language === "TH" ? "โทร" : "Phone"}
                    </span>
                    <span className="font-medium">{customerPhone}</span>
                  </div>
                  {specialRequests && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-gray-500 text-xs">
                        {language === "TH" ? "คำขอพิเศษ:" : "Special Requests:"}
                      </span>
                      <p className="text-gray-700 mt-1">{specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-primary-50 rounded-xl p-4 flex justify-between items-center border border-primary-100">
                <span className="font-bold text-gray-900">
                  {language === "TH" ? "ยอดรวมทั้งหมด" : "Total Amount"}
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              <ChevronLeft size={16} />
              {language === "TH" ? "ย้อนกลับ" : "Back"}
            </button>
          )}

          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
              className="flex-1 flex items-center justify-center gap-1 px-5 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition cursor-pointer"
            >
              {language === "TH" ? "ถัดไป" : "Next"}
              <ChevronRight size={16} />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl text-sm font-bold transition cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {language === "TH" ? "กำลังจอง..." : "Processing..."}
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  {language === "TH" ? "ยืนยันการจอง" : "Confirm Booking"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
