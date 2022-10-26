import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Career from "./Containers/Career"
import CareerForm from "./Containers/CareerForm"

function App() {
  return (
    <div className="w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Career />}></Route>
          <Route path="career" element={<Career />}></Route>
          <Route path="career/form" element={<CareerForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
