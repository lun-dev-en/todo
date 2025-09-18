import { createClient } from "@supabase/supabase-js";

// Supabase ダッシュボードからコピー
const supabaseUrl = "https://dfnwtdgqmxeyfjthlsut.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbnd0ZGdxbXhleWZqdGhsc3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNzA1MzYsImV4cCI6MjA3Mzc0NjUzNn0.e3awSPks9Ai4W8ORrw25chxRa0XM_ANXhzFKHiHHpD0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
