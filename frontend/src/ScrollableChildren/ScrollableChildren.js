import { useEffect, useState } from "react";
import Organization from "./Organization";
import Department from "./Department";
import Employee from "./Employee";
import Modal from "./Modal";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";
import axios from "axios";

function ScrollableChildren() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://13.234.254.110:5000/api/organization"
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    }
    fetchData();
  }, []);

  const handleOrganizationSelect = (org) => {
    setSelectedOrganization(org);
    setSelectedDepartment(null); // Reset department when organization changes
  };

  const handleUpdateClick = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleSaveModal = async () => {
    try {
      if (modalData.type === 'organization') {
        await axios.put(
          `http://13.234.254.110:5000/api/organization/update/${modalData.data._id}`,
          { name: modalData.data.name }
        );
      } else if (modalData.type === 'department') {
        await axios.put(
          `http://13.234.254.110:5000/api/organization/${selectedOrganization._id}/update-department/${modalData.data._id}`,
          { name: modalData.data.name }
        );
      } else if (modalData.type === 'employee') {
        await axios.put(
          `http://13.234.254.110:5000/api/organization/${selectedOrganization._id}/${selectedDepartment._id}/update-employee/${modalData.data._id}`,
          { name: modalData.data.name, position: modalData.data.position }
        );
      }
      setShowModal(false);
      setModalData(null);
      window.location.reload(); // Refresh the page to show the updated data
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <ReactSplit direction={SplitDirection.Horizontal}>
        <Organization
          organizations={organizations}
          setSelectedOrganization={handleOrganizationSelect}
          setOrganizations={setOrganizations}
          handleUpdateClick={handleUpdateClick}
        />
        {selectedOrganization && (
          <ReactSplit direction={SplitDirection.Vertical}>
            <Department
              organizationId={selectedOrganization._id}
              departments={selectedOrganization.departments}
              setDepartments={(newDepartments) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  departments: newDepartments,
                });
              }}
              setSelectedDepartment={setSelectedDepartment}
              handleUpdateClick={handleUpdateClick}
            />
            <Employee
              organizationId={selectedOrganization._id}
              departments={selectedOrganization.departments}
              selectedDepartment={selectedDepartment}
              handleUpdateClick={handleUpdateClick}
            />
          </ReactSplit>
        )}
      </ReactSplit>
      {modalData && (
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveModal}
          title={`Update ${modalData.type.charAt(0).toUpperCase() + modalData.type.slice(1)}`}
        >
          <div>
            <input
              type="text"
              value={modalData.data.name}
              onChange={(e) => setModalData({ ...modalData, data: { ...modalData.data, name: e.target.value } })}
              placeholder="Enter name"
              required
            />
            {modalData.type === 'employee' && (
              <input
                type="text"
                value={modalData.data.position}
                onChange={(e) => setModalData({ ...modalData, data: { ...modalData.data, position: e.target.value } })}
                placeholder="Enter position"
                required
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ScrollableChildren;
