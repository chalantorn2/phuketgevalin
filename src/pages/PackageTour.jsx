import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Check,
  Filter,
  Search,
  RotateCcw,
  Globe,
  Bed,
  Car,
  Coffee,
  Users,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { packageToursAPI } from "../services/api";

export default function PackageTour({ onViewDetail }) {
  const { t, language } = useLanguage();

  // Data State
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDuration, setActiveDuration] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100000);

  // Fetch package tours from API
  useEffect(() => {
    const fetchPackageTours = async () => {
      setLoading(true);
      try {
        const data = await packageToursAPI.getAll();
        if (data.success) {
          setTours(data.data?.package_tours || []);
        }
      } catch (error) {
        console.error("Failed to fetch package tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageTours();
  }, []);

  // Helper function to get localized text
  const getLocalizedTour = (tour) => {
    const highlights = tour.highlights ? tour.highlights.split(",").map(h => h.trim()) : [];
    const duration = language === "th" ? tour.duration : tour.duration;

    // Determine zone from includes/highlights
    let zone = "asia";
    const text = (tour.name_en + tour.description_en).toLowerCase();
    if (text.includes("europe") || text.includes("italy") || text.includes("france") || text.includes("swiss")) {
      zone = "europe";
    } else if (text.includes("thailand") || text.includes("chiangmai") || text.includes("phuket")) {
      zone = "thailand";
    }

    // Determine duration category
    let durationKey = "medium";
    if (duration.includes("3") || duration.includes("4")) {
      durationKey = "short";
    } else if (duration.includes("7") || duration.includes("8") || duration.includes("9") || duration.includes("10")) {
      durationKey = "long";
    }

    return {
      ...tour,
      name: language === "th" ? tour.name_th : tour.name_en,
      description: language === "th" ? tour.description_th : tour.description_en,
      price: Number(tour.price),
      discountPrice: Math.round(Number(tour.price) * 1.2),
      highlights,
      duration,
      durationKey,
      zone,
      rating: 4.5 + Math.random() * 0.4,
      reviews: Math.floor(Math.random() * 300) + 50,
    };
  };

  // Filter categories from tours
  const categoryKeys = ["all", "asia", "europe", "thailand"];
  const durationKeys = ["all", "short", "medium", "long"];

  // Filter Logic
  const filteredTours = tours
    .map(getLocalizedTour)
    .filter((pkg) => {
      const matchCategory = activeCategory === "all" || pkg.zone === activeCategory;
      const matchDuration = activeDuration === "all" || pkg.durationKey === activeDuration;
      const matchPrice = pkg.price <= maxPrice;
      return matchCategory && matchDuration && matchPrice;
    });

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDuration("all");
    setMaxPrice(100000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-primary-900 h-[400px] mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
            alt="Package Tour Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-primary-300 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            {t("packageTour.hero.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t("packageTour.hero.title")}
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl font-light drop-shadow-md">
            {t("packageTour.hero.description")}
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
                  <Filter size={18} /> {t("packageTour.filter.title")}
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-primary-500 font-semibold hover:text-primary-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} /> {t("packageTour.filter.reset")}
                </button>
              </div>

              {/* Zone Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-primary-500" />{" "}
                  {t("packageTour.filter.zone.title")}
                </h4>
                <div className="space-y-2">
                  {categoryKeys.map((key) => (
                    <label
                      key={key}
                      className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-all ${
                        activeCategory === key ? "bg-primary-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          activeCategory === key
                            ? "bg-primary-500 border-primary-500"
                            : "border-gray-300 group-hover:border-primary-400 bg-white"
                        }`}
                      >
                        {activeCategory === key && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="zone"
                        className="hidden"
                        checked={activeCategory === key}
                        onChange={() => setActiveCategory(key)}
                      />
                      <span
                        className={`text-sm ${
                          activeCategory === key
                            ? "font-bold text-primary-700"
                            : "text-gray-600"
                        }`}
                      >
                        {t(`packageTour.zones.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-primary-500" />{" "}
                  {t("packageTour.filter.duration.title")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {durationKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveDuration(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        activeDuration === key
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      {t(`packageTour.durations.${key}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Search size={16} className="text-primary-500" />{" "}
                    {t("packageTour.filter.budget.title")}
                  </h4>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg border border-primary-100">
                    {t("packageTour.filter.budget.max")} ฿
                    {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                  <span>฿0</span>
                  <span>฿100,000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                {t("packageTour.results.title")}
                <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-normal">
                  {filteredTours.length} {t("packageTour.results.items")}
                </span>
              </h2>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredTours.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onViewDetail && onViewDetail(pkg.id)}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-500 flex flex-col cursor-pointer"
                  >
                    {/* Image Section (Top) */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.image || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"}
                        alt={pkg.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur text-primary-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <MapPin size={11} /> {t(`packageTour.zones.${pkg.zone}`)}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>

                    {/* Content Section (Bottom) */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-2">
                        <span className="text-primary-600 text-[10px] font-bold tracking-wider uppercase bg-primary-50 px-2 py-0.5 rounded">
                          {t(`packageTour.zones.${pkg.zone}`)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {pkg.name}
                      </h3>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.highlights.slice(0, 4).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
                          >
                            <div className="w-1 h-1 rounded-full bg-primary-400"></div>
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Includes Icons */}
                      <div className="flex items-center gap-4 border-t border-gray-100 pt-3 mb-4">
                        <div className="flex flex-col items-center gap-0.5 text-gray-400">
                          <Bed size={14} />
                          <span className="text-[9px]">
                            {t("packageTour.card.accommodation")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 text-gray-400">
                          <Car size={14} />
                          <span className="text-[9px]">
                            {t("packageTour.card.transfer")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 text-gray-400">
                          <Coffee size={14} />
                          <span className="text-[9px]">
                            {t("packageTour.card.food")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 text-gray-400">
                          <Users size={14} />
                          <span className="text-[9px]">
                            {t("packageTour.card.guide")}
                          </span>
                        </div>
                      </div>

                      {/* Footer / Price */}
                      <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-50">
                        <div>
                          <p className="text-[10px] text-gray-400 mb-0.5">
                            {t("packageTour.card.pricePerPerson")}
                          </p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-primary-600">
                              ฿{pkg.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              ฿{pkg.discountPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail && onViewDetail(pkg.id);
                          }}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          {t("packageTour.card.bookPackage")}{" "}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("packageTour.empty.title")}
                </h3>
                <p className="text-gray-500 mb-6 text-sm">
                  {t("packageTour.empty.description")}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {t("packageTour.empty.resetButton")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
