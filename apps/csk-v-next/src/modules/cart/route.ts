import { getCartByUserId, updateCart } from './supabase';

export async function POST(req: Request) {
  try {
    const { cart, userId } = await req.json();

    const result = await updateCart(cart, userId);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID is required', { status: 400 });
  }

  const result = await getCartByUserId(userId);
  return new Response(JSON.stringify(result), { status: 200 });
}
