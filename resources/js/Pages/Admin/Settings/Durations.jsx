import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function Durations({ durations }) {
    const { data: newItem, setData: setNewItem, post: createItem, reset: resetNew } = useForm({
        name: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleCreate = (e) => {
        e.preventDefault();
        createItem('/admin/settings/durations', { onSuccess: () => resetNew() });
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditData(item);
    };

    const saveEdit = () => {
        router.post(`/admin/settings/durations/${editingId}`, editData, {
            onSuccess: () => setEditingId(null)
        });
    };

    const deleteItem = (id) => {
        if (confirm('Are you sure you want to delete this setting?')) {
            router.delete(`/admin/settings/durations/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tour Durations Configuration</h2>}>
            <Head title="Tour Durations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                    {/* List Panel */}
                    <div className="flex-1 bg-white shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Configured Durations</h3>
                        <div className="space-y-3">
                            {durations.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                                    {editingId === item.id ? (
                                        <div className="flex-1 flex gap-2">
                                            <input type="text" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="rounded-lg border-gray-300 w-full" />
                                            <button onClick={saveEdit} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Check className="w-5 h-5" /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"><X className="w-5 h-5" /></button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex-1 font-bold text-gray-900">{item.name}</div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                                                <button onClick={() => deleteItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {durations.length === 0 && <p className="text-gray-500 italic">No durations configured.</p>}
                        </div>
                    </div>

                    {/* Add Form */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white shadow sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Add Duration</h3>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" value={newItem.name} onChange={e => setNewItem('name', e.target.value)} required placeholder="e.g. 1 Day (One Day)" className="w-full rounded-lg border-gray-300 focus:border-brand-500" />
                                </div>
                                <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-700">
                                    <Plus className="w-5 h-5" /> Add Setup
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
