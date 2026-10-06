import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Upload, Plus, Trash2, ArrowLeft, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Edit({ tour, destinations = [], tripTypes = [], durations = [] }) {
    // Determine existing itinerary array parsing
    let existingItin = [];
    if (tour.itinerary) {
        try {
            existingItin = typeof tour.itinerary === 'string' ? JSON.parse(tour.itinerary) : tour.itinerary;
        } catch (e) { }
    }

    // Parsing old gallery
    let rawDbGallery = [];
    try {
        if (tour.gallery) rawDbGallery = typeof tour.gallery === 'string' ? JSON.parse(tour.gallery) : tour.gallery;
    } catch (e) { }

    const { data, setData, post, processing } = useForm({
        destination_id: tour.destination_id || '',
        title: tour.title || '',
        slug: tour.slug || '',
        description: tour.description || '',
        duration: tour.duration || '',
        price: tour.price || '',
        trip_type: tour.trip_type || 'Private',
        pickup_point: tour.pickup_point || '',
        itinerary: existingItin || [{ title: '', description: '' }],
        terms: tour.terms || '',
        image: null,
        gallery_files: [],
        retained_gallery: rawDbGallery || []
    });

    const fileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileSelect = (e) => {
        const newFiles = Array.from(e.target.files);
        if (!newFiles.length) return;

        const combinedFiles = [...(data.gallery_files || []), ...newFiles];
        setData('gallery_files', combinedFiles);

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
        e.target.value = null;
    };

    const removeFile = (indexToRemove) => {
        const filteredFiles = (data.gallery_files || []).filter((_, idx) => idx !== indexToRemove);
        setData('gallery_files', filteredFiles);

        const filteredPreviews = previewImages.filter((_, idx) => idx !== indexToRemove);
        setPreviewImages(filteredPreviews);
    };

    const removeRetained = (indexToRemove) => {
        const filtered = (data.retained_gallery || []).filter((_, idx) => idx !== indexToRemove);
        setData('retained_gallery', filtered);
    };

    const generateSlug = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    const handleTitleChange = (e) => setData(prevData => ({ ...prevData, title: e.target.value, slug: generateSlug(e.target.value) }));

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/tours/${tour.id}`);
    };

    // Dynamic Itinerary Helpers
    const addItineraryDay = () => setData('itinerary', [...data.itinerary, { title: '', description: '' }]);
    const removeItineraryDay = (index) => setData('itinerary', data.itinerary.filter((_, i) => i !== index));
    const updateItineraryDay = (index, field, value) => {
        const newItin = [...data.itinerary];
        newItin[index][field] = value;
        setData('itinerary', newItin);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Tour Package</h2>}>
            <Head title={`Edit Tour: ${tour.title}`} />
            <div className="py-8 md:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">

                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <Link href="/dashboard" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
                            <h3 className="text-2xl font-bold text-gray-900">Edit Tour: {tour.title}</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Current Cover Image Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Change Cover Image (Leaves existing if blank)</label>
                                {tour.image && <img src={tour.image} className="h-20 w-32 object-cover rounded mb-2 border border-gray-300" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-white"
                                />
                            </div>

                            {/* Modern Gallery Field */}
                            <div className="mb-6 border-b border-gray-100 pb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slider / Gallery Images</label>
                                <p className="text-xs text-gray-500 mb-4">Manage your gallery images. You can delete individual files or append new ones.</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {data.retained_gallery && data.retained_gallery.map((src, idx) => (
                                        <div key={`exist-${idx}`} className="relative group rounded-xl overflow-hidden aspect-[4/3] border border-gray-200">
                                            <img src={src} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeRetained(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 z-20">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {previewImages.map((src, idx) => (
                                        <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] border border-brand-200">
                                            <img src={src} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeFile(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 z-20">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl aspect-[4/3] text-gray-500 hover:text-brand-600 hover:border-brand-400 hover:bg-brand-50 transition-colors bg-gray-50 cursor-pointer">
                                        <Plus className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-bold">Add Image</span>
                                    </button>
                                </div>
                                <input type="file" multiple ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination Focus</label>
                                    <select value={data.destination_id} onChange={e => setData('destination_id', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500 bg-white">
                                        <option value="">Select Database Destination</option>
                                        {destinations.map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour Title</label>
                                    <input type="text" value={data.title} onChange={handleTitleChange} required className="w-full rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                                    <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description Overview</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="3"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <select value={data.duration} onChange={e => setData('duration', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500 bg-white">
                                        <option value={data.duration}>{data.duration}</option>
                                        {durations.map(d => (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                                    <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                                    <select value={data.trip_type} onChange={e => setData('trip_type', e.target.value)} className="w-full rounded-xl border-gray-300 focus:border-brand-500 bg-white">
                                        <option value={data.trip_type}>{data.trip_type}</option>
                                        {tripTypes.map(t => (
                                            <option key={t.id} value={t.name}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
                                <input type="text" value={data.pickup_point} onChange={e => setData('pickup_point', e.target.value)} className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                            </div>

                            {/* Dynamic Itinerary Builder */}
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-gray-800 text-lg">Itinerary Designer</h4>
                                    <button type="button" onClick={addItineraryDay} className="text-sm font-bold text-brand-600 bg-brand-100 px-4 py-2 rounded-lg flex items-center hover:bg-brand-200"><Plus className="w-4 h-4 mr-1" /> Add Day</button>
                                </div>
                                <div className="space-y-4">
                                    {data.itinerary.map((day, idx) => (
                                        <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                                            <div className="flex-1 space-y-3">
                                                <input type="text" placeholder={`Day ${idx + 1} Title (e.g. Journey to Ijen)`} value={day.title} onChange={e => updateItineraryDay(idx, 'title', e.target.value)} className="w-full font-bold rounded-lg border-gray-300 focus:border-brand-500" />
                                                <textarea placeholder="Description of activities..." value={day.description} onChange={e => updateItineraryDay(idx, 'description', e.target.value)} className="w-full rounded-lg border-gray-300 focus:border-brand-500 text-sm" rows="3"></textarea>
                                            </div>
                                            {data.itinerary.length > 1 && (
                                                <button type="button" onClick={() => removeItineraryDay(idx)} className="text-red-500 bg-red-50 p-3 rounded-lg hover:bg-red-100 mt-1"><Trash2 className="w-5 h-5" /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                                <textarea value={data.terms} onChange={e => setData('terms', e.target.value)} className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="5" placeholder="Enter terms separated by lines or as raw text..."></textarea>
                            </div>

                            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-gray-100">
                                <Link href="/dashboard" className="px-6 py-3 font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50">Cancel</Link>
                                <button type="submit" disabled={processing} className="px-8 py-3 font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50">Update Tour</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
