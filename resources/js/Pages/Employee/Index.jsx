import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { React, useState, useEffect } from 'react'


export const Index = ({auth, employees, queryParams = null, success}) => {
    queryParams = queryParams || {};
    const [showSuccess, setShowSuccess] = useState(!!success);

        useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000); // Hide after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [success]);
    const searchFieldName = (field, value) => {
        if(field){
            queryParams[field] = value;
        }else{
            delete queryParams[field];
        }
        router.get(route('employee.index', queryParams));
    };
    const onKeyPressed = (field, e) => {
        if(e.key === 'Enter'){
            searchFieldName(field, e.target.value);
        }else{
            return;
        }
    }

    const deleteEmployee = (employee) => {
        if (!window.confirm("Are you sure you want to delete this Employee?")) {
            return;
        }
        router.delete(route('employee.destroy', employee.id),{
            onSuccess: (page) => {
                if (page.props.success) {
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employee
                    </h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow transition-all'
                    href={route('employee.create')}>
                        Add Employee
                    </Link>
                </div>
            }
        >
            <Head title="Employee Page"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    {showSuccess && (<div className='bg-emerald-500 py-2 px-4 mb-4 text-white rounded'>
                        {success}
                    </div>)}
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Designation</th>
                                        <th className="px-3 py-2">Rank</th>
                                        <th className="px-3 py-2">Department</th>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Search by name"
                                                defaultValue={queryParams.name}
                                                onBlur={e => searchFieldName('name', e.target.value)}
                                                onKeyPress={e => onKeyPressed('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                onChange={e => searchFieldName('designation', e.target.value)}
                                                defaultValue={queryParams.designation}
                                            >
                                                <option value="">Search by designation</option>
                                                <option value="Faculty">Faculty</option>
                                                <option value="Admin">Admin</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                onChange={e => searchFieldName('rank', e.target.value)}
                                                defaultValue={queryParams.rank}
                                            >
                                                <option value="">Search by rank</option>
                                                <option value="Instructor">Instructor</option>
                                                <option value="Associate Professor">Associate Professor</option>
                                                <option value="Assistant Professor">Assistant Professor</option>
                                                <option value="Professor">Professor</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                onChange={e => searchFieldName('department', e.target.value)}
                                                defaultValue={queryParams.department}
                                            >
                                                <option value="">Search by department</option>
                                                <option value="ICT">ICT</option>
                                                <option value="CON">CON</option>
                                                <option value="COED">COED</option>
                                                <option value="DAS">DAS</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.data.map((employee) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={employee.id}>
                                            <td className="p-3">
                                                {employee.id}
                                            </td>
                                            <td className="py-3">
                                                {employee.name}
                                            </td>
                                            <td className="py-3">
                                                {employee.designation}
                                            </td>
                                            <td className="py-3">
                                                {employee.rank}
                                            </td><td className="py-3">
                                                {employee.department}
                                            </td>
                                            <td className="p-3 text-right">
                                                <a
                                                    href={route('employee.edit', employee.id)}
                                                    className="mx-1 bg-yellow-600 p-1 hover:bg-yellow-400 transition-all shadow rounded-lg text-gray-800 hover:text-gray-900"
                                                >View</a>
                                                <button onClick={() => deleteEmployee(employee)} className="bg-red-600 p-1 text-white rounded-lg shadow transition-all hover:bg-red-700">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={employees.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Index
