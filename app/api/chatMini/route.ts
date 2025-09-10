import { NextResponse } from 'next/server';

export async function POST() {

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // дешёвая модель
      messages: [
        {
          role: 'user',
          content: 'Are you a free?',
        },
      ],
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
