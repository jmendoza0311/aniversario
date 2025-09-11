import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API route working' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ message: 'Data received', data: body })
}