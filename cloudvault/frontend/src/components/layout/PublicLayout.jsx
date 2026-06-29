import PublicNavbar from './PublicNavbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] dark:text-slate-100">
      <PublicNavbar />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
