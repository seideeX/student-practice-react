import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { STUDENT_SPEC_TEXT_MAP, STUDENT_SPEC_CLASS_MAP } from '@/constants';

export default function Index({students, queryParams = null}) {
    queryParams = queryParams || {};

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

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Student
                    </h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow transition-all'
                    href={route('student.create')}>
                        Add Project
                    </Link>
                </div>

            }
        >
            <Head title="Student Page" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Program</th>
                                        <th className="px-3 py-2">Specialization</th>
                                        <th className="px-3 py-2">Year</th>
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
                                            <td className="p-3 text-right">
                                                <a
                                                    href={route('student.show', student.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >View</a>
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
