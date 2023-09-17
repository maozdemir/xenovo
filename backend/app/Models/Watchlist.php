<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'movie_id',
    ];

    /**
     * Get the user that owns the watchlist.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the movie that is in the watchlist.
     */
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}
