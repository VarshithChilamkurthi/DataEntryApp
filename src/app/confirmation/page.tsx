"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface rowType {
  name: string
  age: number | ""
  title: string
  hometown: string | ""
}

export default function SubmitPage() {
  const [data, setData] = useState<rowType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/confirmation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then(async (res) => {
      let resdata = await res.json()
      setData(resdata.data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <Table>
        <TableCaption>A list of data entered.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Hometown</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <div>Loading</div>
          ) : data.length > 0 ? (
            data.map((item) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="text-right">{item.hometown}</TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell className="font-medium">-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
