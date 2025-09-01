<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beneficiary_livelihoods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('beneficiary_id'); // Changed from user_id to beneficiary_id
            $table->unsignedBigInteger('livelihood_category_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('beneficiary_id')
                ->references('id')
                ->on('users') // Still references users table, but column is named beneficiary_id
                ->cascadeOnDelete();

            $table->foreign('livelihood_category_id')
                ->references('id')
                ->on('livelihood_categories') // Adjust table name as needed
                ->cascadeOnDelete();
                
            // Add unique constraint to prevent duplicate entries
            $table->unique(['beneficiary_id', 'livelihood_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiary_livelihoods');
    }
};