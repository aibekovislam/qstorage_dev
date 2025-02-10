import { Employees } from '@/pages/employees'

const Page = async ({ params }: { params: { employee_id: string } }) => {
  const { employee_id } = await params

  return <Employees.Pages.Edit employee_id={employee_id} />
}

export default Page
