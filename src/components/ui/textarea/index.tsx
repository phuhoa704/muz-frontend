import * as React from 'react'
import { cn } from '../../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn('form-control', 'h-[160px] outline-none', className)}
      ref={ref}
      {...props}
    />
  )
)
TextArea.displayName = 'TextArea'
export { TextArea }
