import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  Home,
  ScanLine,
  History,
  BarChart3,
  BookOpen,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { isModelConfigured } from "../../config/modelConfig";

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/scanner", label: "AI Scanner", icon: ScanLine },
  { path: "/history", label: "History", icon: History },
  { path: "/impact", label: "Impact", icon: BarChart3 },
  { path: "/guide", label: "Recycling Guide", icon: BookOpen },
  { path: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const configured = isModelConfigured();

  const isRouteActive = (path) => {
    if (path === "/impact" && location.pathname === "/dashboard") return true;
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/78 backdrop-blur-lg border-b border-emerald-200/70 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#166534] to-[#2E9B47] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-[#0A3622]">
                EcoVision <span className="text-[#228B3B]">AI</span>
              </span>
              <span className="text-[10px] font-semibold text-[#1E6B38]/80 tracking-wide uppercase">
                Smart Waste Sorting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const active = isRouteActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#14532D] text-white shadow-xs"
                      : "text-[#173E28] hover:text-[#0A3622] hover:bg-emerald-100/70"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Model Status Indicator + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/scanner"
              title={
                configured
                  ? "Teachable Machine model URL configured"
                  : "Click to configure Teachable Machine AI model"
              }
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                configured
                  ? "bg-emerald-100/80 text-[#14532D] border-emerald-300 hover:bg-emerald-200/80"
                  : "bg-amber-50/90 text-amber-900 border-amber-300 hover:bg-amber-100"
              }`}
            >
              {configured ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#228B3B]" />
                  Model Connected
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Setup Model
                </>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-[#14532D] hover:bg-emerald-100/70 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-emerald-200/60 mt-1 pt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ path, label, icon: Icon }) => {
                const active = isRouteActive(path);
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#14532D] text-white"
                        : "text-[#173E28] hover:bg-emerald-100/70"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
              <Link
                to="/scanner"
                onClick={() => setIsOpen(false)}
                className={`mt-2 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border ${
                  configured
                    ? "bg-emerald-100/80 text-[#14532D] border-emerald-300"
                    : "bg-amber-50 text-amber-900 border-amber-300"
                }`}
              >
                {configured ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#228B3B]" />
                    AI Model Connected
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    AI Model Setup Required
                  </>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
