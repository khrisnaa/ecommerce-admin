'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useState, useTransition } from 'react';
import axios from 'axios';

import { Modal } from '@/components/modals/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { storeSchema, storeSchemaType } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const storeModal = useStoreModal();
  const { isOpen, onOpen, onClose } = useStoreModal();

  const { toast } = useToast();

  const form = useForm<storeSchemaType>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: storeSchemaType) => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/stores', values);

      //complete refresh website
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="E-Commerce"
                          type="text"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button
                  onClick={onClose}
                  variant="outline"
                  disabled={isLoading}
                  type="reset"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
