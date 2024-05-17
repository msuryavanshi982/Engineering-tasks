import { useState } from "react";
import axios from "axios";
import "./TileX.css";

function Organization({ organizations, setSelectedOrganization, setOrganizations, handleUpdateClick }) {
  const [orgName, setOrgName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/organization/add",
        { name: orgName }
      );
      setSelectedOrganization(response.data);
      setOrganizations((prevOrganizations) => [...prevOrganizations, response.data]);
      setOrgName("");
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  return (
    <div className="tile-y">
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Enter organization name"
          required
        />
        <button type="submit">Add Organization</button>
      </form>
      {organizations.map((org, index) => (
        <div key={index} style={{ margin: "5px" }}>
          <div
            style={{ cursor: "pointer", display: "inline-block" }}
            onClick={() => setSelectedOrganization(org)}
          >
            <strong>{org.name}</strong>
          </div>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleUpdateClick({ type: 'organization', data: org })}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default Organization;
