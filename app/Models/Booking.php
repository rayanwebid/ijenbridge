<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $guarded = [];

    protected $casts = [
        'tour_date' => 'date',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
