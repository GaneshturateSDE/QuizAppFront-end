# Quiz App 🎯

A full-stack quiz application built with **React (Vite)** on the frontend and a backend API (Node/Express + MongoDB assumed).  
This app allows creating questions, grouping them into quizzes, and attempting quizzes with features like instructions, timer, navigation, and results.

---

## ✨ Features

- **Questions Management**
  - Add, edit, delete questions with options and correct answers.
  - Filter questions by category.

- **Quizzes Management**
  - Create quizzes by selecting questions.
  - View list of all quizzes.
  - Edit and delete quizzes.

- **Quiz Attempt**
  - Start quiz with instructions modal.
  - Timer for each quiz attempt.
  - Navigate between questions (Next / Previous).
  - Submit quiz and view score.

- **Results**
  - Detailed results with:
    - Candidate’s selected answer
    - Correct answer
    - Highlighting wrong/correct responses

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Hook Form
- React Router DOM
- Axios

**Backend**
- Node.js
- Express
- MongoDB / Mongoose

---

## Clone Project

```
git clone https://github.com/GaneshturateSDE/QuizAppFront-end

cd QuizAppFront-end

npm install 
```

## Environment Variables(.env)

```
VITE_API_URL=http://localhost:3000
```
## Run The App

```
npm run dev

```