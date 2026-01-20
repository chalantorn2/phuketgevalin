// ข้อความสำหรับหน้า Transfer
export const transfer = {
  TH: {
    hero: {
      badge: "Private Transfer",
      title: "บริการรถรับ-ส่ง ส่วนตัว",
      description: "สะดวก ปลอดภัย ราคามาตรฐาน",
    },
    types: {
      all: "ทั้งหมด",
      airport: "รับ-ส่งสนามบิน",
      private: "รถส่วนตัว",
      hourly: "เช่ารายชั่วโมง",
    },
    pricePerTrip: "ราคา / เที่ยว",
    pricePerHour: "ราคา / ชั่วโมง",
    bookNow: "จองเลย",
    empty: {
      title: "ไม่พบบริการ",
      description: "ไม่มีบริการในหมวดหมู่นี้",
    },
    booking: {
      from: {
        label: "รับจาก (Pick-up)",
        placeholder: "เลือกสถานที่",
      },
      to: {
        label: "ส่งที่ (Drop-off)",
        placeholder: "เลือกสถานที่",
      },
      date: "วันที่เดินทาง",
      passengers: {
        label: "จำนวนผู้โดยสาร",
        options: ["1-3 ท่าน", "4-9 ท่าน", "10+ ท่าน"],
      },
      price: {
        label: "ราคาเริ่มต้นสำหรับเส้นทางนี้",
        perTrip: "/ เที่ยว (รถเก๋ง)",
      },
      bookButton: "จองรถทันที",
      selectRoute: "กรุณาเลือกต้นทางและปลายทางเพื่อดูราคา",
    },
    locations: [
      "เลือกสถานที่",
      "สนามบินภูเก็ต (HKT)",
      "ตัวเมืองภูเก็ต",
      "หาดป่าตอง",
      "สนามบินกระบี่ (KBV)",
      "อ่าวนาง (กระบี่)",
      "ตัวเมืองกระบี่",
      "เขาหลัก (พังงา)",
    ],
    fleet: {
      badge: "Our Fleet",
      title: "ประเภทรถให้บริการ",
      description: "รถใหม่ สะอาด คนขับสุภาพ ชำนาญเส้นทาง",
      passengers: "ท่าน",
      luggage: "ใบ",
      priceLabel: "ราคาสุทธิ",
      selectRoutePrice: "เลือกเส้นทางเพื่อดูราคา",
      cars: [
        {
          id: "sedan",
          name: "Standard Sedan",
          model: "Toyota Camry / Altis",
          features: ["แอร์เย็นฉ่ำ", "น้ำดื่มฟรี", "เบาะหนัง", "USB Charger"],
        },
        {
          id: "suv",
          name: "Premium SUV",
          model: "Toyota Fortuner",
          features: ["กว้างขวาง", "ขับเคลื่อน 4 ล้อ", "เหมาะกับขึ้นเขา", "WiFi"],
        },
        {
          id: "van",
          name: "Luxury Van",
          model: "Toyota Commuter VIP",
          features: ["เบาะนวดไฟฟ้า", "TV/Karaoke", "พื้นที่กว้างมาก", "หลังคาสูง"],
        },
      ],
    },
    valueProps: [
      {
        title: "ปลอดภัย 100%",
        description:
          "รถทุกคันมีประกันภัยชั้น 1 และคนขับผ่านการตรวจสอบประวัติอาชญากรรม",
      },
      {
        title: "ตรงต่อเวลา",
        description:
          "การันตีไปรับตรงเวลา หากเครื่องบินดีเลย์ เรารอให้ฟรี 60 นาที",
      },
      {
        title: "รถใหม่ สะอาด",
        description:
          "รถทุกคันอายุไม่เกิน 5 ปี และทำความสะอาดฆ่าเชื้อก่อนรับผู้โดยสารทุกครั้ง",
      },
    ],
  },
  EN: {
    hero: {
      badge: "Private Transfer",
      title: "Private Transfer Service",
      description: "Convenient, Safe, Standard Pricing",
    },
    types: {
      all: "All",
      airport: "Airport Transfer",
      private: "Private Car",
      hourly: "Hourly Rental",
    },
    pricePerTrip: "Price / Trip",
    pricePerHour: "Price / Hour",
    bookNow: "Book Now",
    empty: {
      title: "No Services Found",
      description: "No services available in this category",
    },
    booking: {
      from: {
        label: "Pick-up Location",
        placeholder: "Select location",
      },
      to: {
        label: "Drop-off Location",
        placeholder: "Select location",
      },
      date: "Travel Date",
      passengers: {
        label: "Passengers",
        options: ["1-3 Persons", "4-9 Persons", "10+ Persons"],
      },
      price: {
        label: "Starting price for this route",
        perTrip: "/ trip (Sedan)",
      },
      bookButton: "Book Now",
      selectRoute: "Please select origin and destination to see price",
    },
    locations: [
      "Select location",
      "Phuket Airport (HKT)",
      "Phuket Town",
      "Patong Beach",
      "Krabi Airport (KBV)",
      "Ao Nang (Krabi)",
      "Krabi Town",
      "Khao Lak (Phang Nga)",
    ],
    fleet: {
      badge: "Our Fleet",
      title: "Our Vehicle Types",
      description: "New cars, Clean, Professional drivers, Expert routes",
      passengers: "Pax",
      luggage: "Bags",
      priceLabel: "Total Price",
      selectRoutePrice: "Select route to see price",
      cars: [
        {
          id: "sedan",
          name: "Standard Sedan",
          model: "Toyota Camry / Altis",
          features: ["Air Conditioning", "Free Water", "Leather Seats", "USB Charger"],
        },
        {
          id: "suv",
          name: "Premium SUV",
          model: "Toyota Fortuner",
          features: ["Spacious", "4WD", "Mountain Ready", "WiFi"],
        },
        {
          id: "van",
          name: "Luxury Van",
          model: "Toyota Commuter VIP",
          features: ["Massage Seats", "TV/Karaoke", "Extra Spacious", "High Roof"],
        },
      ],
    },
    valueProps: [
      {
        title: "100% Safe",
        description:
          "All vehicles have first-class insurance and drivers pass criminal background checks",
      },
      {
        title: "Always On Time",
        description:
          "Guaranteed punctual pickup. If your flight is delayed, we wait for free up to 60 minutes",
      },
      {
        title: "New & Clean Cars",
        description:
          "All vehicles are under 5 years old and sanitized before every passenger pickup",
      },
    ],
  },
};
