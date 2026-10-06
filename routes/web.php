<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'tours' => \App\Models\Tour::latest()->take(4)->get(),
        'blogs' => \App\Models\BlogArticle::latest()->take(3)->get(),
        'sliders' => \App\Models\HeroSlider::where('is_active', true)->orderBy('order_index')->get(),
        'destinations' => \App\Models\Destination::all(),
        'testimonials' => \App\Models\Testimonial::latest()->get(),
        'tripTypes' => \App\Models\TripType::all(),
        'durations' => \App\Models\TourDuration::all(),
    ]);
});

    // Dynamic Public Tour Hub / Search Results
    Route::get('/tours', function (\Illuminate\Http\Request $request) {
        $query = \App\Models\Tour::query();
        
        if ($request->has('destination_id') && $request->destination_id) {
            $query->where('destination_id', $request->destination_id);
        }
        
        if ($request->has('trip_type') && $request->trip_type) {
            $query->where('trip_type', $request->trip_type);
        }
        
        if ($request->has('duration') && $request->duration) {
            $query->where('duration', $request->duration);
        }
        
        return Inertia::render('Tour/Index', [
            'tours' => $query->latest()->get(),
            'destinations' => \App\Models\Destination::all(),
            'tripTypes' => \App\Models\TripType::all(),
            'durations' => \App\Models\TourDuration::all(),
            'filters' => $request->only(['destination_id', 'trip_type', 'duration'])
        ]);
    })->name('tours.public.index');

Route::get('/tours/{slug}', function ($slug) {
    $tour = \App\Models\Tour::where('slug', $slug)->first();
    if (!$tour) {
        $tour = new \App\Models\Tour([
            'title' => 'Bali – Hunting Rafflesia Zollingeriana Flower',
            'slug' => 'bali-hunting',
            'duration' => '3 Days 2 Nights',
            'price' => 2000000,
            'description' => 'Tour example description',
            'pickup_point' => 'Meru Betiri'
        ]); // fallback for testing UI without real db insert yet
    }
    
    $otherTours = \App\Models\Tour::inRandomOrder()->take(3)->get();
    
    return Inertia::render('Tour/Show', [
        'tour' => $tour,
        'otherTours' => $otherTours
    ]);
})->name('tours.show');

