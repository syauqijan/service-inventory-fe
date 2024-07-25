import React from 'react';

export const SkeletonTable: React.FC = () => {
    const rows = Array.from({ length: 5 }, (_, index) => index);
    const columns = Array.from({ length: 4 }, (_, index) => index);

return (
    <div className="animate-pulse">
        <div className="w-full md:max-w-sm mb-4">
            <div className="bg-gray-300 h-8 rounded"></div>
        </div>
        <div className="h-[calc(80vh-220px)] rounded-md border overflow-hidden">
            <table className="relative w-full">
            <thead className="text-slate-600 text-sm font-medium uppercase leading-normal sticky top-0 bg-white">
                <tr>
                {columns.map((column) => (
                    <th key={column} className="p-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                <tr key={row}>
                    {columns.map((column) => (
                    <td key={column} className="p-4">
                        <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
);
};
