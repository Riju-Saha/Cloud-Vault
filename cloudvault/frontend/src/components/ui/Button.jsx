const buttonStyles = {
  primary: 'bg-primary text-white hover:bg-blue-700 shadow-sm shadow-blue-200 dark:bg-blue-500 dark:hover:bg-blue-400 dark:shadow-none',
  secondary: 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
};

const Button = ({ children, variant = 'primary', className = '', type = 'button', ...props }) => {
  const variantClass = buttonStyles[variant] || buttonStyles.primary;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
