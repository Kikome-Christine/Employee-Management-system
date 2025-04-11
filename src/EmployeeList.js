import { useState, useEffect } from "react";
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee'; // Import the modal component

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // State for selected employee ID

    // Fetch employees from API
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/employees");
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    };

    // Update employee logic
    const updateEmployee = (employeeId) => {
        setSelectedEmployeeId(employeeId); // Set the selected employee ID
        setShowModal(true); // Show the modal
    };

    // Delete employee logic
    const deleteEmployee = async (employeeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
            try {
                await axios.delete(`/api/employees/${employeeId}`);
                alert("Employee deleted successfully");
                fetchEmployees(); // Refresh the employee list after deletion
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee");
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleModalClose = () => {
        setShowModal(false); // Close the modal
        setSelectedEmployeeId(null); // Clear the selected employee ID
    };

    if (loading) return <div className='text-center mt-5'>Loading...</div>;
    if (error) return <div className='alert alert-danger text-center'>{error}</div>;

    return (
        <div className='container mt-5'>
            <h1 className='createHead text-center mb-4'>Employee List</h1>
            <button className='subbutton mb-4' onClick={fetchEmployees}>Refresh List</button>
    
            {employees.length === 0 ? (
                <p>No Employees found</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                               <th>Email</th>
                                <th>Department</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.Name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                className="subbutton btn btn-primary"
                                                onClick={() => updateEmployee(employee.id)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="subbutton btn btn-danger"
                                                onClick={() => deleteEmployee(employee.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
    
            {/* Render the UpdateEmployee modal */}
            {showModal && (
                <UpdateEmployee
                    employeeId={selectedEmployeeId}
                    onClose={handleModalClose}
                    onUpdate={fetchEmployees}
                />
            )}
        </div>
    );
    
};

export default EmployeeList;