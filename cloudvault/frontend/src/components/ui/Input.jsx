const Input = ({ label, error, className = '', id, icon: Icon, ...props }) => {
  const inputId = id || props.name;

  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span> : null}
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" /> : null}
        <input
          id={inputId}
          className={`w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-950 ${Icon ? 'pl-11 pr-4' : 'px-4'} ${className}`}
          {...props}
        />
      </div>
      {error ? <span className="text-xs text-red-600 dark:text-red-400">{error}</span> : null}
    </label>
  );
};

export default Input;
