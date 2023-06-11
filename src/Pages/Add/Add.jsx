import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.css";
const Add = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const createGoogleSheet = () => {
    fetch("https://sheetdb.io/api/v1/bzqxs293k7h5w", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: "=ROW()-1",
            email,
            role,
            salary,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/");
  };
  return (
    <div className="formContainer">
      <h1>Add Data</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Enter the Email"
        />
      </div>

      <div>
        <label htmlFor="role">Roles</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          type="text"
          id="role"
          placeholder="Enter the Role"
        />
      </div>
      <div>
        <label htmlFor="salary">Salary</label>
        <input
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          type="text"
          id="salary"
          placeholder="Enter the Salary"
        />
      </div>
      <div>
        <button onClick={() => createGoogleSheet()}>Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default Add;
