import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
            <a href='/get'>Employee List</a>
            <a href='/create'>Create Employee</a>
            
          </ul>
        </nav>
        
        <Routes>
          <Route path="/get" element={<EmployeeList />} />
          <Route path="/create" element={<CreateEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;