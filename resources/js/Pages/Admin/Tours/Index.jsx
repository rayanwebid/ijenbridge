import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';

export default function Index({ tours }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) destroy(`/admin/tour/${id}`);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Tours</h2>}>
            <Head title="Manage Tours" />
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Manage Tours</h3>
                            <Link href={route('admin.tours.create')} className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2 shadow-md hover:shadow-brand-500/20 transition-all">
                                <Plus className="w-4 h-4" /> Add New Tour
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 border-y border-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold">Tour Title</th>
                                        <th className="py-3 px-4 font-semibold">Duration & Type</th>
                                        <th className="py-3 px-4 font-semibold">Price</th>
                                        <th className="py-3 px-4 text-right font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tours.length === 0 && <tr><td colSpan="4" className="py-8 text-center text-gray-400">No tours found.</td></tr>}
                                    {tours.map(t => (
                                        <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 font-bold text-gray-900">{t.title}</td>
                                            <td className="py-3 px-4">{t.duration} ({t.trip_type})</td>
                                            <td className="py-3 px-4 text-brand-600 font-medium">Rp {Number(t.price).toLocaleString()}</td>
                                            <td className="py-3 px-4 text-right whitespace-nowrap">
                                                <Link href={route('admin.tours.edit', t.id)} className="text-brand-600 hover:text-brand-900 font-bold px-3 py-1 bg-brand-50 rounded-full mr-3 border border-brand-100 transition-colors">Edit</Link>
                                                <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-white hover:bg-red-600 font-bold px-3 py-1 bg-red-50 rounded-full border border-red-100 transition-colors">Delete</button>
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
