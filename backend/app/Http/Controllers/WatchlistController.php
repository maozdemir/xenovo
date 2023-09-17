<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    /**
     * @OA\Post(
     *  path="/api/v1/watchlist",
     *   security={{"sanctum":{}}},
     *  summary="Add movie to watchlist",
     *  @OA\RequestBody(
     *      required=true,
     *      @OA\JsonContent(
     *          required={"movie_id"},
     *          @OA\Property(property="movie_id", type="integer", example="1"),
     *      ),
     *  ),
     *  @OA\Response(response="201", description="Successful operation"),
     *)
     */
    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'required',
        ]);

        $watchlist = new Watchlist;
        $watchlist->user_id = Auth::id();
        $watchlist->movie_id = $request->movie_id;
        $watchlist->save();

        return response()->json($watchlist, 201);
    }

    /**
     * @OA\Get(
     *  path="/api/v1/watchlist",
     *  summary="Get all movies in the watchlist",
     *   security={{"sanctum":{}}},
     *  @OA\Response(response="200", description="Successful operation"),
     *)
     */
    public function index()
    {
        $watchlists = Watchlist::where('user_id', Auth::id())->get();

        return response()->json($watchlists);
    }
    /**
     * @OA\Delete(
     *  path="/api/v1/watchlist/{movie_id}",
     *  summary="Remove from watchlist by movie id",
     *  security={{"sanctum":{}}},
     *  @OA\Parameter(
     *      name="movie_id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *          type="integer"
     *      )
     *  ),
     *  @OA\Response(response="204", description="Successful operation"),
     *  @OA\Response(response="404", description="Not Found"),
     *)
     */
    public function destroy($movie_id)
    {
        $watchlist = Watchlist::where([
            'user_id' => Auth::id(),
            'movie_id' => $movie_id
        ])->first();

        if ($watchlist) {
            $watchlist->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Watchlist not found'], 404);
    }
}
