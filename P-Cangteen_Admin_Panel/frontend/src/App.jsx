import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/SideBar';
import MainArea from './components/MainArea';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <MainArea />
      </div>
    </Router>
  );
}

export default App;
