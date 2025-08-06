import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-indigo-600 cursor-pointer">Travel Planner</span>
        </Link>

        <div className="space-x-4">
          <Link href="/login">
            <span className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">Login</span>
          </Link>
          <Link href="/register">
            <span className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded-lg cursor-pointer transition">Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
