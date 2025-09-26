// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">QuizApp</h1>
      <ul className="flex gap-6">
        <li>
          <Link
            to="/quizzes"
            className="hover:text-green-200 transition-colors"
          >
            Quizzes
          </Link>
        </li>
        <li>
          <Link
            to="/questions"
            className="hover:text-green-200 transition-colors"
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            to="/" // temporary example quiz id
            className="hover:text-green-200 transition-colors"
          >
            Attempt Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
