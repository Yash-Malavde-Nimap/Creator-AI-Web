import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Creators' };

export default function CreatorsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Creators</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and discover creators on your platform.
        </p>
      </div>
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-400">Creators management — coming soon</p>
      </div>
    </div>
  );
}
