import { BrowserRouter,Routes, Route} from "react-router-dom"
import StoreAdminDashboard from "./componant/Admin/Inventory/StoreAdminDashboard.jsx"
import AdminStoreDetails from "./componant/Admin/Inventory/AdminStoreDetails.jsx"

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InventoryDetails from "./componant/Admin//Inventory/InventoryDetails.jsx";
import InventoryPurchesUpdate from "./componant/Admin/Inventory/InventoryPurchesUpdate.jsx";
import ProductionDashboard from "./componant/Admin/Production/ProductionDashboard.jsx";
import ProductionTargetDetails from "./componant/Admin/Production/ProductionTargetDetails.jsx";
import PurchaseDeptDashboard from "./componant/Admin/PruchaseDepartment/PurchaseDeptDashboard.jsx";
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
    <Route path="/details/:id" Component={AdminStoreDetails}/>
    <Route path="/details/inventory" Component={InventoryDetails}/>
    <Route path="/details/purches" Component={InventoryPurchesUpdate}/>
    <Route path="/production" Component={ProductionDashboard}/>
    <Route path="/production/target/:id" Component={ProductionTargetDetails}/>
    <Route path="/Purchase" Component={PurchaseDeptDashboard}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
