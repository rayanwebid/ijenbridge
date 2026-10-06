import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Map, MessageSquareQuote, Newspaper } from 'lucide-react';

export default function Dashboard({ counts }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Administrator CMS Dashboard</h2>}>
            <Head title="Admin Dashboard" />
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-4"><Map className="w-8 h-8" /></div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{counts.tours}</h3>
                            <p className="text-gray-500 font-medium tracking-wide mb-4">Total Tour Packages</p>
                            <Link href={route('admin.tours.index')} className="text-sm font-bold text-brand-600 hover:underline">Manage Tours &rarr;</Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><MessageSquareQuote className="w-8 h-8" /></div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{counts.testimonials}</h3>
                            <p className="text-gray-500 font-medium tracking-wide mb-4">Total Reviews</p>
                            <Link href={route('admin.testimonials.index')} className="text-sm font-bold text-blue-600 hover:underline">Manage Reviews &rarr;</Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4"><Newspaper className="w-8 h-8" /></div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{counts.blogs}</h3>
                            <p className="text-gray-500 font-medium tracking-wide mb-4">Total Blog Articles</p>
                            <Link href={route('admin.blogs.index')} className="text-sm font-bold text-purple-600 hover:underline">Manage Blog &rarr;</Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
