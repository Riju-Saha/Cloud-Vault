import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const variants = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
};

const icons = {
  success: FiCheckCircle,
  error: FiAlertCircle,
};

const Toast = ({ toast }) => {
  if (!toast) {
    return null;
  }

  const Icon = icons[toast.type] || icons.success;

  return (
    <div className="fixed right-4 top-4 z-50">
      <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg ${variants[toast.type] || variants.success}`}>
        <Icon className="text-lg" />
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
