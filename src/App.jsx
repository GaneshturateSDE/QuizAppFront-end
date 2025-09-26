
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Quiz from './pages/Quiz'
import Questions from './pages/Questions';
import Quizzes from './pages/Quizzes';
import QuizList from './pages/QuizList';
import Navbar from './components/NavBar';
import Result from './pages/Result';

function App() {
  

  return (
    <>
      <Navbar/>
       <Routes>
        <Route path="/" element={<QuizList/>} />
        <Route path="/quiz/:id" element={<Quiz/>} />
        <Route path="/quiz/:id/result" element={<Result/>} />
        <Route path="/questions" element={<Questions/>} />
        <Route path="/quizzes" element={<Quizzes/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
       </Routes>
    </>
  )
}

export default App
