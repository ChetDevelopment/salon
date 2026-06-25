import Link from "next/link"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  href?: string
  loading?: boolean
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-body font-medium tracking-wider overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-[#161618] text-white hover:bg-[#2c1810] focus:ring-khmer-gold/30 rounded-full",
    secondary:
      "gold-gradient-bg text-white hover:opacity-90 focus:ring-khmer-gold/30 rounded-full",
    outline:
      "border border-khmer-gold/30 text-khmer-gold hover:bg-khmer-gold hover:text-white focus:ring-khmer-gold/30 rounded-full",
    ghost:
      "text-[#161618]/60 hover:text-khmer-gold hover:bg-khmer-gold/5 focus:ring-khmer-gold/30 rounded-full",
    danger:
      "bg-khmer-burgundy text-white hover:bg-red-800 focus:ring-red-500/30 rounded-full",
  }

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-sm",
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
