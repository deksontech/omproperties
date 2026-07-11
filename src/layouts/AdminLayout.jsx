import { AdminSidebar } from '../components/layout/AdminSidebar'

export function AdminLayout({ children }) {
  return (
    <section className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </section>
  )
}
