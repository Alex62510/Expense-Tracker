// app/api/test-grok/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.API_URL_GROK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3',
        messages: [
          { role: 'system', content: 'You are a test assistant.' },
          {
            role: 'user',
            content: 'Testing. Just say hi and hello world and nothing else.',
          },
        ],
        temperature: 0,
        stream: false,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error calling Grok API:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}
