import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const setdata = (e) => {
    setEmail(e[0].email);
    setRole(e[0].role);
    setSalary(e[0].salary);
  };
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const readGoogleSheet = () => {
    fetch(`https://sheetdb.io/api/v1/bzqxs293k7h5w/search?id=${id}`)
      .then((response) => response.json())
      .then((data) => setdata(data));
  };
  const updateGoogleSheet = (id) => {
    fetch(`https://sheetdb.io/api/v1/bzqxs293k7h5w/id/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: id,
          email,
          role,
          salary,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/");
  };
  useEffect(() => {
    readGoogleSheet();
  }, []);
  return (
    <div className="formContainer">
      <h1>Edit Sheet</h1>
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
        <button onClick={() => updateGoogleSheet(id)}>Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default Edit;
