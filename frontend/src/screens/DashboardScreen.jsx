import axios from "axios";
import { useEffect, useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";

const DashboardScreen = () => {
  
  const [balances, setBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const uid = localStorage.getItem("uid");
  axios.post(`${BASE_URL}/balance`, { uid });

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.post(`${BASE_URL}/balance`, { uid });
        setBalances(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching balances:", error);
        setIsLoading(false);
      }
    }
    fetchBalances();
  }, []);

  return (
    <>
      <h1>Total Outstanding: </h1>
      <br />
      <Link to="/groups" style={{ textDecoration: "none" }}>
        <Card style={{ width: "100%", marginBottom: "20px", cursor: "pointer" }} className="dashboard-cards">
          <Card.Body>
            <Card.Title>
              Group Name 1 <p style={{ float: "right" }}>$100.50</p>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>

      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>Group Name 2</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>Group Name 3</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>Group Name 4</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Link to="/creategroup">
        <Button
          variant="primary"
          size="lg"
          style={{
            right: 0,
            float: "right",
            position: "fixed",
            bottom: 0,
            marginBottom: "10px",
            marginRight: "10px",
            borderRadius: "50px",
          }}
        >
          <PlusCircle size={"30px"} />
        </Button>
      </Link>
    </>
  );
};

export default DashboardScreen;
