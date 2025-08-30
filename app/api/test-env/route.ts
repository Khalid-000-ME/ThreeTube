export async function GET() {
  return Response.json({
    jwt: process.env.PINATA_JWT, // server-side only
    gateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY, // client + server
  });
}