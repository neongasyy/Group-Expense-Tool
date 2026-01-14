import { Card, Col, Row, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

// Temporary mock data (replace with real API call when backend endpoints exist)
const MOCK_GROUPS = [
  {
    id: "g-1",
    expenseName: "Groceries",
    moneyOwed: 35,
  },
  {
    id: "g-2",
    expenseName: "Shopping",
    moneyOwed: 15,
  },
];

const GroupDetailsPage = () => {
    return (
      <div className="mx-auto" style={{ maxWidth: 980 }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="mb-1">Group-ID</h2>
            <div className="text-muted">Total amount of money owed= $50.00</div>
          </div>
          <Button variant="outline-primary" disabled>
            + Manage Group Settings
          </Button>
        </div>
  
        <Row className="g-3">
          {MOCK_GROUPS.map((g) => (
            <Col key={g.id} xs={12} md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <Card.Title className="mb-1">{g.expenseName}</Card.Title>
                      <div className="text-muted">{g.expenseName} members</div>
                    </div>
                    <Badge bg={g.moneyOwed > 0 ? "warning" : "secondary"}>
                      ${g.moneyOwed.toFixed(2)} owed
                    </Badge>
                  </div>
  
                  <div className="mt-3" />
                  <div className="mt-auto d-flex justify-content-end">
                    <Button as={Link} to={`/groups/${g.id}`} variant="primary">
                      Open
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
};

export default GroupDetailsPage;
