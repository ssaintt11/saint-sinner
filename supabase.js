import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kybwykmatluxnsoyfyxr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5Ynd5a21hdGx1eG5zb3lmeXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDY3NDUsImV4cCI6MjA4NDY4Mjc0NX0.vJPhvv1k64wE0AN7Sg77OHaEUtOYdpEnrfBEVtyHsuY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);