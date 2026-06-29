const StatCard = ({ label, value, description, icon: Icon }) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-colors dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {Icon ? <Icon className="text-2xl text-primary" /> : null}
      </div>
    </div>
  );
};

export default StatCard;
