import DashboardSidebar from './DashboardSidebar';

const MobileSidebar = ({ open, onClose, onLogout }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden">
      <div className="h-full w-72 bg-white transition-colors dark:bg-slate-900">
        <DashboardSidebar onLogout={onLogout} />
      </div>
      <button type="button" aria-label="Close sidebar" onClick={onClose} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default MobileSidebar;
