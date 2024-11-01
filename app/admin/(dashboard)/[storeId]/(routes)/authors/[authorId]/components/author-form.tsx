'use client';
import React from 'react';

//axios
import axios from 'axios';

//hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

//library imports
import * as z from 'zod';
import { Author } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

//library components
import { Trash } from 'lucide-react';

//ui components
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type AuthorFormValues = z.infer<typeof formSchema>;

interface AuthorFormProps {
  initialData: Author | null;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Author' : 'Create Author';
  const description = initialData ? 'Edit a author' : 'Add a new author';
  const toastMessage = initialData ? 'Author updated' : 'Author created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: AuthorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/authors/${params.authorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/authors`, data);
      }
      router.refresh();
      router.push(`/admin/${params.storeId}/authors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/authors/${params.authorId}`
      );
      router.refresh();
      router.push(`/admin/${params.storeId}/authors`);
      toast.success('Author deleted.');
    } catch (error) {
      toast.error(
        'Make sure you removed all books using this author first.'
      );
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
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Author name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
