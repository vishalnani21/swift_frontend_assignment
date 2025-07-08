import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
 const user = useSelector(state => state.user); 



  const getInitials = (name) => {
    if (!name) return '';
    const [first , last ] = name.split(' ');
    return (first[0] + (last[0] || '')).toUpperCase();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">SWIFT</Link>
      </div>

      <div className="flex gap-2">
        <div className="flex">
          <h1 className='mr-5'>{user ? <span>{user.name}</span> : <span>...</span>}</h1>
          <Link to="/profile" 
          onClick={() => console.log("Avatar link clicked")} className="btn btn-ghost btn-circle avatar ">
            <div className="w-10 rounded-full bg-base-200 flex items-center justify-center text-sm font-bold overflow-hidden">
              {user ? <span>{getInitials(user.name)}</span> : <span>...</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
