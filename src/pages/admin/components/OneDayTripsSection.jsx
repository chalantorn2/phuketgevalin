import { useState, useEffect } from 'react';
import { onedayTripsAPI } from '../../../services/api';

export default function OneDayTripsSection() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const data = await onedayTripsAPI.getAll(true);
      if (data.success) {
        setTrips(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      const data = await onedayTripsAPI.delete(id);
      if (data.success) {
        fetchTrips();
      }
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const handleToggleStatus = async (trip) => {
    try {
      const newStatus = trip.status === 'active' ? 'inactive' : 'active';
      const data = await onedayTripsAPI.update(trip.id, { status: newStatus });
      if (data.success) {
        fetchTrips();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">One Day Trips</h3>
          <p className="text-sm text-gray-500">Manage day tour packages</p>
        </div>
        <button
          onClick={() => { setEditingTrip(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Trip
        </button>
      </div>

      {showForm && (
        <OneDayTripForm
          trip={editingTrip}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchTrips(); }}
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Order</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Image</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Title</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Province</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? (
                trips.map((trip) => (
                  <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">{trip.sort_order}</span>
                    </td>
                    <td className="py-4 px-6">
                      {trip.image && (
                        <img src={trip.image} alt={trip.title_en} className="w-20 h-12 object-cover rounded" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{trip.title_en}</div>
                        <div className="text-sm text-gray-500">{trip.title_th}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 capitalize">{trip.province_key}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">฿{Number(trip.price).toLocaleString()}</div>
                        {trip.discount_price && (
                          <div className="text-sm text-gray-400 line-through">฿{Number(trip.discount_price).toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(trip)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          trip.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {trip.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingTrip(trip); setShowForm(true); }}
                          className="text-sky-600 hover:text-sky-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(trip.id)}
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
                    No trips found. Click "Add Trip" to create one.
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

// One Day Trip Form Component
function OneDayTripForm({ trip, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title_th: trip?.title_th || '',
    title_en: trip?.title_en || '',
    description_th: trip?.description_th || '',
    description_en: trip?.description_en || '',
    location_th: trip?.location_th || '',
    location_en: trip?.location_en || '',
    province_key: trip?.province_key || 'phuket',
    duration_th: trip?.duration_th || '',
    duration_en: trip?.duration_en || '',
    price: trip?.price || '',
    discount_price: trip?.discount_price || '',
    image: trip?.image || '',
    rating: trip?.rating || 4.5,
    reviews: trip?.reviews || 0,
    bestseller: trip?.bestseller || 0,
    sort_order: trip?.sort_order || 1,
    status: trip?.status || 'active',
  });
  const [saving, setSaving] = useState(false);

  const provinceOptions = [
    { value: 'phuket', label: 'Phuket' },
    { value: 'krabi', label: 'Krabi' },
    { value: 'phangnga', label: 'Phang Nga' },
    { value: 'suratthani', label: 'Surat Thani' },
    { value: 'ayutthaya', label: 'Ayutthaya' },
    { value: 'bangkok', label: 'Bangkok' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (trip) {
        data = await onedayTripsAPI.update(trip.id, formData);
      } else {
        data = await onedayTripsAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save trip');
      }
    } catch (error) {
      console.error('Failed to save trip:', error);
      alert('Failed to save trip');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{trip ? 'Edit Trip' : 'Add New Trip'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (English) *</label>
            <input
              type="text"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Thai) *</label>
            <input
              type="text"
              value={formData.title_th}
              onChange={(e) => setFormData({ ...formData, title_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
            <select
              value={formData.province_key}
              onChange={(e) => setFormData({ ...formData, province_key: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {provinceOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (English)</label>
            <input
              type="text"
              value={formData.location_en}
              onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Phuket, Thailand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (Thai)</label>
            <input
              type="text"
              value={formData.location_th}
              onChange={(e) => setFormData({ ...formData, location_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="เช่น ภูเก็ต, ประเทศไทย"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (English)</label>
            <input
              type="text"
              value={formData.duration_en}
              onChange={(e) => setFormData({ ...formData, duration_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Full Day (8 hours)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Thai)</label>
            <input
              type="text"
              value={formData.duration_th}
              onChange={(e) => setFormData({ ...formData, duration_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="เช่น ทั้งวัน (8 ชั่วโมง)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (Before Discount)</label>
            <input
              type="number"
              value={formData.discount_price}
              onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Leave empty if no discount"
            />
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
            <input
              type="number"
              value={formData.reviews}
              onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bestseller</label>
            <select
              value={formData.bestseller}
              onChange={(e) => setFormData({ ...formData, bestseller: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="https://..."
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-40 h-24 object-cover rounded" />
            )}
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
