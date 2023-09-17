<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @OA\Patch(
     *  path="/api/v1/users/profile",
     *  summary="Update user profile",
     *   security={{"sanctum":{}}},
     * @OA\RequestBody(
     *     required=true,
     *    @OA\JsonContent(
     *      required={"name","email"},
     *     @OA\Property(property="name", type="string", example="John Doe"),
     *    @OA\Property(property="email", type="string", format="email", example="example@mail.com"),
     *    @OA\Property(property="password", type="string", format="password", example="password"),
     *   ),
     * ),
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.Auth::id(),
            'password' => 'sometimes|nullable|min:6'
        ]);

        $user = Auth::user();
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        if($request->filled('password')){
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
    /**
     * @OA\Get(
     *  path="/api/v1/users/profile",
     *  summary="Get user profile",
     *  security={{"sanctum":{}}},
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function getProfile() {
        return response()->json(Auth::user());
    }
}
