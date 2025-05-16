import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserMenu from '../components/UserMenu'
function Dashboard() {
    const user = useSelector((state) => state.user)
    // //console.log("user in dashboard", user);
  return (
   <section className="bg-white">
  <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
    {/* Left: Sidebar menu */}
    <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r">
      <UserMenu />
    </div>

    {/* Right: Main content */}
    <div className="bg-white min-h-[75vh]">
      <Outlet />
    </div>
  </div>
</section>

  )
}

export default Dashboard
