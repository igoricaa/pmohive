interface TableRow {
  _key: string;
  cells: string[];
}

interface TableValue {
  rows: TableRow[];
}

interface TableBlockProps {
  table: TableValue;
  caption?: string;
}

export default function TableBlock({ table, caption }: TableBlockProps) {
  if (!table?.rows || table.rows.length === 0) {
    return null;
  }

  return (
    <div className='my-6 sm:my-8 overflow-x-auto'>
      <table className='w-full border-collapse text-sm sm:text-base'>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={row._key}>
              {row.cells.map((cell, cellIndex) => {
                const isHeader = rowIndex === 0;
                return isHeader ? (
                  <th
                    key={cellIndex}
                    className='border border-gray-300 dark:border-gray-600 p-2 sm:p-3 text-left font-bold bg-gray-50 dark:bg-gray-800'
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={cellIndex}
                    className='border border-gray-300 dark:border-gray-600 p-2 sm:p-3 text-left'
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className='mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic'>
          {caption}
        </p>
      )}
    </div>
  );
}
