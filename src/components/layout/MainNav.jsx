// src/components/layout/MainNav.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useMember } from '../../context/useMember';

export default function MainNav() {
  const { t } = useLanguage();
  const { member } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 whitespace-nowrap ${
      isActive
        ? 'bg-[#001f6b] text-yellow-300 border-b-2 border-yellow-400'
        : 'text-white hover:bg-[#133869] hover:text-yellow-200'
    }`;

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#1a4d8f] text-white border-b border-[#0f3466] shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClass} end onClick={closeMenus}>
            {t('home')}
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenus}>
            {t('dashboard')}
          </NavLink>

          {/* Manage Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('manage')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('manage')}
              className={`px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 text-white hover:bg-[#133869] hover:text-yellow-200 ${
                activeDropdown === 'manage' ? 'bg-[#001f6b] text-yellow-300' : ''
              }`}
            >
              <span>{t('manage')}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === 'manage' && (
              <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-b shadow-xl border border-slate-300 py-1.5 animate-in fade-in-50 duration-100 z-50">
                <NavLink
                  to="/manage/kyc"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center justify-between"
                >
                  <span>🛡️ {t('kyc')}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    Audit ⭐
                  </span>
                </NavLink>
                <NavLink
                  to="/manage/profile"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center gap-2"
                >
                  <span>👤 {t('profile')}</span>
                </NavLink>
                <NavLink
                  to="/manage/mark-exit"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center justify-between"
                >
                  <span>🏢 {t('markExit')}</span>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                    Guided
                  </span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Online Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('services')}
              className={`px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 text-white hover:bg-[#133869] hover:text-yellow-200 ${
                activeDropdown === 'services' ? 'bg-[#001f6b] text-yellow-300' : ''
              }`}
            >
              <span>{t('onlineServices')}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 w-72 bg-white text-slate-800 rounded-b shadow-xl border border-slate-300 py-1.5 animate-in fade-in-50 duration-100 z-50">
                <NavLink
                  to="/services/claim"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center justify-between"
                >
                  <span>📝 {t('fileClaim')}</span>
                  <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
                    Pre-Check
                  </span>
                </NavLink>
                <NavLink
                  to="/services/transfer"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center gap-2"
                >
                  <span>🔄 {t('transferPF')}</span>
                </NavLink>
                <NavLink
                  to="/services/track"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center justify-between"
                >
                  <span>🔍 {t('trackClaim')}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                    Translator
                  </span>
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/services/track" className={navLinkClass} onClick={closeMenus}>
            {t('trackClaim')}
          </NavLink>

          <NavLink to="/passbook" className={navLinkClass} onClick={closeMenus}>
            📒 {t('passbook')}
          </NavLink>

          <NavLink to="/enomination" className={navLinkClass} onClick={closeMenus}>
            {t('enomination')}
          </NavLink>

          {/* Help Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('help')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('help')}
              className={`px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 text-white hover:bg-[#133869] hover:text-yellow-200 ${
                activeDropdown === 'help' ? 'bg-[#001f6b] text-yellow-300' : ''
              }`}
            >
              <span>{t('help')}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === 'help' && (
              <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-b shadow-xl border border-slate-300 py-1.5 animate-in fade-in-50 duration-100 z-50">
                <NavLink
                  to="/help/login-issues"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center gap-2"
                >
                  <span>🔑 {t('loginIssues')}</span>
                </NavLink>
                <NavLink
                  to="/help/escalation"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#003399] flex items-center justify-between"
                >
                  <span>⚖️ {t('escalation')}</span>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                    5 Levels
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Member Pill (Right side) */}
        <div className="hidden sm:flex items-center gap-3 py-1">
          <div className="text-right">
            <div className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
              <span>{member?.name || 'Ravi Kumar'}</span>
            </div>
            <div className="text-[10px] text-blue-200 font-mono">
              UAN: {member?.uan || '100987654321'}
            </div>
          </div>
          <NavLink
            to="/"
            title="Sign Out / Landing View"
            className="p-1.5 bg-[#001f6b] hover:bg-red-800 text-white rounded transition-colors text-xs flex items-center"
          >
            <LogOut className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-between w-full py-2">
          <div className="text-xs font-bold text-yellow-300">
            {member?.name} (UAN: {member?.uan?.slice(0, 4)}...)
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-[#001f6b] text-white hover:bg-blue-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#001f6b] border-t border-blue-800 px-4 py-3 space-y-2">
          <NavLink to="/" onClick={closeMenus} className="block py-2 text-sm text-white font-medium border-b border-blue-800">
            🏠 {t('home')} (Landing)
          </NavLink>
          <NavLink to="/dashboard" onClick={closeMenus} className="block py-2 text-sm text-yellow-300 font-bold border-b border-blue-800">
            📊 {t('dashboard')}
          </NavLink>
          <div className="py-1 text-xs font-bold text-blue-300 uppercase tracking-wider">Manage</div>
          <NavLink to="/manage/kyc" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            🛡️ {t('kyc')} (Audit ⭐)
          </NavLink>
          <NavLink to="/manage/profile" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            👤 {t('profile')}
          </NavLink>
          <NavLink to="/manage/mark-exit" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            🏢 {t('markExit')}
          </NavLink>
          <div className="py-1 text-xs font-bold text-blue-300 uppercase tracking-wider">Services</div>
          <NavLink to="/services/claim" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            📝 {t('fileClaim')}
          </NavLink>
          <NavLink to="/services/transfer" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            🔄 {t('transferPF')}
          </NavLink>
          <NavLink to="/services/track" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            🔍 {t('trackClaim')}
          </NavLink>
          <NavLink to="/passbook" onClick={closeMenus} className="block py-2 text-sm text-white font-medium border-t border-blue-800">
            📒 {t('passbook')}
          </NavLink>
          <NavLink to="/enomination" onClick={closeMenus} className="block py-2 text-sm text-white font-medium border-t border-blue-800">
            👥 {t('enomination')}
          </NavLink>
          <div className="py-1 text-xs font-bold text-blue-300 uppercase tracking-wider">Help & Escalation</div>
          <NavLink to="/help/login-issues" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            🔑 {t('loginIssues')}
          </NavLink>
          <NavLink to="/help/escalation" onClick={closeMenus} className="block pl-4 py-1.5 text-sm text-slate-200">
            ⚖️ {t('escalation')}
          </NavLink>
        </div>
      )}
    </nav>
  );
}
