import { createClient } from '@supabase/supabase-js';
import { StoredCart } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const USER_EMAIL = process.env.SUPABASE_USER_EMAIL;
const USER_PASSWORD = process.env.SUPABASE_USER_PASSWORD;

const CART_TABLE_NAME = 'csk-v-next_demo_carts';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing environment variables for database');
}

type Database = {
  public: {
    Tables: {
      [CART_TABLE_NAME]: {
        Row: {
          cart: StoredCart | null;
          created_at: string;
          user: string;
        };
        Insert: {
          cart?: StoredCart | null;
          created_at?: string;
          user: string;
        };
        Update: {
          cart?: StoredCart | null;
          created_at?: string;
          user?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

const auth = () => {
  if (!USER_EMAIL || !USER_PASSWORD) {
    return { error: { message: 'Missing environment variables for database', status: 500 } };
  }

  return supabase.auth.signInWithPassword({
    email: USER_EMAIL,
    password: USER_PASSWORD,
  });
};

export const updateCart = async (cart: StoredCart, userId?: string) => {
  const { error } = await auth();
  if (error) return { authError: error };

  const createCartResult = await supabase.from(CART_TABLE_NAME).upsert({ user: userId, cart }).select('*');

  return { data: createCartResult.data?.[0] || null, error: createCartResult.error };
};

export const getCartByUserId = async (userId: string) => {
  const { data, error } = await supabase.from(CART_TABLE_NAME).select('*').eq('user', userId);
  return { data: data?.[0] || null, error };
};
