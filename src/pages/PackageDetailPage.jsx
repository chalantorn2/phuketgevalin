import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ShieldCheck,
  Info,
  Heart,
  Share2,
  Camera,
  Plane,
  Coffee,
  Utensils,
  Moon,
  Bed,
  Loader2,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { packageToursAPI } from "../services/api";

export default function PackageDetailPage({ packageId, onBack }) {
  const { t, language } = useLanguage();
  const [guests, setGuests] = useState(2);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch package data from API
  useEffect(() => {
    if (packageId) {
      fetchPackageData();
    }
  }, [packageId]);

  const fetchPackageData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await packageToursAPI.getById(packageId);
      if (response.success && response.data) {
        setPackageData(response.data);
      } else {
        setError(response.message || "Package not found");
      }
    } catch (err) {
      console.error("Failed to fetch package:", err);
      setError("Failed to load package details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get localized data based on language
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? thText || enText : enText || thText;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-24 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={48}
            className="text-primary-500 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-500">{t("common.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !packageData) {
    return (
      <div className="bg-gray-50 min-h-screen pb-24 pt-20">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
          >
            <ChevronLeft size={20} /> {t("common.back") || "Back"}
          </button>
        </div>
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <Info size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            {t("common.error") || "Error"}
          </h3>
          <p className="text-gray-400 mb-4">{error || "Package not found"}</p>
          <button
            onClick={fetchPackageData}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            {t("common.retry") || "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // Get localized content
  const title = getLocalizedText(packageData.name_th, packageData.name_en);
  const description = getLocalizedText(
    packageData.description_th,
    packageData.description_en,
  );
  const location = packageData.location || "";
  const highlights =
    language === "TH"
      ? typeof packageData.highlights_th === "string"
        ? JSON.parse(packageData.highlights_th)
        : Array.isArray(packageData.highlights_th)
          ? packageData.highlights_th
          : []
      : typeof packageData.highlights_en === "string"
        ? JSON.parse(packageData.highlights_en)
        : Array.isArray(packageData.highlights_en)
          ? packageData.highlights_en
          : [];
  const itinerary = Array.isArray(packageData.itinerary)
    ? packageData.itinerary
    : [];
  const included =
    language === "TH"
      ? typeof packageData.included_th === "string"
        ? JSON.parse(packageData.included_th)
        : Array.isArray(packageData.included_th)
          ? packageData.included_th
          : []
      : typeof packageData.included_en === "string"
        ? JSON.parse(packageData.included_en)
        : Array.isArray(packageData.included_en)
          ? packageData.included_en
          : [];
  const excluded =
    language === "TH"
      ? typeof packageData.excluded_th === "string"
        ? JSON.parse(packageData.excluded_th)
        : Array.isArray(packageData.excluded_th)
          ? packageData.excluded_th
          : []
      : typeof packageData.excluded_en === "string"
        ? JSON.parse(packageData.excluded_en)
        : Array.isArray(packageData.excluded_en)
          ? packageData.excluded_en
          : [];

  // Build gallery from image and gallery fields
  const images = [];
  if (packageData.image) images.push(packageData.image);
  if (packageData.gallery && Array.isArray(packageData.gallery)) {
    images.push(...packageData.gallery);
  }
  // Fill with placeholders if needed
  while (images.length < 4) {
    images.push(
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop",
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-20 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={20} />{" "}
          {language === "TH" ? "ย้อนกลับไปหน้าแพ็กเกจ" : "Back to packages"}
        </button>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {packageData.duration && (
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">
                {packageData.duration}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-primary-500" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">
                {packageData.rating}
              </span>
              <span>
                ({packageData.reviews} {language === "TH" ? "รีวิว" : "reviews"}
                )
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-10 relative">
          <div className="md:col-span-2 h-full">
            <img
              src={images[0]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              alt="Main"
            />
          </div>
          <div className="md:col-span-1 flex flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden">
              <img
                src={images[1]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 1"
              />
            </div>
            <div className="h-1/2 overflow-hidden">
              <img
                src={images[2]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 2"
              />
            </div>
          </div>
          <div className="md:col-span-1 h-full overflow-hidden relative group cursor-pointer">
            <img
              src={images[3]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Sub 3"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Camera size={16} />{" "}
                {language === "TH" ? "ดูรูปทั้งหมด" : "View all photos"}
              </div>
            </div>
          </div>

          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors cursor-pointer">
              <Heart size={20} />
            </button>
            <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-primary-500 transition-colors cursor-pointer">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* Left Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            {description && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "TH" ? "รายละเอียด" : "Description"}
                </h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </section>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star size={24} className="text-yellow-400 fill-yellow-400" />
                  {language === "TH" ? "ไฮไลท์แพ็กเกจ" : "Package Highlights"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary (Enhanced Timeline) */}
            {itinerary.length > 0 && (
              <section className="relative pl-2 md:pl-4">
                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Clock size={24} className="text-primary-500" />
                  {language === "TH" ? "ตารางการเดินทาง" : "Itinerary"}
                </h2>

                <div className="space-y-8">
                  {itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex gap-6 md:gap-8 group"
                    >
                      {/* Timeline Line */}
                      {index !== itinerary.length - 1 && (
                        <div className="absolute left-[19px] md:left-[23px] top-10 bottom-[-32px] w-[2px] bg-gray-200 group-hover:bg-primary-200 transition-colors"></div>
                      )}

                      {/* Day Badge (Number) */}
                      <div className="flex-shrink-0 z-10">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm md:text-base shadow-lg shadow-primary-500/20 ring-4 ring-white group-hover:scale-110 transition-transform">
                          {item.day}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 pb-2">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                          {/* Decorative Corner */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-50 to-transparent -mr-8 -mt-8 rounded-full pointer-events-none"></div>

                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
                            {getLocalizedText(item.title_th, item.title_en)}
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {getLocalizedText(
                              item.description_th,
                              item.description_en,
                            )}
                          </p>

                          {/* Info Section (Meals & Accommodation) */}
                          <div className="space-y-4 pt-5 border-t border-gray-100 mt-2">
                            {/* Accommodation Row */}
                            {item.accommodation && (
                              <div className="flex items-start md:items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[70px] flex items-center gap-1.5 mt-1 md:mt-0">
                                  <Bed size={14} className="text-primary-400" />{" "}
                                  {language === "TH" ? "ที่พัก:" : "Hotel:"}
                                </span>
                                <span className="text-sm font-bold text-primary-800 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 w-full md:w-auto">
                                  {item.accommodation}
                                </span>
                              </div>
                            )}

                            {/* Meals Row */}
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[70px] flex items-center gap-1.5">
                                <Utensils
                                  size={14}
                                  className="text-primary-400"
                                />{" "}
                                {language === "TH" ? "มื้ออาหาร:" : "Meals:"}
                              </span>

                              <div className="flex flex-wrap items-center gap-3">
                                <div
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                    item.meals?.b
                                      ? "bg-orange-50 text-orange-600 border-orange-100"
                                      : "bg-gray-50 text-gray-400 border-gray-100"
                                  }`}
                                >
                                  <Coffee size={14} />{" "}
                                  {language === "TH" ? "เช้า" : "Breakfast"}
                                </div>

                                <div
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                    item.meals?.l
                                      ? "bg-green-50 text-green-600 border-green-100"
                                      : "bg-gray-50 text-gray-400 border-gray-100"
                                  }`}
                                >
                                  <Utensils size={14} />{" "}
                                  {language === "TH" ? "กลางวัน" : "Lunch"}
                                </div>

                                <div
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                    item.meals?.d
                                      ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                                      : "bg-gray-50 text-gray-400 border-gray-100"
                                  }`}
                                >
                                  <Moon size={14} />{" "}
                                  {language === "TH" ? "เย็น" : "Dinner"}
                                </div>

                                {item.meals?.note && (
                                  <span className="text-xs text-gray-500 italic md:ml-2 md:border-l md:pl-3 border-gray-200">
                                    {item.meals.note}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions */}
            {(included.length > 0 || excluded.length > 0) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {included.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />{" "}
                      {language === "TH" ? "อัตราค่าบริการรวม" : "Included"}
                    </h3>
                    <ul className="space-y-3">
                      {included.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {excluded.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <XCircle className="text-red-400" />{" "}
                      {language === "TH"
                        ? "อัตราค่าบริการไม่รวม"
                        : "Not Included"}
                    </h3>
                    <ul className="space-y-3">
                      {excluded.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <XCircle
                            size={16}
                            className="text-red-400 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Additional Info */}
            <div className="bg-primary-50/50 rounded-2xl p-6 border border-primary-100 flex gap-4 items-start">
              <Info className="text-primary-500 flex-shrink-0 mt-1" />
              <div className="text-sm text-gray-600">
                <p className="font-bold text-gray-900 mb-1">
                  {language === "TH" ? "เงื่อนไขสำคัญ" : "Important Conditions"}
                </p>
                <p>
                  {language === "TH"
                    ? "กรุณาจองล่วงหน้าอย่างน้อย 30 วันก่อนการเดินทาง / โปรแกรมอาจมีการเปลี่ยนแปลงตามความเหมาะสมของเที่ยวบินและสภาพอากาศ"
                    : "Please book at least 30 days in advance / Program may change according to flight and weather conditions"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar (Booking Widget) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
              {/* Decorative Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-cyan-300"></div>

              {/* Price Header */}
              <div className="flex flex-col mb-6 pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-400 font-medium mb-1">
                  {language === "TH"
                    ? "ราคาเริ่มต้นต่อท่าน"
                    : "Starting price per person"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary-600">
                    ฿{Number(packageData.price).toLocaleString()}
                  </span>
                  {packageData.discount_price && (
                    <span className="text-sm text-gray-400 line-through">
                      ฿{Number(packageData.discount_price).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md w-max">
                  <ShieldCheck size={12} />{" "}
                  {language === "TH"
                    ? "รวมตั๋วเครื่องบินแล้ว"
                    : "Includes Flight Tickets"}
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                    {language === "TH" ? "รอบเดินทาง" : "Travel Dates"}
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none cursor-pointer">
                    <option>
                      {language === "TH"
                        ? "เลือกวันเดินทาง..."
                        : "Select travel dates..."}
                    </option>
                    <option>
                      15 {language === "TH" ? "ต.ค." : "Oct"} - 19{" "}
                      {language === "TH" ? "ต.ค." : "Oct"}
                    </option>
                    <option>
                      25 {language === "TH" ? "ต.ค." : "Oct"} - 29{" "}
                      {language === "TH" ? "ต.ค." : "Oct"}
                    </option>
                    <option>
                      01 {language === "TH" ? "พ.ย." : "Nov"} - 05{" "}
                      {language === "TH" ? "พ.ย." : "Nov"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                    {language === "TH" ? "จำนวนผู้เดินทาง" : "Number of Guests"}
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Users size={18} className="text-gray-400" />{" "}
                      {language === "TH" ? "ผู้ใหญ่" : "Adults"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 hover:text-primary-500 disabled:opacity-50 cursor-pointer"
                        disabled={guests <= 1}
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-gray-900">
                        {guests}
                      </span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 hover:text-primary-500 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total & Action */}
              <div className="bg-primary-50/50 rounded-xl p-4 mb-6 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">
                  {language === "TH" ? "ราคารวมสุทธิ" : "Total Price"}
                </span>
                <span className="text-xl font-bold text-primary-700">
                  ฿{(Number(packageData.price) * guests).toLocaleString()}
                </span>
              </div>

              <Button className="w-full !py-3.5 !text-base shadow-lg shadow-primary-500/30 mb-3">
                {language === "TH" ? "จองแพ็กเกจ" : "Book Package"}
              </Button>
              <button className="w-full py-3 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors bg-transparent border border-gray-200 rounded-xl hover:border-primary-200 cursor-pointer">
                {language === "TH"
                  ? "ดาวน์โหลดโปรแกรมทัวร์ (PDF)"
                  : "Download Tour Program (PDF)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
