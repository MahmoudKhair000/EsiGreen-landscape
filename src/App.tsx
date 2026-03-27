/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Leaf,
  Sun,
  Wind,
  Zap,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Globe,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Droplets,
  Sprout,
  CheckCircle2,
  Users,
  Calendar,
  Calculator,
  Search,
  ChevronDown,
  Clock,
  Award,
  Briefcase,
  HelpCircle,
  MessageSquare,
  FileText,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---

interface NavLink {
  name: string;
  href: string;
  dropdown?: NavLink[];
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Landscape Design", href: "/services/landscape-design" },
        { name: "Irrigation Systems", href: "/services/irrigation" },
        { name: "Construction", href: "/services/construction" },
        { name: "Maintenance", href: "/services/maintenance" },
      ],
    },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-md"
          : "bg-white/80 backdrop-blur-md py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-deep-green p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-bold tracking-tight text-deep-green`}>
            Esi<span className="text-olive">Green</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={`text-sm font-semibold flex items-center gap-1 transition-colors ${
                  location.pathname === link.href
                    ? "text-olive"
                    : "text-slate-700 hover:text-olive"
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>

              {link.dropdown && activeDropdown === link.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                >
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block px-6 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-olive transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <Link
            to="/quote"
            className="bg-deep-green text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-deep-green/20 active:scale-95"
          >
            Request a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-slate-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-white p-8 flex flex-col gap-6 lg:hidden overflow-y-auto pt-24"
            style={{ height: "100vh", width: "80%" }}
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-2">
                <Link
                  to={link.href}
                  className="text-xl font-bold text-slate-900 flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 flex flex-col gap-2 border-l-2 border-slate-100">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="text-slate-600 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/quote"
              className="bg-deep-green text-white px-6 py-4 rounded-xl text-center font-bold mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-deep-green text-slate-200 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="bg-white p-1.5 rounded-lg">
              <Leaf className="text-deep-green w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">
              Esi<span className="text-olive">Green</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-8 text-slate-300">
            Pioneering sustainable landscaping and smart irrigation solutions.
            We combine technical engineering with natural design to create
            long-term value.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-olive transition-all text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-white font-bold text-lg mb-8">Services</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/services/landscape-design"
                className="hover:text-olive transition-colors"
              >
                Landscape Design
              </Link>
            </li>
            <li>
              <Link
                to="/services/irrigation"
                className="hover:text-olive transition-colors"
              >
                Smart Irrigation
              </Link>
            </li>
            <li>
              <Link
                to="/services/construction"
                className="hover:text-olive transition-colors"
              >
                Execution & Construction
              </Link>
            </li>
            <li>
              <Link
                to="/services/maintenance"
                className="hover:text-olive transition-colors"
              >
                Maintenance & Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-lg mb-8">Company</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/about" className="hover:text-olive transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="hover:text-olive transition-colors"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/process"
                className="hover:text-olive transition-colors"
              >
                Our Process
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="hover:text-olive transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-lg mb-8">Contact</h5>
          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-olive" />
              <span>hello@esigreen.com</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-olive" />
              <span>+1 (555) 000-GREEN</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-olive mt-1" />
              <span>123 Eco Way, Sustainability Park, CA 94043</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
        <p>© 2026 EsiGreen Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home = () => {
  const [propertySize, setPropertySize] = useState(5000);
  const [monthlyBill, setMonthlyBill] = useState(200);

  const annualSavings = Math.round(monthlyBill * 12 * 0.4); // 50% savings
  const waterSaved = Math.round(propertySize * 9); // Roughly 9 gallons per sq ft per year saved

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Beautiful Landscape"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-green/90 via-deep-green/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 bg-olive/20 backdrop-blur-md border border-olive/30 px-4 py-2 rounded-full text-sm font-bold mb-8">
              <Sprout className="w-4 h-4 text-olive" />
              <span>Sustainable Landscaping Experts</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-8">
              Smart Irrigation. <br />
              <span className="text-olive">Natural Beauty.</span>
            </h1>
            <p className="text-xl text-slate-200 mb-12 leading-relaxed max-w-xl">
              We engineer water-efficient landscapes that thrive. Reduce your
              water consumption by up to 60% while maintaining a lush, vibrant
              environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/quote"
                className="bg-olive text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-olive/30"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/projects"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all text-center"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
                What We Do
              </h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green">
                Precision Engineering for Natural Spaces
              </h3>
            </div>
            <Link
              to="/services"
              className="text-deep-green font-bold flex items-center gap-2 group"
            >
              View All Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Droplets />,
                title: "Smart Irrigation",
                desc: "AI-controlled systems that optimize water usage based on real-time weather data.",
              },
              {
                icon: <Sprout />,
                title: "Landscape Design",
                desc: "Ecological design that prioritizes native species and sustainable aesthetics.",
              },
              {
                icon: <Zap />,
                title: "Execution",
                desc: "Professional construction with minimal environmental impact and high precision.",
              },
              {
                icon: <ShieldCheck />,
                title: "Maintenance",
                desc: "Long-term support to ensure your ecosystem remains healthy and efficient.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center mb-8">
                  {React.cloneElement(service.icon as React.ReactElement, {
                    size: 32,
                  })}
                </div>
                <h4 className="text-xl font-bold text-deep-green mb-4">
                  {service.title}
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link
                  to="/services"
                  className="text-olive font-bold text-sm flex items-center gap-1"
                >
                  Learn More <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Savings Calculator (Interactive) */}
      <section className="py-32 bg-deep-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-olive/10 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
                Interactive Tool
              </h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-8">
                How much can you save?
              </h3>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Our smart irrigation systems typically reduce water waste by
                40-60%. Use our calculator to estimate your potential annual
                savings.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center text-olive">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-medium">Real-time weather integration</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center text-olive">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-medium">
                    Soil moisture sensing technology
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center text-olive">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-medium">
                    Leak detection & automatic shut-off
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 text-slate-900 shadow-2xl">
              <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="text-olive" />
                Savings Estimator
              </h4>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-slate-500 uppercase">
                      Property Size (sq ft)
                    </label>
                    <span className="text-olive font-bold">
                      {propertySize.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={propertySize}
                    onChange={(e) => setPropertySize(parseInt(e.target.value))}
                    className="w-full accent-olive"
                  />
                  <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                    <span>1,000</span>
                    <span>50,000</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-slate-500 uppercase">
                      Current Monthly Water Bill ($)
                    </label>
                    <span className="text-olive font-bold">${monthlyBill}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                    className="w-full accent-olive"
                  />
                  <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                    <span>$50</span>
                    <span>$2,000</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-medium">
                      Estimated Annual Savings
                    </span>
                    <span className="text-3xl font-extrabold text-deep-green">
                      ${annualSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">
                      Water Saved (Gallons)
                    </span>
                    <span className="text-3xl font-extrabold text-olive">
                      {waterSaved.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  to="/quote"
                  className="block w-full bg-olive text-white py-5 rounded-2xl font-bold text-center text-lg hover:bg-opacity-90 transition-all mt-4"
                >
                  Get Detailed Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
              Our Work
            </h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green mb-6">
              Transforming Environments
            </h3>
            <p className="text-slate-600 text-lg">
              From luxury residential estates to large-scale commercial
              developments, we bring precision and beauty to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "The Azure Estate",
                category: "Residential",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Eco-Tech Campus",
                category: "Commercial",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Vertical Oasis",
                category: "Irrigation",
                img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[450px] rounded-[32px] overflow-hidden mb-6 shadow-xl">
                  <img
                    src={project.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <button className="bg-white text-deep-green px-6 py-3 rounded-full font-bold flex items-center gap-2">
                      View Project <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-olive font-bold text-sm uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h4 className="text-2xl font-bold text-deep-green">
                  {project.title}
                </h4>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 bg-slate-100 text-deep-green px-10 py-5 rounded-full font-bold hover:bg-slate-200 transition-all"
            >
              Explore All Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
              Our Process
            </h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green">
              How We Work
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10" />

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We understand your vision and site requirements.",
              },
              {
                step: "02",
                title: "Analysis",
                desc: "Technical site assessment and water audit.",
              },
              {
                step: "03",
                title: "Design",
                desc: "Custom engineering and aesthetic planning.",
              },
              {
                step: "04",
                title: "Execution",
                desc: "Precision installation and system testing.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-olive flex items-center justify-center text-2xl font-black text-deep-green mx-auto mb-8 shadow-xl">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-deep-green mb-4">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators & Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
                Testimonials
              </h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green mb-10">
                What Our Clients Say
              </h3>
              <div className="space-y-10">
                <div className="p-10 rounded-[40px] bg-slate-50 relative">
                  <MessageSquare className="absolute -top-6 -left-6 text-olive w-12 h-12" />
                  <p className="text-lg text-slate-600 italic mb-8 leading-relaxed">
                    "EsiGreen transformed our corporate campus. Not only is it
                    more beautiful, but our water bill dropped by 55% in the
                    first year. Their technical expertise is unmatched."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://picsum.photos/seed/client1/100/100"
                      className="w-14 h-14 rounded-full object-cover"
                      alt="Client"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-deep-green">Sarah Jenkins</p>
                      <p className="text-sm text-slate-400">
                        Operations Director, TechFlow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Water Saved", val: "450M Gal" },
                  { label: "Projects", val: "1,200+" },
                  { label: "Efficiency", val: "60%" },
                  { label: "Awards", val: "15" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-10 rounded-3xl bg-deep-green text-white text-center"
                  >
                    <p className="text-3xl font-black mb-2">{stat.val}</p>
                    <p className="text-xs font-bold text-olive uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-12 opacity-30 grayscale">
                {/* Mock Partner Logos */}
                <div className="text-2xl font-black text-deep-green">
                  ECO-CORP
                </div>
                <div className="text-2xl font-black text-deep-green">
                  GREEN-LIFE
                </div>
                <div className="text-2xl font-black text-deep-green">
                  WATER-PRO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-olive rounded-[60px] p-16 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-green/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <h2 className="text-4xl lg:text-6xl font-extrabold mb-10 leading-tight relative z-10">
            Start building your <br /> sustainable future today.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link
              to="/quote"
              className="bg-white text-olive px-12 py-6 rounded-full font-bold text-xl hover:bg-slate-50 transition-all shadow-2xl"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/contact"
              className="bg-deep-green text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = () => (
  <div className="overflow-hidden">
    {/* Hero */}
    <section className="pt-40 pb-24 bg-deep-green text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-8">
            Engineering a <span className="text-olive">Greener</span> Future.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            We are a multidisciplinary team of engineers, designers, and
            environmentalists dedicated to revolutionizing how we interact with
            our natural surroundings.
          </p>
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-olive/10 -skew-x-12 translate-x-1/4" />
    </section>

    {/* Story */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
              className="rounded-[40px] shadow-2xl"
              alt="Nature"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-olive rounded-3xl flex items-center justify-center p-8 text-white shadow-xl">
              <p className="text-center font-bold">10+ Years of Innovation</p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
              Our Story
            </h2>
            <h3 className="text-4xl font-extrabold text-deep-green mb-8">
              From a Small Garden to Global Impact
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              EsiGreen was born in 2015 out of a simple observation: traditional
              landscaping was incredibly wasteful. We saw beautiful gardens
              dying in droughts and irrigation systems wasting millions of
              gallons of water.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We decided to combine high-end engineering with ecological design.
              Today, we manage over 1,200 projects globally, saving millions of
              gallons of water every year while creating breathtaking natural
              spaces.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-black text-deep-green mb-2">
                  2015
                </h4>
                <p className="text-sm text-slate-400 font-bold uppercase">
                  Founded
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-deep-green mb-2">
                  450M
                </h4>
                <p className="text-sm text-slate-400 font-bold uppercase">
                  Gallons Saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-16 rounded-[60px] shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center mb-8">
              <Globe size={32} />
            </div>
            <h3 className="text-3xl font-bold text-deep-green mb-6">
              Our Mission
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              To empower property owners with intelligent, sustainable
              landscaping solutions that preserve our planet's most precious
              resource while enhancing the beauty of our built environment.
            </p>
          </div>
          <div className="bg-deep-green p-16 rounded-[60px] shadow-xl text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-olive flex items-center justify-center mb-8">
              <Zap size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              A world where every landscape is a self-sustaining ecosystem,
              integrated with smart technology to minimize waste and maximize
              natural vitality.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
            Trust Indicators
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green">
            Our Certifications
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60 hover:opacity-100 transition-opacity">
          {[
            { name: "LEED Certified", icon: <Award /> },
            { name: "WaterSense Partner", icon: <Droplets /> },
            { name: "ASLA Member", icon: <Leaf /> },
            { name: "IA Certified", icon: <Zap /> },
          ].map((cert, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-6 text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-olive group-hover:scale-110 transition-transform">
                {React.cloneElement(cert.icon as React.ReactElement, {
                  size: 40,
                })}
              </div>
              <p className="font-bold text-deep-green text-lg">{cert.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-olive uppercase tracking-widest mb-4">
            The Team
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-deep-green">
            Meet the Visionaries
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              name: "David Chen",
              role: "Founder & CEO",
              img: "https://picsum.photos/seed/team1/400/500",
            },
            {
              name: "Elena Rodriguez",
              role: "Chief Landscape Architect",
              img: "https://picsum.photos/seed/team2/400/500",
            },
            {
              name: "Marcus Thorne",
              role: "Head of Irrigation Engineering",
              img: "https://picsum.photos/seed/team3/400/500",
            },
          ].map((member, i) => (
            <div key={i} className="group">
              <div className="h-[450px] rounded-[40px] overflow-hidden mb-8 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={member.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={member.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-2xl font-bold text-deep-green mb-2">
                {member.name}
              </h4>
              <p className="text-olive font-bold text-sm uppercase tracking-widest">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Services = () => (
  <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-24">
      <h1 className="text-5xl lg:text-7xl font-extrabold text-deep-green mb-8">
        Our Services
      </h1>
      <p className="text-xl text-slate-600">
        Comprehensive landscaping and irrigation solutions tailored to your
        unique environment.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-10">
      {[
        {
          title: "Landscape Design",
          icon: <Sprout />,
          desc: "Custom ecological planning for residential and commercial spaces.",
        },
        {
          title: "Irrigation Systems",
          icon: <Droplets />,
          desc: "Smart, water-efficient irrigation engineering and installation.",
        },
        {
          title: "Execution & Construction",
          icon: <Briefcase />,
          desc: "High-precision building with sustainable materials.",
        },
        {
          title: "Maintenance & Support",
          icon: <ShieldCheck />,
          desc: "Ongoing care to ensure long-term health and efficiency.",
        },
      ].map((s, i) => (
        <div
          key={i}
          className="p-12 rounded-[40px] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
        >
          <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center mb-8">
            {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
          </div>
          <h3 className="text-3xl font-bold text-deep-green mb-6">{s.title}</h3>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            {s.desc}
          </p>
          <Link
            to={`/services/${s.title.toLowerCase().replace(/ /g, "-")}`}
            className="text-olive font-bold flex items-center gap-2"
          >
            View Details <ArrowRight size={18} />
          </Link>
        </div>
      ))}
    </div>

    {/* Comparison Table */}
    <div className="mt-32 bg-white rounded-[60px] p-16 shadow-2xl border border-slate-100 overflow-x-auto">
      <h3 className="text-4xl font-bold text-deep-green mb-12 text-center">
        Service Comparison
      </h3>
      <table className="w-full text-left min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
              Feature
            </th>
            <th className="pb-8 text-sm font-bold text-olive uppercase tracking-widest text-center">
              Design Only
            </th>
            <th className="pb-8 text-sm font-bold text-deep-green uppercase tracking-widest text-center">
              Full Implementation
            </th>
            <th className="pb-8 text-sm font-bold text-water uppercase tracking-widest text-center">
              Managed Care
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[
            { feature: "3D Site Modeling", d: true, f: true, m: true },
            {
              feature: "Technical Irrigation Plans",
              d: true,
              f: true,
              m: true,
            },
            { feature: "Planting Strategy", d: true, f: true, m: true },
            { feature: "Precision Installation", d: false, f: true, m: true },
            { feature: "Smart Controller Setup", d: false, f: true, m: true },
            { feature: "24/7 Remote Monitoring", d: false, f: false, m: true },
            { feature: "Bi-Annual System Audit", d: false, f: false, m: true },
          ].map((row, i) => (
            <tr key={i} className="group hover:bg-slate-50 transition-colors">
              <td className="py-6 font-bold text-deep-green">{row.feature}</td>
              <td className="py-6 text-center">
                {row.d ? (
                  <CheckCircle2 className="mx-auto text-olive" size={20} />
                ) : (
                  <X className="mx-auto text-slate-200" size={20} />
                )}
              </td>
              <td className="py-6 text-center">
                {row.f ? (
                  <CheckCircle2 className="mx-auto text-deep-green" size={20} />
                ) : (
                  <X className="mx-auto text-slate-200" size={20} />
                )}
              </td>
              <td className="py-6 text-center">
                {row.m ? (
                  <CheckCircle2 className="mx-auto text-water" size={20} />
                ) : (
                  <X className="mx-auto text-slate-200" size={20} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const projects = [
    {
      title: "The Azure Estate",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Eco-Tech Campus",
      category: "Commercial",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Vertical Oasis",
      category: "Irrigation",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Desert Bloom",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Sky Garden",
      category: "Commercial",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "River Walk",
      category: "Irrigation",
      img: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold text-deep-green mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-slate-600">
            A showcase of our most innovative and sustainable projects.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {["All", "Residential", "Commercial", "Irrigation"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${filter === f ? "bg-olive text-white shadow-xl shadow-olive/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer"
            >
              <div className="h-96 rounded-[40px] overflow-hidden mb-8 bg-slate-100 shadow-2xl relative">
                <img
                  src={project.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <button className="bg-white text-deep-green px-8 py-4 rounded-2xl font-bold flex items-center gap-3">
                    View Project <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              <p className="text-olive font-bold text-sm uppercase tracking-widest mb-2">
                {project.category}
              </p>
              <h4 className="text-3xl font-bold text-deep-green">
                {project.title}
              </h4>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-60 pb-40 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-olive/10 text-olive flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-deep-green mb-6">
          Message Sent!
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Thank you for reaching out. Our team of experts will review your
          message and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-olive text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-deep-green mb-8">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Have a project in mind? We'd love to hear from you. Our experts are
            ready to help you build a sustainable future.
          </p>
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center text-olive">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Email Us
                </p>
                <p className="text-2xl font-bold text-deep-green">
                  hello@esigreen.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center text-olive">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Call Us
                </p>
                <p className="text-2xl font-bold text-deep-green">
                  +1 (555) 000-GREEN
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-olive/10 flex items-center justify-center text-olive">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Visit Us
                </p>
                <p className="text-2xl font-bold text-deep-green">
                  123 Eco Way, Green City
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-olive outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-olive outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Email Address
              </label>
              <input
                required
                type="email"
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-olive outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-olive outline-none transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-deep-green text-white py-6 rounded-2xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-60 pb-40 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-olive/10 text-olive flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-deep-green mb-6">
          Quote Requested!
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Thank you for your interest. Our engineering team is reviewing your
          requirements and will provide a detailed proposal within 48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-olive text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
        >
          Request Another Quote
        </button>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-deep-green mb-6">
          Request a Quote
        </h1>
        <p className="text-xl text-slate-600">
          Tell us about your project and we'll provide a detailed technical
          proposal.
        </p>
      </div>
      <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase">
                Property Type
              </label>
              <select className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-olive">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase">
                Area Size (sq ft)
              </label>
              <input
                required
                type="number"
                placeholder="e.g. 5000"
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-olive"
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-500 uppercase">
              Services Needed
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Landscape Design",
                "Irrigation System",
                "Construction",
                "Maintenance",
              ].map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:border-olive transition-all group"
                >
                  <input type="checkbox" className="w-6 h-6 accent-olive" />
                  <span className="font-bold text-deep-green group-hover:text-olive">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-500 uppercase">
              Project Timeline
            </label>
            <select className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-olive">
              <option>ASAP</option>
              <option>Within 3 months</option>
              <option>3-6 months</option>
              <option>Planning phase</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-olive text-white py-7 rounded-3xl font-bold text-2xl hover:bg-opacity-90 transition-all shadow-2xl shadow-olive/20"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
};

const Process = () => (
  <div className="overflow-hidden">
    <section className="pt-40 pb-24 bg-deep-green text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-8">
          Our <span className="text-olive">Process</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          A systematic approach to creating sustainable, beautiful environments.
          We leave nothing to chance.
        </p>
      </div>
    </section>

    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {[
          {
            step: "01",
            title: "Consultation",
            icon: <MessageSquare />,
            desc: "We begin with a deep dive into your vision, lifestyle, and site requirements. This is where we define the goals of the project.",
          },
          {
            step: "02",
            title: "Site Analysis",
            icon: <Search />,
            desc: "Our engineers conduct a comprehensive water audit, soil analysis, and topographical survey to understand the technical constraints.",
          },
          {
            step: "03",
            title: "Design Phase",
            icon: <Sprout />,
            desc: "We create detailed 3D renderings and technical irrigation plans, optimizing for both aesthetics and water efficiency.",
          },
          {
            step: "04",
            title: "Execution",
            icon: <Briefcase />,
            desc: "Our professional construction team brings the design to life with high-precision installation and minimal site disruption.",
          },
          {
            step: "05",
            title: "Maintenance",
            icon: <ShieldCheck />,
            desc: "We provide ongoing support and system optimization to ensure your landscape thrives for decades to come.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex flex-col lg:flex-row items-center gap-20 mb-32 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            <div className="lg:w-1/2">
              <div className="flex items-center gap-6 mb-8">
                <div className="text-6xl font-black text-deep-green/40">
                  {item.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-olive/10 text-olive flex items-center justify-center">
                  {React.cloneElement(item.icon as React.ReactElement, {
                    size: 32,
                  })}
                </div>
              </div>
              <h3 className="text-4xl font-bold text-deep-green mb-6">
                {item.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {item.desc}
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-500 font-medium">
                  <CheckCircle2 size={18} className="text-olive" />
                  Detailed technical documentation
                </li>
                <li className="flex items-center gap-3 text-slate-500 font-medium">
                  <CheckCircle2 size={18} className="text-olive" />
                  Regular progress updates
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src={`https://picsum.photos/seed/process${i}/800/600`}
                className="rounded-[40px] shadow-2xl"
                alt={item.title}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Pricing = () => (
  <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-24">
      <h1 className="text-5xl lg:text-7xl font-extrabold text-deep-green mb-8">
        Investment Guide
      </h1>
      <p className="text-xl text-slate-600">
        Transparent pricing based on project scale and technical complexity.
        Every project is unique, but here are our general ranges.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "Residential Basic",
          price: "$5k - $15k",
          features: [
            "Site Analysis",
            "Smart Irrigation Setup",
            "Native Planting Design",
            "3 Months Maintenance",
          ],
        },
        {
          title: "Premium Estate",
          price: "$20k - $50k",
          features: [
            "Full Landscape Engineering",
            "Advanced AI Irrigation",
            "Hardscape Construction",
            "1 Year Maintenance",
            "Soil Moisture Sensors",
          ],
        },
        {
          title: "Commercial / Large Scale",
          price: "Custom",
          features: [
            "Full Water Audit",
            "Industrial Grade Systems",
            "LEED Certification Support",
            "Dedicated Project Manager",
            "24/7 Remote Monitoring",
          ],
        },
      ].map((tier, i) => (
        <div
          key={i}
          className={`p-12 rounded-[40px] border-2 transition-all ${i === 1 ? "border-olive bg-white shadow-2xl scale-105" : "border-slate-100 bg-slate-50"}`}
        >
          <h3 className="text-2xl font-bold text-deep-green mb-4">
            {tier.title}
          </h3>
          <div className="text-4xl font-black text-deep-green mb-8">
            {tier.price}
          </div>
          <ul className="space-y-6 mb-12">
            {tier.features.map((f, j) => (
              <li
                key={j}
                className="flex items-center gap-3 text-slate-600 font-medium"
              >
                <CheckCircle2 size={18} className="text-olive" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/quote"
            className={`block w-full py-5 rounded-2xl font-bold text-center transition-all ${i === 1 ? "bg-olive text-white shadow-xl" : "bg-deep-green text-white"}`}
          >
            Get Started
          </Link>
        </div>
      ))}
    </div>

    {/* Maintenance Plans */}
    <div className="mt-32">
      <h3 className="text-4xl font-bold text-deep-green mb-12 text-center">
        Ongoing Support Plans
      </h3>
      <div className="grid md:grid-cols-2 gap-12">
        {[
          {
            title: "Standard Care",
            price: "$199/mo",
            desc: "Quarterly system check-ups, sensor calibration, and seasonal adjustments.",
          },
          {
            title: "Elite Management",
            price: "$499/mo",
            desc: "Monthly visits, 24/7 remote monitoring, priority emergency support, and soil health optimization.",
          },
        ].map((plan, i) => (
          <div
            key={i}
            className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-xl flex justify-between items-center gap-8"
          >
            <div>
              <h4 className="text-2xl font-bold text-deep-green mb-2">
                {plan.title}
              </h4>
              <p className="text-slate-500 leading-relaxed">{plan.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-black text-olive mb-2">
                {plan.price}
              </div>
              <button className="text-sm font-bold text-deep-green hover:text-olive transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-32 bg-slate-50 p-16 rounded-[60px]">
      <h3 className="text-3xl font-bold text-deep-green mb-8">
        Factors Affecting Cost
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          {
            title: "Area Size",
            desc: "Larger plots require more materials and labor.",
          },
          {
            title: "Complexity",
            desc: "Advanced irrigation tech and hardscaping add to cost.",
          },
          {
            title: "Plant Selection",
            desc: "Rare or mature species have higher price points.",
          },
          {
            title: "Site Conditions",
            desc: "Topography and soil quality impact prep work.",
          },
        ].map((f, i) => (
          <div key={i}>
            <h4 className="font-bold text-deep-green mb-2">{f.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold text-deep-green mb-6">
          Resources & Insights
        </h1>
        <p className="text-xl text-slate-600">
          Expert tips on water conservation, landscaping trends, and sustainable
          living.
        </p>
      </div>
      <div className="flex gap-4">
        {["All", "Irrigation", "Design", "Case Studies"].map((c) => (
          <button
            key={c}
            className="px-6 py-2 rounded-full border border-slate-200 text-sm font-bold hover:bg-slate-50 transition-all"
          >
            {c}
          </button>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        {
          title: "How Drip Irrigation Saves Water in Hot Climates",
          cat: "Irrigation",
          date: "Mar 15, 2026",
          img: "https://picsum.photos/seed/blog1/800/600",
        },
        {
          title: "Best Plants for Arid Regions: A Complete Guide",
          cat: "Design",
          date: "Mar 10, 2026",
          img: "https://picsum.photos/seed/blog2/800/600",
        },
        {
          title: "Common Irrigation Mistakes and How to Avoid Them",
          cat: "Irrigation",
          date: "Mar 5, 2026",
          img: "https://picsum.photos/seed/blog3/800/600",
        },
        {
          title: "The Future of Smart Landscaping: AI and IoT",
          cat: "Tech",
          date: "Feb 28, 2026",
          img: "https://picsum.photos/seed/blog4/800/600",
        },
        {
          title: "Case Study: Reducing Water Waste by 60% in LA",
          cat: "Case Studies",
          date: "Feb 20, 2026",
          img: "https://picsum.photos/seed/blog5/800/600",
        },
        {
          title: "Sustainable Hardscaping: Materials That Last",
          cat: "Design",
          date: "Feb 12, 2026",
          img: "https://picsum.photos/seed/blog6/800/600",
        },
      ].map((post, i) => (
        <div key={i} className="group cursor-pointer">
          <div className="h-64 rounded-[32px] overflow-hidden mb-8 shadow-lg">
            <img
              src={post.img}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={post.title}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-bold text-olive uppercase tracking-widest">
              {post.cat}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              {post.date}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-deep-green group-hover:text-olive transition-colors leading-tight">
            {post.title}
          </h3>
        </div>
      ))}
    </div>

    {/* Newsletter */}
    <div className="mt-32 bg-deep-green rounded-[60px] p-16 md:p-24 text-center text-white relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-4xl font-extrabold mb-6">Stay Updated</h3>
        <p className="text-xl text-slate-300 mb-10">
          Get the latest insights on sustainable landscaping and smart
          irrigation delivered to your inbox.
        </p>
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-5 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-olive text-white placeholder:text-white/40"
          />
          <button className="bg-olive text-white px-10 py-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all">
            Subscribe
          </button>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-olive rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-water rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  </div>
);

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl font-extrabold text-deep-green mb-8">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-slate-600">
          Everything you need to know about our services and process.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            q: "How much does a typical smart irrigation system cost?",
            a: "Residential systems usually range from $5,000 to $15,000 depending on property size and complexity. We provide detailed custom quotes after an initial site analysis.",
          },
          {
            q: "How long does the installation process take?",
            a: "Most residential projects are completed within 2-4 weeks. Larger commercial projects can take 2-4 months depending on the scope of work.",
          },
          {
            q: "What kind of maintenance is required?",
            a: "Our systems are designed for low maintenance, but we recommend quarterly check-ups to optimize performance and ensure all sensors are functioning correctly.",
          },
          {
            q: "Do you offer warranties on your systems?",
            a: "Yes, we offer a 5-year warranty on all hardware and a 2-year warranty on installation labor. We also offer extended service plans.",
          },
          {
            q: "How much water can I really save?",
            a: "Most clients see a 40-60% reduction in water waste compared to traditional timer-based systems. The exact amount depends on your previous usage and site conditions.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-8 text-left flex items-center justify-between hover:bg-slate-100 transition-all"
            >
              <h4 className="text-xl font-bold text-deep-green flex items-center gap-3">
                <HelpCircle className="text-olive" />
                {item.q}
              </h4>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-slate-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
    }, 3000);
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
        <div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-deep-green mb-8">
            Join the <span className="text-olive">Green</span> Revolution.
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            We're looking for passionate individuals who want to make a real
            impact on the environment. Join a team of innovators, engineers, and
            designers.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-4xl font-black text-deep-green mb-2">45+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Team Members
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-deep-green mb-2">3</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Global Offices
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000"
            alt="Team Working"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <h3 className="text-3xl font-bold text-deep-green mb-12">
        Open Positions
      </h3>
      <div className="space-y-6">
        {[
          {
            title: "Senior Landscape Architect",
            type: "Full-time",
            loc: "California / Remote",
          },
          {
            title: "Irrigation Systems Engineer",
            type: "Full-time",
            loc: "California",
          },
          {
            title: "Sustainability Consultant",
            type: "Contract",
            loc: "Remote",
          },
          { title: "Project Manager", type: "Full-time", loc: "Texas" },
        ].map((job, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl transition-all"
          >
            <div>
              <h4 className="text-2xl font-bold text-deep-green mb-2">
                {job.title}
              </h4>
              <div className="flex gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.loc}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedJob(job.title)}
              className="bg-olive text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-deep-green/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] p-12 max-w-2xl w-full relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-deep-green transition-colors"
              >
                <X size={32} />
              </button>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-olive/10 text-olive flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-deep-green mb-4">
                    Application Received!
                  </h3>
                  <p className="text-slate-600">
                    Thank you for applying for the {selectedJob} position. We'll
                    be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-deep-green mb-2">
                    Apply for Position
                  </h3>
                  <p className="text-olive font-bold mb-8">{selectedJob}</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-olive"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-olive"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Portfolio/LinkedIn URL
                      </label>
                      <input
                        required
                        type="url"
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-olive"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Why EsiGreen?
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-olive"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-deep-green text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SERVICES_DATA: Record<string, any> = {
  "smart-irrigation": {
    title: "Smart Irrigation Systems",
    subtitle: "Intelligence for every drop.",
    description:
      "Our AI-driven irrigation systems use real-time weather data and soil moisture sensors to deliver exactly the amount of water your landscape needs—no more, no less. We eliminate runoff and evaporation waste through precision engineering.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "Weather-Adaptive",
        desc: "System adjusts automatically based on local forecasts and historical data.",
      },
      {
        title: "Soil Sensing",
        desc: "Moisture probes ensure we only water when the root zone is actually dry.",
      },
      {
        title: "Remote Control",
        desc: "Manage your entire property from anywhere in the world via our mobile app.",
      },
      {
        title: "Leak Detection",
        desc: "Instant alerts and automatic shut-off if a pipe bursts or a valve fails.",
      },
    ],
    stats: [
      { label: "Avg. Water Savings", val: "55%" },
      { label: "ROI Period", val: "18 Months" },
      { label: "System Uptime", val: "99.9%" },
    ],
  },
  "landscape-design": {
    title: "Sustainable Landscape Design",
    subtitle: "Aesthetics meeting ecology.",
    description:
      "We create outdoor spaces that are as sustainable as they are beautiful. By prioritizing native species and ecological balance, we build landscapes that require less water and provide more habitat for local wildlife.",
    image:
      "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "Native Planting",
        desc: "Species that are naturally adapted to your climate and soil.",
      },
      {
        title: "Xeriscaping",
        desc: "Beautiful designs that thrive with minimal to no supplemental water.",
      },
      {
        title: "Functional Spaces",
        desc: "Outdoor living areas designed for comfort and usability.",
      },
      {
        title: "Ecological Balance",
        desc: "Supporting local pollinators and improving soil health.",
      },
    ],
    stats: [
      { label: "Native Species", val: "90%+" },
      { label: "Maintenance Reduction", val: "40%" },
      { label: "Property Value Increase", val: "15%" },
    ],
  },
  "execution-construction": {
    title: "Execution & Construction",
    subtitle: "Precision in every detail.",
    description:
      "Our construction teams are trained in low-impact development techniques. We build with surgical precision, ensuring that the design vision is realized with the highest quality materials and craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "Low-Impact Dev",
        desc: "Techniques that protect existing soil structure and vegetation.",
      },
      {
        title: "Quality Sourcing",
        desc: "We source the best sustainable materials from local suppliers.",
      },
      {
        title: "Project Management",
        desc: "Strict timelines and clear communication throughout the build.",
      },
      {
        title: "Precision Grading",
        desc: "Ensuring perfect drainage and foundation for your landscape.",
      },
    ],
    stats: [
      { label: "On-Time Completion", val: "98%" },
      { label: "Safety Record", val: "Perfect" },
      { label: "Client Satisfaction", val: "4.9/5" },
    ],
  },
  "maintenance-support": {
    title: "Maintenance & Support",
    subtitle: "Long-term ecosystem health.",
    description:
      "A landscape is a living system that evolves. Our maintenance programs are designed to support that evolution, ensuring that your investment continues to grow in beauty and efficiency year after year.",
    image:
      "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "System Audits",
        desc: "Regular check-ups of irrigation hardware and software.",
      },
      {
        title: "Organic Care",
        desc: "Soil health management without harsh chemical fertilizers.",
      },
      {
        title: "Pruning & Health",
        desc: "Expert horticultural care to ensure plant longevity.",
      },
      {
        title: "Seasonal Tuning",
        desc: "Adjusting systems and care routines for changing weather.",
      },
    ],
    stats: [
      { label: "Retention Rate", val: "95%" },
      { label: "Response Time", val: "< 24h" },
      { label: "Landscape Maturity", val: "Optimized" },
    ],
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = SERVICES_DATA[id || ""] || SERVICES_DATA["smart-irrigation"];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-deep-green">
        <div className="absolute inset-0">
          <img
            src={service.image}
            className="w-full h-full object-cover opacity-40"
            alt={service.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-deep-green/50 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-olive font-bold mb-6 hover:gap-3 transition-all"
            >
              <ChevronRight className="rotate-180" size={20} />
              Back to Services
            </Link>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-2xl text-olive font-medium italic">
              {service.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-deep-green mb-8">
                Overview
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                {service.description}
              </p>

              <div className="grid md:grid-cols-2 gap-10">
                {service.features.map((feature: any, i: number) => (
                  <div
                    key={i}
                    className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-olive/10 text-olive flex items-center justify-center mb-6">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-deep-green mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="p-10 rounded-[40px] bg-deep-green text-white">
                <h3 className="text-2xl font-bold mb-8">Key Metrics</h3>
                <div className="space-y-8">
                  {service.stats.map((stat: any, i: number) => (
                    <div key={i}>
                      <p className="text-sm font-bold text-olive uppercase tracking-widest mb-1">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-black">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100">
                <h3 className="text-2xl font-bold text-deep-green mb-6">
                  Ready to start?
                </h3>
                <p className="text-slate-500 mb-8">
                  Get a custom quote for your project today.
                </p>
                <Link
                  to="/quote"
                  className="block w-full bg-olive text-white py-4 rounded-2xl font-bold text-center hover:bg-opacity-90 transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto rounded-[60px] bg-deep-green p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-olive/10 -skew-y-12 translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-4xl lg:text-6xl font-extrabold text-white mb-8">
              Ready to transform <br /> your landscape?
            </h3>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Join hundreds of property owners who have already switched to
              smarter, more sustainable irrigation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/quote"
                className="bg-olive text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl shadow-olive/20"
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Layout Component ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/process" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
