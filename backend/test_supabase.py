from app.db.supabase import supabase


response = supabase.table("patients").select("*").limit(1).execute()

print(response.data)