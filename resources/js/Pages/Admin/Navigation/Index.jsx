import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, GripVertical, Check, X, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Index({ menus }) {
    const [activeTab, setActiveTab] = useState('header');

    // Filter menus based on active tab
    const displayMenus = menus.filter(m => m.location === activeTab);

    const { data: newMenu, setData: setNewMenu, post: createMenu, reset: resetNew } = useForm({
        name: '', url: '', location: activeTab, order_index: displayMenus.length, is_active: true
    });

    // Keep form location synced with active tab
    if (newMenu.location !== activeTab) setNewMenu('location', activeTab);

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleCreate = (e) => {
        e.preventDefault();
        createMenu('/admin/navigation', { onSuccess: () => resetNew() });
    };

    const startEdit = (menu) => {
        setEditingId(menu.id);
        setEditData(menu);
    };

    const saveEdit = () => {
        router.post(`/admin/navigation/${editingId}`, editData, {
            onSuccess: () => setEditingId(null)
        });
    };

    const deleteMenu = (id) => {
        if (confirm('Are you sure you want to delete this menu item?')) {
            router.delete(`/admin/navigation/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Navigation Menus Management</h2>}>
            <Head title="Navigation Menus" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                    {/* List Panel */}
                    <div className="flex-1 bg-white shadow sm:rounded-lg overflow-hidden">

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('header')}
                                className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'header' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-500' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Header Menus (Top)
                            </button>
                            <button
                                onClick={() => setActiveTab('footer')}
                                className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'footer' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-500' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Footer Menus (Bottom)
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-3">
                                {displayMenus.map((menu, index) => (
                                    <div key={menu.id} className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-colors">
                                        <GripVertical className="text-gray-400 cursor-move" />

                                        {editingId === menu.id ? (
                                            <div className="flex-1 flex flex-wrap gap-2">
                                                <input type="text" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="rounded-lg border-gray-300 w-1/3" />
                                                <input type="text" value={editData.url} onChange={e => setEditData({ ...editData, url: e.target.value })} className="rounded-lg border-gray-300 w-1/3" />
                                                <input type="number" value={editData.order_index} onChange={e => setEditData({ ...editData, order_index: e.target.value })} className="rounded-lg border-gray-300 w-20" />
                                                <button onClick={saveEdit} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Check className="w-5 h-5" /></button>
                                                <button onClick={() => setEditingId(null)} className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"><X className="w-5 h-5" /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-8 font-bold text-gray-400">{menu.order_index}</div>
                                                <div className="flex-1 font-bold text-gray-900">{menu.name}</div>
                                                <div className="flex-1 text-gray-500 font-mono text-sm break-all">{menu.url}</div>

                                                <div className="flex gap-2">
                                                    <button onClick={() => startEdit(menu)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                                                    <button onClick={() => deleteMenu(menu.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                                {displayMenus.length === 0 && <p className="text-gray-500 italic p-4 text-center border-2 border-dashed border-gray-200 rounded-xl">No {activeTab} menus configured yet.</p>}
                            </div>
                        </div>
                    </div>

                    {/* Add Form */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white shadow sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Add {activeTab === 'header' ? 'Header' : 'Footer'} Link</h3>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                    <input type="text" value={newMenu.name} onChange={e => setNewMenu('name', e.target.value)} required placeholder="e.g. Terms & Conditions" className="w-full rounded-lg border-gray-300 focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL / Link Target</label>
                                    <input type="text" value={newMenu.url} onChange={e => setNewMenu('url', e.target.value)} required placeholder="e.g. /terms or #about" className="w-full rounded-lg border-gray-300 focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input type="number" value={newMenu.order_index} onChange={e => setNewMenu('order_index', e.target.value)} required className="w-full rounded-lg border-gray-300 focus:border-brand-500" />
                                </div>
                                <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-700">
                                    <Plus className="w-5 h-5" /> Add Link
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
