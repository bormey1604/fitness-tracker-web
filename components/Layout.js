import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTachometerAlt, FaRunning, FaBullseye, FaDumbbell } from 'react-icons/fa';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Fitness Tracker</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li className={`mb-2 ${router.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>
              <Link href="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li className={`mb-2 ${router.pathname === '/activity' ? 'bg-gray-700' : ''}`}>
              <Link href="/activity" className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaRunning className="mr-2" />
                Activity
              </Link>
            </li>
            <li className={`mb-2 ${router.pathname === '/goals' ? 'bg-gray-700' : ''}`}>
              <Link href="/goals" className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaBullseye className="mr-2" />
                Goals
              </Link>
            </li>
            <li className={`mb-2 ${router.pathname === '/workout' ? 'bg-gray-700' : ''}`}>
              <Link href="/workout" className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaDumbbell className="mr-2" />
                Workout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;