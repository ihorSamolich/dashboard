import { Route, Routes } from "react-router-dom";

import Customers from "./pages/Customers.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";
import Layout from "./partials/layouts/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="ecommerce/">
          <Route path="customers" element={<Customers />} />
        </Route>

        <Route path="settings/">
          <Route path="my-account" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
