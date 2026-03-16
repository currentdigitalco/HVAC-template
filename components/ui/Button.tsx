import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "bg-terracotta text-white hover:bg-terracotta-light active:scale-[0.98]",
    secondary: "bg-navy text-ivory hover:bg-navy-light active:scale-[0.98]",
    outline:
      "border-2 border-navy/20 text-navy hover:bg-navy hover:text-ivory active:scale-[0.98]",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
