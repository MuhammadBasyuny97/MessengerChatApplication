
import Login from './component/Login';
import Register from './component/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path='/messenger/login' element= {<Login/>}/>
         <Route path='/messenger/register' element= {<Register/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
