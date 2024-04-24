import { sql } from "@vercel/postgres"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const response =
      await sql`SELECT * FROM dataentryapp ORDER BY id DESC LIMIT 1;`

    console.log(response)

    let empty = {
      name: "",
      age: "",
      title: "",
      hometown: "",
    }

    return Response.json(
      {
        data: response.rows.length > 0 ? response.rows[0] : empty,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return Response.json(
      {
        message: "Error",
      },
      { status: 500 }
    )
  }
}
