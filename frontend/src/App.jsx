import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './component/User/Login'
import Register from './component/User/Register'
import Layout from './component/Header/Layout'
import Dashboard from './component/User/Dashboard'
import GetProductList from './component/Product/GetProductList'
import { Toaster } from 'react-hot-toast'
import AddProduct from './component/Product/AddProduct'
import UserList from './component/User/UserList'
import UserRole from './component/User/UserRole'
import ChangeProfile from './component/User/ChangeProfile'
import ProductList from './component/Product/ProductList'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Layout><Dashboard /></Layout>} />
        <Route path='/product' element={<Layout><GetProductList /></Layout>} />
        <Route path='/addproduct' element={<Layout><AddProduct /></Layout>} />
        <Route path='/users' element={<Layout><UserList /></Layout>} />
        <Route path='/role' element={<Layout><UserRole /></Layout>} />
        <Route path='/changeprofile' element={<Layout><ChangeProfile /></Layout>} />
        <Route path='/productlist' element={<Layout><ProductList /></Layout>} />



      </Routes>

      <Toaster />
    </>
  )
}

export default App
