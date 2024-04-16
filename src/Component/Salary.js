import React from 'react';

const Salary = () => {

    const [EmployeList, setEmployeList] = useState([]);
    const [SalaryList, setSalaryList] = useState([]);
    
    const [Salaryobj, setSalaryobj] = useState({
        "empName": "",
        "empContactNo": "",
        "employeeId": 0,
        "salaryDate": "",
        "presentDays":0,
        "salaryAmount": 0,
        "salaryId": 0,
        "totalAdvance": 0
    })

    useEffect(()=>{
        getAllSalary();
        getAllEmployee();
    }, [])

    const getAllSalary = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary");
        setSalaryList(result.data.data)
    }

    const onSaveSalary = async()=>{
        const response = await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddSalary", Salaryobj);
        if(response.data.result===true){
            alert('Employe Salary is Created')
            getAllSalary();
        }
        else{
            alert(response.data.message)
        }
    }

    const uppdateFormValue = (event,key) => {
        setSalaryobj(oldObj => ({...oldObj,[key]:event.target.value}))
    }

    const onEdit = (obj) => {
        setSalaryobj(obj)
    } 

    const getAllEmployee = async () => {
        const result = await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        debugger;
        setEmployeList(result.data.data)
    }

    const updatedEmployeSalary = async () => {
        const response =  await axios.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateSalary",Salaryobj);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeSalary Updated Succesfully');
            getAllSalary();
            setSalaryobj({
                "empName": "",
        "empContactNo": "",
        "presentDays":0,
        "salaryDate": "",
        "salaryAmount": 0,
        "totalAdvance": 0
              })
        } else {
            alert(response.data.message)
        }
    }

    const onDelete = async (salaryId) => {
        const response =  await axios.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?=salaryId" +salaryId);
        debugger;
        if(response.data.result === true) {
            alert('EmployeeSalary Delete Succesfully');
            getAllSalary();
        } else {
            alert(response.data.message)
        }
    }

    //**********************SALARY FIND OUT***********//
    
    const getAttenceByEmpId = async(event)=>{
        const attendance = await axios.get("");
        const advance = await axios.get("");
    }
    const totalPresentDays = attendance.data.data.length;
    let totalDayAmt = 0;
    for(let index = 0; index< advance.data.data.length; index++ ) {
        totalDayAmt = totalDayASmt + advance.data.data[index].advanceAmount;
    }
    const perDaySalary = employeesList.find(m=>m.empId == event.target.value).Salary/30;
    const totalSalary = ((perDatSalary * totalPresentDays) - totalDayAmt).toFixed(2);
    
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
                                <th>Salary Date</th>
                                <th>Salary Amount</th>
                                <th>Total Advance</th>
                                <th>Present Days</th>
                                </tr>
                        </thead>
                        <tbody>
                            {
                                SalaryList.map((Salary, index) => {
                                    return (<tr>
                                        <td>

                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {Salary.empName}</td>
                                        <td> {Salary.empContactNo}</td>
                                        <td> {Salary.salaryDate}</td>
                                        <td> {Salary.salaryAmount}</td>
                                        <td> {Salary.totalAdvance}</td>
                                        <td> {Salary.presentDays}</td>
                                        <td>
                                                    <button className='btn btn-success' onClick={()=>{onEdit(Salary)}}>Edit </button>
                                                    <button className='btn btn-danger mx-2' onClick={()=>{onDelete(Salary.salaryId)}}>Delete </button>
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
                       Added Salary
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
                                <label>Salary Date</label>
                                <input type='Date' onChange={(event) => { uppdateFormValue(event, 'salaryDate') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Salary Amount</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'salaryAmount') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Total Advance</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'totalAdvance') }} className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Present Days</label>
                                <input type='text' onChange={(event) => { uppdateFormValue(event, 'presentDays') }} className='form-control' />
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
                                        <button className='btn btn-success' onClick={onSaveSalary}>Save Salary</button>
                                        <button className='btn btn-primary' onClick={updatedEmployeSalary}>Update Salary</button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
           </div>       
        </div>
    );
};

export default Salary;