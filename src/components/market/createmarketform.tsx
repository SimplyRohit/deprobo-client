"use client";

import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContractFunctions } from "@/contract/contract-functions";
import { toast } from "sonner";

export default function CreateMarketForm() {
  const [open, setOpen] = React.useState(false);
  const { createMarket } = useContractFunctions();

  const formSchema = z.object({
    question: z
      .string()
      .min(20, { message: "Question must be at least 20 characters." })
      .max(75, { message: "Question must be at most 75 characters." }),
    hours: z
      .number()
      .min(1, { message: "Must be at least 0.3 hours." })
      .max(72, { message: "Must be at most 72 hours." }),
    category: z.enum(
      ["sports", "politics", "business", "science", "entertainment", "other"],
      {
        errorMap: () => ({ message: "Please select a category." }),
      }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      hours: 1,
      category: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createMarket.mutateAsync({
        question: values.question,
        category: values.category,
        close_time: values.hours,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (Error: any) {
      toast.error(Error.message);
    }
  }

  React.useEffect(() => {
    form.reset();
    setOpen(false);
    createMarket.reset();
  }, [createMarket.error, createMarket.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Market</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Create Market</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <Textarea
                    placeholder="Enter your market question"
                    className="resize-none !ring-0"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End in (hours)</FormLabel>
                  <Input
                    className=" !ring-0"
                    type="number"
                    step="0.1"
                    min="0.3"
                    max="72"
                    placeholder="e.g. 1.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=" !ring-0">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="politics">Politics</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="neutral" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={createMarket.isPending}
                variant={"neutral"}
                type="submit"
                className="w-full"
              >
                {createMarket.isPending ? "Creating..." : "Create Market"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