Route::get('/blog/{slug}', function ($slug) {
    $blog = \App\Models\BlogArticle::where('slug', $slug)->firstOrFail();
    $otherBlogs = \App\Models\BlogArticle::where('id', '!=', $blog->id)->latest()->take(2)->get();
    
    return Inertia::render('Blog/Show', [
        'blog' => $blog,
        'otherBlogs' => $otherBlogs
    ]);
})->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'counts' => [
                'tours' => \App\Models\Tour::count(),
                'testimonials' => \App\Models\Testimonial::count(),
                'blogs' => \App\Models\BlogArticle::count(),
            ]
        ]);
    })->name('dashboard');

    // Index UI Routes
    Route::get('/admin/tours', function() { return Inertia::render('Admin/Tours/Index', ['tours' => \App\Models\Tour::latest()->get()]); })->name('admin.tours.index');
    Route::get('/admin/testimonials', function() { return Inertia::render('Admin/Testimonial/Index', ['testimonials' => \App\Models\Testimonial::latest()->get()]); })->name('admin.testimonials.index');
    Route::get('/admin/blogs', function() { return Inertia::render('Admin/Blog/Index', ['blogs' => \App\Models\BlogArticle::latest()->get()]); })->name('admin.blogs.index');

    // Main CRUD Views
    Route::get('/admin/tours/create', function() { 
        return Inertia::render('Admin/Tours/Create', [
            'destinations' => \App\Models\Destination::all(),
            'tripTypes' => \App\Models\TripType::all(),
            'durations' => \App\Models\TourDuration::all()
        ]); 
    })->name('admin.tours.create');
    Route::get('/admin/tours/{id}/edit', function($id) { 
        return Inertia::render('Admin/Tours/Edit', [
            'tour' => \App\Models\Tour::findOrFail($id), 
            'destinations' => \App\Models\Destination::all(),
            'tripTypes' => \App\Models\TripType::all(),
            'durations' => \App\Models\TourDuration::all()
        ]); 
    })->name('admin.tours.edit');
    Route::get('/admin/testimonials/create', function() { return Inertia::render('Admin/Testimonial/Create'); })->name('admin.testimonials.create');
    Route::get('/admin/blogs/create', function() { return Inertia::render('Admin/Blog/Create'); })->name('admin.blogs.create');

    Route::get('/admin/destinations', function() { return Inertia::render('Admin/Destination/Index', ['destinations' => \App\Models\Destination::all()]); })->name('admin.destinations.index');
    Route::post('/admin/destinations', function(\Illuminate\Http\Request $request) {
        $payload = $request->only(['name', 'slug', 'description']);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('destinations', 'public');
            $payload['image'] = '/storage/' . $path;
        }
        \App\Models\Destination::create($payload);
        return back();
    });

    Route::get('/admin/sliders', function() { return Inertia::render('Admin/Slider/Index', ['sliders' => \App\Models\HeroSlider::orderBy('order_index')->get()]); })->name('admin.sliders.index');
    Route::post('/admin/sliders', function(\Illuminate\Http\Request $request) {
        if ($request->hasFile('images')) {
            foreach($request->file('images') as $file) {
                $path = $file->store('sliders', 'public');
                \App\Models\HeroSlider::create([
                    'image' => '/storage/' . $path,
                    'order_index' => \App\Models\HeroSlider::count()
                ]);
            }
        }
        return back();
    });

    // Basic CMS Store Endpoints (API)
    Route::post('/admin/tours', function (\Illuminate\Http\Request $request) {
        $payload = $request->only(['destination_id', 'title', 'slug', 'description', 'duration', 'price', 'trip_type', 'pickup_point', 'itinerary', 'terms']);
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tours', 'public');
            $payload['image'] = '/storage/' . $path;
        }

        // Handle gallery images
        if ($request->hasFile('gallery_files')) {
            $gallery = [];
            foreach($request->file('gallery_files') as $file) {
                $path = $file->store('tours/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
            $payload['gallery'] = json_encode($gallery);
        }

        // Ensure category ID 1 exists to satisfy SQLite foreign keys if unseeded
        if (!\App\Models\TourCategory::find($payload['tour_category_id'])) {
            \App\Models\TourCategory::create([
                'id' => $payload['tour_category_id'], 
                'name' => 'General Tours', 
                'slug' => 'general-tours', 
                'description' => 'Main auto-generated category'
            ]);
        }

        \App\Models\Tour::create($payload);
        return redirect()->route('admin.tours.index');
    });

    // Admin Setup Settings Controllers
    Route::get('/admin/settings/trip-types', function() { return Inertia::render('Admin/Settings/TripTypes', ['tripTypes' => \App\Models\TripType::all()]); })->name('admin.settings.trip-types.index');
    Route::post('/admin/settings/trip-types', function(\Illuminate\Http\Request $req) { \App\Models\TripType::create($req->validate(['name' => 'required'])); return back(); });
    Route::post('/admin/settings/trip-types/{id}', function(\Illuminate\Http\Request $req, $id) { \App\Models\TripType::findOrFail($id)->update($req->validate(['name' => 'required'])); return back(); });
    Route::delete('/admin/settings/trip-types/{id}', function($id) { \App\Models\TripType::findOrFail($id)->delete(); return back(); });

    Route::get('/admin/settings/durations', function() { return Inertia::render('Admin/Settings/Durations', ['durations' => \App\Models\TourDuration::all()]); })->name('admin.settings.durations.index');
    Route::post('/admin/settings/durations', function(\Illuminate\Http\Request $req) { \App\Models\TourDuration::create($req->validate(['name' => 'required'])); return back(); });
    Route::post('/admin/settings/durations/{id}', function(\Illuminate\Http\Request $req, $id) { \App\Models\TourDuration::findOrFail($id)->update($req->validate(['name' => 'required'])); return back(); });
    Route::delete('/admin/settings/durations/{id}', function($id) { \App\Models\TourDuration::findOrFail($id)->delete(); return back(); });

    // Admin Navigation Menus Management
    Route::get('/admin/navigation', function () {
        return Inertia::render('Admin/Navigation/Index', [
            'menus' => \App\Models\NavigationMenu::orderBy('order_index')->get(),
        ]);
    })->name('admin.navigation.index');

    Route::post('/admin/navigation', function (\Illuminate\Http\Request $request) {
        \App\Models\NavigationMenu::create($request->validate([
            'name' => 'required|string',
            'url' => 'required|string',
            'location' => 'required|string',
            'order_index' => 'integer',
            'is_active' => 'boolean'
        ]));
        return redirect()->back();
    });

    Route::post('/admin/navigation/{id}', function (\Illuminate\Http\Request $request, $id) {
        $menu = \App\Models\NavigationMenu::findOrFail($id);
        $menu->update($request->only(['name', 'url', 'location', 'order_index', 'is_active']));
        return redirect()->back();
    });

    Route::delete('/admin/navigation/{id}', function ($id) {
        \App\Models\NavigationMenu::findOrFail($id)->delete();
        return redirect()->back();
    });

    // Update CMS Endpoints
    Route::post('/admin/tours/{id}', function (\Illuminate\Http\Request $request, $id) {
        $tour = \App\Models\Tour::findOrFail($id);
        $payload = $request->only(['destination_id', 'title', 'slug', 'description', 'duration', 'price', 'trip_type', 'pickup_point', 'itinerary', 'terms']);
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tours', 'public');
            $payload['image'] = '/storage/' . $path;
        }

        // Process retained gallery images (existing ones that are not deleted)
        $gallery = $request->input('retained_gallery');
        if (!is_array($gallery)) {
            $gallery = [];
        }

        // Handle gallery images append
        if ($request->hasFile('gallery_files')) {
            foreach($request->file('gallery_files') as $file) {
                $path = $file->store('tours/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }
        
        $payload['gallery'] = json_encode(array_values($gallery));

        $tour->update($payload);
        return redirect()->route('admin.tours.index');
    });

    Route::post('/admin/testimonials', function (\Illuminate\Http\Request $request) {
        \App\Models\Testimonial::create($request->only(['name', 'review', 'rating']));
        return redirect()->route('admin.testimonials.index');
    });

    Route::post('/admin/blogs', function (\Illuminate\Http\Request $request) {
        $payload = $request->only(['title', 'slug', 'excerpt', 'content']);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $payload['image'] = '/storage/' . $path;
        }

        // Handle gallery images
        if ($request->hasFile('gallery_files')) {
            $gallery = [];
            foreach($request->file('gallery_files') as $file) {
                $path = $file->store('blogs/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
            $payload['gallery'] = json_encode($gallery);
        }

        \App\Models\BlogArticle::create($payload);
        return redirect()->route('admin.blogs.index');
    });

    // Delete endpoints
    Route::delete('/admin/{type}/{id}', function ($type, $id) {
        if ($type === 'tour') \App\Models\Tour::destroy($id);
        if ($type === 'testimonial') \App\Models\Testimonial::destroy($id);
        if ($type === 'blog') \App\Models\BlogArticle::destroy($id);
        if ($type === 'slider') \App\Models\HeroSlider::destroy($id);
        if ($type === 'destination') \App\Models\Destination::destroy($id);
        return redirect()->back();
    });
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
