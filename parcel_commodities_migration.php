<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parcel_commodities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_parcel_id')->constrained('farm_parcels')->onDelete('cascade');
            
            // CROP/COMMODITY Information
            $table->enum('commodity_type', ['rice', 'corn', 'hvc', 'livestock', 'poultry', 'agri_fisher']);
            
            // For Livestock & Poultry - specify type of animal
            $table->string('animal_type')->nullable();
            
            // SIZE (ha) - Area allocated to this specific commodity
            $table->decimal('size_hectares', 10, 2);
            
            // NO. OF HEAD (For Livestock and Poultry)
            $table->integer('number_of_heads')->default(0);
            
            // FARM TYPE
            $table->enum('farm_type', ['irrigated', 'rainfed upland', 'rainfed lowland'])->nullable();
            
            // ORGANIC PRACTITIONER (Y/N)
            $table->boolean('is_organic_practitioner')->default(false);
            
            // REMARKS
            $table->text('remarks')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parcel_commodities');
    }
};
