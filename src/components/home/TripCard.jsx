import { MapPin, Clock, Star, Heart } from 'lucide-react';
import Button from '../ui/Button';

export default function TripCard({
  image,
  title,
  location,
  duration,
  rating,
  reviews,
  price,
  discountPrice
}) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 border border-gray-100 relative cursor-pointer transform hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-600 uppercase tracking-wider shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
          One Day Trip
        </div>
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/60 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm">
          <Heart size={20} className="transition-transform group-active:scale-90" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 font-medium text-sm backdrop-blur-[2px]">
          <MapPin size={16} className="text-primary-300" />
          <span>{location}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors h-14">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary-500" />
            <span>{duration}</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-gray-900">{rating}</span>
            <span className="text-gray-400 text-xs">({reviews})</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-1">ราคาเริ่มต้น/ท่าน</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary-600">฿{price.toLocaleString()}</span>
              {discountPrice && (
                <span className="text-sm text-gray-400 line-through decoration-gray-300">฿{discountPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          <Button variant="outline" className="!rounded-xl !px-5 !py-2.5 hover:!bg-primary-500 hover:!text-white border-primary-200 !text-sm font-bold shadow-sm hover:shadow-primary-500/30">
            จองเลย
          </Button>
        </div>
      </div>
    </div>
  );
}
