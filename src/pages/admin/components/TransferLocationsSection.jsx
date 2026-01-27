import { useState, useEffect } from 'react';
import { transferLocationsAPI } from '../../../services/api';

export default function TransferLocationsSection() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await transferLocationsAPI.getAll(true);
      if (data.success) {
        setLocations(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    try {
      const data = await transferLocationsAPI.delete(id);
      if (data.success) {
        fetchLocations();
      }
    } catch (error) {
      console.error('Failed to delete location:', error);
    }
  };

  const handleToggleStatus = async (location) => {
    try {
      const newStatus = location.status === 'active' ? 'inactive' : 'active';
      const data = await transferLocationsAPI.update(location.id, { status: newStatus });
      if (data.success) {
        fetchLocations();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      airport: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Airport' },
      city: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'City' },
      beach: { bg: 'bg-cyan-100', text: 'text-cyan-700', label: 'Beach' },
      hotel_zone: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Hotel Zone' },
      other: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Other' },
    };
    return badges[type] || badges.other;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Manage Locations</h3>
          <p className="text-sm text-gray-500">สถานที่รับ-ส่ง สำหรับ Private Transfer</p>
        </div>
        <button
          onClick={() => { setEditingLocation(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Location
        </button>
      </div>

      {showForm && (
        <LocationForm
          location={editingLocation}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchLocations(); }}
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name (EN)</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name (TH)</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Province</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map((location) => {
                  const badge = getTypeBadge(location.type);
                  return (
                    <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-500">{location.sort_order}</td>
                      <td className="py-4 px-6 font-medium">{location.name_en}</td>
                      <td className="py-4 px-6 text-gray-600">{location.name_th}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{location.province || '-'}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(location)}
                          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            location.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {location.status}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingLocation(location); setShowForm(true); }}
                            className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(location.id)}
                            className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    No locations found. Click "Add Location" to create one.
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

// Location Form Component
function LocationForm({ location, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_th: location?.name_th || '',
    name_en: location?.name_en || '',
    type: location?.type || 'other',
    province: location?.province || '',
    sort_order: location?.sort_order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (location) {
        data = await transferLocationsAPI.update(location.id, formData);
      } else {
        data = await transferLocationsAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save location');
      }
    } catch (error) {
      console.error('Failed to save location:', error);
      alert('Failed to save location');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{location ? 'Edit Location' : 'Add New Location'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (English) *</label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Phuket Airport (HKT)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Thai) *</label>
            <input
              type="text"
              value={formData.name_th}
              onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. สนามบินภูเก็ต (HKT)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="airport">Airport</option>
              <option value="city">City</option>
              <option value="beach">Beach</option>
              <option value="hotel_zone">Hotel Zone</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <input
              type="text"
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Phuket, Krabi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="0"
            />
          </div>
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
