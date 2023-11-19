import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Password from './components/Password';
import Dasboard from './components/Dasboard';
import Navabar from './components/Navbar';
import Details from './components/Details';
import DetailsEdit from './components/DetailsEdit';
import ViewContent from './components/ViewContent';
export const url = "https://notes-application-9xk4.onrender.com"



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route>

          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/password' element={<Password />} />
          <Route path='/dashboard' element={<Dasboard />} />
          <Route path='/navbar' element={<Navabar />} />
          <Route path='/details' element={<Details />} />
          <Route path='/detailsedit/:id' element={<DetailsEdit />} />
          <Route path='/viewcontent/:id' element={<ViewContent />} />





        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
