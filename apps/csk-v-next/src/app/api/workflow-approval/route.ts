import { after } from 'next/server';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const host = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    const processUrl = `${host}/api/workflow-approval/process`;
    console.info('Sending request to process endpoint:', processUrl);

    after(async () => {
      await fetch(processUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    });

    return Response.json({ success: 'Request sent to process endpoint' });
  } catch (error) {
    console.error('Error in workflow-approval route:', error);
    return Response.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
