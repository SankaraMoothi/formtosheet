import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const readGoogleSheet = () => {
    location.reload();
    fetch("https://sheetdb.io/api/v1/bzqxs293k7h5w")
      .then((response) => response.json())
      .then((data) => setdata(data));
  };

  useEffect(() => {
    readGoogleSheet();
  }, []);
  const EditSheet = (e) => {
    navigate(`/edit/${e}`);
  };
  const DeleteSheet = (e) => {
    fetch(`https://sheetdb.io/api/v1/bzqxs293k7h5w/id/${e}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    readGoogleSheet();
  };
  return (
    <div className="container">
      <nav>
        <h1>Sheet</h1>
        <button onClick={() => navigate("/add")}>Add</button>
      </nav>
      <table>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Salary</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data?.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.email}</td>
              <td>{val.role}</td>
              <td>{val.salary}</td>
              <td className="button" onClick={() => EditSheet(val.id)}>
                ✒️
              </td>
              <td className="button" onClick={() => DeleteSheet(val.id)}>
                ❌
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Home;
