<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained();
            $table->string('customer_name');
            $table->string('email');
            $table->string('whatsapp_number');
            $table->date('tour_date');
            $table->integer('pax');
            $table->string('pickup_location');
            $table->text('special_requests')->nullable();
            $table->string('status')->default('Pending');
            $table->decimal('total_price', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
