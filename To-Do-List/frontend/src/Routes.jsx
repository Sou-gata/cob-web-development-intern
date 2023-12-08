import { Route, useLocation, Routes as BrowserRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import AllData from "./pages/AllData";
import CompletedTodos from "./pages/CompletedTodos";
import IncompleteTodos from "./pages/IncompleteTodos";
import PersonalTodos from "./pages/PersonalTodos";
import WorkTodos from "./pages/WorkTodos";
import OtherTodos from "./pages/OtherTodos";
import UpcomingTodos from "./pages/UpcomingTodos";
import PastTodos from "./pages/PastTodos";
import TodayTodos from "./pages/TodayTodos";

const Routes = () => {
    const location = useLocation();
    return (
        <BrowserRoutes location={location}>
            <Route path="/" element={<Layout />}>
                <Route index element={<AllData />} />
                <Route path="completed" element={<CompletedTodos />} />
                <Route path="incomplete" element={<IncompleteTodos />} />
                <Route path="personal" element={<PersonalTodos />} />
                <Route path="work" element={<WorkTodos />} />
                <Route path="others" element={<OtherTodos />} />
                <Route path="upcoming" element={<UpcomingTodos />} />
                <Route path="past" element={<PastTodos />} />
                <Route path="today" element={<TodayTodos />} />
            </Route>
        </BrowserRoutes>
    );
};

export default Routes;
