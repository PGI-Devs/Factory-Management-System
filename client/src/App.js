import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Admin
import StoreAdminDashboard from "./componant/Admin/StoreAdminDashboard.jsx";
import AdminStoreDetails from "./componant/Admin/AdminStoreDetails.jsx";
import InventoryTable from "./componant/Admin/InventoryTable.jsx";
import InventoryDetails from "./componant/Admin/InventoryDetails.jsx";
import InvantoryAnalaticDashboard from "./componant/Admin/InvantoryAnalaticDashboard.jsx";
import RawMaterialHistory from "./componant/Admin/RawMaterialHistory.jsx";
import ItemRequest from "./componant/Admin/ItemRequest.jsx";

// Dashboards & Utilities
import ExcelTemplate from "./componant/excellsheet/ExcelTemplate.js";
import RoleSelector from "./componant/RoleSelector.js";
import RegistrarDashboard from "./componant/RegistrarDashboard.js";
import ApproverDashboard from "./componant/ApproverDashboard.js";
import ReadyForDispatch from "./componant/Ready.js";
import BillOfMaterials from "./BillOfMaterials.js";
import HomePage from "./Home.js";

// Production
import ProductionDashboard from "./componant/dept_production/production_dashboard.js";

// Purchase
import PurchaseDashboard from "./componant/dept_purchase/purchase_dashboard.js";
import OrdersPage from "./componant/dept_purchase/orders.js";
import VendorsPage from "./componant/dept_purchase/purchase_vendors.js";
import InventoryPage from "./componant/dept_purchase/purchase_inventory.js";
import ReportsPage from "./componant/dept_purchase/purchase_report.js";
import SettingsPage from "./purchase_settings.js";
import HomeDashboard from "./componant/dept_purchase/purchase_home.js";

// Quality
import QualityDashboard from "./componant/dept_quality/quality_dashboard.js";
import RawMaterialsPage from "./componant/dept_quality/quality_rawmaterial.js";
import InProcessDashboard from "./componant/dept_quality/in-process/inprocess_dashboard.js";
import PDIPage from "./componant/dept_quality/pdi_page.js";
import QualityReportsPage from "./componant/dept_quality/quality_reports.js";
import SalesDashboard from "./componant/Sales/sales_dashboard.js";
import SalesInventoryPage from "./componant/Sales/sales_inventory.js";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/production_dashboard" element={<ProductionDashboard />} />
   

        <Route path="/purchase_dashboard" element={<PurchaseDashboard />}>
          <Route path="purchase_orders" element={<OrdersPage />} />
          <Route path="purchase_home" element={<HomeDashboard />} />
          <Route path="purchase_vendors" element={<VendorsPage />} />
          <Route path="purchase_inventory" element={<InventoryPage />} />
          <Route path="purchase_reports" element={<ReportsPage />} />
          <Route path="purchase_settings" element={<SettingsPage />} />
        </Route>

        <Route path="/quality_dashboard" element={<QualityDashboard />}>
          <Route path="quality_raw" element={<RawMaterialsPage />} />
          <Route path="inprocess_dashboard" element={<InProcessDashboard />} />
          <Route path="pdipage" element={<PDIPage />} />
          <Route path="quality_reports" element={<QualityReportsPage/>} />
        </Route>
     <Route path="/sales_dashboard" element={<SalesDashboard />} >
     <Route path="sales_inventory" element={<SalesInventoryPage />}/ >
     </Route>
        <Route path="/dashboard" element={<StoreAdminDashboard />} />
        <Route path="/details" element={<AdminStoreDetails />} />
        <Route path="/details/inventory" element={<InventoryDetails />} />
        <Route path="/details/analysis" element={<InvantoryAnalaticDashboard />} />
        <Route path="/details/history" element={<RawMaterialHistory />} />
        <Route path="/details/request" element={<ItemRequest />} />
        <Route path="/details/roleselector" element={<RoleSelector />} />
        <Route path="/details/registrar" element={<RegistrarDashboard />} />
        <Route path="/details/approver" element={<ApproverDashboard />} />
        <Route path="/details/excel" element={<ExcelTemplate />} />
        <Route path="/details/ready" element={<ReadyForDispatch />} />
        <Route path="/details/billofmaterials" element={<BillOfMaterials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
