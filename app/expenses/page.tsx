import ExpensesClient from '@/components/expenses/ExpensesClient'

export default function ExpensesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>
      <ExpensesClient />
    </div>
  )
}
