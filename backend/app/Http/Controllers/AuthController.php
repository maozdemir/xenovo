<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    /**
     * Login user and generate token.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */

    /**
     * @OA\Post(
     *  path="/api/v1/users/login",
     *  summary="Login user and generate token",
     *  @OA\RequestBody(
     *      required=true,
     *      @OA\JsonContent(
     *          required={"email","password"},
     *          @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *          @OA\Property(property="password", type="string", format="password", example="password"),
     *      ),
     *  ),
     *  @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => 'Invalid credentials',
            ]);
        }

        $user = Auth::user();
        $user->tokens()->delete();
        $accessToken = $user->createToken('authToken')->plainTextToken;
        $accessTokenArray = explode('|', $accessToken);
        $accessToken = end($accessTokenArray);

        return response()->json([
            'access_token' => $accessToken,
        ]);
    }

    /**
     * Register a new user.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    /**
     * @OA\Post(
     *    path="/api/v1/users/register",
     *    summary="Register a new user",
     *   @OA\RequestBody(
     *     required=true,
     *    @OA\JsonContent(
     *      required={"name","email","password"},
     *     @OA\Property(property="name", type="string", example="Alper Ozdemir"),
     *    @OA\Property(property="email", type="string", format="email", example="mail@example.com"),
     *   @OA\Property(property="password", type="string", format="password", example="password"),
     * ),
     * ),
     *   @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->plainTextToken;
        $accessTokenArray = explode('|', $accessToken);
        $accessToken = end($accessTokenArray);

        return response()->json([
            'access_token' => $accessToken,
        ]);
    }

    /**
     * Logout user (revoke the token).
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *   path="/api/v1/users/logout",
     *   security={{"sanctum":{}}},
     *   summary="Logout user (revoke the token)",
     *   @OA\Response(response="200", description="Successful operation"),
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout successful']);
    }
}
