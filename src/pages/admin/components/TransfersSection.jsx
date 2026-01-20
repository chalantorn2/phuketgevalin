import { useState, useEffect } from 'react';
import { adminAPI, transfersAPI } from '../../../services/api';

export default function TransfersSection() {
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
    if (!confirm('Are you sure you want to delete this transfer?')) return;

    try {
      const data = await transfersAPI.delete(id);
      if (data.success) {
        fetchTransfers();
      }
    } catch (error) {
      console.error('Failed to delete transfer:', error);
    }
  };

  const handleToggleStatus = async (transfer) => {
    try {
      const newStatus = transfer.status === 'active' ? 'inactive' : 'active';
      const data = await transfersAPI.update(transfer.id, { status: newStatus });
      if (data.success) {
        fetchTransfers();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      airport: 'Airport Transfer',
      private: 'Private Car',
      hourly: 'Hourly Rental'
    };
    return labels[type] || type;
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      airport: 'bg-blue-100 text-blue-700',
      private: 'bg-purple-100 text-purple-700',
      hourly: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Transfers</h3>
        <button
          onClick={() => { setEditingTransfer(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Transfer
        </button>
      </div>

      {showForm && (
        <TransferForm
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Vehicle</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
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
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(transfer.type)}`}>
                        {getTypeLabel(transfer.type)}
                      </span>
                    </td>
                    <td className="py-4 px-6">{transfer.vehicle_type}</td>
                    <td className="py-4 px-6">฿{Number(transfer.price).toLocaleString()}</td>
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
                        <button
                          onClick={() => { setEditingTransfer(transfer); setShowForm(true); }}
                          className="text-sky-600 hover:text-sky-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transfer.id)}
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
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    No transfers found. Click "Add Transfer" to create one.
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

// Transfer Form Component
function TransferForm({ transfer, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_th: transfer?.name_th || '',
    name_en: transfer?.name_en || '',
    description_th: transfer?.description_th || '',
    description_en: transfer?.description_en || '',
    type: transfer?.type || 'airport',
    price: transfer?.price || '',
    vehicle_type: transfer?.vehicle_type || '',
    max_passengers: transfer?.max_passengers || '4',
    image: transfer?.image || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (transfer) {
        data = await transfersAPI.update(transfer.id, formData);
      } else {
        data = await transfersAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save transfer');
      }
    } catch (error) {
      console.error('Failed to save transfer:', error);
      alert('Failed to save transfer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{transfer ? 'Edit Transfer' : 'Add New Transfer'}</h4>
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
              placeholder="e.g. Airport - Patong (Sedan)"
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
              placeholder="e.g. สนามบิน - ป่าตอง (ซีดาน)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="airport">Airport Transfer</option>
              <option value="private">Private Car</option>
              <option value="hourly">Hourly Rental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
            <select
              value={formData.vehicle_type}
              onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Vehicle</option>
              <option value="Sedan">Sedan (3 pax)</option>
              <option value="SUV">SUV (5 pax)</option>
              <option value="Van">Van (10 pax)</option>
              <option value="Minibus">Minibus (15 pax)</option>
              <option value="Bus">Bus (30+ pax)</option>
            </select>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Passengers *</label>
            <input
              type="number"
              min="1"
              value={formData.max_passengers}
              onChange={(e) => setFormData({ ...formData, max_passengers: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
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
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
          <textarea
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="2"
            placeholder="Service details, what's included, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Thai)</label>
          <textarea
            value={formData.description_th}
            onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="2"
            placeholder="รายละเอียดบริการ, สิ่งที่รวม, ฯลฯ"
          />
        </div>
        {formData.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
            <img src={formData.image} alt="Preview" className="w-40 h-24 object-cover rounded" />
          </div>
        )}
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
