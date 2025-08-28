import { useEffect, useRef } from 'react'
import { Song, SongFormType } from '../types'
import { useSaveSong } from '../hooks'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputImage } from '@/components/ui/input-image'
import { Input } from '@/components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { initFormVals, songValidationSchema } from '../config'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useArtistsQuery } from '@/features/artist/hooks'
import { UploadAudioButton } from './UploadAudioButton'

type Props = {
  data?: Song
  onClose: (data?: Song) => void
}

const DialogSongForm = ({ data, onClose }: Props) => {
  const inputRef = useRef<any>(null)
  const audioRef = useRef<any>(null)
  const mutation = useSaveSong(data?.id as number)
  const queryArtist = useArtistsQuery()
  const form = useForm<SongFormType>({
    resolver: yupResolver(songValidationSchema),
    defaultValues: data?.id ? data : initFormVals,
  })
  useEffect(() => {
    if (mutation.isSuccess) {
      onClose(mutation.data.data)
      mutation.reset()
    }
  }, [mutation, onClose])
  const onSubmit = (req: any) => {
    const ids = req.artistId.map((a: any) => a.value)
    const formData = new FormData()
    formData.append('name', `${req.name}`)
    formData.append('image', inputRef.current.files[0])
    formData.append('file', audioRef.current.files[0])
    formData.append('minutes', `${req.minutes}`)
    formData.append('seconds', `${req.seconds}`)
    formData.append('artistId', JSON.stringify(ids))
    mutation.mutate(data?.id ? { id: data.id, data: formData } : formData)
  }
  const handleCancel = () => {
    onClose()
  }
  const { data: artists } = queryArtist
  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <Form {...form}>
        <form id="cusongform">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {data?.id ? 'Update song' : 'Create song'}
              </DialogTitle>
            </DialogHeader>
            <InputImage
              inputRef={inputRef}
              defaultUrl={data?.id ? data.image : null}
            />
            <UploadAudioButton inputRef={audioRef} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    placeholder="Song name"
                    id="name"
                    className="border rounded-md border-primary px-2 py-1.5"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artistId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    {...field}
                    options={artists?.data.map((t) => ({
                      label: t.name,
                      value: t.id,
                    }))}
                    isMulti
                    placeholder="Artist(s)"
                  />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      placeholder="Minute(s)"
                      id="minutes"
                      type="number"
                      className="border rounded-md border-primary px-2 py-1.5"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seconds"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      placeholder="Second(s)"
                      id="seconds"
                      type="number"
                      className="border rounded-md border-primary px-2 py-1.5"
                    />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="w-full text-right">
                <Button
                  type="button"
                  id="saveBtn"
                  onClick={() => form.handleSubmit(onSubmit)()}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}

export default DialogSongForm
