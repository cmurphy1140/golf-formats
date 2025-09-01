import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "badge-masters focus-masters",
  {
    variants: {
      variant: {
        default: "badge-tournament",
        secondary: "badge-casual", 
        destructive: "bg-masters-azalea/20 text-masters-azalea",
        outline: "border border-masters-stone text-masters-slate bg-transparent",
        success: "badge-casual",
        warning: "badge-betting",
        info: "badge-tournament",
        purple: "badge-team",
        orange: "badge-betting",
        gradient: "badge-tradition",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-tiny",
        lg: "px-4 py-1.5 text-small",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }