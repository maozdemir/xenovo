<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
    return $request->user();
});
Route::group([
    'prefix' => 'v1'
], function () {
    Route::post('/users/login', [AuthController::class, 'login'])->name('login');
    Route::post('/users/register', [AuthController::class, 'register'])->name('users.register');
    Route::get('/movies/popular', [MovieController::class, 'listPopularMovies'])->name('movies.popular');
    Route::get('/movies/search', [MovieController::class, 'searchMovies'])->name('movies.search');
    Route::get('/movies/{movie_id}', [MovieController::class, 'getMovie'])->name('movies.get');
    Route::middleware('auth:api')->group(function() {
        Route::patch('/users/profile', [UserController::class, 'updateProfile'])->name('users.profile');
        Route::get('/users/profile', [UserController::class, 'getProfile'])->name('users.profile');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/watchlist', [WatchlistController::class, 'store'])->name('watchlist.store');
        Route::get('/watchlist', [WatchlistController::class, 'index'])->name('watchlist.index');
        Route::delete('/watchlist/{movie_id}', [WatchlistController::class, 'destroy'])->name('watchlist.destroy');
    });
});
