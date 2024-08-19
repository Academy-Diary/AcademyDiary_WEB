import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login, NotFound, SignUp, Director } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* notFound : 일치하는 라우트 없는 경우 처리 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/director" element={<Director />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
