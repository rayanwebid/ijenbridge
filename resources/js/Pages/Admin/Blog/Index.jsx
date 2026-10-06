import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';

export default function Index({ blogs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) destroy(`/admin/blog/${id}`);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Blogs</h2>}>
            <Head title="Manage Blogs" />
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Manage Blogs</h3>
                            <Link href={route('admin.blogs.create')} className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2 shadow-md hover:shadow-brand-500/20 transition-all">
                                <Plus className="w-4 h-4" /> Add Article
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 border-y border-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold">Article Title</th>
                                        <th className="py-3 px-4 font-semibold">Status</th>
                                        <th className="py-3 px-4 font-semibold">Created At</th>
                                        <th className="py-3 px-4 text-right font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.length === 0 && <tr><td colSpan="4" className="py-8 text-center text-gray-400">No articles found.</td></tr>}
                                    {blogs.map(b => (
                                        <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-bold text-gray-900">{b.title}</td>
                                            <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">{b.status || 'Active'}</span></td>
                                            <td className="py-3 px-4">{new Date(b.created_at).toLocaleDateString()}</td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={() => handleDelete(b.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
