
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Employee from './Component/Employee';
import Attendance from './Component/Attendance';
import Advance from './Component/Advance';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link active" to="Employee">Employee</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link active" to="Attendance">Attendance</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link active" to="Advance">Advance</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link active" to="Leaves">Leaves</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link active" to="Salary">Salary</Link>
      </li>
      </ul>
      </div>
      </nav>
      <Routes>
        <Route path='/Employee' element={<Employee></Employee>}></Route> 
        <Route path='/Attendance' element={<Attendance></Attendance>}></Route> 
        <Route path='/Advance' element={<Advance></Advance>}></Route> 
        <Route path='/Leaves' element={<Leaves></Leaves>}></Route> 
        <Route path='/Salary' element={<Salary></Salary>}></Route> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
