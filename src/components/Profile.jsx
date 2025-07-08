import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
 
 const user = useSelector(state => state.user); 

  return (
    <div className="bg-base-500 shadow-md rounded-xl p-6 max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name: </span>
          <span>{user.name}</span>
        </div>
        <div>
          <span className="font-semibold">Username: </span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="font-semibold">Address: </span>
          <span>
            {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
