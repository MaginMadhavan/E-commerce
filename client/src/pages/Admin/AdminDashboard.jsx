import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout  title={'Admin Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><AdminMenu/> </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>Admin Name: {auth?.user?.name}</h4>
              <h4>Admin Phone: {auth?.user?.phone}</h4>
              <h4>Admin Email: {auth?.user?.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
