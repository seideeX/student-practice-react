<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use Inertia\Inertia;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Student::query();

        if(request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if(request('specialization')) {
            $query->where('specialization', request('specialization'));
        }

        $students = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Student/Index', [
            'students' => StudentResource::collection($students),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Student/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        dd($student->getAttribute('name'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
