import React from 'react'
import Card from '../CreditCard/Card'

const Dashboard: React.FC = () => {
  // Your logic for sorting and managing cards

  return (
    <div>
      <Card title="Card 1" dueDate="2023-12-01" amountDue={100} />
      <br />
      <Card title="Card 2" dueDate="2023-12-15" amountDue={150} />
      {/* Add more Card components as needed */}
    </div>
  )
}

export default Dashboard
