<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Routing\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['role:manager|administrator'])->group(function () {
    Route::get('/reports', [ReportController::class, 'index']);
    Route::get('reports/sales', [ReportController::class, 'sales']);
    // Add more manager/admin routes here
});

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['role:administrator'])->group(function () {
    Route::post('/users', [UserController::class, 'store']);
});

// Product management: manager and admin only
Route::middleware(['role:manager|administrator'])->group(function () {
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
});

// Payments: cashier, manager, admin
Route::middleware(['role:cashier|manager|administrator'])->group(function () {
    Route::post('/payments', [PaymentController::class, 'store']);
});

// Public product viewing
Route::apiResource('products', ProductController::class)->only(['index', 'show']);

Route::middleware(['permission:manage products'])->group(function () {
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
});

Route::middleware(['permission:view reports'])->group(function () {
    Route::get('/reports', [ReportController::class, 'index']);
    Route::get('reports/sales', [ReportController::class, 'sales']);
});
Route::middleware(['permission:process payments'])->group(function () {
    Route::post('/payments', [PaymentController::class, 'store']);
});
