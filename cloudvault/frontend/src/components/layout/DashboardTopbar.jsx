import { FiSearch, FiUpload } from 'react-icons/fi';
import Button from '../ui/Button';
import Input from '../ui/Input';
import ThemeToggle from '../ui/ThemeToggle';

const DashboardTopbar = ({ searchValue = '', onSearchChange, onUploadClick, title = 'Welcome back' }) => {
  const searchInputProps = onSearchChange
    ? { value: searchValue, onChange: onSearchChange }
    : { defaultValue: searchValue, readOnly: true };

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-5 transition-colors dark:border-slate-800 dark:bg-slate-900 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage files, storage, and account settings from one place.</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto xl:items-center">
        <Input
          type="search"
          name="search"
          placeholder="Search files by name"
          {...searchInputProps}
          className="sm:min-w-72"
        />
        <ThemeToggle />
        <Button onClick={onUploadClick} className="whitespace-nowrap">
          <FiUpload />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default DashboardTopbar;
