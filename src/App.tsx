import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/marketing/Home";
import { Login } from "./pages/auth/Login";
import { AppLayout } from "./pages/app/AppLayout";
import { Overview } from "./pages/app/Overview";
import { Board } from "./pages/app/Board";
import { Review } from "./pages/app/Review";
import { Analytics } from "./pages/app/Analytics";
import { Payments } from "./pages/app/Payments";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="board" element={<Board />} />
        <Route path="review" element={<Review />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
}
