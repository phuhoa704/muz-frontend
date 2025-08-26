import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Artist } from "../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { Form, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { ArtistFormType } from "../types/ArtistForm";
import { artistValidationSchema } from "../config/validation";
import { initFormVals } from "../config/initConf";
import { CUArtistRequest } from "../types/CUArtistRequest";
import { TextArea } from "../../../components/ui/textarea";
import { useSaveArtist } from "../hooks";
import { InputImage } from "../../../components/ui/input-image";

type Props = {
    data?: Artist;
    onClose: (data?: Artist) => void;
}

const DialogArtistForm = ({ data, onClose }: Props) => {
    const inputRef = useRef<any>(null);
    const mutation = useSaveArtist(data?.id as number);
    const form = useForm<ArtistFormType>({
        resolver: yupResolver(artistValidationSchema),
        defaultValues: data?.id ? data : initFormVals
    })

    useEffect(() => {
        if (mutation?.isSuccess) {
            onClose(mutation?.data?.data);
            mutation.reset();
        }
    }, [mutation, onClose]);

    const onSubmit = (req: CUArtistRequest) => {
        const formData = new FormData();
        formData.append('name', `${req?.name}`);
        formData.append('description', `${req.description}`)
        formData.append('image', inputRef.current.files[0]);
        mutation.mutate(data?.id ? { id: data.id, data: formData } : formData)
    }
    const handleCancel = () => {
        onClose();
    }
    return (
        <Dialog open={true} onOpenChange={handleCancel}>
            <Form {...form}>
                <form id="cuartistform">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {data?.id ? 'Update artist' : 'New artist'}
                            </DialogTitle>
                        </DialogHeader>
                        <InputImage inputRef={inputRef} defaultUrl={data?.id ? data.image : null}/>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Input {...field} placeholder="Artist's name" id="name" className='border rounded-md border-primary px-2 py-1.5' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <TextArea {...field} placeholder="Artist's description" id="description" className='border rounded-md border-primary px-2 py-1.5 w-full' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <div className="w-full text-right">
                                <Button type="button" id="saveBtn" onClick={() => form.handleSubmit(onSubmit)()}>Save</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default DialogArtistForm