//import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Task from './pages/Tasks'
import Project from './pages/Projects'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import PrivateRoute from './PrivateRoute'
import Tags from './pages/Tags'
import CreateTag from './pages/CreateTag'



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
            <Route path='/projects' element={<PrivateRoute><Project></Project></PrivateRoute>}></Route>
            <Route path='/tasks' element={<PrivateRoute><Task></Task></PrivateRoute>}></Route>
            <Route path='/createTask' element={<PrivateRoute><CreateTask></CreateTask></PrivateRoute>}></Route>
            <Route path='/edit/:id' element={<PrivateRoute><EditTask></EditTask></PrivateRoute>}></Route>
            <Route path='/tags' element={<PrivateRoute><Tags></Tags></PrivateRoute>}> </Route>
            <Route path='/createTag' element={<PrivateRoute><CreateTask></CreateTask></PrivateRoute>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  )
}

export default App
