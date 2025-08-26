import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { Form, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Release } from "../types";
import { TextArea } from "../../../components/ui/textarea";
import { InputImage } from "../../../components/ui/input-image";
import { ReleaseFormType } from "../types/ReleaseForm";
import { releaseValidationSchema } from "../config/validation";
import { initFormVals } from "../config/initConf";
import { useReleaseTypesQuery } from "../hooks/useReleaseTypesQuery";
import { Select } from "../../../components/ui/select";
import { useArtistsQuery } from "../../artist/hooks";
import { useSaveRelease } from "../hooks/useSaveRelease";

type Props = {
    data?: Release;
    onClose: (data?: Release) => void;
}

const DialogReleaseForm = ({ data, onClose }: Props) => {
    const inputRef = useRef<any>(null);
    const queryTypes = useReleaseTypesQuery();
    const queryArtist = useArtistsQuery();
    const mutation = useSaveRelease(data?.id as number);
    const form = useForm<ReleaseFormType>({
        resolver: yupResolver(releaseValidationSchema),
        defaultValues: data?.id ? data : initFormVals
    })
    useEffect(() => {
        if(mutation.isSuccess) {
            onClose(mutation.data.data);
            mutation.reset();
        }
    }, [mutation, onClose])
    const handleCancel = () => {
        onClose();
    }
    const { data: types } = queryTypes;
    const { data: artists } = queryArtist;
    const onSubmit = (req: any) => {
        const formData = new FormData();
        formData.append('name', `${req.name}`);
        formData.append('description', `${req.description}`);
        formData.append('image', inputRef.current.files[0]);
        formData.append('artistId', req.artistId.value);
        formData.append('releaseTypeId', req.releaseTypeId.value);
        mutation.mutate(data?.id ? { id: data?.id, data: formData } : formData)
    }
    return (
        <Dialog open={true} onOpenChange={handleCancel}>
            <Form {...form}>
                <form id="cureleaseform">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{data?.id ? 'Update release' : 'New release'}</DialogTitle>
                        </DialogHeader>
                        <InputImage inputRef={inputRef} defaultUrl={data?.id ? data.image : null} />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Input {...field} placeholder="Name" id="name" className="border rounded-md border-primary px-2 py-1.5" />
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
                        <FormField
                            control={form.control}
                            name="artistId"
                            render={({ field }) => (
                                <FormItem>
                                    <Select {...field} options={artists?.data.map(t => ({ label: t.name, value: t.id }))} placeholder='Artist' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="releaseTypeId"
                            render={({ field }) => (
                                <FormItem>
                                    <Select {...field} options={types?.data.map(t => ({ label: t.name, value: t.id }))} placeholder='Types' />
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

export default DialogReleaseForm