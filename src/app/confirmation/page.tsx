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
import { resolve } from "path"
import { useEffect, useState } from "react"

interface rowType {
  name: string
  age: number | ""
  title: string
  hometown: string | ""
}

export default function SubmitPage() {
  const [data, setData] = useState<rowType[]>([])
  const [lastDataRow, setLastDataRow] = useState<rowType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      fetch(`/api/confirmation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }).then(async (res) => {
        let resdata = await res.json()
        setData(resdata.data)
        setLastDataRow(
          resdata.data.length > 0 ? resdata.data[resdata.data.length - 1] : null
        )
        setLoading(false)
      })
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-10 mt-5">
        Data has been{" "}
        <span className="text-blue-600">successfully submitted</span>. Thank
        you.
      </div>
      <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-xl mb-10 mt-5">
        Your response details:{" "}
        <div className="mt-3">
          {lastDataRow && (
            <div className="text-lg text-gray-900 mb-5">
              <div>
                <span className="font-bold text-blue-600">Title:</span>{" "}
                {lastDataRow.title}
              </div>
              <div>
                <span className="font-bold text-blue-600">Name:</span>{" "}
                {lastDataRow.name}
              </div>
              <div>
                <span className="font-bold text-blue-600">Age:</span>{" "}
                {lastDataRow.age}
              </div>
              <div>
                <span className="font-bold text-blue-600">Hometown:</span>{" "}
                {lastDataRow.hometown}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-2xl font-bold tracking-tight text-gray-600 sm:text-xl mb-10 mt-5 border-b-2">
          Previous Data Entries
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-4 gap-4">
              <TableHead className="font-bold text-lg text-gray-900">
                Title
              </TableHead>
              <TableHead className="font-bold text-lg text-gray-900">
                Name
              </TableHead>
              <TableHead className="font-bold text-lg text-gray-900">
                Age
              </TableHead>
              <TableHead className="text-right font-bold text-lg text-gray-900">
                Hometown
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <div>Loading</div>
            ) : data.length > 1 ? (
              data.slice(0, -1).map((item) => {
                return (
                  <TableRow className="grid grid-cols-4 gap-4">
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="flex flex-col">{item.name}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell className="text-right">
                      {item.hometown}
                    </TableCell>
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
    </div>
  )
}
