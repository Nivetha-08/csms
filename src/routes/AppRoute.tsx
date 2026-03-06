import { Routes, Route } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import AfterAuth from '../auth/AfterAuth'
import Unauthorized from '../pages/public/Unauthorized'
import HomePage from '../pages/public/HomePage'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { RoleRoute } from '../auth/RoleRoute'
import PostLoginRedirect from '../auth/PostLoginRedirect'
import DashboardLayout from '../layout/DashboardLayout'
import DashBoard from '../features/PageSection/Dashboard/DashBoard'
import Users from '../features/PageSection/Users/Users'
import DocumentGen from '../features/PageSection/DocumentGeneration/DocumentGen'
import Marks from '../features/PageSection/Marks/Marks'
import Fees from '../features/PageSection/Fees/Fees'
import Student from '../features/PageSection/Student/Student'

export default function AppRoute() {

  return (
    <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/after-auth" element={
          <>
            <AfterAuth />
            <PostLoginRedirect />
          </>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route element={<RoleRoute roles={['admin','teacher']} />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="student" element={<Student />} />
              <Route path="documentgen" element={<DocumentGen />} />
              <Route path="marks" element={<Marks />} />
              <Route path="fees" element={<Fees />} />
            </Route>

            <Route element={<RoleRoute roles={['admin']} />}>
              <Route path="user" element={<Users />} />
            </Route>

          </Route>
        </Route>

      </Routes>
    </>
  )
}
