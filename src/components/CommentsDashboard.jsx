import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setComments,
  setSearchTerm,
  setSort,
  setPage,
  setPageSize,
} from '../utils/commentsSlice';
import axios from 'axios';

const pageSizes = [10, 50, 100];

export default function CommentsGrid() {
  const dispatch = useDispatch();
  const {
    comments,
    searchTerm,
    sortColumn,
    sortOrder,
    page,
    pageSize,
  } = useSelector((state) => state);

  useEffect(() => {
    if (comments.length === 0) {
      axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then((res) => dispatch(setComments(res.data)))
        .catch(console.error);
    }
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return comments;
    const term = searchTerm.toLowerCase();
    return comments.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        (c.phone && c.phone.toLowerCase().includes(term))
    );
  }, [comments, searchTerm]);

  const sorted = useMemo(() => {
    if (!sortColumn || !sortOrder) return filtered;
    return [...filtered].sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortColumn, sortOrder]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = (e) => dispatch(setSearchTerm(e.target.value));
  const handleSort = (col) => dispatch(setSort({ column: col }));
  const handlePageSize = (e) => dispatch(setPageSize(Number(e.target.value)));
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setPage(newPage));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search name, email, phone"
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          className="select select-bordered"
          value={pageSize}
          onChange={handlePageSize}
        >
          {pageSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Sort Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn" onClick={() => handleSort('postId')}>Sort by Post ID</button>
        <button className="btn" onClick={() => handleSort('name')}>Sort by Name</button>
        <button className="btn" onClick={() => handleSort('email')}>Sort by Email</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c.id}>
                <td>{c.postId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <div className="join">
          <button className="join-item btn" onClick={() => changePage(page - 1)} disabled={page === 1}>
            «
          </button>
          <button className="join-item btn">
            Page {page} of {totalPages}
          </button>
          <button className="join-item btn" onClick={() => changePage(page + 1)} disabled={page === totalPages}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
