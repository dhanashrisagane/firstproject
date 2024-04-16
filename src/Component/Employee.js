import React, { useState } from 'react';
import axios from 'axios';

const Employee = () => {
    const [EmployeList, setEmployeList] = useState([]);
    const [Employeobj, setEmployeobj] = useState({
        "empId": 0,
        "empName": "",
        "empContactNo": "",
        "empAltContactNo": "",
        "empEmail": "",
        "addressLine1": "",
        "addressLine2": "",
        "pincode": "",
        "city": "",
        "state": "",
        "bankName": "",
        "ifsc": "",
        "accountNo": "",
        "bankBranch": "",
        "salary": 0
    })

    const getAllEmploye = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        setEmployeList(result.data.data)
    }

    const onSaveEmploye = async()=>{
        const response = await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee", Employeobj);
        if(response.data.result===true){
            alert('Employe Attendance is Created')
            getAllEmploye();
        }
        else{
            alert(response.data.message)
        }
    }

    const uppdateFormValue = (event,key) => {
        setEmployeobj(oldObj => ({...oldObj,[key]:event.target.value}))
    }

    const onEdit = (obj) => {
        setEmployeobj(obj)
    } 

    

    const updatedEmploye = async () => {
        const response =  await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateEmployee",Employeobj);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAttendance Updated Succesfully');
            getAllEmploye();
            setEmployeobj({
                "empName": "",
                "empContactNo": "",
                "empEmail": "",
                "addressLine1": "",
                "city": "",
              })
        } else {
            alert(response.data.message)
        }
    }

    const onDelete = async (empId) => {
        const response =  await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteEmployeeByEmpId?" +empId);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAttendance Delete Succesfully');
            getAllEmploye();
        } else {
            alert(response.data.message)
        }
    }

    return (
        <div>
            <button className='btn btn-success' onClick={getAllEmploye}>Get All Employee</button>
            <button className='btn btn-success' onClick={getAllAttendance}>Get All Attendance</button>
            <div className='row'>
                <div className='col-8'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Sr No.</th>
                                <th>Employee Name</th>
                                <th>Contact No.</th>
                                <th>Email</th>
                                <th>Addreass</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                EmployeList.map((Employee, index) => {
                                    return (<tr>
                                        <td>

                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {Employee.empName}</td>
                                        <td> {Employee.empContactNo}</td>
                                        <td> {Employee.empEmail}</td>
                                        <td> {Employee.addressLine1}</td>
                                        <td> {Employee.city}</td>
                                        <td>
                                                    <button className='btn btn-success' onClick={()=>{onEdit(Employee)}}>Edit </button>
                                                    <button className='btn btn-danger mx-2' onClick={()=>{onDelete(Employee.empId)}}>Delete </button>
                                                </td>
                                    </tr>)
                                })
                            }

                        </tbody>
                    </table>
                </div>
            
            <div className='col-4'>
                <div className='card'>
                    <div className='card-header bg-primary'>
                       Add New Employee 
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>EmployeName</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'empName') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Contact No.</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'empContactNo') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Attendance Date</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'empEmail') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>In Time</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'addressLine1') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Out Time</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'city') }} className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                                    <div className='col-9 text-center pt-3'>
                                        <button className='btn btn-success' onClick={onSaveEmploye}>Save Employe</button>
                                        <button className='btn btn-primary' onClick={updatedEmploye}>Update Employe</button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default Employee;