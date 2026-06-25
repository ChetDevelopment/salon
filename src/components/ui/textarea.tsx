import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ className, label, error, id, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-body font-medium tracking-wider text-[#161618]/60 mb-2 uppercase">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full px-4 py-3 bg-white border border-khmer-gold/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-khmer-gold/20 focus:border-khmer-gold/40 transition-all duration-300 text-sm font-body placeholder:text-[#161618]/20 resize-vertical min-h-[120px]",
          error && "border-red-300 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 font-body">{error}</p>}
    </div>
  )
}
