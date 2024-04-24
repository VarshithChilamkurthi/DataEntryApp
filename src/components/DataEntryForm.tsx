"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DataEntryForm() {
  let router = useRouter()

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    age: z
      .string()
      .min(1, { message: "Age must be a positive number." })
      .max(150, {
        message: "Age cannot be more than 150.",
      })
      .nullable()
      .optional(),
    title: z.string(),
    hometown: z
      .string()
      .min(2, { message: "Hometown must be at least 2 characters." })
      .optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    try {
      const response = await fetch(`/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (result) {
        router.push("/confirmation")
      }
    } catch (error) {
      toast.error("Error occured")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-center items-center">
              <FormLabel className="text-lg mx-2 font-semibold">
                Name<span className="text-red-500 mx-1 align-middle">*</span>
              </FormLabel>
              <FormControl className="m-0">
                <Input placeholder="enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-center items-center">
              <FormLabel className="text-lg mx-2 font-semibold">Age</FormLabel>
              <FormControl className="m-0">
                {/* @ts-ignore */}
                <Input type="number" placeholder="enter age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-center items-center">
              <FormLabel className="text-lg mx-2 font-semibold">
                Title<span className="text-red-500 mx-1 align-middle">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Jr">Jr</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hometown"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-center items-center">
              <FormLabel className="text-lg mx-2 font-semibold">
                Hometown
              </FormLabel>
              <FormControl className="m-0">
                <Input placeholder="enter hometown" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="mt-10" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
