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
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import type { Walk } from "@prisma/client";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { walkSchema } from "~/lib/schemas";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MapImage from "~/components/MapImage";
import { slugify } from "~/lib/slugify";

const WalkForm = ({
  collectionId,
  walk,
}: {
  collectionId: number;
  walk?: Walk;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof walkSchema>>({
    resolver: zodResolver(walkSchema),
    defaultValues: {
      id: walk?.id,
      name: walk?.name ?? "",
      slug: walk?.slug ?? "",
      description: walk?.description ?? "",
      collectionId: walk?.collectionId ?? collectionId,
      distance: walk?.distance ?? 0,
      order: walk?.order ?? 0,
      circular: walk?.circular ?? false,
      url: walk?.url ?? "",
    },
  });

  const { isPending, mutate } = api.walk.upsert.useMutation({
    onSuccess(data) {
      router.push(`/walks/${collectionId}/${data.id}`);
      router.refresh();
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const onSubmit = (data: z.infer<typeof walkSchema>) => {
    console.log(typeof data.distance);
    mutate(walk ? { id: walk.id, data } : { data });
  };

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
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      form.setValue("slug", slugify(form.getValues("name")))
                    }
                    variant="outline"
                    type="button"
                  >
                    Generate
                  </Button>
                  <Input placeholder="Slug" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
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

        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance</FormLabel>
              <FormControl>
                <Input
                  placeholder="Distance"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="circular"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Circular?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MapImage />

        <Button disabled={isPending} className="self-start" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default WalkForm;
