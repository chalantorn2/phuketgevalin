import { useState } from "react";
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
} from "lucide-react";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

export default function HotelDetailPage({ hotelId, onBack }) {
  const { t } = useLanguage();
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [nights, setNights] = useState(1);

  // Mock Data
  const hotelData = {
    name: "Sri Panwa Phuket Luxury Pool Villa",
    location: "แหลมพันวา, ภูเก็ต",
    stars: 5,
    rating: 4.9,
    reviews: 328,
    description:
      "ศรีพันวา ภูเก็ต ลักชัวรี พูลวิลล่า รีสอร์ทหรูสไตล์ทรอปิคอลร่วมสมัย ตั้งอยู่บนปลายแหลมพันวาที่ยื่นออกไปในทะเลอันดามัน รายล้อมด้วยวิวทะเลแบบพาโนรามา 300 องศา ให้ความเป็นส่วนตัวสูงสุด พร้อมสระว่ายน้ำส่วนตัวในทุกวิลล่า",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
    ],
    facilities: [
      { icon: <Wifi size={18} />, name: "ฟรี Wi-Fi" },
      { icon: <Droplets size={18} />, name: "สระว่ายน้ำ" },
      { icon: <Utensils size={18} />, name: "ร้านอาหาร" },
      { icon: <Dumbbell size={18} />, name: "ฟิตเนส" },
      { icon: <Car size={18} />, name: "ที่จอดรถ" },
      { icon: <Coffee size={18} />, name: "อาหารเช้า" },
    ],
    rooms: [
      {
        id: 1,
        name: "Ocean View Pool Suite",
        size: "100 ตร.ม.",
        bed: "1 เตียงคิงไซส์",
        view: "วิวทะเล",
        price: 18900,
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
        features: [
          "สระว่ายน้ำส่วนตัว",
          "อ่างอาบน้ำ",
          "ระเบียงส่วนตัว",
          "ฟรีมินิบาร์",
        ],
      },
      {
        id: 2,
        name: "One Bedroom Luxury Pool Villa",
        size: "230 ตร.ม.",
        bed: "1 เตียงคิงไซส์",
        view: "วิวทะเลพาโนรามา",
        price: 26500,
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000&auto=format&fit=crop",
        features: [
          "สระว่ายน้ำอินฟินิตี้",
          "ห้องนั่งเล่นแยก",
          "Sound System",
          "บริการบัตเลอร์",
        ],
      },
      {
        id: 3,
        name: "Penthouse Ocean View",
        size: "140 ตร.ม.",
        bed: "2 เตียงใหญ่",
        view: "วิวทะเลสูงสุด",
        price: 32000,
        image:
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop",
        features: [
          "ชั้นบนสุด",
          "ครัวขนาดเล็ก",
          "จากุซซี่",
          "วิวพระอาทิตย์ตก",
        ],
      },
    ],
  };

  const selectedRoom =
    hotelData.rooms.find((r) => r.id === selectedRoomId) || hotelData.rooms[0];
  const totalPrice = selectedRoom.price * nights;

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-20 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={20} /> ย้อนกลับไปหน้าค้นหาที่พัก
        </button>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {hotelData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                  {[...Array(hotelData.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary-500" />
                  {hotelData.location}
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">
                    {hotelData.rating}
                  </span>
                  <span>ยอดเยี่ยม ({hotelData.reviews} รีวิว)</span>
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
              src={hotelData.images[0]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              alt="Main"
            />
          </div>
          <div className="md:col-span-1 flex flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden">
              <img
                src={hotelData.images[1]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 1"
              />
            </div>
            <div className="h-1/2 overflow-hidden">
              <img
                src={hotelData.images[2]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                alt="Sub 2"
              />
            </div>
          </div>
          <div className="md:col-span-1 h-full overflow-hidden relative group cursor-pointer">
            <img
              src={hotelData.images[3]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Sub 3"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Camera size={16} /> ดูรูปทั้งหมด
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details & Rooms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description & Facilities */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                รายละเอียดที่พัก
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                {hotelData.description}
              </p>

              <h4 className="font-bold text-gray-900 mb-4">
                สิ่งอำนวยความสะดวก
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotelData.facilities.map((fac, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center flex-shrink-0">
                      {fac.icon}
                    </div>
                    {fac.name}
                  </div>
                ))}
              </div>
            </section>

            {/* Room Selection */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BedDouble className="text-primary-500" /> เลือกห้องพัก
              </h3>

              <div className="space-y-6">
                {hotelData.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col md:flex-row ${
                      selectedRoomId === room.id
                        ? "border-primary-500 shadow-xl shadow-primary-500/10 ring-1 ring-primary-500"
                        : "border-gray-100 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {/* Room Image */}
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0 relative">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Room Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-900">
                          {room.name}
                        </h4>
                        {selectedRoomId === room.id && (
                          <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-1 rounded-full border border-primary-100 flex items-center gap-1">
                            <Check size={10} /> Selected
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Maximize size={14} className="text-primary-400" />{" "}
                          {room.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <BedDouble size={14} className="text-primary-400" />{" "}
                          {room.bed}
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind size={14} className="text-primary-400" />{" "}
                          {room.view}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {room.features.map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-gray-600"
                          >
                            <CheckCircle2 size={12} className="text-green-500" />
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary-600">
                              ฿{room.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400">/ คืน</span>
                          </div>
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
                            ? "เลือกแล้ว"
                            : "เลือกห้องนี้"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-64 flex items-center justify-center text-gray-400 border border-gray-200">
              <div className="flex flex-col items-center">
                <MapPin size={32} className="mb-2" />
                <span>แผนที่ที่ตั้ง (Google Maps)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-cyan-300"></div>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {selectedRoom.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary-600">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">/ {nights} คืน</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  รวมภาษีและค่าธรรมเนียมแล้ว
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">
                      เช็คอิน
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary-200 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">
                      เช็คเอาท์
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">
                    ระยะเวลาเข้าพัก
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" /> จำนวนคืน
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 text-primary-600 disabled:opacity-50 cursor-pointer"
                        disabled={nights <= 1}
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-900 w-4 text-center">
                        {nights}
                      </span>
                      <button
                        onClick={() => setNights(nights + 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 text-primary-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full !py-3.5 shadow-lg shadow-primary-500/30 mb-3">
                จองที่พัก
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
                <ShieldCheck size={14} /> ฟรีค่าธรรมเนียมการจอง
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
