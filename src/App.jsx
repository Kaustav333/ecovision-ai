import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ScannerPage from "./pages/ScannerPage";
import HistoryPage from "./pages/HistoryPage";
import DashboardPage from "./pages/DashboardPage";
import RecyclingGuidePage from "./pages/RecyclingGuidePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="impact" element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="guide" element={<RecyclingGuidePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
