import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Assessments from "@/pages/Assessments";
import Portfolio from "@/pages/Portfolio";
import Watchlist from "@/pages/Watchlist";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Temporary */}
          <Route path="/" element={<Home />} />

          {/* Assessment Result Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/assessments" element={<Assessments />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;