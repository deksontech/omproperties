import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { ADMIN_NAVIGATION } from '../../constants/navigation'
import { useAuth } from '../../hooks/useAuth'

export const AdminSidebar = memo(function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <aside className="admin-sidebar">
      <strong>
        <LayoutDashboard size={18} /> Admin Panel
      </strong>
      {ADMIN_NAVIGATION.map((item) => (
        item.to ? (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ) : (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        )
      ))}
      <button className="admin-logout-button" type="button" onClick={handleLogout}>
        <LogOut size={16} /> Logout
      </button>
    </aside>
  )
})
