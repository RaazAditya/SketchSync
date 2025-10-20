import React from "react";

const ActiveUsers = ({ users }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-white">Active Users ({users.length})</h3>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;