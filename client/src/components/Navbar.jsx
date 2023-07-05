import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <Link to="/" className="text-white font-semibold text-lg">
            Home
          </Link>
        </div>
        <div>
          <Link to="/sign-in" className="text-white">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
