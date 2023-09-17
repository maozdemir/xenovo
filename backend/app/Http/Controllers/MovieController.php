<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class MovieController extends Controller
{
    /**
     * @OA\Get(
     *  path="/api/v1/movies/popular",
     *  summary="Get popular movies",
     *  @OA\Parameter(
     *      name="page",
     *      in="query",
     *      description="Page number",
     *      required=false,
     *      @OA\Schema(
     *          type="integer"
     *      )
     *  ),
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function listPopularMovies(Request $request)
    {
        $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
            'api_key' => env('TMDB_API_KEY'),
            'page' => $request->input('page', 1),
        ]);

        $movies = $response->json()['results'];
        $movies = $this->appendWatchlistInfo($movies);

        return response()->json($movies);
    }
    /**
     * @OA\Get(
     *  path="/api/v1/movies/search",
     *  summary="Search movies",
     *  @OA\Parameter(
     *      name="query",
     *      in="query",
     *      description="Search query",
     *      required=true,
     *      @OA\Schema(
     *          type="string"
     *      )
     *  ),
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function searchMovies(Request $request)
    {
        $query = $request->input('query');

        $response = Http::get('https://api.themoviedb.org/3/search/movie', [
            'api_key' => env('TMDB_API_KEY'),
            'query' => $query,
        ]);

        $movies = $response->json()['results'];

        $movies = $this->appendWatchlistInfo($movies);

        return response()->json($movies);
    }
    /**
     * @OA\Get(
     *  path="/api/v1/movies/{id}",
     *  summary="Get movie by id",
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      description="Movie id",
     *      required=true,
     *      @OA\Schema(
     *          type="integer"
     *      )
     *  ),
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function getMovie($id)
    {


        $response = Http::get('https://api.themoviedb.org/3/movie/'.$id, [
            'api_key' => env('TMDB_API_KEY'),
        ]);
        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();

        return response()->json(json_decode($body, true), $statusCode);
    }

    public function appendWatchlistInfo($movies)
    {
        try {
            $user = Auth::guard('api')->user();
            $watchlistedMovies = Watchlist::where('user_id', $user->id)
                ->whereIn('movie_id', array_column($movies, 'id'))
                ->pluck('movie_id')
                ->toArray();

            foreach ($movies as &$movie) {
                $movie['watchlisted'] = in_array($movie['id'], $watchlistedMovies);
            }

            return $movies;
        } catch (\Throwable $th) {
            return $movies;
        }
    }
}
