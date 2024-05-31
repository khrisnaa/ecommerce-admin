'use client';

import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { Billboard, Size } from '@prisma/client';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { sizeSchema, sizeSchemaType } from '@/schemas';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';

interface SizeFormProps {
  initialData: Size | null;
}

export const SizeForm = ({ initialData }: SizeFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const { toast } = useToast();

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Add a new size';
  const toastMessage = initialData ? 'Size updated' : 'Size created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<sizeSchemaType>({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: sizeSchemaType) => {
    console.log(params);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      }
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast({
        variant: 'default',
        description: toastMessage,
      });
    } catch {
      toast({
        variant: 'destructive',
        description: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push('/');
      toast({
        variant: 'default',
        description: 'Size deleted',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Make sure you removed all products using this size',
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            onClick={() => setOpen(true)}
            variant="destructive"
            size="sm"
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Size name"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Size Value"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
