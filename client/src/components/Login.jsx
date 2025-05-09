import React, { useState } from 'react';
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaUser,
  FaLock,
  FaChevronDown
} from 'react-icons/fa';
import { HiOutlineMail, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function AuthForm({ isLogin, onToggle }) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    rememberMe: false,
    role: 'CUSTOMER',
    location: '',
    branch: ''
  });

  const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'CUSTOMER', label: 'Customer' },
    { value: 'SUPPLIER', label: 'Supplier' }
  ];

  const locations = ['Guwahati', 'Tezpur'];
  const branches = ['Guwahati', 'Tezpur'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      location: '', // Reset location when role changes
      branch: '' // Reset branch when role changes
    }));
    setShowRoleDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const isAdmin = formData.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="bg-emerald-600 text-white flex flex-col justify-center items-center p-8 md:p-10 md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {isLogin ? 'Welcome Back!' : 'Welcome!'}
          </h2>
          <p className="mb-6 text-center text-emerald-100">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}
          </p>
          <button
            onClick={onToggle}
            type="button"
            className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            {isLogin ? 'Register' : 'Login'}
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <div className="mt-4">
            <Link to="/" className="text-white underline hover:text-emerald-200">
              Go to Home
            </Link>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-emerald-800">
            {isLogin ? 'Login to your account' : 'Create new account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                {isLogin ? 'Log in as' : 'Register as'}
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full flex justify-between items-center pl-3 pr-4 py-3 border border-emerald-100 rounded-lg bg-emerald-50 text-emerald-800 cursor-pointer"
                >
                  <span>{roles.find(r => r.value === formData.role)?.label}</span>
                  <FaChevronDown className={`text-emerald-500 transition-transform duration-200 ${showRoleDropdown ? 'transform rotate-180' : ''}`} />
                </button>
                {showRoleDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-emerald-100 rounded-lg shadow-lg">
                    {roles.map((role) => (
                      <div
                        key={role.value}
                        onClick={() => handleRoleSelect(role.value)}
                        className={`px-4 py-2 hover:bg-emerald-50 cursor-pointer ${formData.role === role.value ? 'bg-emerald-100 text-emerald-800' : 'text-gray-700'
                          }`}
                      >
                        {role.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location Dropdown (only for Admin) */}
            {isAdmin && (
              <div className="relative">
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  className="w-full pl-3 pr-4 py-3 border border-emerald-100 rounded-lg bg-emerald-50 text-emerald-800"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Branch Dropdown (only for Admin) */}
            {isAdmin && (
              <div className="relative">
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Branch
                </label>
                <select
                  name="branch"
                  className="w-full pl-3 pr-4 py-3 border border-emerald-100 rounded-lg bg-emerald-50 text-emerald-800"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Name Field (for Register) */}
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 bg-emerald-50 transition-all text-emerald-800 placeholder-emerald-400"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 bg-emerald-50 transition-all text-emerald-800 placeholder-emerald-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username Field (for Register) */}
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 bg-emerald-50 transition-all text-emerald-800 placeholder-emerald-400"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 bg-emerald-50 transition-all text-emerald-800 placeholder-emerald-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Repeat Password (for Register) */}
            {!isLogin && (
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                <input
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  className="w-full pl-10 pr-4 py-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 bg-emerald-50 transition-all text-emerald-800 placeholder-emerald-400"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Remember Me (for Login) */}
            {isLogin && (
              <div className="flex justify-between items-center">
                <label className="flex items-center text-sm text-emerald-700">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-400 mr-2"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-emerald-200"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-emerald-500">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            {[FaGoogle, FaFacebook, FaGithub, FaLinkedin].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="p-3 border border-emerald-100 rounded-full hover:bg-emerald-50 transition-all hover:shadow-sm text-emerald-600"
                onClick={(e) => e.preventDefault()}
              >
                <Icon className="text-xl" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggle = () => setIsLogin(!isLogin);
  return <AuthForm isLogin={isLogin} onToggle={handleToggle} />;
}