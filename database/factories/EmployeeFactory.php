<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'rank' => $this->faker->randomElement(["Instructor", "Associate Professor", "Assistant Professor", "Porfessor"]),
            "department" => $this->faker->randomElement(["ICT", "CON", "COED", "DAS"]),
            "designation" => $this->faker->randomElement(["Faculty", "Admin"]),
        ];
    }
}
