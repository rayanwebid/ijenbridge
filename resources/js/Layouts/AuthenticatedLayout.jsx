import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { Home, Compass, MessageSquare, FileText, User as UserIcon, LogOut, Image as ImageIcon, MapPin, Menu, Settings } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const navItems = [
        { name: 'Dashboard', icon: Home, route: route('dashboard'), active: route().current('dashboard') },
        { name: 'Sliders', icon: ImageIcon, route: route('admin.sliders.index'), active: route().current('admin.sliders.*') },
        { name: 'Navigation Menus', icon: Menu, route: route('admin.navigation.index'), active: route().current('admin.navigation.*') },
        { name: 'Destinations', icon: MapPin, route: route('admin.destinations.index'), active: route().current('admin.destinations.*') },
        { name: 'Tours', icon: Compass, route: route('admin.tours.index'), active: route().current('admin.tours.*') },
        { name: 'Trip Types', icon: Settings, route: route('admin.settings.trip-types.index'), active: route().current('admin.settings.trip-types.*') },
        { name: 'Durations', icon: Settings, route: route('admin.settings.durations.index'), active: route().current('admin.settings.durations.*') },
        { name: 'Reviews', icon: MessageSquare, route: route('admin.testimonials.index'), active: route().current('admin.testimonials.*') },
        { name: 'Blog', icon: FileText, route: route('admin.blogs.index'), active: route().current('admin.blogs.*') },
        { name: 'Profile', icon: UserIcon, route: route('profile.edit'), active: route().current('profile.edit') },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm z-10">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                    <Link href="/">
                        <ApplicationLogo className="block h-10 w-auto fill-current text-brand-600" />
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.route}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${item.active ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-brand-600' : 'text-gray-400'}`} />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut className="w-4 h-4" /> Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative pb-16 md:pb-0">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center z-10 shadow-sm">
                    <Link href="/">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-brand-600" />
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.route}
                        className={`flex flex-col items-center justify-center w-full py-2 rounded-xl ${item.active ? 'text-brand-600' : 'text-gray-400 hover:text-brand-500'
                            }`}
                    >
                        <item.icon className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-semibold">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
