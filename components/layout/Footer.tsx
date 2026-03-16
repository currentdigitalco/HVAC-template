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
    <footer className="bg-dark text-stone/70" data-nav-theme="dark">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl text-stone">
              Precision Climate
            </h3>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-stone/50">
              Expert HVAC solutions crafted with precision. Residential and
              commercial comfort, designed to last.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-teal"
              >
                <Phone size={16} className="text-teal" />
                (555) 123-4567
              </a>
              <a
                href="mailto:info@precisionclimate.com"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-teal"
              >
                <Mail size={16} className="text-teal" />
                info@precisionclimate.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-teal" />
                123 Main Street, Your City
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-stone/40">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-300 hover:text-teal"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-stone/40">
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

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone/10 pt-8 md:flex-row">
          <p className="text-xs text-stone/30">
            &copy; {new Date().getFullYear()} Precision Climate. All rights
            reserved.
          </p>
          <p className="text-xs text-stone/30">
            Designed by{" "}
            <a
              href="https://currentdigital.co"
              className="text-teal/60 transition-colors hover:text-teal"
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
