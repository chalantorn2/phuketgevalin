// รวม translations ทั้งหมดจากแต่ละไฟล์
import { common } from "./common";
import { home } from "./home";
import { about } from "./about";
import { oneDayTrip } from "./oneDayTrip";
import { hotel } from "./hotel";
import { packageTour } from "./packageTour";
import { transfer } from "./transfer";

// รวมทั้งหมดเข้าด้วยกัน
export const translations = {
  TH: {
    ...common.TH,
    ...home.TH,
    about: about.TH,
    oneDayTrip: oneDayTrip.TH,
    hotel: hotel.TH,
    packageTour: packageTour.TH,
    transfer: transfer.TH,
  },
  EN: {
    ...common.EN,
    ...home.EN,
    about: about.EN,
    oneDayTrip: oneDayTrip.EN,
    hotel: hotel.EN,
    packageTour: packageTour.EN,
    transfer: transfer.EN,
  },
};
