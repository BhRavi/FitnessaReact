import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ActivityRoute, HomeRoute, MealsRoute, PersonalInfoRoute } from "./components/Layout/menuItems";
import Activity from "./components/Activity";
import Meals from "./components/Meals";
import PersonalInfoForm from "./components/MyInformation";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={HomeRoute.slug} element={<Home />} />
        {/* Task 1.2 */}
        <Route path={MealsRoute.slug} element={<Meals />} />
        <Route path={ActivityRoute.slug} element={<Activity />} />
        <Route path={PersonalInfoRoute.slug} element={<PersonalInfoForm />} />
      </Routes>
    </div>
  );
}
