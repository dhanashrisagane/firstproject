import React from 'react';

const Attendance = () => {

    const [EmployeList, setEmployeList] = useState([]);
    const [AttendanceList, setAttendanceList] = useState([]);
    
    const [Attendanceobj, setAttendanceobj] = useState({
      "empName": "",
      "empContactNo": "",
      "employeeId": 0,
      "attendanceDate": "",
      "attendanceId": 0,
      "inTime": "",
      "outTime": "",
      "isFullDay": ""
    })

    const getAllAttendance = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance");
        setAttendanceList(result.data.data)
    }

    const onSaveEmployeAttendance = async()=>{
        const response = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance", Attendanceobj);
        if(response.data.result===true){
            alert('Employe Attendance is Created')
            getAllAttendance();
        }
        else{
            alert(response.data.message)
        }
    }

    const uppdateFormValue = (event,key) => {
        setAttendanceobj(oldObj => ({...oldObj,[key]:event.target.value}))
    }

    const onEdit = (obj) => {
        setAttendanceobj(obj)
    } 

    const getAllEmployee = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        debugger;
        setEmployeList(result.data.data)
    }

    const updatedEmployeAttendance = async () => {
        const response =  await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance",Attendanceobj);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAttendance Updated Succesfully');
            getAllAttendance();
            setAttendanceobj({
                "empName": "",
                "empContactNo": "",
                "attendanceDate": "",
                "inTime": "",
                "outTime": ""
              })
        } else {
            alert(response.data.message)
        }
    }

    const onDelete = async (attendanceId) => {
        const response =  await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceId=" +attendanceId);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAttendance Delete Succesfully');
            getAllAttendance();
        } else {
            alert(response.data.message)
        }
    }

    return (
          <div>
            <button className='btn btn-success' onClick={getAllEmployee}>Get All Employee</button>
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
                                <th>Attendance Date</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AttendanceList.map((Employee, index) => {
                                    return (<tr>
                                        <td>

                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {Employee.empName}</td>
                                        <td> {Employee.empContactNo}</td>
                                        <td> {Employee.attendanceDate}</td>
                                        <td> {Employee.inTime}</td>
                                        <td> {Employee.outTime}</td>
                                        <td>
                                                    <button className='btn btn-success' onClick={()=>{onEdit(Attendance)}}>Edit </button>
                                                    <button className='btn btn-danger mx-2' onClick={()=>{onDelete(Attendance.attendanceId)}}>Delete </button>
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
                       Add New Employee Attendance
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
                                <input type='Date' onChange={(event) => { uppdateFormValue(event, 'attendanceDate') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>In Time</label>
                                <input type='Time' onChange={(event) => { uppdateFormValue(event, 'inTime') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Out Time</label>
                                <input type='Time' onChange={(event) => { uppdateFormValue(event, 'outTime') }} className='form-control' />
                            </div>
                            <label>Select EmployeeId</label>
                                    <select class="form-select" onChange={(event) => {uppdateFormValue(event, 'employeeId') }}>
                                        {
                                         EmployeList.map((item)=>{
                                            return (<option value={item.employeeId}>{item.empName}</option>)
                                        })
                                        }
                                    </select>
                        </div>
                        <div className='row'>
                                    <div className='col-9 text-center pt-3'>
                                        <button className='btn btn-success' onClick={onSaveEmployeAttendance}>Save Attendance</button>
                                        <button className='btn btn-primary' onClick={updatedEmployeAttendance}>Update Attendance</button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
           </div>  
        </div>
    );
};

export default Attendance;