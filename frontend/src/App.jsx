import { Routes, Route } from "react-router-dom";
import StartingPage from "./pages/StartingPage";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/AdminPage";
import MenuDisplay from "./pages/MenuDisplay";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="*" element={<StartingPage />} />
        <Route path="/adminpage/*" element={<AdminPage />} />
        <Route path="/menupage/*" element={<MenuDisplay />} />
      </Routes>
    </>
  );
}

export default App;
