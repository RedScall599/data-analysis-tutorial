import { NextResponse } from 'next/server';

// Simple proxy to OpenAI. Expects POST { prompt: string, max_tokens?: number }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 });

    const key = process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: body.max_tokens || 400,
      }),
    });

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
