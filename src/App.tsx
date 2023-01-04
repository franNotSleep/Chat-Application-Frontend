import './App.css';

import { Route, Routes } from 'react-router-dom';

import AuthForm from './components/Auth/AuthForm';

// const sock et = io("http://localhost:8080");
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
    </Routes>
  );
}

export default App;
