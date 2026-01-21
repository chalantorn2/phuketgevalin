import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Check,
  Calendar,
  DollarSign,
  Search,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { hotelsAPI } from "../services/api";

export default function Hotel({ onViewDetail }) {
  const { t, language } = useLanguage();

  // Data State
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activeLocation, setActiveLocation] = useState("all");
  const [selectedStar, setSelectedStar] = useState(null);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const data = await hotelsAPI.getAll();
        if (data.success) {
          setHotels(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // Get unique locations from hotels
  const locations = ["all", ...new Set(hotels.map((h) => h.location))];

  // Helper function with fallback
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? (thText || enText) : (enText || thText);
  };

  // Helper function to get localized hotel
  const getLocalizedHotel = (hotel) => ({
    ...hotel,
    name: getLocalizedText(hotel.name_th, hotel.name_en),
    description: getLocalizedText(hotel.description_th, hotel.description_en),
    amenities: hotel.amenities ? hotel.amenities.split(",").map(a => a.trim()) : [],
    stars: Math.round(hotel.rating) || 4,
    price: Number(hotel.price_per_night),
    discountPrice: Math.round(Number(hotel.price_per_night) * 1.3),
    reviews: Math.floor(Math.random() * 500) + 50,
  });

  // Logic to filter hotels
  const filteredHotels = hotels
    .map(getLocalizedHotel)
    .filter((hotel) => {
      const matchLocation =
        activeLocation === "all" || hotel.location === activeLocation;
      const matchStar = selectedStar === null || hotel.stars === selectedStar;
      const matchPrice = hotel.price <= maxPrice;
      return matchLocation && matchStar && matchPrice;
    });

  const resetFilters = () => {
    setActiveLocation("all");
    setSelectedStar(null);
    setMaxPrice(30000);
    setCheckInDate("");
    setCheckOutDate("");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-primary-900 h-[400px] mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-68c8949139f1?q=80&w=2000&auto=format&fit=crop"
            alt="Hotel Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-primary-300 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            {t("hotel.hero.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t("hotel.hero.title")}
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl font-light drop-shadow-md">
            {t("hotel.hero.description")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <Filter size={18} /> {t("hotel.filter.title")}
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-primary-500 font-semibold hover:text-primary-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} /> {t("hotel.filter.reset")}
                </button>
              </div>

              {/* Date Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-primary-500" />{" "}
                  {t("hotel.filter.date.title")}
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">
                      {t("hotel.filter.date.checkIn")}
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">
                      {t("hotel.filter.date.checkOut")}
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign size={16} className="text-primary-500" />{" "}
                    {t("hotel.filter.price.title")}
                  </h4>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg border border-primary-100">
                    {t("hotel.filter.price.max")} ฿{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                  <span>฿1,000</span>
                  <span>฿30,000+</span>
                </div>
              </div>

              {/* Star Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star size={16} className="text-primary-500" />{" "}
                  {t("hotel.filter.star.title")}
                </h4>
                <div className="flex gap-2">
                  {[3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setSelectedStar(selectedStar === star ? null : star)
                      }
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        selectedStar === star
                          ? "bg-primary-500 text-white border-primary-500 shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                      }`}
                    >
                      {star}{" "}
                      <Star
                        size={10}
                        className={
                          selectedStar === star ? "fill-white" : "fill-gray-400"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-primary-500" />{" "}
                  {t("hotel.filter.location.title")}
                </h4>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <label
                      key={loc}
                      className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-all ${
                        activeLocation === loc
                          ? "bg-primary-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          activeLocation === loc
                            ? "bg-primary-500 border-primary-500"
                            : "border-gray-300 group-hover:border-primary-400 bg-white"
                        }`}
                      >
                        {activeLocation === loc && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="location"
                        className="hidden"
                        checked={activeLocation === loc}
                        onChange={() => setActiveLocation(loc)}
                      />
                      <span
                        className={`text-sm ${
                          activeLocation === loc
                            ? "font-bold text-primary-700"
                            : "text-gray-600"
                        }`}
                      >
                        {loc === "all" ? t("hotel.locations.all") : loc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Result Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("hotel.results.title")} {filteredHotels.length}{" "}
                  {t("hotel.results.items")}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {t("hotel.results.showingIn")}{" "}
                  {activeLocation === "all" ? t("hotel.locations.all") : activeLocation}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    onClick={() => onViewDetail && onViewDetail(hotel.id)}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20">
                          {hotel.location}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-0.5 bg-black/20 backdrop-blur-md rounded-lg px-2 py-1">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3rem]">
                        {hotel.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                        <MapPin
                          size={14}
                          className="text-primary-500 flex-shrink-0"
                        />
                        <span className="line-clamp-1">{hotel.address || hotel.location}</span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-50 rounded-md text-[10px] text-gray-500 border border-gray-100 flex items-center gap-1"
                          >
                            <Check size={10} className="text-primary-400" />
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 mb-0.5">
                            {t("hotel.card.pricePerNight")}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-primary-600">
                              ฿{hotel.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              ฿{hotel.discountPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span>({hotel.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center h-96">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("hotel.empty.title")}
                </h3>
                <p className="text-gray-500 mb-6 text-sm">
                  {t("hotel.empty.description")}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {t("hotel.empty.resetButton")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
