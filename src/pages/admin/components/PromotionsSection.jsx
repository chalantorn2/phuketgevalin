import { useState, useEffect } from 'react';
import { promotionsAPI } from '../../../services/api';

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const data = await promotionsAPI.getAll(true);
      if (data.success) {
        setPromotions(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return;

    try {
      const data = await promotionsAPI.delete(id);
      if (data.success) {
        fetchPromotions();
      }
    } catch (error) {
      console.error('Failed to delete promotion:', error);
    }
  };

  const handleToggleStatus = async (promo) => {
    try {
      const newStatus = promo.status === 'active' ? 'inactive' : 'active';
      const data = await promotionsAPI.update(promo.id, { status: newStatus });
      if (data.success) {
        fetchPromotions();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Homepage Promotions</h3>
          <p className="text-sm text-gray-500">Manage the highlight slider on homepage</p>
        </div>
        <button
          onClick={() => { setEditingPromotion(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Promotion
        </button>
      </div>

      {showForm && (
        <PromotionForm
          promotion={editingPromotion}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); fetchPromotions(); }}
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.length > 0 ? (
                promotions.map((promo) => (
                  <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">{promo.sort_order}</span>
                    </td>
                    <td className="py-4 px-6">
                      {promo.image && (
                        <img src={promo.image} alt={promo.title_en} className="w-20 h-12 object-cover rounded" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{promo.title_en}</div>
                        <div className="text-sm text-gray-500">{promo.title_th}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">฿{Number(promo.price).toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(promo)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          promo.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {promo.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingPromotion(promo); setShowForm(true); }}
                          className="text-sky-600 hover:text-sky-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
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
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    No promotions found. Click "Add Promotion" to create one.
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

// Promotion Form Component
function PromotionForm({ promotion, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title_th: promotion?.title_th || '',
    title_en: promotion?.title_en || '',
    subtitle_th: promotion?.subtitle_th || '',
    subtitle_en: promotion?.subtitle_en || '',
    description_th: promotion?.description_th || '',
    description_en: promotion?.description_en || '',
    location_th: promotion?.location_th || '',
    location_en: promotion?.location_en || '',
    price: promotion?.price || '',
    image: promotion?.image || '',
    link: promotion?.link || '',
    sort_order: promotion?.sort_order || 1,
    status: promotion?.status || 'active',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (promotion) {
        data = await promotionsAPI.update(promotion.id, formData);
      } else {
        data = await promotionsAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save promotion');
      }
    } catch (error) {
      console.error('Failed to save promotion:', error);
      alert('Failed to save promotion');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">{promotion ? 'Edit Promotion' : 'Add New Promotion'}</h4>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (English)</label>
            <input
              type="text"
              value={formData.subtitle_en}
              onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Special Offer, Best Seller"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Thai)</label>
            <input
              type="text"
              value={formData.subtitle_th}
              onChange={(e) => setFormData({ ...formData, subtitle_th: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="เช่น โปรโมชั่นพิเศษ, ขายดี"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="1"
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
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-40 h-24 object-cover rounded" />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Link to tour/service page"
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Thai)</label>
          <textarea
            value={formData.description_th}
            onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="2"
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
