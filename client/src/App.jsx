import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Policy from './pages/Policy'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './pages/User/DashBoard'
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword'

function App() {
 return(<>
 
  <Routes>
    <Route path='/' element ={<HomePage/> }/>
  
    <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='' element ={<DashBoard/> }/>
    </Route>
  
    <Route path='/forgot-password' element ={<ForgotPassword/> }/>
    <Route path='/register' element ={<Register/> }/>
    <Route path='/login' element ={<Login/> }/>
    <Route path='/about' element ={<About/> }/>
    <Route path='/contact' element ={<Contact/> }/>
    <Route path='*' element ={<PageNotFound/> }/>
    <Route path='/policy' element ={<Policy/> }/>

  </Routes>

 </>)
}

export default App
