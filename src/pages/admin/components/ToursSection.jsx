import { useState, useEffect } from 'react';
import { adminAPI, toursAPI } from '../../../services/api';

export default function ToursSection() {
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
      const data = await toursAPI.delete(id);
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to delete tour:', error);
    }
  };

  const handleToggleStatus = async (tour) => {
    try {
      const newStatus = tour.status === 'active' ? 'inactive' : 'active';
      const data = await toursAPI.update(tour.id, { status: newStatus });
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
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
                      <button
                        onClick={() => handleToggleStatus(tour)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          tour.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tour.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingTour(tour); setShowForm(true); }}
                          className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour.id)}
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
      let data;
      if (tour) {
        data = await toursAPI.update(tour.id, formData);
      } else {
        data = await toursAPI.create(formData);
      }

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
