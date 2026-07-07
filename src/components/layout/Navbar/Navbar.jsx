import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import resumePdf from "../../../../assets/Krishna_Pandey_Resume.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Toggle navbar style on scroll threshold
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Map active state based on section intersections
      const scrollPos = currentScrollY + 250;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNavId(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center px-[20px] md:px-[32px] lg:px-[48px] pointer-events-none"
      >
        <div
          className={`w-full max-w-[1280px] h-[64px] border border-white/5 bg-black/45 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex items-center justify-between px-6 rounded-full transition-all duration-300 pointer-events-auto ${
            scrolled ? "h-[54px] mt-[8px] bg-black/75 border-white/10" : "mt-[16px]"
          }`}
        >
          {/*  Premium Logo Identity */}
          <a href="#home" className="flex items-center gap-4 group pointer-events-auto">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm tracking-wider transition-transform duration-300 group-hover:scale-105">
              KP
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-sm font-bold text-white tracking-wide transition-colors duration-200 group-hover:text-gray-300">
                Krishna Pandey
              </span>
              <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">
                Frontend Engineer
              </span>
            </div>
          </a>

          {/*  Centered Nav Links with Glowing Spring Capsule */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4 text-sm font-medium text-gray-400">
              {navLinks.map((link) => (
                <li key={link.label} className="relative">
                  <a
                    href={link.href}
                    onClick={() => setActiveNavId(link.id)}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 block hover:text-white relative scale-100 hover:scale-[1.03] active:scale-[0.98] ${
                      activeNavId === link.id ? "text-white" : ""
                    }`}
                  >
                    {link.label}
                    {activeNavId === link.id && (
                      <motion.div
                        layoutId="activeCapsule"
                        className="absolute inset-0 bg-white/[0.08] border border-white/5 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/*  Glass Resume Action */}
          <div className="hidden md:block">
            <a
              href={resumePdf}
              download="Krishna_Pandey_Resume.pdf"
              className="flex items-center gap-2 px-5 h-[38px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200"
            >
              <FileText className="w-4.5 h-4.5 text-gray-400" />
              Resume
            </a>
          </div>

          {/* Hamburger menu controls */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center z-50 pointer-events-auto"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/*  Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8"
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex flex-col items-center space-y-8"
            >
              <ul className="flex flex-col items-center gap-4 text-xl font-bold tracking-wide">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setActiveNavId(link.id);
                      }}
                      className="text-gray-300 hover:text-white block py-3 min-h-[48px] px-8 text-center transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="pt-6 w-full max-w-[200px]"
              >
                <a
                  href={resumePdf}
                  download="Krishna_Pandey_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-[48px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white text-sm font-semibold transition-all duration-200"
                >
                  <FileText className="w-4.5 h-4.5 text-gray-400" />
                  Resume
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
