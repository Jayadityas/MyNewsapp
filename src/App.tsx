import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import News from "./components/News.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="india" pageSize={6} query="india" />} />
          <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={6} query="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={6} query="entertainment" />} />
          <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={6} query="general" />} />
          <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={6} query="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={6} query="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={6} query="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={6} query="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;