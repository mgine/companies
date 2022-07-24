<?php

use App\Http\Controllers\CompaniesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::apiResource('companies', CompaniesController::class, ['except' => 'destroy', 'names' => 'companies']);

Route::get('company/statuses', function (){

    $ret = [];

    foreach (\App\Enums\CompanyStatus::cases() as $status){
        $ret[] = [
            'name' => $status->value
        ];
    }

    return $ret;
});
