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
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Transfer() {
  const { t } = useLanguage();

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [price, setPrice] = useState(null);

  // Fleet data (static - images, capacity, multiplier)
  const fleetData = [
    {
      id: "sedan",
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop",
      passengers: 3,
      luggage: 2,
      baseMultiplier: 1,
    },
    {
      id: "suv",
      image:
        "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop",
      passengers: 4,
      luggage: 4,
      baseMultiplier: 1.3,
    },
    {
      id: "van",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop",
      passengers: 9,
      luggage: 8,
      baseMultiplier: 1.6,
    },
  ];

  // Get translated data
  const locations = t("transfer.locations");
  const translatedCars = t("transfer.fleet.cars");
  const valueProps = t("transfer.valueProps");
  const passengerOptions = t("transfer.booking.passengers.options");

  // Merge fleet data with translations
  const fleet = fleetData.map((car, index) => ({
    ...car,
    name: translatedCars[index]?.name || "",
    model: translatedCars[index]?.model || "",
    features: translatedCars[index]?.features || [],
  }));

  // Simple pricing logic
  useEffect(() => {
    if (from === 0 || to === 0 || from === to) {
      setPrice(null);
      return;
    }

    const fromLoc = locations[from] || "";
    const toLoc = locations[to] || "";

    let basePrice = 0;
    const isPhuket =
      fromLoc.includes("ภูเก็ต") ||
      fromLoc.includes("Phuket") ||
      fromLoc.includes("ป่าตอง") ||
      fromLoc.includes("Patong");
    const isKrabi =
      toLoc.includes("กระบี่") ||
      toLoc.includes("Krabi") ||
      toLoc.includes("อ่าวนาง") ||
      toLoc.includes("Ao Nang");
    const isPhuketToKrabi =
      (isPhuket && isKrabi) ||
      ((fromLoc.includes("กระบี่") ||
        fromLoc.includes("Krabi") ||
        fromLoc.includes("อ่าวนาง") ||
        fromLoc.includes("Ao Nang")) &&
        (toLoc.includes("ภูเก็ต") ||
          toLoc.includes("Phuket") ||
          toLoc.includes("ป่าตอง") ||
          toLoc.includes("Patong")));

    if (isPhuketToKrabi) {
      basePrice = 2500;
    } else if (
      (fromLoc.includes("สนามบิน") || fromLoc.includes("Airport")) &&
      (toLoc.includes("เมือง") || toLoc.includes("Town"))
    ) {
      basePrice = 800;
    } else if (
      (fromLoc.includes("เมือง") || fromLoc.includes("Town")) &&
      (toLoc.includes("สนามบิน") || toLoc.includes("Airport"))
    ) {
      basePrice = 800;
    } else {
      basePrice = 1500;
    }

    setPrice(basePrice);
  }, [from, to, locations]);

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
                    {locations.map((loc, index) => (
                      <option key={index} value={index} disabled={index === to}>
                        {loc}
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
                    {locations.map((loc, index) => (
                      <option
                        key={index}
                        value={index}
                        disabled={index === from}
                      >
                        {loc}
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
                price ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-primary-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-primary-100">
                <div className="text-center md:text-left">
                  <p className="text-sm text-primary-800 font-medium mb-1">
                    {t("transfer.booking.price.label")}
                  </p>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-3xl font-bold text-primary-600">
                      ฿{price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {t("transfer.booking.price.perTrip")}
                    </span>
                  </div>
                </div>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  {t("transfer.booking.bookButton")} <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {!price && (
              <div className="text-center text-gray-400 text-sm py-2">
                {t("transfer.booking.selectRoute")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fleet Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleet.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="h-56 overflow-hidden bg-gray-100 relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {car.model}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {car.name}
                </h3>

                {/* Capacity */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">
                      {car.passengers} {t("transfer.fleet.passengers")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">
                      {car.luggage} {t("transfer.fleet.luggage")}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {car.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-gray-500"
                    >
                      <CheckCircle2 size={14} className="text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price */}
                {price ? (
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {t("transfer.fleet.priceLabel")}
                    </span>
                    <span className="text-xl font-bold text-primary-600">
                      ฿{(price * car.baseMultiplier).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    {t("transfer.fleet.selectRoutePrice")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

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
