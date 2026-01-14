
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../constants";

function CreateGroup() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  // mock name resolver (backend later)
  const resolveUserName = () => {
    return `User ${members.length + 1}`;
  };

  const handleAddMember = () => {
    if (!memberInput.trim()) return;

    const name = resolveUserName();
    setMembers([...members, name]);
    setMemberInput("");
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }

    setError("");

    // later: call backend API here

    console.log("Created group:", {
      groupName,
      members,
    });

    // redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <Form onSubmit={handleCreateGroup}>
      <h3 className="mb-3">Create Group</h3>

      {/* Group Name */}
      <Form.Group className="mb-3" controlId="groupName">
        <Form.Label>Group Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Japan Trip"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Add Member */}
      <Form.Group className="mb-3" controlId="addMember">
        <Form.Label>Add Member (Email / Phone)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
          />
          <Button variant="secondary" onClick={handleAddMember}>
            Add
          </Button>
        </div>
      </Form.Group>

      {/* Members List */}
      <Form.Group className="mb-3">
        <Form.Label>Members</Form.Label>

        {members.length === 0 ? (
          <div className="text-muted">No members added</div>
        ) : (
          members.map((name, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>{name}</Card.Body>
            </Card>
          ))
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Group
      </Button>
    </Form>
  );
}

export default CreateGroup;