import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./partials/layouts/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
