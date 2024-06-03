import {
  BasicInfoDefaultValues,
  BasicInfoSchemaType,
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ArrowRightToLine } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateEventStore } from "@/stores/createEvent";
import { useEffect } from "react";

export default function BasicInfoForm() {
  const { setEvent } = useCreateEventStore();
  const form = useForm<BasicInfoSchemaType>({
    defaultValues: BasicInfoDefaultValues,
  });

  const onSubmit = (data: BasicInfoSchemaType) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(form.getValues());
    setEvent(form.getValues());
  }, [
    form.getValues().Name,
    form.getValues().EventDateRange,
    form.getValues().Location,
    form.getValues().University,
    form.getValues().EventCategoryId,
  ]);

  form.watch(["Name"]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Event Basic Info</CardTitle>
            <CardDescription>
              Fill in the basic Info of the event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>
                      Event Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="bg-input"
                        required
                      />
                    </FormControl>
                    <div className="w-full truncate">
                      {form.formState.errors.Name ? (
                        <FormMessage>
                          {form.formState.errors.Name.message}
                        </FormMessage>
                      ) : (
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <div>
                <ImageUpload />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="EventDateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-secondary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={(dateRange) => {
                              if (dateRange?.from && !dateRange.to) {
                                // If only the from date is selected, set to date the same as from date
                                field.onChange({
                                  from: dateRange.from,
                                  to: dateRange.from,
                                });
                              } else if (
                                dateRange?.from &&
                                dateRange.to &&
                                dateRange.from === dateRange.to
                              ) {
                                // If from and to dates are the same, set them both to the same date
                                field.onChange({
                                  from: dateRange.from,
                                  to: dateRange.to,
                                });
                              } else {
                                // Otherwise, set the selected range
                                field.onChange(dateRange);
                              }
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <div className="w-full truncate">
                      {form.formState.errors.EventDateRange ? (
                        <FormMessage>
                          {form.formState.errors.EventDateRange.message}
                        </FormMessage>
                      ) : (
                        <FormDescription>
                          Pick a date for your event.
                        </FormDescription>
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="EventCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="w-full truncate">
                      {form.formState.errors.EventCategoryId ? (
                        <FormMessage>
                          {form.formState.errors.EventCategoryId.message}
                        </FormMessage>
                      ) : (
                        <FormDescription>
                          Pick a category for your event.
                        </FormDescription>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>
                    Location <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="bg-input"
                      required
                    />
                  </FormControl>
                  <div className="w-full truncate">
                    {form.formState.errors.Location ? (
                      <FormMessage>
                        {form.formState.errors.Location.message}
                      </FormMessage>
                    ) : (
                      <FormDescription>
                        Fill in the location of the event.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="University"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>
                    University <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="bg-input"
                      required
                    />
                  </FormControl>
                  <div className="w-full truncate">
                    {form.formState.errors.University ? (
                      <FormMessage>
                        {form.formState.errors.University.message}
                      </FormMessage>
                    ) : (
                      <FormDescription>
                        Fill in the university of the event.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className=" w-full"
              disabled={form.formState.isValid}
            >
              Next
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
