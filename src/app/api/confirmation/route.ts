import { sql } from "@vercel/postgres"

export async function GET(request: Request) {
  try {
    const response = await sql`SELECT * FROM dataentryapp;`

    console.log(response)

    return Response.json({
      data: response.rows,
    })
  } catch (error) {
    return Response.json({
      message: "Error",
    })
  }
}
