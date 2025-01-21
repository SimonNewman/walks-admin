"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Walk, WalkCollection } from "@prisma/client";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { walkCollectionSchema } from "~/lib/schemas";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const WalkCollectionForm = ({
  collection,
}: {
  collection?: WalkCollection;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof walkCollectionSchema>>({
    resolver: zodResolver(walkCollectionSchema),
    defaultValues: {
      id: collection?.id,
      name: collection?.name ?? "",
      slug: collection?.slug ?? "",
      description: collection?.description ?? "",
    },
  });

  const { isPending, mutate } = api.walkCollection.upsert.useMutation({
    onSuccess(data) {
      router.push(`/walks/${data.id}`);
      router.refresh();
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const onSubmit = (data: z.infer<typeof walkCollectionSchema>) =>
    mutate(collection ? { id: collection.id, data } : { data });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="self-start" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default WalkCollectionForm;
