import { sql } from "@vercel/postgres"

export const dynamic = "force-dynamic" // defaults to auto

export async function GET(request: Request) {
  return Response.json(
    {
      message: "Welcome to Data Entry App APIs",
    },
    { status: 200 }
  )
}

interface bodyType {
  name: string
  age: number | ""
  title: string
  hometown: string | ""
}

export async function POST(req: Request) {
  const body: bodyType = await req.json()

  console.log(body)

  const response =
    await sql`INSERT INTO dataentryapp (name, age, title, hometown)
VALUES (${body.name}, ${body.age}, ${body.title} , ${body.hometown});`

  console.log(response)

  return Response.json(
    {
      message: "Form Submitted",
    },
    { status: 200 }
  )
}
