import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create() {
    const { post, data, setData, processing } = useForm({ name: '', review: '', rating: 5 });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/testimonials');
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add New Testimonial</h2>}>
            <Head title="Add Testimonial" />
            <div className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                            <Link href="/dashboard" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
                            <h3 className="text-2xl font-bold text-gray-900">Create Testimonial</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                <input type="number" min="1" max="5" value={data.rating} onChange={e => setData('rating', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review Statement</label>
                                <textarea value={data.review} onChange={e => setData('review', e.target.value)} required className="w-full rounded-xl border-gray-300 focus:border-brand-500" rows="5"></textarea>
                            </div>
                            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-gray-100">
                                <Link href="/dashboard" className="px-6 py-3 font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50">Cancel</Link>
                                <button type="submit" disabled={processing} className="px-8 py-3 font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50">Add Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
