import { useState } from "react";
import { authAPI } from "../../services/api";

// Import Admin Components
import {
  BookingsSection,
  PackageToursSection,
  HotelsSection,
  TransfersSection,
  PromotionsSection,
  OneDayTripsSection,
} from "./components";

export default function AdminDashboard({ admin, onLogout }) {
  const [currentSection, setCurrentSection] = useState("promotions");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      onLogout();
    }
  };

  const menuItems = [
    {
      id: "promotions",
      name: "Promotions",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
    {
      id: "oneday_trips",
      name: "One Day Trips",
      icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      id: "package_tours",
      name: "Package Tours",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
    },
    {
      id: "transfers",
      name: "Transfers",
      icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    },
    {
      id: "hotels",
      name: "Hotels",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      id: "bookings",
      name: "Bookings",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sky-800 text-white transition-all duration-300 flex flex-col h-screen sticky top-0`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sky-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Phuket Gevalin"
                className="w-full h-full object-contain"
              />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold">Phuket Gevalin</h1>
                <p className="text-xs text-sky-300">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu - Scrollable */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => !item.disabled && setCurrentSection(item.id)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    item.disabled
                      ? "text-sky-400 opacity-50 cursor-not-allowed"
                      : currentSection === item.id
                        ? "bg-sky-600 text-white"
                        : "text-sky-200 hover:bg-sky-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {sidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-sky-700 text-sky-300 hover:text-white transition flex-shrink-0"
        >
          <svg
            className={`w-5 h-5 mx-auto transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {currentSection.replace("_", " ")}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, <span className="font-medium">{admin?.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {currentSection === "promotions" && <PromotionsSection />}
          {currentSection === "oneday_trips" && <OneDayTripsSection />}
          {currentSection === "package_tours" && <PackageToursSection />}
          {currentSection === "transfers" && <TransfersSection />}
          {currentSection === "hotels" && <HotelsSection />}
          {currentSection === "bookings" && <BookingsSection />}
        </main>
      </div>
    </div>
  );
}
