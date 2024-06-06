import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NormalRoutes } from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {NormalRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
