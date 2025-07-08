import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setComments,
  setSearchTerm,
  setSort,
  setPage,
  setPageSize,
  setUser,
} from '../utils/commentsSlice';
import axios from 'axios';


const pageSizes = [10, 50, 100];

export default function CommentsDashboard() {
  const dispatch = useDispatch();
 
  const {
    comments,
    searchTerm,
    sortColumn,
    sortOrder,
    page,
    pageSize,
  } = useSelector((state) => state);



  const fetchData=async()=>{
     try{
    const res=axios.get('https://jsonplaceholder.typicode.com/comments')
        dispatch(setComments(res.data));
     }
      catch(err){
        console.log(err.message);
      }
  }



const fetchUserData=async()=>{
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(res)
        if (res.data.length > 0) {
          dispatch(setUser(res.data[0]));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
  }


  useEffect(() => {
    if (comments?.length === 0) {
     fetchData();
     fetchUserData();
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
        <table className="table w-full border border-base-300">
         <thead className="bg-base-300 text-base-content border-b border-base-300">
       <tr>
             <th className="px-4 py-2 border-r border-base-300">Post ID</th>
              <th className="px-4 py-2 border-r border-base-300">Name</th>
             <th className="px-4 py-2 border-r border-base-300">Email</th>
              <th className="px-4 py-2">Comment</th>
       </tr>
         </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c.id} className="bg-base-100 hover:bg-base-200 transition border-b border-base-300">
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
