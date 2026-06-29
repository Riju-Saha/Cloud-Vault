import { FiDownload, FiTrash2 } from 'react-icons/fi';
import Button from '../ui/Button';

const FileTable = ({ files = [], onDownload, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-colors dark:bg-slate-900 dark:ring-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-left text-slate-500 dark:bg-slate-950/40 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">File Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium">Uploaded Date</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {files.map((file) => (
              <tr key={file.id}>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{file.originalName}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{file.mimeType}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{file.sizeLabel}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{file.uploadedAtLabel}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => onDownload(file)}>
                      <FiDownload />
                      Download
                    </Button>
                    <Button variant="ghost" onClick={() => onDelete(file)} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      <FiTrash2 />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!files.length ? <div className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No files found.</div> : null}
    </div>
  );
};

export default FileTable;
