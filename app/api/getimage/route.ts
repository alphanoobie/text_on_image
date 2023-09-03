import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
  try {
    const response = await fetch(apiUrl);
    const data: any = await response.json();
    const imageURl = data.urls.regular;
    return NextResponse.json({ ok: true, message: imageURl });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error });
  }
}
