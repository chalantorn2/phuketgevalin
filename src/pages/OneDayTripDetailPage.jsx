import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronLeft,
  ShieldCheck,
  Info,
  Heart,
  Share2,
  Camera,
  Loader2,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { onedayTripsAPI } from "../services/api";

export default function TourDetailPage({ tourId, onBack }) {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tour data from API
  useEffect(() => {
    if (tourId) {
      fetchTourData();
    }
  }, [tourId]);

  const fetchTourData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await onedayTripsAPI.getById(tourId);
      if (response.success && response.data) {
        setTourData(response.data);
      } else {
        setError(response.message || "Trip not found");
      }
    } catch (err) {
      console.error("Failed to fetch tour:", err);
      setError("Failed to load trip details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get localized data based on language
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? (thText || enText) : (enText || thText);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-24 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">{t("common.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !tourData) {
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
          <p className="text-gray-400 mb-4">{error || "Trip not found"}</p>
          <button
            onClick={fetchTourData}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            {t("common.retry") || "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // Get localized content
  const title = getLocalizedText(tourData.title_th, tourData.title_en);
  const description = getLocalizedText(tourData.description_th, tourData.description_en);
  const location = getLocalizedText(tourData.location_th, tourData.location_en);
  const duration = getLocalizedText(tourData.duration_th, tourData.duration_en);
  const highlights = language === "TH" ? (tourData.highlights_th || []) : (tourData.highlights_en || []);
  const itinerary = tourData.itinerary || [];
  const included = language === "TH" ? (tourData.included_th || []) : (tourData.included_en || []);
  const excluded = language === "TH" ? (tourData.excluded_th || []) : (tourData.excluded_en || []);
  const importantInfo = getLocalizedText(tourData.important_info_th, tourData.important_info_en);
  const meetingPoint = getLocalizedText(tourData.meeting_point_th, tourData.meeting_point_en);

  // Build gallery from image and gallery fields
  const images = [];
  if (tourData.image) images.push(tourData.image);
  if (tourData.gallery && Array.isArray(tourData.gallery)) {
    images.push(...tourData.gallery);
  }
  // Fill with placeholders if needed
  while (images.length < 4) {
    images.push("https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop");
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-20 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={20} /> {language === "TH" ? "ย้อนกลับไปหน้าค้นหา" : "Back to search"}
        </button>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
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
              <span className="font-bold text-gray-900">{tourData.rating}</span>
              <span>({tourData.reviews} {language === "TH" ? "รีวิว" : "reviews"})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-blue-500" />
              {duration}
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
                <Camera size={16} /> {language === "TH" ? "ดูรูปทั้งหมด" : "View all photos"}
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
                  {language === "TH" ? "ไฮไลท์ทัวร์นี้" : "Tour Highlights"}
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

            {/* Itinerary Timeline */}
            {itinerary.length > 0 && (
              <section className="relative">
                <div className="absolute left-[23px] md:left-[108px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary-200 to-gray-100"></div>

                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Clock size={24} className="text-primary-500" />
                  {language === "TH" ? "ตารางการเดินทาง" : "Itinerary"}
                </h2>

                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-0 group"
                    >
                      {/* Time Column */}
                      <div className="pl-12 md:pl-0 md:w-[108px] flex-shrink-0 flex md:justify-end md:pr-8 items-start pt-1">
                        <span className="text-primary-600 font-bold font-mono text-base md:text-lg bg-gray-50 md:bg-transparent px-2 md:px-0 rounded-md inline-block">
                          {item.time}
                        </span>
                      </div>

                      {/* Simple Dot Marker */}
                      <div className="absolute left-3 md:left-[108px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary-200 z-10 group-hover:scale-125 group-hover:border-primary-500 transition-all shadow-sm"></div>

                      {/* Content Card */}
                      <div className="pl-12 md:pl-8 flex-1">
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-100 hover:-translate-y-1 transition-all duration-300">
                          <div className="text-lg font-bold text-gray-900 mb-1">
                            {getLocalizedText(item.title_th, item.title_en)}
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {getLocalizedText(item.description_th, item.description_en)}
                          </p>
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
                      <CheckCircle2 className="text-green-500" /> {language === "TH" ? "สิ่งที่รวมในแพ็กเกจ" : "What's Included"}
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
                      <XCircle className="text-red-400" /> {language === "TH" ? "สิ่งที่ไม่รวม" : "Not Included"}
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

            {/* Meeting Point */}
            {meetingPoint && (
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex gap-4 items-start">
                <MapPin className="text-blue-500 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-gray-900 mb-1">{language === "TH" ? "จุดนัดพบ" : "Meeting Point"}</p>
                  <p>{meetingPoint}</p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            {importantInfo && (
              <div className="bg-primary-50/50 rounded-2xl p-6 border border-primary-100 flex gap-4 items-start">
                <Info className="text-primary-500 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-gray-900 mb-1">{language === "TH" ? "ข้อแนะนำเพิ่มเติม" : "Important Information"}</p>
                  <p>{importantInfo}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar (Booking Widget) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
              {/* Decorative Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-cyan-300"></div>

              {/* Price Header */}
              <div className="flex flex-col mb-6 pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-400 font-medium mb-1">
                  {language === "TH" ? "ราคาเริ่มต้นต่อท่าน" : "Starting price per person"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary-600">
                    ฿{Number(tourData.price).toLocaleString()}
                  </span>
                  {tourData.discount_price && (
                    <span className="text-sm text-gray-400 line-through">
                      ฿{Number(tourData.discount_price).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md w-max">
                  <ShieldCheck size={12} /> {language === "TH" ? "การันตีราคาดีที่สุด" : "Best Price Guarantee"}
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                    {language === "TH" ? "วันที่เดินทาง" : "Travel Date"}
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                    {language === "TH" ? "จำนวนผู้เดินทาง" : "Number of Guests"}
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Users size={18} className="text-gray-400" /> {language === "TH" ? "ผู้ใหญ่" : "Adults"}
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
                  ฿{(Number(tourData.price) * guests).toLocaleString()}
                </span>
              </div>

              <Button
                className="w-full !py-3.5 !text-base shadow-lg shadow-primary-500/30 mb-3"
              >
                {language === "TH" ? "จองทันที" : "Book Now"}
              </Button>
              <button className="w-full py-3 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors bg-transparent border border-gray-200 rounded-xl hover:border-primary-200 cursor-pointer">
                {language === "TH" ? "สอบถามข้อมูลเพิ่มเติม" : "Ask a Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
