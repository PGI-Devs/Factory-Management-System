import { BrowserRouter,Routes, Route} from "react-router-dom"
import StoreAdminDashboard from "./componant/Admin/Inventory/StoreAdminDashboard.jsx"
import AdminStoreDetails from "./componant/Admin/Inventory/AdminStoreDetails.jsx"

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InventoryDetails from "./componant/Admin//Inventory/InventoryDetails.jsx";
import InvantoryAnalaticDashboard from "./componant/Admin/Inventory/InvantoryAnalaticDashboard.jsx";
import ProductionDashboard from "./componant/Admin/Production/ProductionDashboard.jsx";
function App() {

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};



  return (
  <BrowserRouter>
  <ScrollToTop/>
  <Routes>
    <Route path="/" Component={StoreAdminDashboard}/>
    <Route path="/details" Component={AdminStoreDetails}/>
    <Route path="/details/inventory" Component={InventoryDetails}/>
    <Route path="/details/analysis" Component={InvantoryAnalaticDashboard}/>
    <Route path="/production" Component={ProductionDashboard}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
