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
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
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
        $data = $request->validated();
        try{
            Student::create($data);
            return to_route('student.index')->with('success', 'Student is Successfully created.');
        }catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create student', 'message' => $e->getMessage()], 500);
        }

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
        return Inertia::render('Student/Edit', [
            'student' => new StudentResource($student)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $data = $request->validated();
        try{
            $student->update($data);
            return to_route('student.index')->with('success', 'Student is updated successfully.');
        }catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create student', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return to_route('student.index')->with('success', 'Student is deleted successfully.');
    }
}
