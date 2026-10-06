<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $guarded = [];

    protected $casts = [
        'itinerary' => 'array',
        'is_featured' => 'boolean',
        'destination_id' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(TourCategory::class, 'tour_category_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
