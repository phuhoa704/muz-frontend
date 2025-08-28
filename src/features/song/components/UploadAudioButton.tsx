import React from 'react'
import { cn } from '@/lib/utils'

interface UploadAudioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  inputRef: any
}

const UploadAudioButton = React.forwardRef<
  HTMLInputElement,
  UploadAudioButtonProps
>(({ className, inputRef, ...props }, ref) => {
  return (
    <div className={cn('relative', className)} ref={ref}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="file_input"
      >
        Upload audio
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        id="file_input"
        {...props}
        ref={inputRef}
        type="file"
        accept="audio/*"
      />
    </div>
  )
})
UploadAudioButton.displayName = 'UploadAudioButton'
export { UploadAudioButton }
