<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
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
            'program' => "Bachelor of Science in Information Technology",
            'specialization' => $this->faker->randomElement(['wmad', 'ns']),
            'address' => $this->faker->address(),
            'year' => $this->faker->numberBetween(1, 4)
        ];
    }
}
