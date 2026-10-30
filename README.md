# Kanasa News
1. Buat proyek Supabase, jalankan `supabase/schema.sql`.
2. `cp .env.example .env.local`, isi URL + anon key. `npm i && npm run dev`.
3. (Sudah dilakukan) Fungsi `ingest` ter-deploy dan dijadwalkan tiap 15 menit via pg_cron.
4. Admin: beri user `app_metadata.role = "admin"` di Supabase Auth. Hosting: Vercel (env yang sama).
