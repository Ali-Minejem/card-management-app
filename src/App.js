import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import TasksContainer from "./pages/home/index";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatsContainer from "./pages/stats";
import NotFound from "./pages/notFound";
function App() {
  return (
    <BrowserRouter>
      <main className="bg-[#f8f8f8] min-h-screen max-w-[2000px] my-0 mx-auto ">
        <NavBar />
        <Routes>
          <Route path="/" element={<TasksContainer />} />
          <Route path="/stats" element={<StatsContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster position="bottom-right" gutter={8} />
      </main>
    </BrowserRouter>
  );
}

export default App;
