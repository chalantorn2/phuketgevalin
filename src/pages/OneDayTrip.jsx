import { useState, useEffect } from "react";
import { MapPin, Clock, Star, Heart, Map, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { onedayTripsAPI } from "../services/api";

export default function OneDayTrip({ onViewDetail }) {
  const { t, language } = useLanguage();
  const [activeProvince, setActiveProvince] = useState("all");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Province keys for filter
  const provinceKeys = [
    "all",
    "phuket",
    "krabi",
    "phangnga",
    "suratthani",
    "ayutthaya",
    "bangkok",
  ];

  // Fetch trips from API
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await onedayTripsAPI.getAll(false);
      if (response.success) {
        setTrips(response.data || []);
      } else {
        setError(response.message || "Failed to fetch trips");
      }
    } catch (err) {
      console.error("Failed to fetch trips:", err);
      setError("Failed to load trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function with fallback
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? (thText || enText) : (enText || thText);
  };

  // Get trip data with translated fields based on language
  const getLocalizedTrip = (trip) => ({
    ...trip,
    title: getLocalizedText(trip.title_th, trip.title_en),
    description: getLocalizedText(trip.description_th, trip.description_en),
    location: getLocalizedText(trip.location_th, trip.location_en),
    duration: getLocalizedText(trip.duration_th, trip.duration_en),
    tags: language === "TH" ? (trip.tags_th || trip.tags_en || []) : (trip.tags_en || trip.tags_th || []),
    provinceName: t(`oneDayTrip.provinces.${trip.province_key}`) || trip.province_key,
  });

  // Filter trips by province
  const filteredTrips =
    activeProvince === "all"
      ? trips
      : trips.filter((trip) => trip.province_key === activeProvince);

  // Localize filtered trips
  const localizedTrips = filteredTrips.map(getLocalizedTrip);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="relative bg-primary-900 h-[450px] mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=2000&auto=format&fit=crop"
            alt="Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-primary-300 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            {t("oneDayTrip.hero.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t("oneDayTrip.hero.title")}
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl font-light drop-shadow-md">
            {t("oneDayTrip.hero.description")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Province Filter Bar */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-2 mb-10 overflow-x-auto mx-auto max-w-5xl">
          <div className="flex items-center gap-2 w-max mx-auto md:w-full md:justify-center">
            <div className="hidden md:flex items-center gap-2 text-gray-400 mr-2 px-3">
              <Map size={18} />
              <span className="text-sm font-medium">
                {t("oneDayTrip.filter.selectProvince")}
              </span>
            </div>
            {provinceKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveProvince(key)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeProvince === key
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t(`oneDayTrip.provinces.${key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-primary-500 animate-spin mb-4" />
            <p className="text-gray-500">{t("common.loading") || "Loading..."}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <Map size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {t("common.error") || "Error"}
            </h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchTrips}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              {t("common.retry") || "Try Again"}
            </button>
          </div>
        )}

        {/* Trips Grid */}
        {!loading && !error && localizedTrips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {localizedTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onViewDetail && onViewDetail(trip.id)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 relative flex flex-col h-full hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    {trip.bestseller === 1 && (
                      <span className="px-2 py-1 rounded-lg bg-yellow-400 text-yellow-950 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Star size={10} className="fill-yellow-950" />{" "}
                        {t("oneDayTrip.card.hot")}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-gray-700 text-[10px] font-bold shadow-sm">
                      {trip.provinceName}
                    </span>
                  </div>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Heart size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {trip.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-primary-500" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-primary-500" />
                      <span className="line-clamp-1">{trip.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  {trip.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{trip.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({trip.reviews} {t("common.reviews") || "reviews"})</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {(trip.tags || []).slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded-md border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      {trip.discount_price && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ฿{Number(trip.discount_price).toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary-600">
                        ฿{Number(trip.price).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail && onViewDetail(trip.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-bold hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
                    >
                      {t("oneDayTrip.card.book")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && localizedTrips.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Map size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {t("oneDayTrip.empty.title")}
            </h3>
            <p className="text-gray-400">{t("oneDayTrip.empty.description")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
