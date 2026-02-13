import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import OneDayTrip from "./pages/OneDayTrip";
import PackageTour from "./pages/PackageTour";
import Transfer from "./pages/Transfer";
import Hotel from "./pages/Hotel";
import OneDayTripDetailPage from "./pages/OneDayTripDetailPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import AdminApp from "./pages/admin/AdminApp";

export default function App() {
  const location = useLocation();

  // Render Admin Panel without MainLayout
  if (location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  // Check if current page is a detail page (for forceSolid navbar)
  const isDetailPage =
    /^\/(one-day-trip|package-tour|hotel)\/\d+/.test(location.pathname);

  return (
    <LanguageProvider>
      <MainLayout forceSolid={isDetailPage}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/one-day-trip" element={<OneDayTrip />} />
          <Route path="/one-day-trip/:id" element={<OneDayTripDetailPage />} />
          <Route path="/package-tour" element={<PackageTour />} />
          <Route path="/package-tour/:id" element={<PackageDetailPage />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
        </Routes>
      </MainLayout>
    </LanguageProvider>
  );
}
