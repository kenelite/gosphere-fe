import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const AppLayout: React.FC = () => {
  return (
    <>
      <div className="topnav">
        <div className="container inner">
          <div className="brand">GoSphere<span className="dot">•</span>Console</div>
          <nav className="navlinks">
            <NavLink to="/tenants">Tenants</NavLink>
            <NavLink to="/deploy">Deploy</NavLink>
            <NavLink to="/autoscaling">Autoscaling</NavLink>
            <NavLink to="/harbor-gate">Harbor Gate</NavLink>
          </nav>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 24 }}>
        <Outlet />
      </div>
    </>
  )
}

