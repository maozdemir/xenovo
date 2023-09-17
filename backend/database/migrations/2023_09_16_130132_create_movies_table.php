<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id('id')->autoIncrement();
            $table->boolean('adult');
            $table->text('backdrop_path')->nullable();
            $table->json('genre_ids');
            $table->string('original_language');
            $table->string('original_title');
            $table->text('overview');
            $table->decimal('popularity', 8, 3);
            $table->text('poster_path')->nullable();
            $table->date('release_date');
            $table->string('title');
            $table->boolean('video');
            $table->decimal('vote_average', 3, 1);
            $table->integer('vote_count');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
