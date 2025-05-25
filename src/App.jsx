import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import View from './pages/View';
import RouteTileManager from './components/RouteTileManager'

function App() {
  return (
    <>
      <Navbar />
      <RouteTileManager />
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} /> 
      </Routes>
      </div>
    </>
  );
}

export default App;