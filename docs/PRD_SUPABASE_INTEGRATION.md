# PRD Integrasi Supabase Sedap Dashboard

## Konteks Produk

Sedap Dashboard adalah React + Vite SPA dengan React Router, Tailwind CSS, dan komponen UI existing. Aplikasi saat ini memiliki halaman dashboard, orders, customers, products, fitur xyz, notes, dan halaman auth. Integrasi ini memindahkan data bisnis utama dari data statis/DummyJSON ke Supabase Auth dan Supabase Database.

## Tujuan

1. Mengaktifkan autentikasi user menggunakan Supabase Auth.
2. Menambahkan manajemen role sederhana: `admin`, `member`, dan `guest`.
3. Mengaktifkan CRUD admin untuk customers, products, dan orders.
4. Mengaktifkan dashboard member, pembuatan pesanan oleh member, dan histori pesanan member.
5. Mengaktifkan sistem poin dan tier member:
   - Bronze: diskon 5%
   - Silver: diskon 10%
   - Gold: diskon 15%
   - Platinum: diskon 20%

## Role dan Hak Akses

`guest` adalah user yang belum login. Guest hanya boleh mengakses halaman auth seperti login dan register.

`member` adalah user login biasa. Member boleh melihat dashboard member, melihat produk aktif, membuat pesanan sendiri, dan melihat histori pesanan miliknya sendiri.

`admin` adalah user operasional. Admin boleh melihat dashboard admin dan melakukan CRUD customers, products, orders, serta membaca data profil member.

## Flow Utama

1. User register lewat Supabase Auth.
2. Trigger database otomatis membuat row di `profiles` dengan role default `member`, poin `0`, tier `bronze`.
3. User login lewat Supabase Auth.
4. App mengambil session dan profile user.
5. Protected route menolak guest dari halaman utama.
6. Role guard membedakan akses admin dan member.
7. Member membuat order dari halaman Orders.
8. Saat order berstatus `completed`, poin member bertambah dan tier dihitung ulang.

## Batasan Implementasi

1. Jangan over-engineering. Gunakan service sederhana per entity.
2. Ikuti pola existing: React component function, `useState`, `useEffect`, handler lokal.
3. Jangan refactor visual besar.
4. Jangan mengubah file di luar cakupan integrasi backend/auth/CRUD.
5. Jangan menyimpan service role key di frontend.
6. Supabase anon key hanya boleh dipakai sebagai public client key.

## Schema Database

Schema SQL lengkap ada di `supabase/schema.sql`.

Tabel utama:

1. `profiles`
2. `customers`
3. `products`
4. `orders`
5. `order_items`
6. `member_points_logs`

## RLS

RLS wajib aktif di semua tabel bisnis. Policy utama:

1. Admin dapat CRUD data bisnis.
2. Member hanya dapat membaca dan mengubah data miliknya sendiri.
3. Member hanya dapat membuat order untuk dirinya sendiri.
4. Guest tidak boleh mengakses data bisnis.

## Instruksi Khusus untuk AI Agent

Sebelum menulis atau mengubah kode React, AI agent wajib mengenerate dan mengeksekusi sendiri kode SQL DDL dan RLS di Supabase terlebih dahulu. Setelah schema, policy, trigger, dan function berhasil dibuat, barulah AI agent menyesuaikan kode React, service API, auth flow, protected route, CRUD admin, dashboard member, order history, dan sistem poin/tier berdasarkan schema yang sudah aktif.
