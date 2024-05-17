import React, { useState, useEffect } from "react";
import axios from "axios";

function Employee({ organizationId, selectedDepartment, handleUpdateClick }) {
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeePosition, setNewEmployeePosition] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch the list of employees initially and whenever the selected department changes
    if (selectedDepartment) {
      fetchEmployees();
    } else {
      setEmployees([]); // Clear employees when there is no selected department
    }
  }, [selectedDepartment]);

  const fetchEmployees = async () => {
    try {
      if (selectedDepartment) {
        const response = await axios.get(
          `http://13.234.254.110:5000/api/organization/${organizationId}/${selectedDepartment._id}/employees`
        );
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post(
        `http://13.234.254.110:5000/api/organization/${organizationId}/${selectedDepartment._id}/add-employee`,
        {
          name: newEmployeeName,
          position: newEmployeePosition
        }
      );
      fetchEmployees(); // Fetch the updated list of employees after adding a new employee
      setNewEmployeeName("");
      setNewEmployeePosition(""); // Clear the input fields
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="tile-y">
      {selectedDepartment ? (
        <>
          <div>
            <input
              type="text"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              required
            />
            <input
              type="text"
              value={newEmployeePosition}
              onChange={(e) => setNewEmployeePosition(e.target.value)}
              placeholder="Enter employee position"
              required
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
          </div>
          <div>
            <strong>List of Employees:</strong>
            <ul>
              {employees.map((emp, index) => (
                <li key={index} style={{ margin: "5px" }}>
                  <span>{emp.name} - {emp.position}</span>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleUpdateClick({ type: 'employee', data: emp })}
                  >
                    Update
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Please select a department to view employees.</div>
      )}
    </div>
  );
}

export default Employee;
