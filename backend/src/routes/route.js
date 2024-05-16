const express = require("express");
const router = express.Router();
const Organization = require("../models/organizationModel");
const Department = require("../models/departmentModel");
const Employee = require("../models/employeeModel");

let addCount = 0;
let updateCount = 0;

// Create organization
router.post("/add", async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    addCount++;
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add department to organization
router.post("/:orgId/add-department", async (req, res) => {
  try {
    const { orgId } = req.params;
    const department = new Department({
      ...req.body,
      organization: orgId,
    });
    await department.save();

    const organization = await Organization.findById(orgId);
    organization.departments.push(department._id);
    await organization.save();
    addCount++;
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add employee to department
router.post("/:orgId/:deptId/add-employee", async (req, res) => {
  try {
    const { deptId } = req.params;
    const employee = new Employee({
      ...req.body,
      department: deptId,
    });
    await employee.save();

    const department = await Department.findById(deptId);
    department.employees.push(employee._id);
    await department.save();
    addCount++;
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update organization
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    updateCount++;
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update department
router.put("/:orgId/update-department/:deptId", async (req, res) => {
  try {
    const { deptId } = req.params;
    const updatedDepartment = await Department.findByIdAndUpdate(
      deptId,
      req.body,
      { new: true }
    );
    updateCount++;
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put("/:orgId/:deptId/update-employee/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(empId, req.body, {
      new: true,
    });
    updateCount++;
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get count of add and update operations
router.get("/count", (req, res) => {
  res.status(200).json({ addCount, updateCount });
});

// Get organization with departments and employees
router.get("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).populate({
      path: "departments",
      populate: { path: "employees" },
    });
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
