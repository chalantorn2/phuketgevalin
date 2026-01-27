import { useState, useEffect } from 'react';
import { adminAPI, transfersAPI, transferLocationsAPI, transferRoutesAPI } from '../../../services/api';

export default function TransfersSection() {
  const [activeTab, setActiveTab] = useState('vehicles');

  const tabs = [
    { id: 'vehicles', name: 'Vehicles', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'locations', name: 'Locations', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { id: 'routes', name: 'Routes & Pricing', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'vehicles' && <VehiclesTab />}
      {activeTab === 'locations' && <LocationsTab />}
      {activeTab === 'routes' && <RoutesTab />}
    </div>
  );
}

// ============================================
// Vehicles Tab (ข้อมูลรถ)
// ============================================
function VehiclesTab() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);

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

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const data = await transfersAPI.delete(id);
      if (data.success) fetchTransfers();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleToggleStatus = async (transfer) => {
    try {
      const newStatus = transfer.status === 'active' ? 'inactive' : 'active';
      const data = await transfersAPI.update(transfer.id, { status: newStatus });
      if (data.success) fetchTransfers();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Manage Vehicles</h3>
          <p className="text-sm text-gray-500">ข้อมูลรถให้บริการ (แสดงในหน้าเว็บ)</p>
        </div>
        <button
          onClick={() => { setEditingTransfer(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Vehicle
        </button>
      </div>

      {showForm && (
        <VehicleForm
          transfer={editingTransfer}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchTransfers(); }}
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Image</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Vehicle</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Max Pax</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length > 0 ? (
                transfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      {transfer.image && (
                        <img src={transfer.image} alt={transfer.name_en} className="w-16 h-12 object-cover rounded" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{transfer.name_en}</div>
                      <div className="text-sm text-gray-500">{transfer.name_th}</div>
                    </td>
                    <td className="py-4 px-6">{transfer.vehicle_type}</td>
                    <td className="py-4 px-6">{transfer.max_passengers}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(transfer)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          transfer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {transfer.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingTransfer(transfer); setShowForm(true); }} className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(transfer.id)} className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">No vehicles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Vehicle Form
function VehicleForm({ transfer, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_th: transfer?.name_th || '',
    name_en: transfer?.name_en || '',
    description_th: transfer?.description_th || '',
    description_en: transfer?.description_en || '',
    vehicle_type: transfer?.vehicle_type || '',
    max_passengers: transfer?.max_passengers || '4',
    image: transfer?.image || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = transfer
        ? await transfersAPI.update(transfer.id, formData)
        : await transfersAPI.create(formData);
      if (data.success) onSave();
      else alert(data.message || 'Failed to save');
    } catch (error) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{transfer ? 'Edit Vehicle' : 'Add New Vehicle'}</h4>
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
            <input type="text" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Thai) *</label>
            <input type="text" value={formData.name_th} onChange={(e) => setFormData({ ...formData, name_th: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
            <select value={formData.vehicle_type} onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
              <option value="">Select Vehicle</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Minibus">Minibus</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Passengers *</label>
            <input type="number" min="1" value={formData.max_passengers} onChange={(e) => setFormData({ ...formData, max_passengers: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="https://..." />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
          <textarea value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" rows="2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Thai)</label>
          <textarea value={formData.description_th} onChange={(e) => setFormData({ ...formData, description_th: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" rows="2" />
        </div>
        {formData.image && <img src={formData.image} alt="Preview" className="w-40 h-24 object-cover rounded" />}
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

// ============================================
// Locations Tab (สถานที่รับ-ส่ง)
// ============================================
function LocationsTab() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  useEffect(() => { fetchLocations(); }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await transferLocationsAPI.getAll(true);
      if (data.success) setLocations(data.data || []);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this location?')) return;
    try {
      const data = await transferLocationsAPI.delete(id);
      if (data.success) fetchLocations();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleToggleStatus = async (location) => {
    try {
      const newStatus = location.status === 'active' ? 'inactive' : 'active';
      const data = await transferLocationsAPI.update(location.id, { status: newStatus });
      if (data.success) fetchLocations();
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
          <p className="text-sm text-gray-500">สถานที่รับ-ส่ง (ต้นทาง/ปลายทาง)</p>
        </div>
        <button onClick={() => { setEditingLocation(null); setShowForm(true); }} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Location
        </button>
      </div>

      {showForm && (
        <LocationForm location={editingLocation} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchLocations(); }} />
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
              {locations.length > 0 ? locations.map((location) => {
                const badge = getTypeBadge(location.type);
                return (
                  <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-500">{location.sort_order}</td>
                    <td className="py-4 px-6 font-medium">{location.name_en}</td>
                    <td className="py-4 px-6 text-gray-600">{location.name_th}</td>
                    <td className="py-4 px-6"><span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>{badge.label}</span></td>
                    <td className="py-4 px-6 text-gray-600">{location.province || '-'}</td>
                    <td className="py-4 px-6">
                      <button onClick={() => handleToggleStatus(location)} className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${location.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{location.status}</button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingLocation(location); setShowForm(true); }} className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(location.id)} className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="7" className="py-12 text-center text-gray-500">No locations found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Location Form
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
      const data = location
        ? await transferLocationsAPI.update(location.id, formData)
        : await transferLocationsAPI.create(formData);
      if (data.success) onSave();
      else alert(data.message || 'Failed to save');
    } catch (error) {
      alert('Failed to save');
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
            <input type="text" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Thai) *</label>
            <input type="text" value={formData.name_th} onChange={(e) => setFormData({ ...formData, name_th: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="airport">Airport</option>
              <option value="city">City</option>
              <option value="beach">Beach</option>
              <option value="hotel_zone">Hotel Zone</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <input type="text" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2" min="0" />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

// ============================================
// Routes Tab (ราคาเส้นทาง)
// ============================================
function RoutesTab() {
  const [routes, setRoutes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [routesData, locationsData] = await Promise.all([
        transferRoutesAPI.getAll(true),
        transferLocationsAPI.getAll(true)
      ]);
      if (routesData.success) setRoutes(routesData.data || []);
      if (locationsData.success) setLocations(locationsData.data || []);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this route?')) return;
    try {
      const data = await transferRoutesAPI.delete(id);
      if (data.success) fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleToggleStatus = async (route) => {
    try {
      const newStatus = route.status === 'active' ? 'inactive' : 'active';
      const data = await transferRoutesAPI.update(route.id, { status: newStatus });
      if (data.success) fetchData();
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
        <button onClick={() => { setEditingRoute(null); setShowForm(true); }} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Route
        </button>
      </div>

      {showForm && (
        <RouteForm route={editingRoute} locations={locations} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchData(); }} />
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
              {routes.length > 0 ? routes.map((route) => (
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
                  <td className="py-4 px-6 font-semibold text-green-600">฿{Number(route.price).toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{route.duration_minutes ? `${route.duration_minutes} min` : '-'}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleToggleStatus(route)} className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${route.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{route.status}</button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingRoute(route); setShowForm(true); }} className="px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(route.id)} className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="py-12 text-center text-gray-500">No routes found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Route Form
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
      const data = route
        ? await transferRoutesAPI.update(route.id, formData)
        : await transferRoutesAPI.create(formData);
      if (data.success) onSave();
      else alert(data.message || 'Failed to save');
    } catch (error) {
      alert('Failed to save');
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
            <select value={formData.from_location_id} onChange={(e) => setFormData({ ...formData, from_location_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
              <option value="">Select location</option>
              {activeLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name_en} ({loc.name_th})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Location *</label>
            <select value={formData.to_location_id} onChange={(e) => setFormData({ ...formData, to_location_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
              <option value="">Select location</option>
              {activeLocations.map((loc) => (
                <option key={loc.id} value={loc.id} disabled={loc.id == formData.from_location_id}>{loc.name_en} ({loc.name_th})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB) *</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input type="number" value={formData.duration_minutes} onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
