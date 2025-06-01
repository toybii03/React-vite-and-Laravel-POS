<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'John Benjie',
            'email' => 'johnbenjie008@gmail.com',
        ]);

        // Create roles
        Role::create(['name' => 'cashier']);
        Role::create(['name' => 'manager']);
        Role::create(['name' => 'administrator']);

        // Assign role to user
        $user = User::find(1);
        $user->assignRole('manager');
    }
}
