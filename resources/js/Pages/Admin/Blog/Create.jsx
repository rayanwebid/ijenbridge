import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Create() {
    const { post, data, setData, processing } = useForm({ title: '', slug: '', excerpt: '', content: '', image: null, gallery_files: [] });

    // Gallery processing logic
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

    const generateSlug = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    const handleTitleChange = (e) => setData(prevData => ({ ...prevData, title: e.target.value, slug: generateSlug(e.target.value) }));

    const submit = (e) => {
        e.preventDefault();
        post('/admin/blogs');
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Publish New Article</h2>}>
            <Head title="Publish Article" />
            <div className="py-8 md:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <Link href="/dashboard" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
                            <h3 className="text-2xl font-bold text-gray-900">Publish Article</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                                    <input type="text" value={data.title} onChange={handleTitleChange} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                    <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt Summary</label>
                                <textarea value={data.excerpt} onChange={e => setData('excerpt', e.target.value)} className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Body Content</label>
                                <textarea value={data.content} onChange={e => setData('content', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="12"></textarea>
                            </div>

                            {/* Media Section */}
                            <div className="grid grid-cols-1 gap-6 pb-6 mt-6 pt-6 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image (Optional)</label>
                                    <input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100" />
                                </div>
                            </div>

                            <div className="mb-6 pb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Gallery Images</label>
                                <p className="text-xs text-gray-500 mb-4">You can add multiple photos. Click the '+' box to append more.</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-gray-100">
                                <Link href="/dashboard" className="px-6 py-3 font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50">Cancel</Link>
                                <button type="submit" disabled={processing} className="px-8 py-3 font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50">Publish Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
