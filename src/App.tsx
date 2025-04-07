import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { TodoProvider } from './context/TodoContext';
import { TodoPage } from './pages/TodoPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow ">
            <div className="container mx-auto px-4 ">
              <div className="flex h-16 items-center justify-center">
                <div className="flex items-center space-x-8">
                  <Link
                    to="/"
                    className="flex items-center text-gray-900 hover:text-blue-600"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    <span className="font-medium">Todos</span>
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-900 hover:text-blue-600"
                  >
                    <User className="mr-2 h-5 w-5" />
                    <span className="font-medium ">Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;