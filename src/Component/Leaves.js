import React from 'react';

const Leaves = () => {
    const [EmployeList, setEmployeList] = useState([]);
    const [LeavesList, setLeavesList] = useState([]);
    
    const [Leavesobj, setLeavesobj] = useState({
      "empName": "",
      "empContactNo": "",
      "employeeId": 0,
      "leaveDate": "",
      "leaveId": 0,
      "leaveReason": "",
      "noOfFullDayLeaves": 0,
      "noOfHalfDayLeaves": 0
    })

    useEffect(()=>{
        getAllLeaves();
        getAllEmployee();
    }, [])

    const getAllLeaves = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves");
        setLeavesList(result.data.data)
    }

    const onSaveLeaves = async()=>{
        const response = await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddLeave", Leavesobj);
        if(response.data.result===true){
            alert('Employe Leaves is Created')
            getAllLeaves();
        }
        else{
            alert(response.data.message)
        }
    }

    const uppdateFormValue = (event,key) => {
        setLeavesobj(oldObj => ({...oldObj,[key]:event.target.value}))
    }

    const onEdit = (obj) => {
        setLeavesobj(obj)
    } 

    const getAllEmployee = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        debugger;
        setEmployeList(result.data.data)
    }

    const updatedEmployeLeaves = async () => {
        const response =  await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave",Leavesobj);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeLeaves Updated Succesfully');
            getAllLeaves();
            setLeavesobj({
                "empName": "",
      "empContactNo": "",
      "leaveDate": "",
      "leaveReason": "",
      "noOfFullDayLeaves": 0,
      "noOfHalfDayLeaves": 0
              })
        } else {
            alert(response.data.message)
        }
    }

    const onDelete = async (leaveId) => {
        const response =  await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveId" +leaveId);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeLeaves Delete Succesfully');
            getAllLeaves();
        } else {
            alert(response.data.message)
        }
    }
    return (
        <div>
          <div className='row'>
                <div className='col-8'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Sr No.</th>
                                <th>Employee Name</th>
                                <th>Contact No.</th>
                                <th>Leaves Date</th>
                                <th>Leave Reason</th>
                                <th>NoOfFullDayLeaves</th>
                                <th>NoOfHalfDayLeaves</th>
                                </tr>
                        </thead>
                        <tbody>
                            {
                                LeavesList.map((Leaves, index) => {
                                    return (<tr>
                                        <td>

                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {Leaves.empName}</td>
                                        <td> {Leaves.empContactNo}</td>
                                        <td> {Leaves.leaveDate}</td>
                                        <td> {Leaves.leaveReason}</td>
                                        <td> {Leaves.noOfFullDayLeaves}</td>
                                        <td> {Leaves.noOfHalfDayLeaves}</td>
                                        <td>
                                                    <button className='btn btn-success' onClick={()=>{onEdit(Leaves)}}>Edit </button>
                                                    <button className='btn btn-danger mx-2' onClick={()=>{onDelete(Leaves.leaveId)}}>Delete </button>
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
                       Added Leaves
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
                                <label>Leaves Date</label>
                                <input type='Date' onChange={(event) => { uppdateFormValue(event, 'leaveDate') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Leaves Reason</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'leaveReason') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>NoOfFullDayLeaves</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'noOfFullDayLeaves') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>NoOfHalfDayLeaves</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'noOfHalfDayLeaves') }} className='form-control' />
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
                                        <button className='btn btn-success' onClick={onSaveLeaves}>Save Leaves</button>
                                        <button className='btn btn-primary' onClick={updatedEmployeLeaves}>Update Leaves</button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
           </div>      
        </div>
    );
};

export default Leaves;