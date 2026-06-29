const Card = ({ children, className = '' }) => {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-colors dark:bg-slate-900 dark:ring-slate-800 ${className}`}>{children}</div>;
};

export default Card;
