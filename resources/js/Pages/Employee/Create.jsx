import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const Create = ({auth}) => {
    const {data, setData, post, errors} = useForm({
        name: '',
        designation: '',
        rank: '',
        department: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('employee.store'));
    }
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add An Employee
                    </h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow transition-all'
                    href={route('employee.index')}>
                        Return
                    </Link>
                </div>
            }
        >
            <Head title="Employee Page"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                            <div className="mt-2">
                                <InputLabel htmlFor='employee-name' value={'Employee Name'} className='text-white'/>
                                <TextInput id="employee-name"
                                name='name'
                                value={data.name}
                                isFocused={true}
                                className='block w-full mt-1'
                                onChange={e => {setData('name', e.target.value)}}/>
                                <InputError message={errors.name} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='employee-designation' value={'Employee Designation'} className='text-white'/>
                                <SelectInput
                                id="employee-designation"
                                name="designation"
                                className='block w-full mt-1'
                                onChange={e => {setData('designation', e.target.value)}}
                                >
                                    <option value="">Select Designation</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Admin">Admin</option>
                                </SelectInput>
                                <InputError message={errors.designation} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='employee-department' value={'Employee Department'} className='text-white'/>
                                <SelectInput
                                id="employee-department"
                                name="department"
                                className='block w-full mt-1'
                                onChange={e => {setData('department', e.target.value)}}
                                >
                                    <option value="">Select Department</option>
                                    <option value="CON">CON</option>
                                    <option value="ICT">ICT</option>
                                    <option value="COED">COED</option>
                                    <option value="DAS">DAS</option>
                                </SelectInput>
                                <InputError message={errors.department} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='employee-rank' value={'Employee Rank'} className='text-white'/>
                                <SelectInput
                                id="employee-rank"
                                name="rank"
                                className='block w-full mt-1'
                                onChange={e => {setData('rank', e.target.value)}}
                                >
                                    <option value="">Select Rank</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Associate Professor">Associate Professor</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Professor">Professor</option>
                                </SelectInput>
                                <InputError message={errors.rank} className='mt-2'/>
                            </div>
                            <div className='mt-4 text-right'>
                                <Link href={route('employee.index')}
                                className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
                                    Cancel
                                </Link>
                                <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Create
