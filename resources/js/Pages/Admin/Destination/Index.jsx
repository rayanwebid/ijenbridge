import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { MapPin, Trash2, Plus, Save } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Index({ destinations }) {
    const { post, data, setData, processing, reset } = useForm({ name: '', slug: '', description: '', image: null });
    const { delete: destroy } = useForm();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const generateSlug = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

    const handleFileSelect = (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0];
        setData('image', file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/destinations', {
            onSuccess: () => {
                reset();
                setPreviewImage(null);
                if (fileInputRef.current) fileInputRef.current.value = null;
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this destination? Tours linked to this destination will have their destination removed.')) {
            destroy(`/admin/destination/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Destinations</h2>}>
            <Head title="Destinations" />
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Add Destination Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8 lg:col-span-1 h-fit">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Plus className="w-5 h-5 text-brand-600" /> Add New Destination</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name</label>
                                <input type="text" value={data.name} onChange={e => { setData('name', e.target.value); setData('slug', generateSlug(e.target.value)); }} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" placeholder="e.g. Mount Bromo" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                                {previewImage && (
                                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-2 relative">
                                        <img src={previewImage} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => { setPreviewImage(null); setData('image', null); }} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md"><Trash2 className="w-3 h-3" /></button>
                                    </div>
                                )}
                                {!previewImage && (
                                    <input type="file" accept="image/*" onChange={handleFileSelect} ref={fileInputRef} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100" />
                                )}
                            </div>
                            <button type="submit" disabled={processing} className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors mt-6 shadow-md">
                                <Save className="w-4 h-4" /> Save Destination
                            </button>
                        </form>
                    </div>

                    {/* Destination List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8 lg:col-span-2">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><MapPin className="w-5 h-5 text-brand-600" /> Registered Destinations</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {destinations.length === 0 ? (
                                <p className="text-gray-500 text-sm col-span-2 py-4">No destinations recorded yet.</p>
                            ) : (
                                destinations.map(d => (
                                    <div key={d.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow group bg-gray-50">
                                        <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden shrink-0 relative">
                                            {d.image ? (
                                                <img src={d.image} className="absolute inset-0 w-full h-full object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center"><MapPin className="w-8 h-8 text-gray-400" /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="font-bold text-gray-900">{d.name}</h4>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{d.description}</p>
                                        </div>
                                        <div className="shrink-0 flex items-center">
                                            <button onClick={() => handleDelete(d.id)} className="bg-white border border-gray-200 text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 rounded-full transition-colors p-2 shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
