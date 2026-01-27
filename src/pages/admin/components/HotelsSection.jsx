import { useState, useEffect } from 'react';
import { hotelsAPI, hotelRoomTypesAPI, hotelPeriodsAPI, hotelRoomPricesAPI } from '../../../services/api';

export default function HotelsSection() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await hotelsAPI.getAll({ all: 'true' });
      if (data.success) {
        setHotels(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const data = await hotelsAPI.delete(id);
      if (data.success) fetchHotels();
    } catch (error) {
      console.error('Failed to delete hotel:', error);
    }
  };

  const handleToggleStatus = async (hotel) => {
    try {
      const newStatus = hotel.status === 'active' ? 'inactive' : 'active';
      const data = await hotelsAPI.update(hotel.id, { status: newStatus });
      if (data.success) fetchHotels();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Hotels</h3>
              <p className="text-sm text-gray-500">Manage hotel listings</p>
            </div>
            <button
              onClick={() => { setEditingHotel(null); setShowForm(true); }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Hotel
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
              <div className="w-full max-w-5xl mx-4">
                <HotelForm
                  hotel={editingHotel}
                  onClose={() => setShowForm(false)}
                  onSave={() => { setShowForm(false); fetchHotels(); }}
                />
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Image</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Location</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Stars</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                      <tr key={hotel.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          {hotel.image ? (
                            <img src={hotel.image} alt={hotel.name_en} className="w-20 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{hotel.name_en}</div>
                          <div className="text-sm text-gray-500">{hotel.name_th}</div>
                        </td>
                        <td className="py-4 px-4">{hotel.location}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            {[...Array(hotel.stars || 4)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(hotel)}
                            className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                              hotel.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {hotel.status}
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingHotel(hotel); setShowForm(true); }}
                              className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(hotel.id)}
                              className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-500">
                        No hotels found. Click "Add Hotel" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Room Types Panel (inside modal)
// ============================================
function RoomTypesPanel({ hotelId }) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    fetchRoomTypes();
  }, [hotelId]);

  const fetchRoomTypes = async () => {
    setLoading(true);
    try {
      const data = await hotelRoomTypesAPI.getByHotel(hotelId, true);
      if (data.success) {
        setRoomTypes(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch room types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this room type?')) return;
    try {
      const data = await hotelRoomTypesAPI.delete(id);
      if (data.success) fetchRoomTypes();
    } catch (error) {
      console.error('Failed to delete room type:', error);
    }
  };

  const handleToggleStatus = async (roomType) => {
    try {
      const newStatus = roomType.status === 'active' ? 'inactive' : 'active';
      const data = await hotelRoomTypesAPI.update(roomType.id, { status: newStatus });
      if (data.success) fetchRoomTypes();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setRoomTypes(prev => {
      const newItems = [...prev];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      return newItems;
    });
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    // Save new sort order
    for (let i = 0; i < roomTypes.length; i++) {
      if (roomTypes[i].sort_order !== i) {
        try {
          await hotelRoomTypesAPI.update(roomTypes[i].id, { sort_order: i });
        } catch (error) {
          console.error('Failed to update sort order:', error);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">Room Types</h4>
          <p className="text-sm text-gray-500">Manage room types for this hotel. Drag to reorder.</p>
        </div>
        <button
          onClick={() => { setEditingRoomType(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Room Type
        </button>
      </div>

      {showForm && (
        <RoomTypeForm
          hotelId={hotelId}
          roomType={editingRoomType}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchRoomTypes(); }}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 py-3 px-2 text-gray-600 font-medium"></th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Name (EN)</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Name (TH)</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Max Guests</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomTypes.length > 0 ? (
                roomTypes.map((roomType, index) => (
                  <tr
                    key={roomType.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-move ${draggedIndex === index ? 'opacity-50 bg-sky-50' : ''}`}
                  >
                    <td className="py-3 px-2 text-center text-gray-400">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </td>
                    <td className="py-3 px-4 font-medium">{roomType.name_en}</td>
                    <td className="py-3 px-4">{roomType.name_th}</td>
                    <td className="py-3 px-4">{roomType.max_guests}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(roomType)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          roomType.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {roomType.status}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingRoomType(roomType); setShowForm(true); }}
                          className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(roomType.id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    No room types found. Click "Add Room Type" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================
// Periods Panel (inside modal)
// ============================================
function PeriodsPanel({ hotelId }) {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    fetchPeriods();
  }, [hotelId]);

  const fetchPeriods = async () => {
    setLoading(true);
    try {
      const data = await hotelPeriodsAPI.getByHotel(hotelId, true);
      if (data.success) {
        setPeriods(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch periods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this period?')) return;
    try {
      const data = await hotelPeriodsAPI.delete(id);
      if (data.success) fetchPeriods();
    } catch (error) {
      console.error('Failed to delete period:', error);
    }
  };

  const handleToggleStatus = async (period) => {
    try {
      const newStatus = period.status === 'active' ? 'inactive' : 'active';
      const data = await hotelPeriodsAPI.update(period.id, { status: newStatus });
      if (data.success) fetchPeriods();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setPeriods(prev => {
      const newItems = [...prev];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      return newItems;
    });
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].sort_order !== i) {
        try {
          await hotelPeriodsAPI.update(periods[i].id, { sort_order: i });
        } catch (error) {
          console.error('Failed to update sort order:', error);
        }
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">Date Periods</h4>
          <p className="text-sm text-gray-500">Define pricing periods. Drag to reorder.</p>
        </div>
        <button
          onClick={() => { setEditingPeriod(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Period
        </button>
      </div>

      {showForm && (
        <PeriodForm
          hotelId={hotelId}
          period={editingPeriod}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchPeriods(); }}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 py-3 px-2 text-gray-600 font-medium"></th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Start Date</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">End Date</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {periods.length > 0 ? (
                periods.map((period, index) => (
                  <tr
                    key={period.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-move ${draggedIndex === index ? 'opacity-50 bg-sky-50' : ''}`}
                  >
                    <td className="py-3 px-2 text-center text-gray-400">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </td>
                    <td className="py-3 px-4 font-medium">{formatDate(period.start_date)}</td>
                    <td className="py-3 px-4">{formatDate(period.end_date)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(period)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          period.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {period.status}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingPeriod(period); setShowForm(true); }}
                          className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(period.id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    No periods found. Click "Add Period" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================
// Price Table Panel (inside modal)
// ============================================
function PriceTablePanel({ hotelId }) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedPrices, setEditedPrices] = useState({});

  useEffect(() => {
    fetchData();
  }, [hotelId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [roomTypesRes, periodsRes, pricesRes] = await Promise.all([
        hotelRoomTypesAPI.getByHotel(hotelId),
        hotelPeriodsAPI.getByHotel(hotelId),
        hotelRoomPricesAPI.getByHotel(hotelId)
      ]);

      if (roomTypesRes.success) setRoomTypes(roomTypesRes.data || []);
      if (periodsRes.success) setPeriods(periodsRes.data || []);
      if (pricesRes.success) setPrices(pricesRes.data || []);
      setEditedPrices({});
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (roomTypeId, periodId) => {
    const key = `${roomTypeId}-${periodId}`;
    if (editedPrices[key] !== undefined) return editedPrices[key];
    const priceEntry = prices.find(p => p.room_type_id == roomTypeId && p.period_id == periodId);
    return priceEntry ? priceEntry.price : '';
  };

  const handlePriceChange = (roomTypeId, periodId, value) => {
    const key = `${roomTypeId}-${periodId}`;
    setEditedPrices(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(editedPrices)) {
        const [roomTypeId, periodId] = key.split('-');
        if (value !== '' && !isNaN(parseFloat(value))) {
          await hotelRoomPricesAPI.create({
            hotel_id: hotelId,
            room_type_id: parseInt(roomTypeId),
            period_id: parseInt(periodId),
            price: parseFloat(value)
          });
        }
      }
      await fetchData();
      alert('Prices saved successfully!');
    } catch (error) {
      console.error('Failed to save prices:', error);
      alert('Failed to save prices');
    } finally {
      setSaving(false);
    }
  };

  const formatDateShort = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  const hasChanges = Object.keys(editedPrices).length > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">Price Table</h4>
          <p className="text-sm text-gray-500">Set prices for each room type and period</p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      ) : roomTypes.length === 0 || periods.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">
            {roomTypes.length === 0 && periods.length === 0
              ? 'Please add Room Types and Date Periods first'
              : roomTypes.length === 0
              ? 'Please add Room Types first'
              : 'Please add Date Periods first'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 font-medium border-b border-r border-gray-200">
                  Room Type
                </th>
                {periods.map(period => (
                  <th key={period.id} className="text-center py-3 px-4 text-gray-600 font-medium border-b border-r border-gray-200 min-w-[120px]">
                    <div className="text-xs">
                      {formatDateShort(period.start_date)} - {formatDateShort(period.end_date)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roomTypes.map((roomType) => (
                <tr key={roomType.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium border-b border-r border-gray-200">
                    <div>{roomType.name_en}</div>
                    <div className="text-sm text-gray-500">{roomType.name_th}</div>
                  </td>
                  {periods.map(period => (
                    <td key={period.id} className="py-2 px-2 border-b border-r border-gray-200">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">&#3647;</span>
                        <input
                          type="number"
                          value={getPrice(roomType.id, period.id)}
                          onChange={(e) => handlePriceChange(roomType.id, period.id, e.target.value)}
                          onWheel={(e) => e.target.blur()}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 pl-6 text-right text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          placeholder="0"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================
// Room Type Form
// ============================================
function RoomTypeForm({ hotelId, roomType, onClose, onSave }) {
  const [formData, setFormData] = useState({
    hotel_id: hotelId,
    name_th: roomType?.name_th || '',
    name_en: roomType?.name_en || '',
    description_th: roomType?.description_th || '',
    description_en: roomType?.description_en || '',
    max_guests: roomType?.max_guests || 2,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let data;
      if (roomType) {
        data = await hotelRoomTypesAPI.update(roomType.id, formData);
      } else {
        data = await hotelRoomTypesAPI.create(formData);
      }
      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h4 className="font-medium mb-4">{roomType ? 'Edit Room Type' : 'Add Room Type'}</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN) *</label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (TH) *</label>
            <input
              type="text"
              value={formData.name_th}
              onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <input
              type="text"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (TH)</label>
            <input
              type="text"
              value={formData.description_th}
              onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
            <input
              type="number"
              min="1"
              value={formData.max_guests}
              onChange={(e) => setFormData({ ...formData, max_guests: parseInt(e.target.value) || 2 })}
              onWheel={(e) => e.target.blur()}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
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

// ============================================
// Period Form
// ============================================
function PeriodForm({ hotelId, period, onClose, onSave }) {
  const [formData, setFormData] = useState({
    hotel_id: hotelId,
    start_date: period?.start_date || '',
    end_date: period?.end_date || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let data;
      if (period) {
        data = await hotelPeriodsAPI.update(period.id, formData);
      } else {
        data = await hotelPeriodsAPI.create(formData);
      }
      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h4 className="font-medium mb-4">{period ? 'Edit Period' : 'Add Period'}</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
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

// ============================================
// Hotel Form Component
// ============================================
function HotelForm({ hotel, onClose, onSave }) {
  const parseJsonArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [formData, setFormData] = useState({
    name_th: hotel?.name_th || '',
    name_en: hotel?.name_en || '',
    description_th: hotel?.description_th || '',
    description_en: hotel?.description_en || '',
    location: hotel?.location || '',
    address: hotel?.address || '',
    price_per_night: hotel?.price_per_night ? Math.floor(Number(hotel.price_per_night)) : '',
    rating: hotel?.rating || 4.5,
    stars: hotel?.stars || 4,
    reviews: hotel?.reviews || 0,
    image: hotel?.image || '',
    gallery: parseJsonArray(hotel?.gallery),
    amenities: hotel?.amenities || '',
    status: hotel?.status || 'active',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const isEditing = !!hotel;

  const allImages = [
    ...(formData.image ? [formData.image] : []),
    ...formData.gallery
  ];

  const locationOptions = [
    { value: 'Patong', label: 'Patong / pa tong' },
    { value: 'Karon', label: 'Karon / ka ron' },
    { value: 'Kata', label: 'Kata / ka ta' },
    { value: 'Phuket Town', label: 'Phuket Town' },
    { value: 'Kamala', label: 'Kamala / ka ma la' },
    { value: 'Surin', label: 'Surin' },
    { value: 'Bang Tao', label: 'Bang Tao' },
    { value: 'Mai Khao', label: 'Mai Khao' },
    { value: 'Rawai', label: 'Rawai' },
    { value: 'Nai Harn', label: 'Nai Harn' },
    { value: 'Cape Panwa', label: 'Cape Panwa' },
  ];

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File too large: ${file.name}`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;
    setUploading(true);

    try {
      const apiBase = window.location.hostname === 'localhost'
        ? 'https://www.phuketgevalin.com/api'
        : '/api';

      const uploadedUrls = [];
      for (const file of validFiles) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        uploadFormData.append('folder', 'hotels');

        const response = await fetch(`${apiBase}/upload`, {
          method: 'POST',
          credentials: 'include',
          body: uploadFormData,
        });

        const text = await response.text();
        const result = JSON.parse(text);
        if (result.success) {
          uploadedUrls.push(result.data.url);
        } else {
          alert('Upload failed: ' + result.message);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData(prev => {
          const currentImages = [
            ...(prev.image ? [prev.image] : []),
            ...prev.gallery
          ];
          const newImages = [...currentImages, ...uploadedUrls];
          return {
            ...prev,
            image: newImages[0] || '',
            gallery: newImages.slice(1)
          };
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const currentImages = [
        ...(prev.image ? [prev.image] : []),
        ...prev.gallery
      ];
      const newImages = currentImages.filter((_, i) => i !== index);
      return {
        ...prev,
        image: newImages[0] || '',
        gallery: newImages.slice(1)
      };
    });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setFormData(prev => {
      const currentImages = [
        ...(prev.image ? [prev.image] : []),
        ...prev.gallery
      ];
      const newImages = [...currentImages];
      const draggedItem = newImages[draggedIndex];
      newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      return {
        ...prev,
        image: newImages[0] || '',
        gallery: newImages.slice(1)
      };
    });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (hotel) {
        data = await hotelsAPI.update(hotel.id, formData);
      } else {
        data = await hotelsAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save hotel');
      }
    } catch (error) {
      console.error('Failed to save hotel:', error);
      alert('Failed to save hotel');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'content', label: 'Content' },
    ...(isEditing ? [
      { id: 'room-types', label: 'Room Types' },
      { id: 'periods', label: 'Date Periods' },
      { id: 'prices', label: 'Price Table' },
    ] : []),
  ];

  const isHotelDataTab = activeTab === 'basic' || activeTab === 'content';

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col max-h-[90vh]">
      <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
        <h4 className="text-lg font-semibold">{hotel ? 'Edit Hotel' : 'Add New Hotel'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="border-b bg-gray-50 flex-shrink-0">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {isHotelDataTab ? (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h5 className="font-medium text-gray-800 mb-1">Images</h5>
                  <p className="text-xs text-gray-500 mb-4">Upload multiple images. First image = Cover. Drag to reorder.</p>

                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      onChange={handleImagesUpload}
                      disabled={uploading}
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-sky-500 file:text-white file:cursor-pointer hover:file:bg-sky-600"
                    />
                    {uploading && (
                      <div className="flex items-center gap-2 text-sky-600">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm">Uploading...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {allImages.map((url, index) => (
                      <div
                        key={url}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`relative group cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                      >
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          className={`w-24 h-16 object-cover rounded-lg border-2 ${index === 0 ? 'border-sky-500' : 'border-gray-200'}`}
                        />
                        {index === 0 && (
                          <span className="absolute -top-2 -left-2 bg-sky-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {allImages.length === 0 && (
                      <p className="text-sm text-gray-400">No images yet</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h5 className="font-medium text-gray-800 mb-3">Pricing & Rating</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price/Night (THB) *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">&#3647;</span>
                        <input
                          type="number"
                          value={formData.price_per_night}
                          onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value ? Math.floor(Number(e.target.value)) : '' })}
                          onWheel={(e) => e.target.blur()}
                          className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stars (1-5) *</label>
                      <select
                        value={formData.stars}
                        onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                      >
                        {[1, 2, 3, 4, 5].map(s => (
                          <option key={s} value={s}>{s} Star{s > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        onWheel={(e) => e.target.blur()}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.reviews}
                        onChange={(e) => setFormData({ ...formData, reviews: e.target.value ? Math.floor(Number(e.target.value)) : 0 })}
                        onWheel={(e) => e.target.blur()}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h5 className="font-medium text-gray-800 mb-3">Location</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        required
                      >
                        <option value="">Select Location</option>
                        {locationOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        placeholder="Full address"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h5 className="font-medium text-gray-800 mb-3">Amenities</h5>
                  <input
                    type="text"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    placeholder="WiFi, Pool, Spa, Restaurant, Fitness, Parking, etc."
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm space-y-4">
                  <h5 className="font-medium text-gray-800 pb-2 border-b flex items-center gap-2">
                    <svg className="w-6 h-4 rounded shadow-sm flex-shrink-0" viewBox="0 0 28 20" fill="none">
                      <rect width="28" height="20" fill="#012169" />
                      <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="3.5" />
                      <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
                      <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="6" />
                      <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
                    </svg>
                    English
                  </h5>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                    <input
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="5"
                      placeholder="Hotel description in English"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm space-y-4">
                  <h5 className="font-medium text-gray-800 pb-2 border-b flex items-center gap-2">
                    <svg className="w-6 h-4 rounded shadow-sm flex-shrink-0" viewBox="0 0 28 20" fill="none">
                      <rect width="28" height="3.33" fill="#A51931" />
                      <rect y="3.33" width="28" height="3.33" fill="#fff" />
                      <rect y="6.66" width="28" height="6.67" fill="#2D2A4A" />
                      <rect y="13.33" width="28" height="3.33" fill="#fff" />
                      <rect y="16.66" width="28" height="3.34" fill="#A51931" />
                    </svg>
                    Thai
                  </h5>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                    <input
                      type="text"
                      value={formData.name_th}
                      onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description_th}
                      onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="5"
                      placeholder="Hotel description in Thai"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end p-4 border-t bg-gray-50 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
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
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'room-types' && <RoomTypesPanel hotelId={hotel.id} />}
            {activeTab === 'periods' && <PeriodsPanel hotelId={hotel.id} />}
            {activeTab === 'prices' && <PriceTablePanel hotelId={hotel.id} />}
          </div>
          <div className="flex gap-3 justify-end p-4 border-t bg-gray-50 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
