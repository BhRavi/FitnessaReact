import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { HomeRoute } from "./components/Layout/menuItems";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={HomeRoute.slug} element={<Home />} />
        {/* Task 1.2 */}
      </Routes>
    </div>
  );
}
