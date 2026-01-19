import { useState, useEffect } from 'react';
import { authAPI, adminAPI } from '../../services/api';

export default function AdminDashboard({ admin, onLogout }) {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (currentSection === 'dashboard') {
      fetchDashboardStats();
    }
  }, [currentSection]);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getDashboard();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      onLogout();
    }
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bookings', name: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'tours', name: 'Tours', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
    { id: 'hotels', name: 'Hotels', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'transfers', name: 'Transfers', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'contacts', name: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sky-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-sky-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sky-800 font-bold text-lg">PG</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold">Phuket Gevalin</h1>
                <p className="text-xs text-sky-300">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    currentSection === item.id
                      ? 'bg-sky-600 text-white'
                      : 'text-sky-200 hover:bg-sky-700'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
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
          className="p-4 border-t border-sky-700 text-sky-300 hover:text-white transition"
        >
          <svg className={`w-5 h-5 mx-auto transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {currentSection}
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
          {currentSection === 'dashboard' && (
            <DashboardContent stats={stats} loading={loading} />
          )}
          {currentSection === 'bookings' && (
            <BookingsSection />
          )}
          {currentSection === 'tours' && (
            <ToursSection />
          )}
          {currentSection === 'hotels' && (
            <HotelsSection />
          )}
          {currentSection === 'transfers' && (
            <TransfersSection />
          )}
          {currentSection === 'contacts' && (
            <ContactsSection />
          )}
        </main>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ stats, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Tours', value: stats?.total_tours || 0, color: 'bg-blue-500', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945' },
    { label: 'Total Hotels', value: stats?.total_hotels || 0, color: 'bg-green-500', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
    { label: 'Total Transfers', value: stats?.total_transfers || 0, color: 'bg-purple-500', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4' },
    { label: 'Total Bookings', value: stats?.total_bookings || 0, color: 'bg-orange-500', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5' },
    { label: 'Pending Bookings', value: stats?.pending_bookings || 0, color: 'bg-yellow-500', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: "Today's Bookings", value: stats?.today_bookings || 0, color: 'bg-cyan-500', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7' },
    { label: 'Unread Messages', value: stats?.unread_contacts || 0, color: 'bg-red-500', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14' },
    { label: 'Monthly Revenue', value: `฿${Number(stats?.monthly_revenue || 0).toLocaleString()}`, color: 'bg-emerald-500', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Reference</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Service</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_bookings?.length > 0 ? (
                stats.recent_bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-sky-600">{booking.reference_code}</td>
                    <td className="py-3 px-4">{booking.customer_name}</td>
                    <td className="py-3 px-4">{booking.service_name || booking.service_type}</td>
                    <td className="py-3 px-4">{booking.booking_date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">฿{Number(booking.total_price).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Bookings Section
function BookingsSection() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getBookings(filter);
      if (data.success) {
        setBookings(data.data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === status
                ? 'bg-sky-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Reference</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Contact</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Service</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Amount</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-sky-600">{booking.reference_code}</td>
                    <td className="py-4 px-6">{booking.customer_name}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div>{booking.customer_email}</div>
                        <div className="text-gray-500">{booking.customer_phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize">{booking.service_type}</span>
                    </td>
                    <td className="py-4 px-6">{booking.booking_date}</td>
                    <td className="py-4 px-6">฿{Number(booking.total_price).toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Tours Section
function ToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getTours();
      if (data.success) {
        setTours(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/tours?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to delete tour:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Tours</h3>
        <button
          onClick={() => { setEditingTour(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Tour
        </button>
      </div>

      {showForm && (
        <TourForm
          tour={editingTour}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchTours(); }}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">ID</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name (EN)</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name (TH)</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Category</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 ? (
                tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">{tour.id}</td>
                    <td className="py-4 px-6">{tour.name_en}</td>
                    <td className="py-4 px-6">{tour.name_th}</td>
                    <td className="py-4 px-6 capitalize">{tour.category}</td>
                    <td className="py-4 px-6">฿{Number(tour.price).toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tour.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tour.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingTour(tour); setShowForm(true); }}
                          className="text-sky-600 hover:text-sky-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    No tours found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Tour Form Component
function TourForm({ tour, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_th: tour?.name_th || '',
    name_en: tour?.name_en || '',
    description_th: tour?.description_th || '',
    description_en: tour?.description_en || '',
    price: tour?.price || '',
    category: tour?.category || 'island',
    duration: tour?.duration || '',
    image: tour?.image || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = tour
        ? `${API_BASE_URL}/tours?id=${tour.id}`
        : `${API_BASE_URL}/tours`;

      const response = await fetch(url, {
        method: tour ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save tour');
      }
    } catch (error) {
      console.error('Failed to save tour:', error);
      alert('Failed to save tour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{tour ? 'Edit Tour' : 'Add New Tour'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Thai)</label>
            <input
              type="text"
              value={formData.name_th}
              onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="island">Island Tour</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="package">Package Tour</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Full Day, Half Day"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
          <textarea
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Thai)</label>
          <textarea
            value={formData.description_th}
            onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="3"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Hotels Section (Similar structure to Tours)
function HotelsSection() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getHotels();
      if (data.success) {
        setHotels(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Hotels</h3>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : hotels.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">ID</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Location</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price/Night</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Rating</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">{hotel.id}</td>
                  <td className="py-4 px-6">{hotel.name_en}</td>
                  <td className="py-4 px-6">{hotel.location}</td>
                  <td className="py-4 px-6">฿{Number(hotel.price_per_night).toLocaleString()}</td>
                  <td className="py-4 px-6">{hotel.rating}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hotel.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-gray-500">No hotels found</div>
        )}
      </div>
    </div>
  );
}

// Transfers Section
function TransfersSection() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getTransfers();
      if (data.success) {
        setTransfers(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Transfers</h3>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Transfer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : transfers.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">ID</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Vehicle</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Max Passengers</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">{transfer.id}</td>
                  <td className="py-4 px-6">{transfer.name_en}</td>
                  <td className="py-4 px-6 capitalize">{transfer.type}</td>
                  <td className="py-4 px-6">{transfer.vehicle_type}</td>
                  <td className="py-4 px-6">฿{Number(transfer.price).toLocaleString()}</td>
                  <td className="py-4 px-6">{transfer.max_passengers}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transfer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-gray-500">No transfers found</div>
        )}
      </div>
    </div>
  );
}

// Contacts Section
function ContactsSection() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getContacts();
      if (data.success) {
        setContacts(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/contact?id=${id}`, {
        method: 'PUT',
        credentials: 'include'
      });
      fetchContacts();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Contact Messages</h3>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : contacts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <div key={contact.id} className={`p-6 ${contact.status === 'unread' ? 'bg-sky-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-500">{contact.email} | {contact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'unread' ? 'bg-red-100 text-red-700' :
                      contact.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status}
                    </span>
                    {contact.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(contact.id)}
                        className="text-sm text-sky-600 hover:text-sky-800"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{contact.subject}</p>
                <p className="text-gray-700">{contact.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(contact.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  );
}
