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
                      {promo.image ? (
                        <img src={promo.image} alt={promo.title_en} className="w-20 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center leading-tight">รอรูปภาพ<br/>Awaiting Image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{promo.title_en}</div>
                        <div className="text-sm text-gray-500">{promo.title_th}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">฿{Math.floor(Number(promo.price)).toLocaleString()}</td>
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
    subtitle_th: promotion?.subtitle_th || (promotion ? '' : 'โปรโมชั่นพิเศษ'),
    subtitle_en: promotion?.subtitle_en || (promotion ? '' : 'Special Offer'),
    description_th: promotion?.description_th || '',
    description_en: promotion?.description_en || '',
    location_th: promotion?.location_th || '',
    location_en: promotion?.location_en || '',
    price: promotion?.price ? Math.floor(Number(promotion.price)) : '',
    image: promotion?.image || '',
    link: promotion?.link || '',
    sort_order: promotion?.sort_order || 1,
    status: promotion?.status || 'active',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(promotion?.image || '');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Allowed: JPG, PNG, WebP, GIF');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit');
      return;
    }

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      formDataUpload.append('folder', 'promotions');

      const apiBase = window.location.hostname === 'localhost'
        ? 'https://www.phuketgevalin.com/api'
        : '/api';

      const response = await fetch(`${apiBase}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formDataUpload,
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Server response:', text);
        alert('Server error: Invalid response');
        return;
      }

      if (result.success) {
        setFormData({ ...formData, image: result.data.url });
        setImagePreview(result.data.url);
      } else {
        alert(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
    setImagePreview('');
  };

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image & General Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-4">Image & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (1920x800 px)</label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5MB. Formats: JPG, PNG, WebP, GIF</p>
                </div>
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
              <div className="mt-3 flex items-end gap-6">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="w-48 h-28 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-48 h-28 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-sm text-center">รอรูปภาพ<br/>Awaiting Image</span>
                </div>
              )}
              <div className="flex-1 max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-1">ราคา / Price (THB) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">฿</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value ? Math.floor(Number(e.target.value)) : '' })}
                    onWheel={(e) => e.target.blur()}
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-lg font-semibold"
                    step="1"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Language Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* English Section */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h5 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-4 rounded shadow-sm" viewBox="0 0 28 20" fill="none">
                <rect width="28" height="20" fill="#012169" />
                <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="3.5" />
                <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
                <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="6" />
                <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
              </svg>
              English
            </h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle_en}
                  onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g. Special Offer, Best Seller"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location_en}
                  onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g. Phuket, Thailand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Thai Section */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h5 className="font-medium text-orange-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-4 rounded shadow-sm" viewBox="0 0 28 20" fill="none">
                <rect width="28" height="3.33" fill="#A51931" />
                <rect y="3.33" width="28" height="3.33" fill="#fff" />
                <rect y="6.66" width="28" height="6.67" fill="#2D2A4A" />
                <rect y="13.33" width="28" height="3.33" fill="#fff" />
                <rect y="16.66" width="28" height="3.34" fill="#A51931" />
              </svg>
              ภาษาไทย
            </h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ *</label>
                <input
                  type="text"
                  value={formData.title_th}
                  onChange={(e) => setFormData({ ...formData, title_th: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">คำบรรยายย่อย</label>
                <input
                  type="text"
                  value={formData.subtitle_th}
                  onChange={(e) => setFormData({ ...formData, subtitle_th: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="เช่น โปรโมชั่นพิเศษ, ขายดี"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่</label>
                <input
                  type="text"
                  value={formData.location_th}
                  onChange={(e) => setFormData({ ...formData, location_th: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="เช่น ภูเก็ต, ประเทศไทย"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                <textarea
                  value={formData.description_th}
                  onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>
            </div>
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
