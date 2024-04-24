import { sql } from "@vercel/postgres"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const response = await sql`SELECT * FROM dataentryapp;`

    console.log(response)

    return Response.json(
      {
        data: response.rows,
      },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      {
        message: "Error",
      },
      { status: 500 }
    )
  }
}
