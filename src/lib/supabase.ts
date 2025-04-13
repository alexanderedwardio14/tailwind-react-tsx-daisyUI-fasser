import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrtidskvwgcdssadqywg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydGlkc2t2d2djZHNzYWRxeXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDExMjAsImV4cCI6MjA2MDAxNzEyMH0.qq6Mp5QhNpRvSq-y059swg-II8_Jg9dfViq8SB9-6KY'

export const supabase = createClient(supabaseUrl, supabaseKey)