"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { Walk, WalkCollection } from "@prisma/client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  generateWalkCollectionSchema,
  walkCollectionSchema,
} from "~/lib/schemas";
import { set, type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const GenerateWalkCollectionForm = () => {
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof generateWalkCollectionSchema>>({
    resolver: zodResolver(generateWalkCollectionSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async ({
    url,
  }: z.infer<typeof generateWalkCollectionSchema>) => {
    setGenerating(true);

    const res = await fetch(`/api/scrape?url=${url}`);
    const collection = await res.json();

    router.push(`/walks/${collection.id}`);

    setGenerating(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button className="self-start" disabled={generating} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default GenerateWalkCollectionForm;
