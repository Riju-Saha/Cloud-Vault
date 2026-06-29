import ProgressBar from './ProgressBar';

const StorageSummaryCard = ({ totalStorage, usedStorage, remainingStorage, percentageUsed }) => {
  const formatGB = (bytes) => `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-colors dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Storage usage</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">Your cloud vault at a glance</h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-primary dark:bg-blue-950/50 dark:text-blue-300">{percentageUsed}% used</span>
      </div>
      <div className="mt-6 space-y-4">
        <ProgressBar value={percentageUsed} />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Total Storage</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{formatGB(totalStorage)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Used Storage</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{formatGB(usedStorage)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Remaining Storage</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{formatGB(remainingStorage)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageSummaryCard;
