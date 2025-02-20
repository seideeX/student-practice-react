<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'department' => ['required', Rule::in(["ICT", "CON", "COED", "DAS"])],
            'rank' => ['required', Rule::in(["Instructor", "Associate Professor", "Assistant Professor", "Professor"])],
            'designation' => ['required', Rule::in(["Faculty", "Admin"])],
        ];
    }
}
