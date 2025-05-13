import { BrowserRouter,Routes, Route} from "react-router-dom"
import StoreAdminDashboard from "./componant/Admin/StoreAdminDashboard.jsx"
import AdminStoreDetails from "./componant/Admin/AdminStoreDetails.jsx"

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InventoryTable from "./componant/Admin/InventoryTable.jsx";
import InventoryDetails from "./componant/Admin/InventoryDetails.jsx";
import InvantoryAnalaticDashboard from "./componant/Admin/InvantoryAnalaticDashboard.jsx";
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
  </Routes>
  </BrowserRouter>
  );
}

export default App;
