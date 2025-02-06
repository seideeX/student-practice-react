import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";


export default function Create({auth}){
    const {data, setData, post, errors} = useForm({
        name: '',
        program: '',
        address: '',
        specialization: '',
        year: ''
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route('student.store'));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add a Student
                </h2>
            }
        >
        <Head title="Add Student" />
        <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                            <div className="mt-2">
                                <InputLabel htmlFor='student-name' value={'Student Name'} className='text-white'/>
                                <TextInput id="student-name"
                                name='name'
                                value={data.name}
                                isFocused={true}
                                className='block w-full mt-1'
                                onChange={e => {setData('name', e.target.value)}}/>
                                <InputError message={errors.name} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='student-program' value={'Student Program'} className='text-white'/>
                                <TextInput id="student-program"
                                name='program'
                                value={data.program}
                                className='block w-full mt-1'
                                onChange={e => {setData('program', e.target.value)}}/>
                                <InputError message={errors.program} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='student-specialization' value={'Student Specialization'} className='text-white'/>
                                <SelectInput
                                id="student-specialization"
                                name="specialization"
                                className='block w-full mt-1'
                                onChange={e => {setData('specialization', e.target.value)}}
                                >
                                    <option value="">Select Specialization</option>
                                    <option value="wmad">Web and Mobile Application Development</option>
                                    <option value="ns">Network and Security</option>
                                </SelectInput>
                                <InputError message={errors.program} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='student-year' value={'Student Year'} className='text-white'/>
                                <TextInput id="student-year"
                                name='year'
                                value={data.year}
                                className='block w-full mt-1'
                                onChange={e => {setData('year', e.target.value)}}/>
                                <InputError message={errors.year} className='mt-2'/>
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor='student-address' value={'Student Address'} className='text-white'/>
                                <TextInput id="student-address"
                                name='address'
                                value={data.address}
                                className='block w-full mt-1'
                                onChange={e => {setData('address', e.target.value)}}/>
                                <InputError message={errors.address} className='mt-2'/>
                            </div>
                            <div className='mt-4 text-right'>
                                <Link href={route('student.index')}
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
