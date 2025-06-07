
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hhmdjzfxtusywgozzgmp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobWRqemZ4dHVzeXdnb3p6Z21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTIyMTcsImV4cCI6MjA2NDUyODIxN30.OmH2ojCGwClGEOlpWIz3hc8oBpBvROtelOxAFcTVUpw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
