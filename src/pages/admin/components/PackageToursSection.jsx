import { useState, useEffect } from 'react';
import { packageToursAPI } from '../../../services/api';

export default function PackageToursSection() {
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
      const data = await packageToursAPI.getAll(true);
      if (data.success) {
        setTours(data.data?.package_tours || []);
      }
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this package tour?')) return;

    try {
      const data = await packageToursAPI.delete(id);
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
      const data = await packageToursAPI.update(tour.id, { status: newStatus });
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
        <div>
          <h3 className="text-lg font-semibold">Package Tours</h3>
          <p className="text-sm text-gray-500">Manage multi-day tour packages</p>
        </div>
        <button
          onClick={() => { setEditingTour(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Package Tour
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="w-full max-w-5xl mx-4">
            <PackageTourForm
              tour={editingTour}
              onClose={() => setShowForm(false)}
              onSave={() => { setShowForm(false); fetchTours(); }}
            />
          </div>
        </div>
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
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Duration</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 ? (
                tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      {tour.image ? (
                        <img src={tour.image} alt={tour.name_en} className="w-20 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center leading-tight">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{tour.name_en}</div>
                        <div className="text-sm text-gray-500">{tour.name_th}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm">{tour.duration || '-'}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">฿{Math.floor(Number(tour.price)).toLocaleString()}</div>
                        {tour.discount_price && (
                          <div className="text-sm text-gray-400 line-through">฿{Math.floor(Number(tour.discount_price)).toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(tour)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    No package tours found. Click "Add Package Tour" to create one.
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

// Reusable Dynamic List Input Component
function DynamicListInput({ label, placeholder, color = 'blue', items = [], onAdd, onUpdate, onRemove }) {
  const colorClasses = {
    blue: { btn: 'bg-blue-500 hover:bg-blue-600', remove: 'text-blue-400 hover:text-red-500' },
    orange: { btn: 'bg-orange-500 hover:bg-orange-600', remove: 'text-orange-400 hover:text-red-500' },
  };
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={onAdd}
          className={`${colors.btn} text-white px-2 py-1 rounded text-xs flex items-center gap-1`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No items yet. Click "Add" to start.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdate(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className={`${colors.remove} p-1`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// SVG Flag Components
const ThaiFlag = () => (
  <svg className="w-5 h-3 rounded shadow-sm flex-shrink-0" viewBox="0 0 28 20" fill="none">
    <rect width="28" height="3.33" fill="#A51931" />
    <rect y="3.33" width="28" height="3.33" fill="#fff" />
    <rect y="6.66" width="28" height="6.67" fill="#2D2A4A" />
    <rect y="13.33" width="28" height="3.33" fill="#fff" />
    <rect y="16.66" width="28" height="3.34" fill="#A51931" />
  </svg>
);

const UKFlag = () => (
  <svg className="w-5 h-3 rounded shadow-sm flex-shrink-0" viewBox="0 0 28 20" fill="none">
    <rect width="28" height="20" fill="#012169" />
    <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="3.5" />
    <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
    <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="6" />
    <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
  </svg>
);

// Package Tour Form Component
function PackageTourForm({ tour, onClose, onSave }) {
  // Parse JSON arrays from DB
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
    name_th: tour?.name_th || '',
    name_en: tour?.name_en || '',
    description_th: tour?.description_th || '',
    description_en: tour?.description_en || '',
    location: tour?.location || '',
    duration: tour?.duration || '',
    price: tour?.price ? Math.floor(Number(tour.price)) : '',
    discount_price: tour?.discount_price ? Math.floor(Number(tour.discount_price)) : '',
    image: tour?.image || '',
    gallery: parseJsonArray(tour?.gallery),
    rating: tour?.rating || 4.5,
    reviews: tour?.reviews || 0,
    // Highlights - แยกภาษา
    highlights_th: parseJsonArray(tour?.highlights_th),
    highlights_en: parseJsonArray(tour?.highlights_en),
    // Itinerary - รองรับ 2 ภาษา
    itinerary: parseJsonArray(tour?.itinerary),
    // Included/Excluded - แยกภาษา
    included_th: parseJsonArray(tour?.included_th),
    included_en: parseJsonArray(tour?.included_en),
    excluded_th: parseJsonArray(tour?.excluded_th),
    excluded_en: parseJsonArray(tour?.excluded_en),
    // Meeting point & Important info
    meeting_point_th: tour?.meeting_point_th || '',
    meeting_point_en: tour?.meeting_point_en || '',
    important_info_th: tour?.important_info_th || '',
    important_info_en: tour?.important_info_en || '',
    category: tour?.category || 'domestic',
    status: tour?.status || 'active',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Combine main image + gallery into single array (first = cover)
  const allImages = [
    ...(formData.image ? [formData.image] : []),
    ...formData.gallery
  ];

  const categoryOptions = [
    { value: 'package', label: 'Package Tour' },
    { value: 'international', label: 'International' },
    { value: 'domestic', label: 'Domestic Thailand' },
  ];

  // Upload multiple images
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
      const apiBase = '/api';

      const uploadedUrls = [];
      for (const file of validFiles) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        uploadFormData.append('folder', 'package_tours');

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

  // Drag and drop handlers
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

  // Itinerary management - Package Tour style with bilingual support
  const addItineraryItem = () => {
    const nextDay = String(formData.itinerary.length + 1).padStart(2, '0');
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: nextDay,
        title_th: '',
        title_en: '',
        description_th: '',
        description_en: '',
        meals: { b: false, l: false, d: false, note: '' },
        accommodation: ''
      }]
    }));
  };

  const updateItineraryItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateItineraryMeal = (index, mealKey, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, meals: { ...item.meals, [mealKey]: value } } : item
      )
    }));
  };

  const removeItineraryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  // Dynamic list helpers for included/excluded
  const addListItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const updateListItem = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let data;
      if (tour) {
        data = await packageToursAPI.update(tour.id, formData);
      } else {
        data = await packageToursAPI.create(formData);
      }

      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save package tour');
      }
    } catch (error) {
      console.error('Failed to save package tour:', error);
      alert('Failed to save package tour');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', labelTh: 'ข้อมูลพื้นฐาน' },
    { id: 'content', label: 'Content', labelTh: 'เนื้อหา' },
    { id: 'itinerary', label: 'Itinerary', labelTh: 'ตารางเดินทาง' },
    { id: 'inclusions', label: 'Inclusions', labelTh: 'สิ่งที่รวม/ไม่รวม' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col max-h-[90vh]">
      {/* Fixed Header */}
      <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
        <h4 className="text-lg font-semibold">{tour ? 'Edit Package Tour' : 'Add New Package Tour'}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b bg-gray-50 flex-shrink-0">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.labelTh}</span>
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tab 1: Basic Info */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              {/* Images */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-1">Images / รูปภาพ</h5>
                <p className="text-xs text-gray-500 mb-4">Upload multiple images. First image = Cover. Drag to reorder.</p>

                {/* Upload Input */}
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

                {/* Images Grid */}
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

              {/* Pricing & Duration */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Pricing & Duration / ราคาและระยะเวลา</h5>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value ? Math.floor(Number(e.target.value)) : '' })}
                        onWheel={(e) => e.target.blur()}
                        className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={formData.discount_price}
                        onChange={(e) => setFormData({ ...formData, discount_price: e.target.value ? Math.floor(Number(e.target.value)) : '' })}
                        onWheel={(e) => e.target.blur()}
                        className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 bg-white"
                        placeholder="For discount"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="e.g. 5 วัน 3 คืน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      {categoryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Additional Info / ข้อมูลเพิ่มเติม</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="e.g. ภูเก็ต, เชียงใหม่"
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
                      onWheel={(e) => e.target.blur()}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Content */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              {/* Names */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Tour Name / ชื่อทัวร์</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                      <UKFlag /> Name (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Chiang Mai Doi Inthanon 3D2N Tour"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                      <ThaiFlag /> Name (Thai) *
                    </label>
                    <input
                      type="text"
                      value={formData.name_th}
                      onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="ทัวร์เชียงใหม่ ดอยอินทนนท์ 3 วัน 2 คืน"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Description / คำอธิบาย</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5"><UKFlag /> Description (English)</label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5"><ThaiFlag /> Description (Thai)</label>
                    <textarea
                      value={formData.description_th}
                      onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              {/* Highlights - Bilingual */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Highlights / ไฮไลท์</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><UKFlag /> Highlights (English)</span>}
                    placeholder="e.g. Conquer Doi Inthanon peak"
                    color="blue"
                    items={formData.highlights_en}
                    onAdd={() => addListItem('highlights_en')}
                    onUpdate={(index, value) => updateListItem('highlights_en', index, value)}
                    onRemove={(index) => removeListItem('highlights_en', index)}
                  />
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><ThaiFlag /> Highlights (Thai)</span>}
                    placeholder="เช่น พิชิตยอดดอยอินทนนท์"
                    color="blue"
                    items={formData.highlights_th}
                    onAdd={() => addListItem('highlights_th')}
                    onUpdate={(index, value) => updateListItem('highlights_th', index, value)}
                    onRemove={(index) => removeListItem('highlights_th', index)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Itinerary */}
          {activeTab === 'itinerary' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-gray-800">Itinerary / ตารางการเดินทาง</h5>
                <button
                  type="button"
                  onClick={addItineraryItem}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Day
                </button>
              </div>

              {formData.itinerary.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">No itinerary items yet</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Add Day" to start</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.itinerary.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative">
                      <button
                        type="button"
                        onClick={() => removeItineraryItem(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Day Header */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                        <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {item.day || String(index + 1).padStart(2, '0')}
                        </div>
                        <span className="text-sm font-medium text-gray-500">Day {item.day || index + 1}</span>
                      </div>

                      {/* Titles - Bilingual (English Left, Thai Right) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><UKFlag /> Title (English)</label>
                          <input
                            type="text"
                            value={item.title_en || ''}
                            onChange={(e) => updateItineraryItem(index, 'title_en', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            placeholder="Bangkok - Chiang Mai - Doi Suthep"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><ThaiFlag /> Title (Thai)</label>
                          <input
                            type="text"
                            value={item.title_th || ''}
                            onChange={(e) => updateItineraryItem(index, 'title_th', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            placeholder="กรุงเทพฯ - เชียงใหม่ - ดอยสุเทพ"
                          />
                        </div>
                      </div>

                      {/* Descriptions - Bilingual (English Left, Thai Right) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><UKFlag /> Description (English)</label>
                          <textarea
                            value={item.description_en || ''}
                            onChange={(e) => updateItineraryItem(index, 'description_en', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            rows="2"
                            placeholder="Activities description for this day..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><ThaiFlag /> Description (Thai)</label>
                          <textarea
                            value={item.description_th || ''}
                            onChange={(e) => updateItineraryItem(index, 'description_th', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            rows="2"
                            placeholder="รายละเอียดกิจกรรมในวันนี้..."
                          />
                        </div>
                      </div>

                      {/* Meals & Accommodation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Meals */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-2">Meals / มื้ออาหาร</label>
                          <div className="flex flex-wrap gap-2">
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${item.meals?.b ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                              <input
                                type="checkbox"
                                checked={item.meals?.b || false}
                                onChange={(e) => updateItineraryMeal(index, 'b', e.target.checked)}
                                className="sr-only"
                              />
                              B เช้า
                            </label>
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${item.meals?.l ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                              <input
                                type="checkbox"
                                checked={item.meals?.l || false}
                                onChange={(e) => updateItineraryMeal(index, 'l', e.target.checked)}
                                className="sr-only"
                              />
                              L กลางวัน
                            </label>
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${item.meals?.d ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                              <input
                                type="checkbox"
                                checked={item.meals?.d || false}
                                onChange={(e) => updateItineraryMeal(index, 'd', e.target.checked)}
                                className="sr-only"
                              />
                              D เย็น
                            </label>
                          </div>
                          <input
                            type="text"
                            value={item.meals?.note || ''}
                            onChange={(e) => updateItineraryMeal(index, 'note', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-2"
                            placeholder="Note: เช่น เย็น: บุฟเฟต์ขาปู"
                          />
                        </div>

                        {/* Accommodation */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-2">Accommodation / ที่พัก</label>
                          <input
                            type="text"
                            value={item.accommodation || ''}
                            onChange={(e) => updateItineraryItem(index, 'accommodation', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            placeholder="e.g. Narita Excel Hotel Tokyu หรือเทียบเท่า"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Inclusions */}
          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              {/* Included - Bilingual (English Left, Thai Right) */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> What's Included / อัตราค่าบริการรวม
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><UKFlag /> Included (English)</span>}
                    placeholder="e.g. VIP air-conditioned van"
                    color="blue"
                    items={formData.included_en}
                    onAdd={() => addListItem('included_en')}
                    onUpdate={(index, value) => updateListItem('included_en', index, value)}
                    onRemove={(index) => removeListItem('included_en', index)}
                  />
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><ThaiFlag /> Included (Thai)</span>}
                    placeholder="เช่น รถตู้ปรับอากาศ VIP"
                    color="blue"
                    items={formData.included_th}
                    onAdd={() => addListItem('included_th')}
                    onUpdate={(index, value) => updateListItem('included_th', index, value)}
                    onRemove={(index) => removeListItem('included_th', index)}
                  />
                </div>
              </div>

              {/* Excluded - Bilingual (English Left, Thai Right) */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-red-500">✗</span> What's Not Included / อัตราค่าบริการไม่รวม
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><UKFlag /> Excluded (English)</span>}
                    placeholder="e.g. Personal expenses"
                    color="orange"
                    items={formData.excluded_en}
                    onAdd={() => addListItem('excluded_en')}
                    onUpdate={(index, value) => updateListItem('excluded_en', index, value)}
                    onRemove={(index) => removeListItem('excluded_en', index)}
                  />
                  <DynamicListInput
                    label={<span className="flex items-center gap-1.5"><ThaiFlag /> Excluded (Thai)</span>}
                    placeholder="เช่น ค่าใช้จ่ายส่วนตัว"
                    color="orange"
                    items={formData.excluded_th}
                    onAdd={() => addListItem('excluded_th')}
                    onUpdate={(index, value) => updateListItem('excluded_th', index, value)}
                    onRemove={(index) => removeListItem('excluded_th', index)}
                  />
                </div>
              </div>

              {/* Meeting Point & Important Info (English Left, Thai Right) */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3">Additional Info / ข้อมูลเพิ่มเติม</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><UKFlag /> Meeting Point</label>
                    <input
                      type="text"
                      value={formData.meeting_point_en}
                      onChange={(e) => setFormData({ ...formData, meeting_point_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g. PTT Gas Station Vibhavadi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><ThaiFlag /> จุดนัดพบ</label>
                    <input
                      type="text"
                      value={formData.meeting_point_th}
                      onChange={(e) => setFormData({ ...formData, meeting_point_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="เช่น ปั๊ม ปตท. วิภาวดี"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><UKFlag /> Important Info</label>
                    <textarea
                      value={formData.important_info_en}
                      onChange={(e) => setFormData({ ...formData, important_info_en: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      rows="3"
                      placeholder="e.g. Please bring warm clothing..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><ThaiFlag /> ข้อมูลสำคัญ</label>
                    <textarea
                      value={formData.important_info_th}
                      onChange={(e) => setFormData({ ...formData, important_info_th: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      rows="3"
                      placeholder="เช่น กรุณาเตรียมเสื้อกันหนาว..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
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
    </div>
  );
}
