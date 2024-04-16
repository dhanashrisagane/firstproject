import React from 'react';

const Advance = () => {

    const [EmployeList, setEmployeList] = useState([]);
    const [AdvanceList, setAdvanceList] = useState([]);
    
    const [Advanceobj, setAdvanceobj] = useState({
        "empName": "",
        "empContactNo": "",
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "advanceId": 0,
        "reason": ""
    })

    useEffect(()=>{
        getAllAdvance();
        getAllEmployee();
    }, [])

    const getAllAdvance = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance");
        setAdvanceList(result.data.data)
    }

    const onSaveAdvance = async()=>{
        const response = await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance", Advanceobj);
        if(response.data.result===true){
            alert('Employe Attendance is Created')
            getAllAdvance();
        }
        else{
            alert(response.data.message)
        }
    }

    const uppdateFormValue = (event,key) => {
        setAdvanceobj(oldObj => ({...oldObj,[key]:event.target.value}))
    }

    const onEdit = (obj) => {
        setAdvanceobj(obj)
    } 

    const getAllEmployee = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        debugger;
        setEmployeList(result.data.data)
    }

    const updatedEmployeAdvance = async () => {
        const response =  await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance",Advanceobj);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAdvance Updated Succesfully');
            getAllAdvance();
            setAdvanceobj({
                "empName": "",
                "empContactNo": "",
                "advanceDate": "",
                "advanceAmount": 0,
                "reason": ""
              })
        } else {
            alert(response.data.message)
        }
    }

    const onDelete = async (advanceId) => {
        const response =  await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceId=" +advanceId);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeAdvance Delete Succesfully');
            getAllAdvance();
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
                                <th>Advance Date</th>
                                <th>Advance Amount</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AdvanceList.map((Advance, index) => {
                                    return (<tr>
                                        <td>

                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {Advance.empName}</td>
                                        <td> {Advance.empContactNo}</td>
                                        <td> {Advance.aadvanceDate}</td>
                                        <td> {Advance.advanceAmount}</td>
                                        <td> {Advance.reason}</td>
                                        <td>
                                                    <button className='btn btn-success' onClick={()=>{onEdit(Advance)}}>Edit </button>
                                                    <button className='btn btn-danger mx-2' onClick={()=>{onDelete(Advance.advanceId)}}>Delete </button>
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
                       Added Advance
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
                                <label>Advance Date</label>
                                <input type='Date' onChange={(event) => { uppdateFormValue(event, 'advanceDate') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Advance Amount</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'advanceAmount') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Reason</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'reason') }} className='form-control' />
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
                                        <button className='btn btn-success' onClick={onSaveAdvance}>Save Advance</button>
                                        <button className='btn btn-primary' onClick={updatedEmployeAdvance}>Update Advance</button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
           </div>    
        </div>
    );
};

export default Advance;