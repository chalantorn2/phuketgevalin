import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Briefcase,
  CheckCircle2,
  Car,
  ArrowRight,
  ShieldCheck,
  Clock,
  Plane,
  Timer,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { transfersAPI, transferLocationsAPI, transferRoutesAPI } from "../services/api";

export default function Transfer() {
  const { t, language } = useLanguage();

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [routePrice, setRoutePrice] = useState(null);

  // Data from API
  const [transfers, setTransfers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("all");

  // Fetch all data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [transfersData, locationsData] = await Promise.all([
          transfersAPI.getAll(),
          transferLocationsAPI.getAll()
        ]);
        if (transfersData.success) {
          setTransfers(transfersData.data || []);
        }
        if (locationsData.success) {
          setLocations(locationsData.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function with fallback
  const getLocalizedText = (thText, enText) => {
    return language === "TH" ? (thText || enText) : (enText || thText);
  };

  // Helper function to get localized transfer
  const getLocalizedTransfer = (transfer) => ({
    ...transfer,
    name: getLocalizedText(transfer.name_th, transfer.name_en),
    description: getLocalizedText(transfer.description_th, transfer.description_en),
    price: Number(transfer.price),
    maxPassengers: Number(transfer.max_passengers),
  });

  // Filter transfers by type
  const filteredTransfers = transfers
    .map(getLocalizedTransfer)
    .filter((t) => activeType === "all" || t.type === activeType);

  // Transfer types for filter
  const transferTypes = ["all", "airport", "private", "hourly"];

  // Get translated data
  const valueProps = t("transfer.valueProps");
  const passengerOptions = t("transfer.booking.passengers.options");

  // Helper function to get localized location name
  const getLocationName = (location) => {
    if (!location) return "";
    return language === "TH" ? (location.name_th || location.name_en) : (location.name_en || location.name_th);
  };

  // Fetch route price when from/to changes
  useEffect(() => {
    const fetchRoutePrice = async () => {
      if (from === 0 || to === 0 || from === to) {
        setRoutePrice(null);
        return;
      }

      try {
        const data = await transferRoutesAPI.getByLocations(from, to);
        if (data.success && data.data) {
          setRoutePrice(data.data);
        } else {
          setRoutePrice(null);
        }
      } catch (error) {
        console.error("Failed to fetch route price:", error);
        setRoutePrice(null);
      }
    };
    fetchRoutePrice();
  }, [from, to]);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-primary-900 h-[700px] mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
            alt="Transfer Header"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-primary-300 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            {t("transfer.hero.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t("transfer.hero.title")}
          </h1>
          <p className="text-primary-200 text-xl max-w-2xl font-medium drop-shadow-md mb-8">
            {t("transfer.hero.description")}
          </p>

          {/* Booking Widget */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* From */}
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {t("transfer.booking.from.label")}
                </label>
                <div className="flex items-center gap-3 border bg-gray-50 border-gray-200 rounded-xl px-4 py-3 group-focus-within:border-primary-500 group-focus-within:ring-1 group-focus-within:ring-primary-500 transition-all">
                  <MapPin
                    className="text-primary-500 flex-shrink-0"
                    size={20}
                  />
                  <select
                    value={from}
                    onChange={(e) => setFrom(Number(e.target.value))}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
                  >
                    <option value={0}>{t("transfer.booking.from.placeholder")}</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id} disabled={loc.id === to}>
                        {getLocationName(loc)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {t("transfer.booking.to.label")}
                </label>
                <div className="flex items-center gap-3 border bg-gray-50 border-gray-200 rounded-xl px-4 py-3 group-focus-within:border-primary-500 group-focus-within:ring-1 group-focus-within:ring-primary-500 transition-all">
                  <MapPin className="text-red-500 flex-shrink-0" size={20} />
                  <select
                    value={to}
                    onChange={(e) => setTo(Number(e.target.value))}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
                  >
                    <option value={0}>{t("transfer.booking.to.placeholder")}</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id} disabled={loc.id === from}>
                        {getLocationName(loc)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date & Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3 border-b border-gray-200 py-2">
                <Calendar size={18} className="text-gray-400" />
                <input
                  type="date"
                  className="bg-transparent outline-none text-gray-600 text-sm w-full"
                />
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 py-2">
                <Users size={18} className="text-gray-400" />
                <select className="bg-transparent outline-none text-gray-600 text-sm w-full cursor-pointer">
                  {passengerOptions.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Display */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                routePrice ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-primary-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-primary-100">
                <div className="text-center md:text-left">
                  <p className="text-sm text-primary-800 font-medium mb-1">
                    {t("transfer.booking.price.label")}
                  </p>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-3xl font-bold text-primary-600">
                      ฿{routePrice ? Number(routePrice.price).toLocaleString() : 0}
                    </span>
                    <span className="text-xs text-gray-400">
                      {t("transfer.booking.price.perTrip")}
                    </span>
                  </div>
                  {routePrice?.duration_minutes && (
                    <p className="text-xs text-gray-500 mt-1">
                      ~{routePrice.duration_minutes} {language === "TH" ? "นาที" : "min"}
                    </p>
                  )}
                </div>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  {t("transfer.booking.bookButton")} <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {!routePrice && from !== 0 && to !== 0 && from !== to && (
              <div className="text-center text-orange-500 text-sm py-2 bg-orange-50 rounded-lg">
                {language === "TH" ? "ไม่พบเส้นทางนี้ กรุณาติดต่อเรา" : "Route not available. Please contact us."}
              </div>
            )}

            {(from === 0 || to === 0 || from === to) && (
              <div className="text-center text-gray-400 text-sm py-2">
                {t("transfer.booking.selectRoute")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transfer Services Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            {t("transfer.fleet.badge")}
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            {t("transfer.fleet.title")}
          </h2>
          <p className="text-gray-500 mt-2">
            {t("transfer.fleet.description")}
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex justify-center gap-3 mb-8">
          {transferTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeType === type
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
              }`}
            >
              {type === "airport" && <Plane size={16} />}
              {type === "private" && <Car size={16} />}
              {type === "hourly" && <Timer size={16} />}
              {t(`transfer.types.${type}`)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredTransfers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransfers.map((transfer) => (
              <div
                key={transfer.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  <img
                    src={transfer.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"}
                    alt={transfer.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      transfer.type === "airport"
                        ? "bg-blue-100 text-blue-700"
                        : transfer.type === "private"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {t(`transfer.types.${transfer.type}`)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {transfer.vehicle_type}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {transfer.name}
                  </h3>

                  {transfer.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {transfer.description}
                    </p>
                  )}

                  {/* Capacity */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} className="text-primary-500" />
                      <span className="text-sm font-medium">
                        {transfer.maxPassengers} {t("transfer.fleet.passengers")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Car size={16} className="text-primary-500" />
                      <span className="text-sm font-medium">
                        {transfer.vehicle_type}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">
                        {transfer.type === "hourly" ? t("transfer.pricePerHour") : t("transfer.pricePerTrip")}
                      </span>
                      <span className="text-xl font-bold text-primary-600">
                        ฿{transfer.price.toLocaleString()}
                      </span>
                    </div>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
                      {t("transfer.bookNow")} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <Car size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t("transfer.empty.title")}
            </h3>
            <p className="text-gray-500">
              {t("transfer.empty.description")}
            </p>
          </div>
        )}

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">
                {valueProps[0]?.title}
              </h4>
              <p className="text-sm text-gray-500">
                {valueProps[0]?.description}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">
                {valueProps[1]?.title}
              </h4>
              <p className="text-sm text-gray-500">
                {valueProps[1]?.description}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
              <Car size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">
                {valueProps[2]?.title}
              </h4>
              <p className="text-sm text-gray-500">
                {valueProps[2]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
