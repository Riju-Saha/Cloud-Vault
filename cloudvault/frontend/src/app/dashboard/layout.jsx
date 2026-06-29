import ProtectedRoute from '../../components/layout/ProtectedRoute';

export default function DashboardRouteLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}