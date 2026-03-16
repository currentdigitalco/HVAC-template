"use client";

import { Phone, Mail, MapPin } from "lucide-react";

const SERVICES = [
  "HVAC Installation",
  "Maintenance & Repair",
  "Ductwork Design",
  "Indoor Air Quality",
  "Emergency Service",
];

const SERVICE_AREAS = [
  "Downtown",
  "North District",
  "South County",
  "West End",
  "East Borough",
];

export default function Footer() {
  return (
    <footer className="relative text-cream/50" data-nav-theme="dark">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div data-reveal="stagger" data-reveal-stagger="0.12" className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl text-cream">
              Precision Climate
            </h3>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-cream/30">
              Expert HVAC solutions crafted with precision. Residential and
              commercial comfort, designed to last.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-terracotta"
              >
                <Phone size={16} className="text-terracotta/60" />
                (555) 123-4567
              </a>
              <a
                href="mailto:info@precisionclimate.com"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-terracotta"
              >
                <Mail size={16} className="text-terracotta/60" />
                info@precisionclimate.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-terracotta/60" />
                123 Main Street, Your City
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-cream/20">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-300 hover:text-terracotta"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-cream/20">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal="fade-up" data-reveal-delay="0.3" className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-cream/20">
            &copy; {new Date().getFullYear()} Precision Climate. All rights
            reserved.
          </p>
          <p className="text-xs text-cream/20">
            Designed by{" "}
            <a
              href="https://currentdigital.co"
              className="text-terracotta/40 transition-colors hover:text-terracotta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Current Digital Co
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
