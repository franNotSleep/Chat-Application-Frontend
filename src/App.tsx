import './App.css';

import { Route, Routes } from 'react-router-dom';

import AuthForm from './components/Auth/AuthForm';
import ChatPages from './pages/ChatPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/chat" element={<ChatPages />} />
    </Routes>
  );
}

export default App;
