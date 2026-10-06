import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin, Clock, Phone, Share2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Show({ tour, otherTours }) {
    const [activeTab, setActiveTab] = useState('itinerary');
    const [currentImage, setCurrentImage] = useState(0);

    let images = [];
    if (tour.gallery) {
        try {
            images = typeof tour.gallery === 'string' ? JSON.parse(tour.gallery) : tour.gallery;
        } catch (e) { }
    }

    if (tour.image && !images.includes(tour.image)) {
        images.unshift(tour.image); /* Cover image as first slide */
    }

    if (!images || images.length === 0) {
        images = ["https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800"];
    }

    const nextImage = () => setCurrentImage(curr => (curr === images.length - 1 ? 0 : curr + 1));
    const prevImage = () => setCurrentImage(curr => (curr === 0 ? images.length - 1 : curr - 1));

    const { global_whatsapp } = usePage().props;
    const whatsappLink = `https://wa.me/${global_whatsapp?.replace(/\D/g, '')}?text=Hello%20IjenBridge!%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package.`;

    return (
        <div className="font-sans antialiased bg-white min-h-screen">
            <Head title={`${tour.title} | Ijen Bridge`} />

            {/* Top Navbar Placeholder (Simplified for standalone detail view) */}
            <nav className="w-full bg-white border-b border-gray-100 shadow-sm h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between">
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
                    <div className="ml-6 border-l pl-6 border-gray-200 hidden md:flex items-center gap-2">
                        <span className="text-gray-500 font-bold text-sm">Hotline</span>
                        <a href={`https://wa.me/${global_whatsapp?.replace(/\D/g, '')}`} className="text-brand-600 font-extrabold text-xl hover:underline tracking-tight">{global_whatsapp}</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section (Tosca Green Banner Style) */}
            <div className="w-full bg-brand-600 text-white relative overflow-hidden flex flex-col pt-10 pb-0">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col md:flex-row gap-10 md:gap-16 pb-8">

                    {/* Left: Gallery Slideshow */}
                    <div className="w-full md:w-[55%] flex flex-col gap-2">
                        {/* Main Image */}
                        <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden border border-white/20 shadow-lg group">
                            <img src={images[currentImage]} alt="Tour Main View" className="w-full h-full object-cover transition-transform duration-700" />

                            {/* Arrows */}
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-1.5 rounded-full hover:bg-white/60 transition-all opacity-0 group-hover:opacity-100">
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-1.5 rounded-full hover:bg-white/60 transition-all opacity-0 group-hover:opacity-100">
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 h-16 w-full">
                            {images.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentImage(idx)} className={`flex-1 overflow-hidden rounded-md border-2 transition-all ${currentImage === idx ? 'border-white brightness-100' : 'border-transparent brightness-50 hover:brightness-75'}`}>
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Tour Details */}
                    <div className="w-full md:w-[45%] flex flex-col justify-center pb-8 md:pb-0">
                        <h1 className="text-3xl lg:text-4xl font-display font-bold leading-tight mb-4">
                            {tour.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm font-medium opacity-90 mb-6 flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> East Java / {tour.pickup_point}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tour.duration}</span>
                        </div>

                        <div className="mb-6">
                            <p className="text-xl font-semibold opacity-90">Price Call Us</p>
                        </div>

                        <a href={whatsappLink} target="_blank" className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors w-fit mb-8">
                            <Phone className="w-5 h-5" />
                            Contact Us
                        </a>

                        <div>
                            <p className="text-xs uppercase tracking-wider mb-2 opacity-80 font-semibold"># Share this information to your friends</p>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-white">FB</button>
                                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"><MessageCircle className="w-5 h-5" /></button>
                                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-white">X</button>
                                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-white">IN</button>
                                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Bar built directly into the bottom of the blue section via negative margin overlap trick, or just part of it */}
                <div className="w-full bg-brand-700 mt-auto relative z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex">
                        <button onClick={() => setActiveTab('itinerary')} className={`px-6 py-4 font-bold text-sm transition-colors cursor-pointer relative z-50 ${activeTab === 'itinerary' ? 'bg-white text-brand-700' : 'text-white hover:bg-brand-800'}`}>
                            Itinerary
                        </button>
                        <button onClick={() => setActiveTab('terms')} className={`px-6 py-4 font-bold text-sm transition-colors cursor-pointer relative z-50 ${activeTab === 'terms' ? 'bg-white text-brand-700' : 'text-white hover:bg-brand-800'}`}>
                            Term & Condition
                        </button>
                        <button onClick={() => setActiveTab('other')} className={`px-6 py-4 font-bold text-sm transition-colors cursor-pointer relative z-50 ${activeTab === 'other' ? 'bg-white text-brand-700' : 'text-white hover:bg-brand-800'}`}>
                            Other Tour
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Contents */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
                        <h2 className="text-2xl font-display font-medium text-[#1CA5DE] mb-6">Conservation Tour</h2>

                        <h2 className="text-2xl font-display font-medium text-[#1CA5DE] mb-6">Conservation Tour</h2>

                        {(() => {
                            let days = [];
                            try {
                                if (typeof tour.itinerary === 'string') {
                                    days = JSON.parse(tour.itinerary);
                                } else if (Array.isArray(tour.itinerary)) {
                                    days = tour.itinerary;
                                } else if (tour.itinerary && typeof tour.itinerary === 'object') {
                                    days = Object.values(tour.itinerary);
                                }
                            } catch (e) {
                                console.error('Failed to parse itinerary:', e);
                            }

                            if (!Array.isArray(days) || Object.keys(days).length === 0) {
                                return <p className="text-gray-500 italic block py-4 text-center">Itinerary is currently being updated for this tour package.</p>;
                            }

                            return days.map((day, i) => (
                                <div key={i} className="mb-8">
                                    <h3 className="font-bold text-gray-900 mb-2">Day {i + 1}: {day.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{day.description}</p>
                                </div>
                            ));
                        })()}
                    </motion.div>
                )}

                {/* Terms Tab */}
                {activeTab === 'terms' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
                        <h2 className="text-2xl font-display font-medium text-brand-600 mb-6">Terms & Conditions</h2>
                        {tour.terms ? (
                            <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{tour.terms}</div>
                        ) : (
                            <p className="text-gray-500 italic block py-4 text-center">Terms and conditions are currently being updated.</p>
                        )}
                    </motion.div>
                )}

                {/* Other Tours Tab */}
                {activeTab === 'other' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-2xl font-display font-medium text-brand-600 mb-6">Newest Tour Package</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {otherTours?.length > 0 ? otherTours.map((otour) => (
                                <div key={otour.id} className="border border-gray-100 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
                                    <div className="absolute top-4 -left-8 bg-red-600 text-white font-bold text-xs uppercase py-1 px-10 -rotate-45 shadow-md z-20">
                                        Best Seller
                                    </div>
                                    <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden group-hover:brightness-90 transition-all">
                                        {/* Hover Overlay Button */}
                                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/tours/${otour.slug}`} className="bg-[#FF7300] hover:bg-[#E66800] text-white px-2 py-2 flex items-center font-bold text-sm"><span className="border-r border-white/30 px-2 mr-2">✓</span> More Detail</Link>
                                        </div>
                                        <img src={otour.image ? otour.image : `https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400&random=${otour.id}`} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-brand-600 line-clamp-1 mb-2 hover:underline"><Link href={`/tours/${otour.slug}`}>{otour.title}</Link></h3>
                                        <div className="flex items-center justify-center gap-3 text-xs font-medium text-[#FF7300] mb-3 flex-wrap">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {otour.pickup_point}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {otour.duration}</span>
                                        </div>
                                        <p className="text-gray-600 font-medium text-sm">Price Call Us</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 col-span-full">No other tours found.</p>
                            )}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
