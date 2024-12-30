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
import ChangePassword from './component/User/ChangePassword'
import UserProtected from './component/Protected/UserProtected'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Layout><UserProtected Components={Dashboard} /></Layout>} />
        <Route path="/product" element={<Layout><UserProtected Components={GetProductList} /></Layout>} />
        <Route path="/addproduct" element={<Layout><UserProtected Components={AddProduct} /></Layout>} />
        <Route path="/users" element={<Layout><UserProtected Components={UserList} /></Layout>} />
        <Route path="/role" element={<Layout><UserProtected Components={UserRole} /></Layout>} />
        <Route path="/changeprofile" element={<Layout><UserProtected Components={ChangeProfile} /></Layout>} />
        <Route path="/productlist" element={<Layout><UserProtected Components={ProductList} /></Layout>} />
        <Route path="/changepassword" element={<Layout><UserProtected Components={ChangePassword} /></Layout>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
