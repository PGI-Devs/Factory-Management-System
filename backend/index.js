const express = require('express');
const app = express();
const db = require('./db'); // Make sure db connection works
app.use(express.json());

// Import routes
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const issuesRoutes = require('./routes/issues');
const vendorsRoutes = require('./routes/vendors');
const vendorComplaintsRoutes = require('./routes/vendor_complaints');
const variantRoutes = require('./routes/variants');
const stockRoutes = require('./routes/stock');
const purchaseRoutes = require('./routes/purchases');
const materialRoutes = require('./routes/materials');
const locationRoutes = require('./routes/location');
const jobRoutes = require('./routes/jobs');
const finishedGoodsRoutes = require('./routes/finished_goods');
const factoryLocationRoutes = require('./routes/factory_location');
const categoryRoutes = require('./routes/categories');


// Use routes with base paths
app.use('/api/department', departmentRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/issues', issuesRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/vendor-complaints', vendorComplaintsRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/finished_goods', finishedGoodsRoutes);
app.use('/api/factory_location', factoryLocationRoutes);
app.use('/api/categories', categoryRoutes);

// Default root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
