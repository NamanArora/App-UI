import React from 'react';
import { Bell, Settings, HelpCircle, ChevronDown } from 'lucide-react';

const TherawinTopbar = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Brand and Status */}
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold text-blue-600">Therawin</span>
            <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-600">Active Session</span>
            </div>
          </div>

          {/* Right Section: Actions and Profile */}
          <div className="flex items-center space-x-6">
            {/* Help and Settings Section */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                <HelpCircle className="w-4 h-4" />
                <span>Support</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile Section */}
            <button className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                N
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">Naman</div>
                <div className="text-xs text-gray-500">Pro Plan</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherawinTopbar;