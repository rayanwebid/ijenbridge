import { Head, Link } from '@inertiajs/react';
import { MapPin, Calendar, Users, ArrowRight, Star, ShieldCheck, Clock, Quote, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Welcome({ auth, tours, blogs, sliders = [], destinations = [], testimonials = [], tripTypes = [], durations = [] }) {
    const { t, i18n } = useTranslation();
    const { global_whatsapp, nav_header = [] } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchDest, setSearchDest] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchDuration, setSearchDuration] = useState('');

    const handleSearch = () => {
        router.get('/tours', { destination_id: searchDest, trip_type: searchType });
    };

    useEffect(() => {
        if (!sliders || sliders.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliders.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [sliders]);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');
    };

    return (
        <>
            <Head title="Ijen Bridge Tour & Travel" />

            <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-brand-500 selection:text-white overflow-x-hidden">
                {/* Navbar */}
                <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-brand-600 h-8 w-8" />
                                <span className="font-display font-bold text-2xl tracking-tight text-gray-900">
                                    Ijen<span className="text-brand-600">Bridge</span>
                                </span>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center gap-8">
                                <div className="flex gap-6 items-center">
                                    {nav_header.map(menu => (
                                        <a key={menu.id} href={menu.url} className="text-gray-600 hover:text-brand-600 font-bold text-sm transition-colors">
                                            {menu.name}
                                        </a>
                                    ))}
                                    {nav_header.length === 0 && (
                                        <>
                                            <a href="#tours" className="text-gray-600 hover:text-brand-600 font-bold text-sm transition-colors">Tours</a>
                                            <a href="#transport" className="text-gray-600 hover:text-brand-600 font-bold text-sm transition-colors">Transport</a>
                                            <a href="#about" className="text-gray-600 hover:text-brand-600 font-bold text-sm transition-colors">About</a>
                                        </>
                                    )}
                                </div>

                                <div className="border-l pl-6 border-gray-200 hidden lg:flex items-center gap-2">
                                    <span className="text-gray-500 font-bold text-sm">Hotline</span>
                                    <a href={`https://wa.me/${global_whatsapp?.replace(/\D/g, '')}`} className="text-brand-600 font-extrabold text-xl hover:underline tracking-tight">{global_whatsapp}</a>
                                </div>

                                <div className="flex items-center gap-4 ml-2">
                                    <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-brand-600 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 transition-colors">
                                        <Globe className="w-4 h-4" /> {i18n.language.toUpperCase()}
                                    </button>
                                    {auth?.user ? (
                                        <Link href={route('dashboard')} className="text-sm font-medium text-gray-600 hover:text-brand-600">Dashboard</Link>
                                    ) : (
                                        <>
                                            <Link href={route('login')} className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-brand-600">Log in</Link>
                                            <Link href={route('register')} className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-brand-500/30">
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="flex-1 relative pt-20">
                    {/* Background blob animations */}
                    <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute top-[20%] left-[-10%] w-[32rem] h-[32rem] bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white/0"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-32 flex flex-col lg:flex-row items-center gap-12">
                        {/* Hero Text */}
                        <div className="flex-1 space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium">
                                <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                                <span>#1 Rated East Java Tours on TripAdvisor</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-volcanic leading-[1.1]">
                                {t('Discover The')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">
                                    {t('Blue Fire')}
                                </span> {t('of Ijen')}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                                {t('HeroDescription')}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#explore" className="inline-flex items-center justify-center gap-2 bg-volcanic text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl">
                                    {t('Explore Packages')}
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a href={`https://wa.me/${global_whatsapp?.replace(/\D/g, '')}`} target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-100 hover:border-brand-200 hover:text-brand-700 transition-all shadow-sm">
                                    Chat via WhatsApp
                                </a>
                            </div>

                            {/* Trust badges */}
                            <div className="pt-8 flex items-center gap-8 border-t border-gray-100 mt-8">
                                <div>
                                    <p className="text-3xl font-display font-bold text-gray-900">5k+</p>
                                    <p className="text-sm text-gray-500">Happy Travelers</p>
                                </div>
                                <div className="h-10 w-px bg-gray-200"></div>
                                <div>
                                    <p className="text-3xl font-display font-bold text-gray-900">4.9/5</p>
                                    <p className="text-sm text-gray-500">Average Rating</p>
                                </div>
                            </div>
                        </div>

                        {/* Search/Booking Widget & Images */}
                        <div className="flex-1 w-full relative">
                            {/* Decorative Image / Slider */}
                            <div className="w-full aspect-[4/5] md:aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white">
                                {sliders && sliders.length > 0 ? (
                                    sliders.map((s, idx) => (
                                        <img
                                            key={s.id}
                                            src={s.image}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))
                                ) : (
                                    <img src="https://images.unsplash.com/photo-1579282240050-352f1bfea1bb?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-volcanic/60 via-transparent to-transparent pointer-events-none"></div>
                            </div>

                            {/* Search Widget Component overlaid slightly */}
                            <div className="absolute -bottom-10 -left-4 md:-left-12 max-w-sm w-full bg-white p-6 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 p-6 z-10 hidden sm:block">
                                <h3 className="font-display font-bold text-lg mb-4">Quick Search</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <select value={searchDest} onChange={e => setSearchDest(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 focus:ring-brand-500 focus:border-brand-500 transition-colors text-gray-600 appearance-none bg-gray-50">
                                            <option value="">Select Destination</option>
                                            {destinations.map(d => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select value={searchType} onChange={e => setSearchType(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all appearance-none bg-white text-gray-700">
                                            <option value="">Trip Type</option>
                                            {tripTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                            {tripTypes.length === 0 && <option value="Private">Private Tour</option>}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select value={searchDuration} onChange={e => setSearchDuration(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all appearance-none bg-white text-gray-700">
                                            <option value="">Duration</option>
                                            {durations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <a href={`/tours?destination_id=${searchDest}&trip_type=${searchType}&duration=${searchDuration}`} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-brand-200 flex items-center justify-center gap-2">
                                        Find Packages
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Categories Highlights */}
                <section className="bg-gray-50 py-24 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">{t('Our Destinations')}</span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold text-gray-900">{t('Explore East Java')}</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">From active volcanoes to hidden waterfalls, experience the best of nature.</p>

                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Dynamic Maps for Tours */}
                            {tours?.map((tour) => (
                                <Link href={route('tours.show', tour.slug)} key={tour.id} className="group cursor-pointer text-left block">
                                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-gray-200">
                                        <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent z-10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                                        <img src={tour.image ? tour.image : `https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600`} alt={tour.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{tour.title}</h3>
                                    <p className="text-gray-500 mt-1 flex items-center gap-1 text-sm"><Clock className="w-4 h-4" /> {tour.duration}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Testimonials Section */}
                <section className="bg-white py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900">{t('What Travelers Say')}</h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{t('Real reviews')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials && testimonials.length > 0 ? testimonials.map((testimonial, i) => (
                                <div key={i} className="bg-gray-50 border border-gray-100 p-8 rounded-3xl relative hover:shadow-xl transition-shadow">
                                    <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-100 fill-brand-100/50" />
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">{testimonial.name ? testimonial.name[0] : 'U'}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <div className="flex text-accent-500">
                                                {[...Array(5)].map((_, index) => (
                                                    <Star key={index} className={`w-4 h-4 ${index < parseInt(testimonial.rating) ? 'fill-accent-500' : 'fill-gray-300 text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{testimonial.review}"</p>
                                </div>
                            )) : (
                                <p className="text-gray-500 italic text-center w-full col-span-3">No reviews available yet.</p>
                            )}
                        </div>
                        <div className="mt-10 text-center">
                            <a href="#reviews" className="inline-flex items-center justify-center bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 shadow-md">
                                {t('View All Reviews')}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <section className="bg-gray-50 border-t border-gray-100 py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-volcanic">{t('Artikel Blog')}</h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Read also some interesting articles, destinations tips & recommendations about the Trip!</p>
                        </div>

                        <div className="space-y-8 max-w-4xl mx-auto">
                            {blogs && blogs.length > 0 ? blogs.map((article, i) => (
                                <div key={i} className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                    <div className="sm:w-1/3 aspect-video sm:aspect-auto">
                                        <img src={article.image || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400"} className="w-full h-full object-cover bg-gray-200" alt={article.title} />
                                    </div>
                                    <div className="sm:w-2/3 p-6 sm:p-8 flex flex-col justify-center">
                                        <Link href={route('blog.show', article.slug)}>
                                            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 hover:text-brand-600 cursor-pointer">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                            <Calendar className="w-4 h-4" /> {new Date(article.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} &bull; Destination, News
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-sm mb-4">
                                            {article.excerpt}
                                            <Link href={route('blog.show', article.slug)} className="text-brand-600 cursor-pointer font-semibold hover:underline ml-1">read more</Link>
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-gray-500">No blog articles published yet.</div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
