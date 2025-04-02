import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { STUDENT_SPEC_TEXT_MAP, STUDENT_SPEC_CLASS_MAP } from '@/constants';
import { useEffect, useState } from 'react';
import TableHeader from '@/Components/TableHeader';

export default function Index({students, queryParams = null, success}) {
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
        router.get(route('student.index', queryParams));
    };

    const onKeyPressed = (field, e) => {
        if(e.key === 'Enter'){
            searchFieldName(field, e.target.value);
        }else{
            return;
        }
    }

    const sortChanged = (name) => {
        if(queryParams.sortField === name){
            queryParams.sortDirection = queryParams.sortDirection === 'asc' ? 'desc' : 'asc';
        }else{
            queryParams.sortField = name;
            queryParams.sortDirection = 'desc';
        }

        router.get(route('student.index', queryParams));
    }

    const deleteProject = (student) => {
        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }
        router.delete(route('student.destroy', student.id),{
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
                        Student
                    </h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow transition-all'
                    href={route('student.create')}>
                        Add Student
                    </Link>
                </div>

            }
        >
            <Head title="Student Page" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {showSuccess && (<div className='bg-emerald-500 py-2 px-4 mb-4 text-white rounded'>
                        {success}
                    </div>)}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr className="text-nowrap">
                                        <TableHeader name="id"
                                            sortField={queryParams.sortField}
                                            sortDirection={queryParams.sortDirection}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeader>
                                        <TableHeader name="name"
                                            sortField={queryParams.sortField}
                                            sortDirection={queryParams.sortDirection}
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeader>
                                        <TableHeader name="program"
                                            sortField={queryParams.sortField}
                                            sortDirection={queryParams.sortDirection}
                                            sortChanged={sortChanged}
                                        >
                                            Program
                                        </TableHeader>
                                        <TableHeader name="specialization"
                                            sortField={queryParams.sortField}
                                            sortDirection={queryParams.sortDirection}
                                            sortChanged={sortChanged}
                                        >
                                            Specialization
                                        </TableHeader>
                                        <TableHeader name="year"
                                            sortField={queryParams.sortField}
                                            sortDirection={queryParams.sortDirection}
                                            sortChanged={sortChanged}
                                        >
                                            Year
                                        </TableHeader>
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
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                onChange={e => searchFieldName('specialization', e.target.value)}
                                                defaultValue={queryParams.specialization}
                                            >
                                                <option value="">Search by specialization</option>
                                                <option value="wmad">Web and Mobile Application Development</option>
                                                <option value="ns">Network and Security</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.data.map((student) => (
                                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={student.id}>
                                            <td className="p-3">
                                                {student.id}
                                            </td>
                                            <td className="p-3">
                                                {student.name}
                                            </td>
                                            <td className="p-3">
                                                {student.program}
                                            </td>
                                            <td className="p-3">
                                                <span
                                                    className={
                                                        'px-2 py-1 rounded text-xs text-gray-800 ' +
                                                        STUDENT_SPEC_CLASS_MAP[student.specialization]
                                                    }>
                                                    {STUDENT_SPEC_TEXT_MAP[student.specialization]}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {student.year}
                                            </td>
                                            <td className="p-3 text-nowrap">
                                                <a
                                                    href={route('student.edit', student.id)}
                                                    className="mx-1 bg-yellow-600 p-1 hover:bg-yellow-400 transition-all shadow rounded-lg text-gray-800 hover:text-gray-900"
                                                >View</a>
                                                <button onClick={e => deleteProject(student)} className="bg-red-600 p-1 text-white rounded-lg shadow transition-all hover:bg-red-700">Delete</button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={students.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
