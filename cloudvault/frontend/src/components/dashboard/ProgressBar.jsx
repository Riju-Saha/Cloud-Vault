const ProgressBar = ({ value = 0 }) => {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
      <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${safeValue}%` }} />
    </div>
  );
};

export default ProgressBar;
