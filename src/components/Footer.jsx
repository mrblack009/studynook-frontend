import { Github, Globe, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-950 dark:bg-[#09090B] dark:border-t dark:border-[#3F3F46] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] select-none transition-colors duration-200">
      {}
      <div className="border-b border-slate-200 dark:border-[#3F3F46] py-16 px-4 md:px-8 max-w-[95vw] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
        <Link to="/" className="group flex items-center gap-4">
          {}
<span className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter uppercase leading-none">
  <span className="text-[#EAB308] dark:text-[#DFE104]">Study</span>
  <span className="text-slate-950 dark:text-[#FAFAFA]">Nook</span>
</span>
        </Link>
        <p className="text-lg md:text-xl text-slate-700 dark:text-[#A1A1AA] max-w-2xl font-medium font-sans leading-tight">
          The premier platform to list, find, and instantly book premium library study spaces. Designed for seamless, conflict free collaboration.
        </p>
      </div>
      {}
      <div className="max-w-[95vw] mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#EAB308] dark:text-[#DFE104] uppercase tracking-widest mb-6">
              QUICK NAVIGATION
            </h3>
            <ul className="space-y-4">
              {['Home', 'Rooms', 'About Us', 'Terms & Services'].map((item) => {
                const path = item === 'Home' ? '/' : item === 'Rooms' ? '/rooms' : `#${item.toLowerCase().replace(/ & /g, '').replace(/ /g, '')}`;
                const isAnchor = path.startsWith('#');
                const Comp = isAnchor ? 'a' : Link;
                const props = isAnchor ? { href: path } : { to: path };
                return (
                  <li key={item}>
                    <Comp 
                      {...props} 
                      className="inline-block text-2xl font-bold uppercase tracking-tighter text-slate-900 hover:text-[#EAB308] dark:text-[#FAFAFA] dark:hover:text-[#DFE104] transition-colors duration-200"
                    >
                      {item}
                    </Comp>
                  </li>
                );
              })}
            </ul>
          </div>
          {}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#EAB308] dark:text-[#DFE104] uppercase tracking-widest mb-6">
              CONTACT INFORMATION
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-xl font-bold tracking-tighter group text-slate-900 hover:text-[#EAB308] dark:text-[#FAFAFA] dark:hover:text-[#DFE104] cursor-pointer">
                <Mail className="w-5 h-5 text-[#EAB308] dark:text-[#DFE104] shrink-0" />
                <span>contact@kawsar.dev</span>
              </li>
              <li className="flex items-center gap-4 text-xl font-bold uppercase tracking-tighter group text-slate-900 hover:text-[#EAB308] dark:text-[#FAFAFA] dark:hover:text-[#DFE104] cursor-pointer">
                <Phone className="w-5 h-5 text-[#EAB308] dark:text-[#DFE104] shrink-0" />
                <span>+880 1234567890</span>
              </li>
              <li className="flex items-center gap-4 text-xl font-bold uppercase tracking-tighter group text-slate-900 hover:text-[#EAB308] dark:text-[#FAFAFA] dark:hover:text-[#DFE104] cursor-pointer">
                <MapPin className="w-5 h-5 text-[#EAB308] dark:text-[#DFE104] shrink-0" />
                <span>UNIVERSITY OF NIMTOLA, FLOOR 3</span>
              </li>
            </ul>
          </div>
          {}
          {}
          <div className="flex flex-col">
  <h3 className="text-sm font-bold text-[#EAB308] dark:text-[#DFE104] uppercase tracking-widest mb-6">
    SOCIAL LINKS
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2">
    {[
      { icon: <Globe className="w-5 h-5" />, url: "https://kawsar.dev", label: "Portfolio" },
      { icon: <Youtube className="w-5 h-5" />, url: "https://youtube.com/@kawsarcodes", label: "YouTube" },
      { icon: <Github className="w-5 h-5" />, url: "https://github.com/kawsarcodes", label: "GitHub" },
      { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/mdkawsarahmed", label: "LinkedIn" }
    ].map((social, idx) => (
      <a
        key={idx}
        href={social.url}
        target="_blank"
        rel="noreferrer"
        aria-label={social.label}
        className="h-14 border border-slate-200 text-slate-950 bg-transparent flex items-center justify-center hover:bg-[#EAB308] hover:border-[#EAB308] hover:text-black dark:border-[#3F3F46] dark:text-[#FAFAFA] dark:hover:bg-[#DFE104] dark:hover:border-[#DFE104] dark:hover:text-black hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {social.icon}
      </a>
    ))}
  </div>
</div>
        </div>
        {}
        <div className="border-t border-slate-200 dark:border-[#3F3F46] mt-24 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-[#A1A1AA]">
            &copy; {new Date().getFullYear()} STUDYNOOK INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#privacy" className="text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-[#EAB308] dark:text-[#A1A1AA] dark:hover:text-[#DFE104] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#terms" className="text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-[#EAB308] dark:text-[#A1A1AA] dark:hover:text-[#DFE104] transition-colors">
              TERMS OF SERVICE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;