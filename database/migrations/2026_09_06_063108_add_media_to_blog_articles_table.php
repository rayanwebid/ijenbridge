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
        Schema::table('blog_articles', function (Blueprint $table) {
            if (!Schema::hasColumn('blog_articles', 'image')) {
                $table->string('image')->nullable();
            }
            if (!Schema::hasColumn('blog_articles', 'gallery')) {
                $table->json('gallery')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_articles', function (Blueprint $table) {
            $table->dropColumn(['image', 'gallery']);
        });
    }
};
