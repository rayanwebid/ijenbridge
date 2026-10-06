import { Head, Link, router, usePage } from '@inertiajs/react';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Index({ tours, destinations, tripTypes = [], durations = [], filters }) {
    const { global_whatsapp } = usePage().props;
    const [searchDest, setSearchDest] = useState(filters.destination_id || '');

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Head title="Search Tours | Ijen Bridge" />

            {/* Navigation */}
            <nav className="w-full bg-white border-b border-gray-100 shadow-sm h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <MapPin className="text-brand-600 h-6 w-6" />
                    <span className="font-display font-bold text-xl text-gray-900">
                        Ijen<span className="text-brand-600">Bridge</span>
                    </span>
                </Link>
                <div className="flex gap-4 items-center">
                    {usePage().props.nav_header?.map(m => (
                        <Link key={m.id} href={m.url} className="text-sm font-medium text-gray-600 hover:text-brand-600">{m.name}</Link>
                    ))}
                    {(!usePage().props.nav_header || usePage().props.nav_header.length === 0) && (
                        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-brand-600">Home</Link>
                    )}
                    <Link href="/tours" className="text-sm font-bold text-brand-600">All Tours</Link>
                    <div className="ml-6 border-l pl-6 border-gray-200 hidden md:flex items-center gap-2">
                        <span className="text-gray-500 font-bold text-sm">Hotline</span>
                        <a href={`https://wa.me/${global_whatsapp?.replace(/\D/g, '')}`} className="text-brand-600 font-extrabold text-xl hover:underline tracking-tight">{global_whatsapp}</a>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <div className="bg-brand-600 w-full pt-16 pb-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Discover Your Next Adventure</h1>
                    <p className="text-brand-100 max-w-2xl mx-auto text-lg">Explore the most breathtaking destinations in East Java with our curated packages.</p>
                </div>
            </div>

            {/* Search Filters Bar */}
            <div className="max-w-4xl w-full mx-auto -mt-10 relative z-20 px-4">
                <form method="GET" action="/tours" className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select name="destination_id" defaultValue={filters.destination_id} className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-gray-700 font-medium appearance-none">
                            <option value="">All Destinations</option>
                            {destinations.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 w-full relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select defaultValue={filters.trip_type} name="trip_type" className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-gray-700 font-medium appearance-none">
                            <option value="">All Trip Types</option>
                            {tripTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="flex-1 w-full relative">
                        <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select defaultValue={filters.duration} name="duration" className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-gray-700 font-medium appearance-none">
                            <option value="">All Durations</option>
                            {durations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="border border-brand-600 text-brand-600 bg-white hover:bg-brand-50 font-bold py-2.5 px-6 rounded-xl transition-colors md:w-auto shadow-sm">
                        Update Search
                    </button>
                </form>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold font-display text-gray-900">Search Results</h2>
                        <p className="text-gray-500 mt-1">Found {tours.length} packages matching your criteria</p>
                    </div>
                </div>

                {tours.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Packages Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">We couldn't find any tours matching your current filters. Try selecting "All Destinations" or changing the trip type.</p>
                        <button onClick={() => { setSearchDest(''); setSearchType(''); setTimeout(() => router.get('/tours', {}), 100); }} className="mt-6 text-brand-600 font-bold hover:underline">
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map(tour => (
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col border border-gray-100">
                                <Link href={`/tours/${tour.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                                    <img src={tour.image ? tour.image : `https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400&random=${tour.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                                        {tour.trip_type}
                                    </div>
                                </Link>
                                <div className="p-6 flex flex-col flex-1">
                                    <Link href={`/tours/${tour.slug}`}>
                                        <h3 className="text-xl font-display font-bold text-brand-900 mb-2 line-clamp-2 hover:text-brand-600 transition-colors">{tour.title}</h3>
                                    </Link>
                                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-4">
                                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-brand-500" /> {tour.pickup_point}</div>
                                        <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-brand-500" /> {tour.duration}</div>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">{tour.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Start from</p>
                                            <p className="text-lg font-bold text-[#FF7300]">Price Call Us</p>
                                        </div>
                                        <Link href={`/tours/${tour.slug}`} className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Simple Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-auto w-full">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="opacity-70 text-sm">© {new Date().getFullYear()} Ijen Bridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
