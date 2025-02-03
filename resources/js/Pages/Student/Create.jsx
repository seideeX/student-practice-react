import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


export default function Create({}){
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add a Student
                </h2>
            }
        >
            <Head title="Add Student " />


        </AuthenticatedLayout>
    )
}
