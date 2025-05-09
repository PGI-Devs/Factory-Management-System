import React, { useState } from 'react';
import {
  FiHome,
  FiPackage,
  FiDatabase,
  FiCheckCircle,
  FiTruck,
  FiTool,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiMenu,
  FiBell,
  FiUser
} from 'react-icons/fi';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

function DashboardLayout() {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const modules = {
    'Production & Manufacturing': [
      'Production Schedule',
      'Assembly Line Status',
      'Work Orders',
      'Bill of Materials'
    ],
    'Inventory Management': [
      'Raw Material Inventory',
      'Finished Goods Inventory'
    ],
    'Quality Control & Testing': [
      'Testing Reports',
      'Compliance Tracker',
      'Defect Reports'
    ],
    'Order Fulfillment': [
      'Order Management',
      'Dispatch & Logistics',
      'Installation Scheduling'
    ],
    'Service & Maintenance': [
      'Service Requests',
      'Maintenance History',
      'Warranty Tracker'
    ],
    'Customer Data': [
      'Client List',
      'Contact Logs',
      'Feedback & Support'
    ],
    'Employee & Resource Management': [
      'Shift Schedules',
      'Training Records',
      'Performance Dashboard'
    ],
    'Analytics & Reports': [
      'Sales Reports',
      'Manufacturing Cost',
      'Downtime Analysis'
    ]
  };

  const getModuleIcon = (moduleName) => {
    switch(moduleName) {
      case 'Production & Manufacturing':
        return <FiPackage />;
      case 'Inventory Management':
        return <FiDatabase />;
      case 'Quality Control & Testing':
        return <FiCheckCircle />;
      case 'Order Fulfillment':
        return <FiTruck />;
      case 'Service & Maintenance':
        return <FiTool />;
      case 'Customer Data':
        return <FiUsers />;
      case 'Employee & Resource Management':
        return <FiUsers />;
      case 'Analytics & Reports':
        return <FiBarChart2 />;
      default:
        return <FiPackage />;
    }
  };

  // Enhanced animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: '-100%',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      {/* Top Navigation Bar */}
      <motion.header 
        className="bg-white/90 shadow-sm z-40 backdrop-blur-md"
        style={{ borderBottom: '1px solid rgba(203, 213, 225, 0.3)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Hamburger menu and logo */}
            <div className="flex items-center">
              <motion.button 
                onClick={toggleSidebar}
                className="mr-4 text-gray-500 hover:text-gray-600 md:hidden"
                aria-label="Toggle sidebar"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                animate={sidebarOpen ? { rotate: 0 } : { rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <FiMenu className="h-6 w-6" />
              </motion.button>
              <div className="flex-shrink-0 flex items-center">
                <motion.span 
                  className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-full p-1 mr-2 text-sm font-bold shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 0.1
                  }}
                >
                  PL
                </motion.span>
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent hidden md:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  POWERLINE
                </motion.span>
              </div>
            </div>

            {/* Center - Search bar */}
            <div className="flex-1 max-w-md mx-4">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm hover:bg-white transition-all duration-200"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)"
                  }}
                />
              </motion.div>
            </div>

            {/* Right side - User and notifications */}
            <div className="flex items-center">
              <motion.button 
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={pulseAnimation}
              >
                <FiBell className="h-6 w-6" />
                <span className="sr-only">View notifications</span>
                <motion.span 
                  className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              </motion.button>
              <div className="ml-3 relative">
                <div>
                  <motion.button 
                    onClick={toggleMobileNav}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-expanded={mobileNavOpen}
                    aria-label="User menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white shadow-sm"
                      whileHover={{ rotate: 15 }}
                      animate={floatAnimation}
                    >
                      <FiUser className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {mobileNavOpen && (
                    <motion.div 
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white/95 backdrop-blur-sm ring-1 ring-black/5 focus:outline-none"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        whileHover={{ x: 5 }}
                      >
                        Your Profile
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        whileHover={{ x: 5 }}
                      >
                        Settings
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        whileHover={{ x: 5 }}
                      >
                        Sign out
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with independent scrolling */}
        <motion.div 
          className={`fixed md:static w-64 text-white p-4 z-30 overflow-y-auto`}
          style={{
            top: '64px',
            bottom: 0,
            height: 'calc(100vh - 64px)',
            background: 'linear-gradient(180deg, #047857 0%, #065f46 100%)'
          }}
          initial={false}
          animate={sidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <nav className="mt-4 md:mt-0">
            <div className="mb-6">
              <motion.h2 
                className="text-xs uppercase text-emerald-300 font-semibold mb-2 tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Main
              </motion.h2>
              <ul className="space-y-1">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => setActiveModule('Dashboard')}
                    className={`w-full flex items-center py-2 px-3 rounded text-left ${activeModule === 'Dashboard' ? 'bg-emerald-700/90 text-white' : 'text-emerald-200 hover:bg-emerald-700/70 hover:text-white'} transition-colors duration-200`}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: 'rgba(5, 150, 105, 0.7)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiHome className="mr-3" />
                    Dashboard
                  </motion.button>
                </motion.li>
              </ul>
            </div>
            
            <div className="mb-6">
              <motion.h2 
                className="text-xs uppercase text-emerald-300 font-semibold mb-2 tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Modules
              </motion.h2>
              <ul className="space-y-1">
                {Object.entries(modules).map(([moduleName, subItems], index) => (
                  <motion.li 
                    key={moduleName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className="flex flex-col">
                      <motion.button
                        onClick={() => toggleMenu(moduleName)}
                        className={`flex items-center justify-between py-2 px-3 rounded text-left ${activeModule.startsWith(moduleName) ? 'bg-emerald-700/90 text-white' : 'text-emerald-200 hover:bg-emerald-700/70 hover:text-white'} transition-colors duration-200`}
                        whileHover={{ 
                          x: 10,
                          backgroundColor: 'rgba(5, 150, 105, 0.7)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          {getModuleIcon(moduleName)}
                          <span className="ml-3">{moduleName}</span>
                        </div>
                        <motion.span
                          animate={{ rotate: expandedMenu === moduleName ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {expandedMenu === moduleName ? <FiChevronUp /> : <FiChevronDown />}
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {expandedMenu === moduleName && (
                          <motion.div 
                            className="ml-8 mt-1 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: 'auto',
                              transition: {
                                opacity: { duration: 0.2 },
                                height: { duration: 0.3 }
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0,
                              transition: {
                                opacity: { duration: 0.1 },
                                height: { duration: 0.2 }
                              }
                            }}
                          >
                            {subItems.map((item, subIndex) => (
                              <motion.button
                                key={item}
                                onClick={() => {
                                  setActiveModule(`${moduleName} - ${item}`);
                                  if (window.innerWidth < 768) setSidebarOpen(false);
                                }}
                                className={`w-full text-left py-1 px-2 rounded text-sm ${activeModule === `${moduleName} - ${item}` ? 'text-white font-medium' : 'text-emerald-200 hover:text-white'} transition-colors duration-200`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: 1, 
                                  x: 0,
                                  transition: { delay: subIndex * 0.05 }
                                }}
                                whileHover={{ 
                                  x: 5,
                                  backgroundColor: 'rgba(5, 150, 105, 0.3)'
                                }}
                              >
                                • {item}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <motion.h2 
                className="text-xs uppercase text-emerald-300 font-semibold mb-2 tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                System
              </motion.h2>
              <ul className="space-y-1">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    onClick={() => {
                      setActiveModule('Settings');
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center py-2 px-3 rounded text-left ${activeModule === 'Settings' ? 'bg-emerald-700/90 text-white' : 'text-emerald-200 hover:bg-emerald-700/70 hover:text-white'} transition-colors duration-200`}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: 'rgba(5, 150, 105, 0.7)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiSettings className="mr-3" />
                    Settings
                  </motion.button>
                </motion.li>
              </ul>
            </div>
          </nav>
        </motion.div>
        
        {/* Main Content */}
        <motion.div 
          className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'} overflow-hidden`}
          style={{ 
            marginTop: '64px',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            paddingBottom: '100px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1 
            className="text-2xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {activeModule === 'Dashboard' ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Dashboard Overview
              </motion.span>
            ) : activeModule}
          </motion.h1>
          
          {activeModule === 'Dashboard' && (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    variants={cardVariants}
                    className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-3">Quick Stats</h2>
                    <div className="text-gray-700 space-y-3">
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-emerald-500 mr-2"
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 10px rgba(16, 185, 129, 0)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                        <p>Total Orders: <span className="font-bold text-gray-900">42</span></p>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-blue-500 mr-2"
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3
                          }}
                        />
                        <p>Production Rate: <span className="font-bold text-gray-900">92%</span></p>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-amber-500 mr-2"
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: ["0 0 0 0 rgba(245, 158, 11, 0.4)", "0 0 0 10px rgba(245, 158, 11, 0)", "0 0 0 0 rgba(245, 158, 11, 0)"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6
                          }}
                        />
                        <p>Inventory Level: <span className="font-bold text-gray-900">78%</span></p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={cardVariants}
                    className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-3">Recent Activity</h2>
                    <div className="text-gray-700 space-y-4">
                      <motion.div 
                        className="pl-4 border-l-2 border-emerald-400"
                        whileHover={{ x: 5 }}
                        animate={{
                          borderLeftColor: ["#10b981", "#3b82f6", "#10b981"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity
                        }}
                      >
                        <p className="font-medium">Order #10042 completed</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </motion.div>
                      <motion.div 
                        className="pl-4 border-l-2 border-emerald-400"
                        whileHover={{ x: 5 }}
                        animate={{
                          borderLeftColor: ["#10b981", "#3b82f6", "#10b981"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: 0.5
                        }}
                      >
                        <p className="font-medium">New inventory received</p>
                        <p className="text-sm text-gray-500">5 hours ago</p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={cardVariants}
                    className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-3">Alerts</h2>
                    <div className="text-gray-700 space-y-3">
                      <motion.div 
                        className="flex items-start p-3 bg-red-50/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        animate={{
                          backgroundColor: ["rgba(254, 226, 226, 0.5)", "rgba(254, 226, 226, 0.7)", "rgba(254, 226, 226, 0.5)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        <motion.span 
                          className="text-red-500 mr-2 mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                        >
                          •
                        </motion.span>
                        <div>
                          <p className="font-medium">Machine #3 requires maintenance</p>
                          <p className="text-xs text-gray-500 mt-1">Last serviced 30 days ago</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start p-3 bg-amber-50/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        animate={{
                          backgroundColor: ["rgba(255, 247, 237, 0.5)", "rgba(255, 247, 237, 0.7)", "rgba(255, 247, 237, 0.5)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5
                        }}
                      >
                        <motion.span 
                          className="text-amber-500 mr-2 mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        >
                          •
                        </motion.span>
                        <div>
                          <p className="font-medium">Low stock on component B-42</p>
                          <p className="text-xs text-gray-500 mt-1">Only 12 units remaining</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Production Metrics Chart */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-white/80 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm mb-6 hover:shadow-md transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-emerald-800 mb-4">Weekly Production Metrics</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { name: 'Mon', production: 4000, efficiency: 87 },
                          { name: 'Tue', production: 3000, efficiency: 85 },
                          { name: 'Wed', production: 5000, efficiency: 91 },
                          { name: 'Thu', production: 2780, efficiency: 78 },
                          { name: 'Fri', production: 3890, efficiency: 89 },
                          { name: 'Sat', production: 2390, efficiency: 83 },
                          { name: 'Sun', production: 0, efficiency: 0 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#64748b"
                          tick={{ 
                            style: {
                              animation: "fadeIn 0.5s ease-in-out"
                            } 
                          }}
                        />
                        <YAxis 
                          yAxisId="left" 
                          orientation="left" 
                          stroke="#10b981"
                          tick={{ 
                            style: {
                              animation: "fadeIn 0.5s ease-in-out"
                            } 
                          }}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          stroke="#3b82f6"
                          tick={{ 
                            style: {
                              animation: "fadeIn 0.5s ease-in-out"
                            } 
                          }}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderColor: '#e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            animation: "fadeIn 0.3s ease-in-out"
                          }}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="production" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ 
                            r: 4,
                            stroke: "#059669",
                            strokeWidth: 2,
                            fill: "#fff"
                          }}
                          activeDot={{ 
                            r: 6, 
                            stroke: "#065f46",
                            strokeWidth: 2,
                            fill: "#10b981"
                          }}
                          name="Units Produced" 
                          animationBegin={0}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        />
                        <Line 
                          yAxisId="right" 
                          type="monotone" 
                          dataKey="efficiency" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ 
                            r: 4,
                            stroke: "#1d4ed8",
                            strokeWidth: 2,
                            fill: "#fff"
                          }}
                          activeDot={{ 
                            r: 6, 
                            stroke: "#1e40af",
                            strokeWidth: 2,
                            fill: "#3b82f6"
                          }}
                          name="Efficiency (%)" 
                          animationBegin={300}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Order Status Chart */}
                  <motion.div 
                    variants={cardVariants}
                    className="bg-white/80 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-4">Order Status</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: 28 },
                              { name: 'In Progress', value: 12 },
                              { name: 'Pending', value: 8 },
                              { name: 'Cancelled', value: 2 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            animationBegin={0}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >
                            <Cell 
                              fill="#10b981" 
                              stroke="#065f46"
                              strokeWidth={1}
                            />
                            <Cell 
                              fill="#3b82f6" 
                              stroke="#1e40af"
                              strokeWidth={1}
                            />
                            <Cell 
                              fill="#f59e0b" 
                              stroke="#b45309"
                              strokeWidth={1}
                            />
                            <Cell 
                              fill="#ef4444" 
                              stroke="#b91c1c"
                              strokeWidth={1}
                            />
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              background: 'rgba(255, 255, 255, 0.95)',
                              borderColor: '#e2e8f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                  
                  {/* Inventory Levels Chart */}
                  <motion.div 
                    variants={cardVariants}
                    className="bg-white/80 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-4">Inventory Levels</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Raw Material A', stock: 78 },
                            { name: 'Raw Material B', stock: 45 },
                            { name: 'Component X', stock: 92 },
                            { name: 'Component Y', stock: 34 },
                            { name: 'Packaging', stock: 67 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="name" 
                            stroke="#64748b"
                            tick={{ 
                              style: {
                                animation: "fadeIn 0.5s ease-in-out"
                              } 
                            }}
                          />
                          <YAxis 
                            stroke="#64748b"
                            tick={{ 
                              style: {
                                animation: "fadeIn 0.5s ease-in-out"
                              } 
                            }}
                          />
                          <Tooltip 
                            contentStyle={{
                              background: 'rgba(255, 255, 255, 0.95)',
                              borderColor: '#e2e8f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="stock" 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]}
                            animationBegin={0}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >
                            {[ '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6' ].map((color, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={color}
                                stroke={color}
                                strokeWidth={1}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
                
                {/* Overview Section */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-gradient-to-r from-gray-50/80 to-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-emerald-800 mb-4">Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      className="bg-white/70 p-4 rounded-lg hover:shadow-sm transition-all duration-200"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 5px rgba(16, 185, 129, 0.1)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    >
                      <h3 className="font-medium text-gray-700 mb-2">Production</h3>
                      <p className="text-gray-600">Current output: <span className="font-bold text-emerald-600">85 units/hr</span></p>
                      <p className="text-gray-600">Target: <span className="font-medium">100 units/hr</span></p>
                      <motion.div 
                        className="w-full bg-gray-200 rounded-full h-2 mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <motion.div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/70 p-4 rounded-lg hover:shadow-sm transition-all duration-200"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 5px rgba(59, 130, 246, 0.1)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.3
                      }}
                    >
                      <h3 className="font-medium text-gray-700 mb-2">Quality</h3>
                      <p className="text-gray-600">Defect rate: <span className="font-bold text-red-600">1.2%</span></p>
                      <p className="text-gray-600">Pass rate: <span className="font-bold text-emerald-600">98.8%</span></p>
                      <motion.div 
                        className="w-full bg-gray-200 rounded-full h-2 mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: '98.8%' }}
                        transition={{ duration: 1, delay: 0.8 }}
                      >
                        <motion.div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/70 p-4 rounded-lg hover:shadow-sm transition-all duration-200"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(245, 158, 11, 0)", "0 0 0 5px rgba(245, 158, 11, 0.1)", "0 0 0 0 rgba(245, 158, 11, 0)"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.6
                      }}
                    >
                      <h3 className="font-medium text-gray-700 mb-2">Orders</h3>
                      <p className="text-gray-600">Pending: <span className="font-bold text-amber-600">12</span></p>
                      <p className="text-gray-600">Completed: <span className="font-bold text-emerald-600">28</span></p>
                      <div className="flex space-x-2 mt-2">
                        <motion.div 
                          className="h-2 rounded-full bg-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: '30%' }}
                          transition={{ duration: 1, delay: 1.1 }}
                        />
                        <motion.div 
                          className="h-2 rounded-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 1, delay: 1.3 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Recent Orders Section */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm mt-6"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-emerald-800 mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {[
                      { id: 10042, status: 'Completed', date: '2 hours ago', color: 'emerald' },
                      { id: 10041, status: 'In Progress', date: '5 hours ago', color: 'blue' },
                      { id: 10040, status: 'Pending', date: '1 day ago', color: 'amber' },
                      { id: 10039, status: 'Cancelled', date: '2 days ago', color: 'red' }
                    ].map((order, index) => (
                      <motion.div
                        key={order.id}
                        className={`p-3 rounded-lg border-l-4 bg-${order.color}-50/50 border-${order.color}-400 flex justify-between items-center`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.1 * index }
                        }}
                        whileHover={{ 
                          x: 5,
                          backgroundColor: `rgba(var(--${order.color}-100), 0.7)`
                        }}
                      >
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className={`text-sm text-${order.color}-600`}>{order.status}</p>
                        </div>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
          
          {activeModule !== 'Dashboard' && activeModule !== 'Settings' && (
            <motion.div 
              className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
            >
              <h2 className="text-lg font-semibold text-emerald-800 mb-4">{activeModule}</h2>
              <p className="text-gray-600">Content for {activeModule} will appear here.</p>
            </motion.div>
          )}
          
          {activeModule === 'Settings' && (
            <motion.div 
              className="bg-white/90 p-6 rounded-lg shadow-lg border border-gray-200/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
            >
              <h2 className="text-lg font-semibold text-emerald-800 mb-4">Settings</h2>
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  placeholder="Type here to search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm hover:bg-white transition-all duration-200"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)"
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardLayout;