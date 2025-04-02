<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use Exception;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Employee::query();

        $sortField = request("sortField", "id");
        $sortDirection = request("sortDirection", "asc");

        if (request('name')){
            $query->where('name', 'like', '%'.request('name').'%');
        }
        if(request('department')){
            $query->where('department', request('department'));
        }
        if(request('rank')){
            $query->where('rank', request('rank'));
        }
        if(request('designation')){
            $query->where('designation', request('designation'));
        }

        $employees = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render('Employee/Index', [
            'employees' =>  EmployeeResource::collection($employees),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Employee/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data = $request->validated();
        try{
            Employee::create($data);
            return to_route('employee.index')->with('success', 'Employee is Successfully created.');
        }catch (Exception $e) {
            return response()->json(['error' => 'Failed to create Employee', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render("Employee/Edit", [
            "employee" => new EmployeeResource($employee)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
        try{
            $employee->update($data);
            return to_route('employee.index')->with('success', 'Employee is updated successfully.');
        }catch (Exception $e) {
            return response()->json(['error' => 'Failed to create employee', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return to_route('employee.index')->with('success', 'Employee is deleted successfully.');
    }
}
