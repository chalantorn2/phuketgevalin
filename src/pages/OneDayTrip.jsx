import { useState } from "react";
import { MapPin, Clock, Star, Heart, Map } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function OneDayTrip() {
  const { t } = useLanguage();
  const [activeProvince, setActiveProvince] = useState("all");

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

  // Trip data (prices stay the same across languages)
  const tripData = [
    {
      id: 1,
      provinceKey: "prachuap",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      reviews: 124,
      price: 1590,
      discountPrice: 2200,
      bestseller: true,
    },
    {
      id: 2,
      provinceKey: "phuket",
      image:
        "https://images.unsplash.com/photo-1598895015795-c49c55b5d141?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      reviews: 856,
      price: 2490,
      discountPrice: 3500,
      bestseller: true,
    },
    {
      id: 3,
      provinceKey: "ayutthaya",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      reviews: 342,
      price: 890,
      discountPrice: 1290,
      bestseller: false,
    },
    {
      id: 4,
      provinceKey: "krabi",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      reviews: 1120,
      price: 990,
      discountPrice: 1500,
      bestseller: true,
    },
    {
      id: 5,
      provinceKey: "bangkok",
      image:
        "https://images.unsplash.com/photo-1621244249243-436b79b5eea8?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      reviews: 550,
      price: 1200,
      discountPrice: 1800,
      bestseller: true,
    },
    {
      id: 6,
      provinceKey: "phangnga",
      image:
        "https://images.unsplash.com/photo-1552550186-b4845558163f?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      reviews: 420,
      price: 1800,
      discountPrice: 2500,
      bestseller: false,
    },
    {
      id: 7,
      provinceKey: "suratthani",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      reviews: 310,
      price: 2100,
      discountPrice: 2900,
      bestseller: true,
    },
    {
      id: 8,
      provinceKey: "phuket",
      image:
        "https://images.unsplash.com/photo-1589394815804-989b37519385?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      reviews: 180,
      price: 1500,
      discountPrice: 2200,
      bestseller: false,
    },
  ];

  // Get translated trips
  const translatedTrips = t("oneDayTrip.trips");

  // Merge trip data with translations
  const trips = tripData.map((trip, index) => ({
    ...trip,
    title: translatedTrips[index]?.title || "",
    location: translatedTrips[index]?.location || "",
    duration: translatedTrips[index]?.duration || "",
    tags: translatedTrips[index]?.tags || [],
    provinceName: t(`oneDayTrip.provinces.${trip.provinceKey}`),
  }));

  // Filter trips
  const filteredTrips =
    activeProvince === "all"
      ? trips
      : trips.filter((trip) => trip.provinceKey === activeProvince);

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

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 relative flex flex-col h-full hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    {trip.bestseller && (
                      <span className="px-2 py-1 rounded-lg bg-yellow-400 text-yellow-950 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Star size={10} className="fill-yellow-950" />{" "}
                        {t("oneDayTrip.card.hot")}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-gray-700 text-[10px] font-bold shadow-sm">
                      {trip.provinceName}
                    </span>
                  </div>

                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all flex items-center justify-center cursor-pointer">
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

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {trip.tags.map((tag, i) => (
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
                      <span className="text-[10px] text-gray-400 line-through">
                        ฿{trip.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-bold text-primary-600">
                        ฿{trip.price.toLocaleString()}
                      </span>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-bold hover:bg-primary-500 hover:text-white transition-all cursor-pointer">
                      {t("oneDayTrip.card.book")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
