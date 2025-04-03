import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SelectStack from "./pages/SelectStack";
import Result from "./pages/Result";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/select-stack" element={<SelectStack />} />
        <Route path="/result" element={<Result />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}
