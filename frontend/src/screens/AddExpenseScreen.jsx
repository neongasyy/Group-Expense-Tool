import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddExpense() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidTo, setPaidTo] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();

    console.log({
      expenseName,
      expenseDescription,
      amount,
      paidTo,
    });
  };

  return (
    <Form onSubmit={handleAddExpense}>
      <h3 className="mb-3">Add New Expense</h3>

      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" onChange={(e) => setExpenseName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={(e) => setExpenseDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Amount (S$)</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pay to:</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => setPaidTo(e.target.value)}>
          <option>Select a member</option>
          <option value="person1">Person1</option>
          <option value="person2">Person2</option>
          <option value="person3">Person3</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
}

export default AddExpense;
