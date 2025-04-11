import React, { useState } from 'react'
import axios from 'axios'

const CreateEmployee = () => {
    // state to hold form input values
    const[employee , setEmployee] = useState({
        Name : '',
        id : null,
        email :'',
        department : '',
        position:''
    });
    

    const[message, setMessage] = useState('');

    const handleInputChanges = (e) => {
        const { name, value} = e.target;
        setEmployee({
            ...employee,
            [name] : value
        });
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/employees', employee);
            setMessage('Employee Created Successfully!');
            setEmployee({ Name :'',email:'', department:'',position:''});

        }catch(error){
        setMessage('Error creating employee..');
        }
    };

    return (
        <div>
            <h1 className='createHead'> Create new Employee</h1>
            <form onSubmit={handleSubmit}>
                
               
                <div>
                    <label>Name:</label>
                    <input type='text' name='Name' value={employee.Name} onChange={handleInputChanges} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type='email' name='email' value={employee.email} onChange={handleInputChanges} required />
                </div>
                <div>
                    <label>Department:</label>
                    <input type='text' name='department' value={employee.department} onChange={handleInputChanges} required />
                </div>
                <div>
                    <label>Position:</label>
                    <input type='text' name='position' value={employee.position} onChange={handleInputChanges} required />
                </div>
                <div>
                <button className="subbutton" type='submit'>Create </button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    )

}

export default CreateEmployee