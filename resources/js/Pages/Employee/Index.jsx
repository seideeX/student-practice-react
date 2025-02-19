import Pagination from '@/Components/Pagination'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export const Index = ({auth, employees}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employee
                    </h2>
                </div>
            }
        >
            <Head title="Employee Page"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Designation</th>
                                        <th className="px-3 py-2">Rank</th>
                                        <th className="px-3 py-2 text-right">Actions</th>
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
                                            </td>
                                            <td className="p-3 text-right">
                                                <a
                                                    href={route('employee.edit', employee.id)}
                                                    className="mx-1 bg-yellow-600 p-1 hover:bg-yellow-400 transition-all shadow rounded-lg text-gray-800 hover:text-gray-900"
                                                >View</a>
                                                <button className="bg-red-600 p-1 text-white rounded-lg shadow transition-all hover:bg-red-700">Delete</button>
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
