import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerWorkspace from "./pages/ManagerWorkspace";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ManagerWorkspace />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
