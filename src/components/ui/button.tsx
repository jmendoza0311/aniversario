import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl border border-purple-500/20",
        destructive:
          "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg hover:from-red-700 hover:to-pink-700 hover:shadow-xl border border-red-500/20",
        outline:
          "border border-white/30 bg-white/10 backdrop-blur-sm text-white shadow-lg hover:bg-white/20 hover:border-white/50 hover:shadow-xl",
        secondary:
          "bg-gradient-to-r from-slate-600 to-gray-600 text-white shadow-lg hover:from-slate-700 hover:to-gray-700 hover:shadow-xl border border-slate-500/20",
        ghost:
          "text-white hover:bg-white/20 backdrop-blur-sm rounded-xl",
        link: "text-purple-300 underline-offset-4 hover:underline hover:text-purple-200",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-5 text-sm font-semibold",
        sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-xs font-medium",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base font-semibold",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
