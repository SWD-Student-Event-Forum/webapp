import React, { use } from "react";
import {
  MoreInfoFormSchemaType,
  MoreInfoFormSchema,
  MoreInfoFormDefaultValues,
} from "@/schemas/createEventSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import ImageUpload from "@/components/ImageUpload";
import { useCreateEventStore } from "@/stores/createEvent";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventCategories } from "@/api/event-categories";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export default function MoreInfoForm() {
  const { nextStep, prevStep } = useStepper();
  const { setMoreInfo, MoreInfo } = useCreateEventStore();
  const form = useForm<MoreInfoFormSchemaType>({
    resolver: zodResolver(MoreInfoFormSchema),
    defaultValues: {
      ...MoreInfoFormDefaultValues,
      ...MoreInfo,
    },
  });

  const onSubmit = (data: MoreInfoFormSchemaType) => {
    setMoreInfo(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="sm:w-[600px] lg:w-2/3">
          <CardHeader>
            <CardTitle>More Infomation</CardTitle>
            <CardDescription>
              Provide more information about your event
            </CardDescription>
          </CardHeader>
          <CardContent className=" grid md:grid-cols-1 lg:grid-cols-2 gap-4">
            <ImageUpload />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="More than 3 characters"
                        {...field}
                        required
                        rows={6}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Note"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Note for manager</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="More than 3 characters"
                        {...field}
                        required
                        rows={6}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            <Button
              type="button"
              className=" w-full"
              variant={"outline"}
              onClick={() => {
                prevStep();
              }}
            >
              <ArrowLeftToLine className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className=" w-full">
              Next
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
