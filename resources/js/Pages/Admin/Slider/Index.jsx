import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Trash2, Plus, Image as ImageIcon, Save } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Index({ sliders }) {
    const { post, data, setData, processing } = useForm({ images: [] });
    const { delete: destroy } = useForm();
    const fileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileSelect = (e) => {
        const newFiles = Array.from(e.target.files);
        if (!newFiles.length) return;

        const combinedFiles = [...(data.images || []), ...newFiles];
        setData('images', combinedFiles);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);

        e.target.value = null;
    };

    const removeNewFile = (idxToRemove) => {
        const filteredFiles = data.images.filter((_, idx) => idx !== idxToRemove);
        setData('images', filteredFiles);
        const filteredPreviews = previewImages.filter((_, idx) => idx !== idxToRemove);
        setPreviewImages(filteredPreviews);
    };

    const handleExistingDelete = (id) => {
        if (confirm('Are you sure you want to delete this slider image?')) {
            destroy(`/admin/slider/${id}`, { preserveScroll: true });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/sliders', {
            onSuccess: () => {
                setData('images', []);
                setPreviewImages([]);
            }
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Hero Sliders</h2>}>
            <Head title="Manage Sliders" />
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><ImageIcon className="text-brand-600" /> Hero Slider Images</h3>
                        </div>

                        <form onSubmit={submit}>
                            <p className="text-sm text-gray-500 mb-6">These images will cycle automatically as the massive background on your landing page. Add multiple files and click "Save Sliders" to upload them.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                {/* Existing Sliders from Backend */}
                                {sliders.map((s, idx) => (
                                    <div key={s.id} className="relative group rounded-2xl overflow-hidden aspect-[16/9] shadow-sm border border-gray-200">
                                        <div className="absolute top-0 left-0 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">Slide #{idx + 1}</div>
                                        <img src={s.image} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => handleExistingDelete(s.id)} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 z-20" title="Delete Saved Slide">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {/* New Image Previews */}
                                {previewImages.map((src, idx) => (
                                    <div key={`new-${idx}`} className="relative group rounded-2xl overflow-hidden aspect-[16/9] border-2 border-brand-400">
                                        <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">NEW (Not Saved)</div>
                                        <img src={src} className="w-full h-full object-cover opacity-80" />
                                        <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 z-20">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl aspect-[16/9] text-gray-500 hover:text-brand-600 hover:border-brand-400 hover:bg-brand-50 transition-colors bg-gray-50 cursor-pointer">
                                    <Plus className="w-8 h-8 mb-2" />
                                    <span className="text-sm font-bold">Select Images</span>
                                </button>
                            </div>

                            <input type="file" multiple ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />

                            <div className="flex justify-end pt-6 border-t border-gray-100 gap-4 mt-8">
                                <button type="submit" disabled={processing || data.images.length === 0} className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors">
                                    <Save className="w-5 h-5" />
                                    {processing ? 'Saving...' : 'Save Sliders'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
