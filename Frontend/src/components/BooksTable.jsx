

import TableHeader from "./TableHeader";

const BooksTable = ({ books, sortField, sortDirection, onSort, isLoading }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <TableHeader field="title" label="Title" sortField={sortField} sortDirection={sortDirection} onSort={onSort} disabled={isLoading} />
          <TableHeader field="author" label="Author" sortField={sortField} sortDirection={sortDirection} onSort={onSort} disabled={isLoading} />
          <TableHeader field="genre" label="Genre" sortField={sortField} sortDirection={sortDirection} onSort={onSort} disabled={isLoading} />
          <TableHeader field="publishedAt" label="Published" sortField={sortField} sortDirection={sortDirection} onSort={onSort} disabled={isLoading} />
          <TableHeader field="pages" label="Pages" sortField={sortField} sortDirection={sortDirection} onSort={onSort} disabled={isLoading} />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {books.map((book) => (
          <tr key={book.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {book.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {book.author}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {book.genre}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {book.publishedAt}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {book.pages}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default BooksTable


