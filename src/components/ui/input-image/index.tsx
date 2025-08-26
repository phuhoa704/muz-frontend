import * as React from 'react'
import { cn } from '../../../lib/utils'
import { PlusCircle } from 'lucide-react'
import { Button } from '../button'
import { API_URL } from '../../../config'

export interface InputImageProps
  extends React.HTMLAttributes<HTMLInputElement> {
  inputRef: any
  defaultUrl?: string | null
}

const InputImage = React.forwardRef<HTMLInputElement, InputImageProps>(
  ({ className, inputRef, defaultUrl, ...props }, ref) => {
    const [imgUrl, setImgUrl] = React.useState<string | null>(null)
    const handleImageSelect = (
      e: React.MouseEvent<HTMLButtonElement | HTMLImageElement, MouseEvent>
    ) => {
      e.preventDefault()
      inputRef.current.click()
    }
    const handleImageChange = () => {
      const uploadedImg = inputRef.current.files[0]
      const cachedUrl = URL.createObjectURL(uploadedImg)
      setImgUrl(cachedUrl)
    }
    React.useEffect(() => {
      if (defaultUrl) {
        setImgUrl(`${API_URL}/${defaultUrl}`)
      }
    }, [defaultUrl])
    return (
      <div
        className={cn(
          `relative cursor-pointer ${imgUrl ? 'h-48' : 'h-min'}`,
          className
        )}
        ref={ref}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="img"
            onClick={handleImageSelect}
            className="w-full h-full rounded-md object-contain"
          />
        ) : (
          <div className={'text-center h-10'}>
            <Button onClick={handleImageSelect}>
              <PlusCircle size={20} color="#777777" />
            </Button>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          hidden
          {...props}
          className="w-full p-0 m-0 border-0 outline-none bg-transparent"
        />
      </div>
    )
  }
)
InputImage.displayName = 'InputImage'

export { InputImage }
