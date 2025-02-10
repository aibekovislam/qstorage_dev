import { Employees } from '@/pages/employees'

const Page = ({ params }: { params: { employee_id: string } }) => <Employees.Pages.Edit employee_id={params.employee_id} />

export default Page
