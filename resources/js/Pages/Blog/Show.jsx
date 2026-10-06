import { Head, Link } from '@inertiajs/react';
import { MapPin, Globe, ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Show({ auth, blog, otherBlogs }) {
    const { t, i18n } = useTranslation();
    const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');

    // Parse gallery
    let gallery = [];
    try {
        if (blog.gallery) gallery = typeof blog.gallery === 'string' ? JSON.parse(blog.gallery) : blog.gallery;
    } catch (e) { }

    return (
        <>
            <Head title={`${blog.title} - Ijen Bridge`} />
            <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-brand-500 selection:text-white pb-16">

                {/* Navbar */}
                <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-brand-600 h-8 w-8" />
                                    <span className="font-display font-bold text-2xl tracking-tight text-gray-900">
                                        Ijen<span className="text-brand-600">Bridge</span>
                                    </span>
                                </div>
                            </Link>
                            <div className="flex items-center space-x-4">
                                <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-brand-600 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 transition-colors">
                                    <Globe className="w-4 h-4" /> {i18n.language.toUpperCase()}
                                </button>
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="text-sm font-medium text-gray-600 hover:text-brand-600">Dashboard</Link>
                                ) : (
                                    <Link href={route('login')} className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-brand-600">Log in</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 pt-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                        <Link href="/" className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 mb-8 gap-2 bg-brand-50 rounded-full px-4 py-2 border border-brand-100 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                                <Calendar className="w-4 h-4" /> {new Date(blog.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                <span className="mx-2">&bull;</span>
                                <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{blog.status || 'News'}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 leading-tight mb-6">
                                {blog.title}
                            </h1>
                        </div>

                        {blog.image && (
                            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 border border-gray-100">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none text-gray-600 mb-16 whitespace-pre-wrap leading-relaxed">
                            {blog.content}
                        </div>

                        {gallery && gallery.length > 0 && (
                            <div className="mb-16 pt-12 border-t border-gray-100">
                                <h3 className="flex items-center gap-2 font-display font-bold text-2xl mb-6 text-gray-900"><ImageIcon className="text-brand-600" /> Article Gallery</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {gallery.map((src, idx) => (
                                        <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100">
                                            <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </main>

                {/* Keep Reading Section */}
                {otherBlogs && otherBlogs.length > 0 && (
                    <section className="bg-gray-50 py-16 border-t border-gray-100 mt-12">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h3 className="font-display font-bold text-2xl mb-8">Keep Reading</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {otherBlogs.map(b => (
                                    <Link href={route('blog.show', b.slug)} key={b.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex">
                                        <div className="w-1/3 aspect-square bg-brand-50 relative overflow-hidden">
                                            <img src={b.image || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400"} className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                        <div className="w-2/3 p-4 flex flex-col justify-center">
                                            <h4 className="font-bold text-gray-900 group-hover:text-brand-600 line-clamp-2 transition-colors mb-2">{b.title}</h4>
                                            <p className="text-xs text-gray-500">{new Date(b.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </>
    );
}
