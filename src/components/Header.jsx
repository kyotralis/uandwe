import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, ChevronRight, Globe, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import semiconductorData from "../data/semiconductorData";

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState("Semiconductor");

  const industriesData = {
    "Semiconductor": semiconductorData,
    "Communication Engineering": {
      description: "Building scalable communication systems through modern application, hardware, and embedded solutions.",
      categories: [
        {
          name: "Software Services",
          links: [
            { name: "Application Development", path: "/services/application-development" },
            { name: "Cloud Services", path: "/services/cloud-services" },
            { name: "AI & Data", path: "/services/ai-data" }
          ]
        },
        {
          name: "Embedded SW",
          links: [
            { name: "DSP Firmware", path: "/services/embedded/dsp" },
            { name: "PHY Layer Development", path: "/services/embedded/phy-layer" },
            { name: "Routing Protocol Integration", path: "/services/embedded/routing" },
            { name: "FPGA Acceleration", path: "/services/embedded/fpga" },
            { name: "Real-Time Packet Processing", path: "/services/embedded/packet-processing" },
            { name: "Satellite Comms Firmware", path: "/services/embedded/satcom" }
          ]
        },
        {
          name: "Hardware Design",
          links: [
            { name: "RF & Microwave Design", path: "/services/hardware/rf-microwave" },
            { name: "Antenna Engineering", path: "/services/hardware/antenna" },
            { name: "Optical Networking", path: "/services/hardware/optical" },
            { name: "Baseband ASICs", path: "/services/hardware/baseband" },
            { name: "Signal Integrity Analysis", path: "/services/hardware/signal-integrity" },
            { name: "Telecom Validation", path: "/services/hardware/telecom-validation" }
          ]
        }
      ]
    },
    "Automotive": {
      description: "Delivering next-generation automotive software, hardware, and embedded platforms.",
      categories: [
        {
          name: "Software Services",
          links: [
            { name: "Application Development", path: "/services/application-development" },
            { name: "Cloud Services", path: "/services/cloud-services" },
            { name: "AI & Data", path: "/services/ai-data" }
          ]
        },
        {
          name: "Embedded SW",
          links: [
            { name: "AUTOSAR (Classic & Adaptive)", path: "/services/embedded/autosar" },
            { name: "ADAS & Sensor Fusion", path: "/services/embedded/adas" },
            { name: "In-Vehicle Infotainment (IVI)", path: "/services/embedded/infotainment" },
            { name: "Functional Safety (ISO 26262)", path: "/services/embedded/functional-safety" },
            { name: "EV Battery Management (BMS)", path: "/services/embedded/bms" },
            { name: "V2X Communications", path: "/services/embedded/v2x" }
          ]
        },
        {
          name: "Hardware Design",
          links: [
            { name: "Automotive ECUs & Domain Controllers", path: "/services/hardware/ecu" },
            { name: "EV Power Electronics", path: "/services/hardware/power-electronics" },
            { name: "Radar & LiDAR Hardware", path: "/services/hardware/radar-lidar" },
            { name: "Hardware Security Modules (HSM)", path: "/services/hardware/security" },
            { name: "Automotive PCB & Thermal Design", path: "/services/hardware/automotive-pcb" },
            { name: "EMI/EMC & Automotive Compliance", path: "/services/hardware/emc" }
          ]
        }
      ]
    },
    "Healthcare": {
      description: "Engineering intelligent medical solutions with application, hardware, and embedded technologies.",
      categories: [
        {
          name: "Software Services",
          links: [
            { name: "Application Development", path: "/services/application-development" },
            { name: "Cloud Services", path: "/services/cloud-services" },
            { name: "AI & Data", path: "/services/ai-data" },
            { name: "Medical Imaging Software", path: "/services/imaging-software" }
          ]
        },
        {
          name: "Embedded SW",
          links: [
            { name: "Medical Device Firmware (IEC 62304)", path: "/services/embedded/medical-firmware" },
            { name: "Wearable Health Algorithms", path: "/services/embedded/wearable-algorithms" },
            { name: "Connected Health & IoMT", path: "/services/embedded/connected-health" },
            { name: "Point-of-Care Diagnostic Systems", path: "/services/embedded/point-of-care" }
          ]
        },
        {
          name: "Hardware Design",
          links: [
            { name: "Wearable Sensor Hardware", path: "/services/hardware/wearable-hardware" },
            { name: "Medical Imaging & DAQ Hardware", path: "/services/hardware/imaging-hardware" },
            { name: "Diagnostic & Lab Equipment", path: "/services/hardware/diagnostic-equipment" },
            { name: "Implantable Electronics (AIMD)", path: "/services/hardware/implantable-electronics" },
            { name: "Medical Power Supplies & BMS", path: "/services/hardware/medical-power-supplies" },
            { name: "EMI/EMC for Medical Devices", path: "/services/hardware/medical-emc" }
          ]
        }
      ]
    }
  };
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("India");
  const searchRef = useRef(null);

  const handleLinkClick = (e, path, name, actionFn) => {
    if (actionFn) actionFn();
  };
  const mobileMenuRef = useRef(null);
  const langRef = useRef(null);

  const hideTimeout = useRef(null);

  // Use a ref to access latest state inside the scroll event without re-binding
  const stateRef = useRef({ activeDropdown, searchOpen, mobileMenuOpen, languageOpen, isHovered: false });
  useEffect(() => {
    stateRef.current = { activeDropdown, searchOpen, mobileMenuOpen, languageOpen, isHovered: stateRef.current.isHovered };
    
    const s = stateRef.current;
    if (!s.activeDropdown && !s.searchOpen && !s.mobileMenuOpen && !s.languageOpen && !s.isHovered) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        const currentS = stateRef.current;
        if (!currentS.activeDropdown && !currentS.searchOpen && !currentS.mobileMenuOpen && !currentS.languageOpen && !currentS.isHovered) {
          setIsVisible(false);
        }
      }, 3000);
    } else if (s.activeDropdown || s.searchOpen || s.mobileMenuOpen || s.languageOpen || s.isHovered) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setIsVisible(true);
    }
  }, [activeDropdown, searchOpen, mobileMenuOpen, languageOpen]);

  // Global mouse movement idle timer
  useEffect(() => {
    const onMouseMove = () => {
      const s = stateRef.current;
      
      // Always show on mouse move
      setIsVisible(true);
      
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      
      // Reset the idle hide timer if not interacting
      if (!s.activeDropdown && !s.searchOpen && !s.mobileMenuOpen && !s.languageOpen && !s.isHovered) {
        hideTimeout.current = setTimeout(() => {
          const currentS = stateRef.current;
          if (!currentS.activeDropdown && !currentS.searchOpen && !currentS.mobileMenuOpen && !currentS.languageOpen && !currentS.isHovered) {
            setIsVisible(false);
          }
        }, 3000);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // Initial hide on mount if no movement
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      const s = stateRef.current;
      if (!s.activeDropdown && !s.searchOpen && !s.mobileMenuOpen && !s.languageOpen && !s.isHovered) {
        setIsVisible(false);
      }
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      const s = stateRef.current;
      
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }

      // Always show when interacting
      if (s.activeDropdown || s.searchOpen || s.mobileMenuOpen || s.languageOpen || s.isHovered) {
        setIsVisible(true);
      } else {
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
          
          hideTimeout.current = setTimeout(() => {
            const currentS = stateRef.current;
            if (!currentS.activeDropdown && !currentS.searchOpen && !currentS.mobileMenuOpen && !currentS.languageOpen && !currentS.isHovered) {
              setIsVisible(false);
            }
          }, 3000);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menuData = {
    whatWeDo: {
      title: t("header.what_we_do"),
      sections: [
        {
          heading: t("services.categories.application.title") || "Software Services",
          links: [
            { name: t("services.categories.application.services.s1.name") || "Application Development", path: "/services/application-development" },
            { name: t("services.categories.application.services.s2.name") || "Cloud Services", path: "/services/cloud-services" },
            { name: t("services.categories.application.services.s3.name") || "AI & Data", path: "/services/ai-data" }
          ]
        },
        {
          heading: t("header_menu.Hardware") || "Hardware",
          links: [
            { name: t("header_menu.rf_microwave") || "RF & Microwave Design", path: "/services/hardware/rf-microwave" },
            { name: t("header_menu.antenna") || "Antenna Engineering", path: "/services/hardware/antenna" },
            { name: t("header_menu.optical") || "Optical Networking", path: "/services/hardware/optical" },
            { name: t("header_menu.baseband") || "Baseband ASICs", path: "/services/hardware/baseband" },
            { name: t("header_menu.signal_integrity") || "Signal Integrity Analysis", path: "/services/hardware/signal-integrity" },
            { name: t("header_menu.telecom_validation") || "Telecom Validation", path: "/services/hardware/telecom-validation" }
          ]
        },
        {
          heading: t("header_menu.Embedded Design") || "Embedded Design",
          links: [
            { name: t("header_menu.dsp_firmware") || "DSP Firmware", path: "/services/embedded/dsp" },
            { name: t("header_menu.phy_layer") || "PHY Layer Development", path: "/services/embedded/phy-layer" },
            { name: t("header_menu.routing") || "Routing Protocol Integration", path: "/services/embedded/routing" },
            { name: t("header_menu.fpga_acceleration") || "FPGA Acceleration", path: "/services/embedded/fpga" },
            { name: t("header_menu.packet_processing") || "Real-Time Packet Processing", path: "/services/embedded/packet-processing" },
            { name: t("header_menu.satcom") || "Satellite Comms Firmware", path: "/services/embedded/satcom" }
          ]
        },
        {
          heading: t("header_menu.Industries"),
          links: [
            { name: t("header_menu.Automotive"), path: "/industries/automotive" },
            { name: t("header_menu.Medical"), path: "/industries/medical" },
            { name: t("header_menu.Semiconductor"), path: "/industries/semiconductor" },
            { name: t("header_menu.Telecom"), path: "/industries/telecom" }
          ]
        }
      ]
    },
    whatWeThink: {
      title: t("header.what_we_think"),
      editorial: {
        title: t("header.editorial.think.title", "Perspectives That Shape Tomorrow"),
        description: t("header.editorial.think.desc", "Step inside the minds of innovators charting the frontiers of technology. Explore forward-looking research, real-world success stories, and deep perspectives designed to inspire your next breakthrough."),
        ctaText: t("header.editorial.think.cta", "Explore All Insights & Stories"),
        ctaPath: "/resources/casestudies"
      },
      sections: [
        {
          heading: t("header_menu.Resources"),
          links: [
            { name: t("header_menu.Blogs"), path: "/resources/blogs" },
            { name: t("header_menu.Case Studies"), path: "/resources/casestudies" },
            { name: t("header_menu.Whitepapers"), path: "/resources/whitepapers" }
          ]
        }
      ]
    },
    whoWeAre: {
      title: t("header.who_we_are"),
      editorial: {
        title: t("header.editorial.who.title", "Driven by Purpose, Defined by Excellence"),
        description: t("header.editorial.who.desc", "At U&WE, we are a collective of passionate thinkers, visionary leaders, and trusted collaborators. Guided by relentless curiosity and unwavering integrity, we partner with world-class innovators to turn bold ambition into lasting global impact."),
        ctaText: t("header.editorial.who.cta", "Explore Our Story & Vision"),
        ctaPath: "/aboutus/companyoverview"
      },
      sections: [
        {
          heading: t("header_menu.About Us"),
          links: [
            { name: t("header_menu.Company Overview"), path: "/aboutus/companyoverview" },
            { name: t("header_menu.Leadership"), path: "/aboutus/leadership" },
            { name: t("header_menu.Testimonials"), path: "/aboutus/testimonials" }
          ]
        },
        {
          heading: t("header_menu.Partnerships"),
          links: [
            { name: "RENESAS", path: "/partners/renesas" },
            { name: "NVIDIA", path: "/partners/nvidia" },
            { name: "SEMI.ORG", path: "/partners/semi-org" }
          ]
        }
      ]
    },
    careers: {
      title: t("header.careers"),
      editorial: {
        title: t("header.editorial.careers.title", "Where Visionaries Shape Tomorrow"),
        description: t("header.editorial.careers.desc", "Unleash your ambition alongside bold thinkers and relentless innovators. We take on the challenges that define the next era—giving you the autonomy to explore, create, and build a lasting legacy that impacts the world."),
        ctaText: t("header.editorial.careers.cta", "Explore Opportunities & Culture"),
        ctaPath: "/careers/jobs"
      },
      sections: [
        {
          heading: t("header_menu.Life at UANDWE"),
          links: [
            { name: t("header_menu.Benefits"), path: "/careers/benefits" },
            { name: t("header_menu.Work environment"), path: "/careers/work-environment" }
          ]
        },
        {
          heading: t("header_menu.Careers"),
          links: [
            { name: t("header_menu.Jobs"), path: "/careers/jobs" }
          ]
        }
      ]
    }
  };

  const menuItems = [
    { name: t("header.what_we_do"), key: "whatWeDo" },
    { name: t("header.what_we_think"), key: "whatWeThink" },
    { name: t("header.who_we_are"), key: "whoWeAre" },
    { name: t("header.careers"), key: "careers" }
  ];

  // Flatten menu for search
  const allItems = Object.values(menuData).flatMap(section =>
    section.sections.flatMap(sub => sub.links)
  );

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const toggleMobileDropdown = (key) => {
    setMobileDropdownOpen(mobileDropdownOpen === key ? null : key);
  };

  return (
    <>
      <div className="fixed top-4 left-0 w-full z-[60] flex justify-center px-[2%] md:px-[4%] pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onMouseEnter={() => { 
            stateRef.current.isHovered = true; 
            setIsVisible(true); 
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
          }}
          onMouseLeave={() => {
            stateRef.current.isHovered = false;
            const s = stateRef.current;
            if (!s.activeDropdown && !s.searchOpen && !s.mobileMenuOpen && !s.languageOpen) {
              if (hideTimeout.current) clearTimeout(hideTimeout.current);
              hideTimeout.current = setTimeout(() => {
                const currentS = stateRef.current;
                if (!currentS.activeDropdown && !currentS.searchOpen && !currentS.mobileMenuOpen && !currentS.languageOpen && !currentS.isHovered) {
                  setIsVisible(false);
                }
              }, 3000);
            }
          }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[1600px] h-[72px] lg:h-[80px] p-2 pl-2 pr-2 lg:pr-3 rounded-full transition-all duration-300 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl ${scrolled || activeDropdown || mobileMenuOpen ? 'bg-white/80' : 'bg-white/60'}`}
        >
          {/* LEFT: LOGO */}
          <div className="flex items-center h-full pl-2 lg:pl-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="UANDWE logo" className="h-10 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            </Link>
          </div>

          {/* CENTER: DESKTOP MENU (WHITE PILL) */}
          <div className="hidden lg:flex items-center bg-white rounded-full px-8 h-full shadow-sm border border-neutral-100">
            <ul className="flex items-center h-full gap-8 xl:gap-10">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  onMouseEnter={() => setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="h-full flex items-center cursor-pointer relative group"
                >
                  <div className={`flex items-center gap-1.5 text-[15px] xl:text-[16px] transition-colors ${activeDropdown === item.key ? 'text-primary font-semibold' : 'text-neutral-800 group-hover:text-primary font-medium'}`}>
                    {item.name}
                  </div>
                  {/* Active Indicator Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full transition-transform origin-center duration-300 ${activeDropdown === item.key ? 'scale-x-100' : 'scale-x-0'}`} />
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: SEARCH & LANG (DARK PILL) */}
          <div className="flex items-center h-full gap-2">
            {/* Desktop right section */}
            <div className="hidden lg:flex items-center h-full bg-[#111827] rounded-full px-6 gap-6 shadow-md border border-neutral-800 hover:bg-black transition-colors">

              {/* SEARCH BLOCK */}
              <div className="flex items-center relative">
                <AnimatePresence mode="wait">
                  {!searchOpen ? (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      onClick={() => setSearchOpen(true)}
                      className="flex items-center gap-2 group cursor-pointer focus:outline-none overflow-hidden"
                    >
                      <Search className="text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" size={18} />
                      <span className="text-neutral-200 group-hover:text-white text-[14px] font-medium transition-colors whitespace-nowrap">Search</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 220 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-center bg-white/10 rounded-full px-3 py-1.5 overflow-hidden"
                    >
                      <Search className="text-neutral-400 flex-shrink-0" size={16} />
                      <input
                        ref={(input) => input && input.focus()}
                        type="text"
                        placeholder={t("header.search_placeholder") || "Search..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && filteredItems.length > 0) {
                            const item = filteredItems[0];
                            navigate(item.path);
                            setSearchOpen(false);
                            setSearchQuery("");
                          }
                        }}
                        className="bg-transparent text-white text-sm outline-none w-full ml-2 placeholder:text-neutral-400 min-w-0"
                      />
                      <X
                        className="text-neutral-400 hover:text-white cursor-pointer flex-shrink-0 ml-1"
                        size={16}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inline Search Results Dropdown */}
                <AnimatePresence>
                  {searchOpen && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-6 w-[300px] max-h-[400px] overflow-y-auto custom-scrollbar bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                    >
                      <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                        <h3 className="text-primary text-[11px] font-semibold uppercase tracking-widest">{t("header.search_results")}</h3>
                      </div>
                      {filteredItems.length > 0 ? (
                        <div className="flex flex-col">
                          {filteredItems.map((item, i) => (
                            <Link
                              key={i}
                              to={item.path}
                              className="px-4 py-2.5 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                              onClick={(e) => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              {item.name}
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-transform -translate-x-2 group-hover:translate-x-0 text-primary" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 px-4">
                          <Search size={24} className="text-neutral-300 mb-2" />
                          <p className="text-neutral-500 text-sm text-center">No results for "{searchQuery}"</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-[1px] h-6 bg-neutral-700"></div>

              {/* LANGUAGE SELECTOR */}
              <div ref={langRef} className="relative flex items-center gap-2 cursor-pointer group" onClick={() => setLanguageOpen(!languageOpen)}>
                <Globe size={18} className="text-neutral-400 group-hover:text-white transition-colors" />
                <span className="text-neutral-200 group-hover:text-white text-[14px] transition-colors font-medium">
                  {selectedRegion}
                </span>
                <ChevronDown size={16} className={`text-neutral-400 group-hover:text-white transition-transform ${languageOpen ? 'rotate-180' : ''}`} />

                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-6 w-[160px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      {selectedRegion !== 'China' && (
                        <div
                          onClick={(e) => { e.stopPropagation(); i18n.changeLanguage('zh'); setSelectedRegion('China'); setLanguageOpen(false); }}
                          className="px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors font-medium text-sm cursor-pointer"
                        >
                          {t("header.languages.china", "China")}
                        </div>
                      )}
                      {selectedRegion !== 'India' && (
                        <div
                          onClick={(e) => { e.stopPropagation(); i18n.changeLanguage('en'); setSelectedRegion('India'); setLanguageOpen(false); }}
                          className="px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors font-medium text-sm cursor-pointer"
                        >
                          {t("header.languages.india", "India")}
                        </div>
                      )}
                      {selectedRegion !== 'Canada' && (
                        <div
                          onClick={(e) => { e.stopPropagation(); i18n.changeLanguage('en'); setSelectedRegion('Canada'); setLanguageOpen(false); }}
                          className="px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors font-medium text-sm cursor-pointer"
                        >
                          {t("header.languages.canada", "Canada")}
                        </div>
                      )}
                      {selectedRegion !== 'USA' && (
                        <div
                          onClick={(e) => { e.stopPropagation(); i18n.changeLanguage('en'); setSelectedRegion('USA'); setLanguageOpen(false); }}
                          className="px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors font-medium text-sm cursor-pointer"
                        >
                          {t("header.languages.usa", "USA")}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden h-full flex items-center gap-2 pr-2">
              <button onClick={() => setSearchOpen(true)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-neutral-800 focus:outline-none shadow-sm border border-neutral-100">
                <Search size={20} />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-12 h-12 bg-[#111827] rounded-full flex items-center justify-center text-white focus:outline-none shadow-md">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* MEGA MENU BACKGROUND PANEL (DESKTOP) */}
      <div className="fixed top-0 left-0 w-full z-[55] pointer-events-none flex justify-center">
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-[100px] left-0 w-full bg-white shadow-2xl hidden lg:block border-b border-gray-200 rounded-b-3xl pointer-events-auto"
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="max-w-[1400px] mx-auto px-[5%] py-12">
                <div className="flex flex-col gap-10">
                  {/* Top Row: Big Title */}
                  <div>
                    <h2 className="text-lg lg:text-xl xl:text-[22px] text-black font-semibold flex items-center gap-3">
                      {menuData[activeDropdown].title}
                      <span className="w-7 h-7 bg-primary flex items-center justify-center text-neutral-900 flex-shrink-0 rounded-md">
                        <ChevronRight size={18} strokeWidth={3} />
                      </span>
                    </h2>
                  </div>

                  {/* Bottom Row: Dynamic Sections */}
                  {activeDropdown === 'whatWeDo' ? (
                    <div className="flex w-full gap-8 lg:gap-16 items-stretch">
                      {/* Left Column: Master Navigation */}
                      <div className="w-1/3 flex flex-col gap-2 border-r border-gray-200 pr-8">
                        {Object.keys(industriesData).map((ind) => (
                          <div
                            key={ind}
                            onMouseEnter={() => setActiveIndustry(ind)}
                            className={`relative px-6 py-5 cursor-pointer rounded-xl transition-all duration-300 flex items-center ${activeIndustry === ind
                              ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                              : 'text-neutral-600 hover:text-black hover:bg-gray-50'
                              }`}
                          >
                            {/* Blue vertical indicator */}
                            <div
                              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-primary rounded-r-md transition-all duration-300 ${activeIndustry === ind ? 'h-[60%] opacity-100' : 'h-0 opacity-0'
                                }`}
                            />
                            <span className="text-[15px] lg:text-base ml-2 tracking-wide">{t(`header_menu.${ind}`, ind)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right Panel: Detail View */}
                      <div className="w-2/3 -mt-24">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeIndustry}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full h-full bg-gray-50 border border-gray-200 rounded-[20px] p-8 lg:p-10 flex flex-col shadow-xl"
                          >

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10 flex-grow">
                              {industriesData[activeIndustry].categories.map((category, idx) => (
                                <motion.div
                                  key={category.name}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                                  className="flex flex-col"
                                >
                                  <h4 className="text-primary font-semibold text-[15px] lg:text-base xl:text-[17px] mb-4 pb-2 border-b border-gray-200">{t(`header_menu.${category.name}`, category.name)}</h4>
                                  <div className="flex flex-col gap-3">
                                    {category.links.map((link, i) => (
                                      <Link
                                        key={i}
                                        to={link.path}
                                        className="text-neutral-700 hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all duration-300 text-[12px] lg:text-[13px] xl:text-[14px] flex items-center w-fit"
                                        onClick={(e) => handleLinkClick(e, link.path, link.name, () => setActiveDropdown(null))}
                                      >
                                        {t(`header_menu.${link.name}`, link.name)}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            <div className="pt-6 border-t border-gray-200 mt-auto">
                              <p className="text-neutral-600 text-[11px] sm:text-xs md:text-[13px] lg:text-sm xl:text-[15px] 2xl:text-base min-[1920px]:text-[17px] min-[2560px]:text-lg leading-relaxed">
                                {t(`industries_desc.${activeIndustry.replace(/\\s+/g, '')}`, industriesData[activeIndustry].description)}
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full gap-12 lg:gap-16 items-start">
                      {/* Left Column: Featured Editorial Card */}
                      <div className="w-5/12 flex flex-col justify-between pr-8 border-r border-gray-200 min-h-[260px]">
                        <div className="flex flex-col">
                          <h3 className="text-xl lg:text-2xl font-semibold text-black leading-tight mb-4 tracking-tight">
                            {menuData[activeDropdown].editorial?.title}
                          </h3>
                          <p className="text-neutral-600 text-xs lg:text-sm leading-relaxed font-normal mb-6">
                            {menuData[activeDropdown].editorial?.description}
                          </p>
                        </div>

                        {menuData[activeDropdown].editorial?.ctaText && (
                          <Link
                            to={menuData[activeDropdown].editorial.ctaPath}
                            onClick={(e) => handleLinkClick(e, menuData[activeDropdown].editorial.ctaPath, menuData[activeDropdown].editorial.ctaText, () => setActiveDropdown(null))}
                            className="inline-flex items-center gap-2.5 text-xs lg:text-sm font-semibold text-primary hover:text-primary transition-colors group/cta w-fit tracking-wide"
                          >
                            <span>{menuData[activeDropdown].editorial.ctaText}</span>
                            <ArrowRight size={16} className="text-primary group-hover/cta:translate-x-1.5 transition-transform duration-300" />
                          </Link>
                        )}
                      </div>

                      {/* Right Column: Structured Navigation Links with Big Heading */}
                      <div className="w-7/12 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                          {menuData[activeDropdown].sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col">
                              <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-4 pb-3 border-b border-gray-200">
                                {section.heading}
                              </h3>
                              <div className="flex flex-col">
                                {section.links.map((link, i) => (
                                  <Link
                                    key={i}
                                    to={link.path}
                                    className="group/link flex items-center justify-between py-3.5 border-b border-gray-100 hover:border-gray-200 transition-all text-sm lg:text-base text-neutral-700 hover:text-primary"
                                    onClick={(e) => handleLinkClick(e, link.path, link.name, () => setActiveDropdown(null))}
                                  >
                                    <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">
                                      {link.name}
                                    </span>
                                    <ChevronRight
                                      size={16}
                                      className="text-neutral-400 group-hover/link:text-primary group-hover/link:translate-x-1 transition-all duration-300"
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/90 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[340px] bg-bg shadow-2xl overflow-y-auto text-neutral-900 border-l border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-24 pb-12 px-6">
                {menuItems.map((item) => (
                  <div key={item.key} className="mb-1 border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(item.key)}
                      className="flex justify-between items-center w-full py-5 text-neutral-800 hover:text-primary group"
                    >
                      <span className="text-xl font-medium group-hover:text-primary transition-colors">{item.name}</span>
                      <motion.div
                        animate={{ rotate: mobileDropdownOpen === item.key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className={mobileDropdownOpen === item.key ? 'text-primary' : 'text-neutral-400'} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {mobileDropdownOpen === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-5 pt-2 flex flex-col gap-6">
                            {menuData[item.key].sections.map((section, idx) => (
                              <div key={idx}>
                                <h4 className="text-neutral-400 text-sm mb-3 font-bold uppercase tracking-wider">{section.heading}</h4>
                                <div className="flex flex-col gap-3">
                                  {section.links.map((sub, i) => (
                                    <Link
                                      key={i}
                                      to={sub.path}
                                      className="text-neutral-700 hover:text-primary text-lg transition-colors font-medium"
                                      onClick={(e) => handleLinkClick(e, sub.path, sub.name, () => setMobileMenuOpen(false))}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}