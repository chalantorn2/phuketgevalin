import { useState, useEffect } from 'react';
import { transferRoutesAPI, transferLocationsAPI } from '../../../services/api';

export default function TransferRoutesSection() {
  const [routes, setRoutes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [routesData, locationsData] = await Promise.all([
        transferRoutesAPI.getAll(true),
        transferLocationsAPI.getAll(true)
      ]);
      if (routesData.success) {
        setRoutes(routesData.data || []);
      }
      if (locationsData.success) {
        setLocations(locationsData.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this route?')) return;

    try {
      const data = await transferRoutesAPI.delete(id);
      if (data.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete route:', error);
    }
  };

  const handleToggleStatus = async (route) => {
    try {
      const newStatus = route.status === 'active' ? 'inactive' : 'active';
      const data = await transferRoutesAPI.update(route.id, { status: newStatus });
      if (data.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Manage Routes & Pricing</h3>
          <p className="text-sm text-gray-500">ราคาเส้นทาง (ต้นทาง - ปลายทาง)</p>
        </div>
        <button
          onClick={() => { setEditingRoute(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Route
        </button>
      </div>

      {showForm && (
        <RouteForm
          route={editingRoute}
          locations={locations}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchData(); }}
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">From</th>
                <th className="text-center py-4 px-6 text-gray-600 font-medium"></th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">To</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Duration</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((route) => (
                  <tr key={route.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-sm">{route.from_name_en}</div>
                      <div className="text-xs text-gray-500">{route.from_name_th}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-sm">{route.to_name_en}</div>
                      <div className="text-xs text-gray-500">{route.to_name_th}</div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      ฿{Number(route.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {route.duration_minutes ? `${route.duration_minutes} min` : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(route)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          route.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {route.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingRoute(route); setShowForm(true); }}
                          className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(route.id)}
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
                    No routes found. Click "Add Route" to create one.
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

// Route Form Component
function RouteForm({ route, locations, onClose, onSave }) {
  const [formData, setFormData] = useState({
    from_location_id: route?.from_location_id || '',
    to_location_id: route?.to_location_id || '',
    price: route?.price || '',
    duration_minutes: route?.duration_minutes || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (route) {
        data = await transferRoutesAPI.update(route.id, formData);
      } else {
        data = await transferRoutesAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save route');
      }
    } catch (error) {
      console.error('Failed to save route:', error);
      alert('Failed to save route');
    } finally {
      setSaving(false);
    }
  };

  const activeLocations = locations.filter(l => l.status === 'active');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{route ? 'Edit Route' : 'Add New Route'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Location *</label>
            <select
              value={formData.from_location_id}
              onChange={(e) => setFormData({ ...formData, from_location_id: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Select location</option>
              {activeLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name_en} ({loc.name_th})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Location *</label>
            <select
              value={formData.to_location_id}
              onChange={(e) => setFormData({ ...formData, to_location_id: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Select location</option>
              {activeLocations.map((loc) => (
                <option key={loc.id} value={loc.id} disabled={loc.id == formData.from_location_id}>
                  {loc.name_en} ({loc.name_th})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. 900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. 45"
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
