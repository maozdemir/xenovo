<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'adult',
        'backdrop_path',
        'genre_ids',
        'original_language',
        'original_title',
        'overview',
        'popularity',
        'poster_path',
        'release_date',
        'title',
        'video',
        'vote_average',
        'vote_count'
    ];

    /**
     * Cast properties to their correct type.
     */
    protected $casts = [
        'id' => 'integer',
        'adult' => 'boolean',
        'genre_ids' => 'array',
        'popularity' => 'float',
        'video' => 'boolean',
        'vote_average' => 'float',
        'vote_count' => 'integer'
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['watchlists'];

    /**
     * Get the watchlists for the movie.
     */
    public function watchlists()
    {
        return $this->hasMany(Watchlist::class);
    }
}
