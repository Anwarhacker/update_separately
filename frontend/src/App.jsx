import Registration from "./components/Registration";
import Update from "./components/Update";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
