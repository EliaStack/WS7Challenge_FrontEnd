//import heroImg from './assets/hero.png'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Task from './pages/Tasks'
import CreatTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import PrivateRoute from './PrivateRoute'



function App() {

  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/tasks' element={<PrivateRoute><Task></Task></PrivateRoute>}></Route>
          <Route path='/create' element={<PrivateRoute><CreatTask></CreatTask></PrivateRoute>}></Route>
          <Route path='/edit/:id' element={<PrivateRoute><EditTask></EditTask></PrivateRoute>}></Route>
        </Routes>

      </main>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  )
}

export default App
