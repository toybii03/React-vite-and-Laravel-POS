<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles if they don't already exist
        $cashierRole = Role::firstOrCreate(['name' => 'cashier']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $adminRole = Role::firstOrCreate(['name' => 'administrator']);

        // Create a manager user
        $manager = User::firstOrCreate([
            'email' => 'johnbenjie008@gmail.com',
        ], [
            'name' => 'John Benjie',
            'password' => bcrypt('Toybii2003'), // Ensure the password is hashed
        ]);

        // Assign the manager role to the user
        $manager->assignRole($managerRole);

        // Optionally, create additional users for other roles
        $cashier = User::firstOrCreate([
            'email' => 'cashier@example.com',
        ], [
            'name' => 'Cashier User',
            'password' => bcrypt('cashierpassword'),
        ]);
        $cashier->assignRole($cashierRole);

        $admin = User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('adminpassword'),
        ]);
        $admin->assignRole($adminRole);

        // Output a message to confirm seeding
        $this->command->info('Users and roles seeded successfully.');
    }
}
