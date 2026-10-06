# Product Requirements Document (PRD): Ijen Bridge Clone Travel Website

## 1. Ringkasan Eksekutif & Ikhtisar Produk
Dokumen Kebutuhan Produk (PRD) ini merinci spesifikasi fungsional dan teknis untuk pengembangan platform website travel dan tur edukatif/petualangan yang terinspirasi dari arsitektur serta model bisnis **Ijen Bridge Tour & Travel** (https://ijenbridge.com/).

Platform ini dirancang khusus untuk memfasilitasi etalase paket wisata Jawa Timur (fokus utama: Kawah Ijen Blue Fire, Gunung Bromo, Air Terjun Tumpak Sewu, Sukamade Turtle Beach, Baluran National Park, dan Pulau Menjangan/Bali overland transfer). Platform berfungsi ganda sebagai portal promosi visual berbasis performa SEO tinggi serta mesin reservasi (kalkulator harga, formulir pemesanan instan, dan integrasi WhatsApp concierge).

---

## 2. Tujuan Bisnis & Target Audiens

### 2.1. Tujuan Bisnis
* Menjadi media penjualan digital langsung (*Direct Booking Engine*) untuk memangkas komisi OTA (Online Travel Agents).
* Menghadirkan navigasi berbasis *mobile-first* yang cepat dan intuitif bagi pelancong internasional yang sering kali mengakses web saat bepergian.
* Mengotomatisasi alur penangkapan prospek (*lead generation*) langsung ke tim operasional tur melalui WhatsApp terstruktur.
* Meningkatkan visibilitas organik di mesin pencari (Google Search) untuk kata kunci tur Jawa Timur dalam multi-bahasa.

### 2.2. Profil Pengguna (User Persona)
1. **Wisatawan Mancanegara (Inbound Tourists):**
   * Karakteristik: Membutuhkan kepastian jadwal, detail inklusi/eksklusi yang transparan, opsi pemandu berbahasa Inggris, dan instruksi perlengkapan (masker gas, pakaian hangat).
   * Kebutuhan: Konversi mata uang (USD/EUR/IDR), ulasan tepercaya, alur respons cepat.
2. **Wisatawan Domestik (Keluarga & Open Trip Adventurers):**
   * Karakteristik: Mengutamakan efisiensi biaya, kemudahan pembayaran lokal (transfer bank/QRIS), dan fleksibilitas titik jemput (Stasiun Banyuwangi Kota, Bandara Banyuwangi, Malang, Surabaya).
3. **Admin / Operator Tur:**
   * Kebutuhan: Kemudahan memodifikasi harga musiman (high season/low season), rute perjalanan (*itinerary*), serta memantau status pesanan masuk.

---

## 3. Struktur Informasi & Sitemap Website

```
Website Root (/)
├── Beranda (Home)
│   ├── Hero Video/Image Slider + Booking Quick-Search Widget
│   ├── USP / Keunggulan Layanan
│   ├── Kategori Paket Pilihan (Ijen, Bromo, Combo, Overland)
│   ├── Alur Pemesanan (How it Works)
│   ├── Testimoni & Review Badges (TripAdvisor/Google)
│   └── Kontak & FAQ Cepat
├── Paket Wisata (Tour Packages)
│   ├── Arsip / Listing Tur (Filter: Durasi, Kategori, Private/Shared)
│   └── Detail Paket Tur (/tours/[slug])
│       ├── Header & Galeri Foto
│       ├── Quick Facts (Durasi, Tingkat Kesulitan, Titik Jemput, Min. Pax)
│       ├── Ringkasan & Sorotan Tur (Highlights)
│       ├── Rencana Perjalanan Harian (Detailed Itinerary)
│       ├── Fasilitas Termasuk & Tidak Termasuk (Inclusions / Exclusions)
│       ├── Perlengkapan Wajib / Ketentuan Fisik
│       └── Sticky Floating Booking Bar / Form Reservasi
├── Layanan Transportasi (Transport / Charter)
│   ├── Antar-Jemput Bandara & Stasiun (Transfer Services)
│   └── Rental Mobil + Driver (Innova, HiAce, 4x4 Jeep Bromo/Ijen)
├── Panduan Wisata & Blog (/blog)
│   ├── Tips Mendaki Ijen & Fenomena Blue Fire
│   ├── Waktu Terbaik Mengunjungi Bromo & Tumpak Sewu
│   └── Panduan Transportasi Jawa - Bali
├── Tentang Kami (About Us) & Legalitas Usaha
└── Kontak & Hubungi Kami (Contact Form, Peta Lokasi, Live Chat WhatsApp)
```

---

## 4. Kebutuhan Fungsional (Functional Requirements)

### 4.1. Halaman Beranda (Homepage)
* **Hero Search Widget:** Pengunjung dapat memilih destinasi (misal: Ijen, Bromo, Kombinasi), tipe perjalanan (Private / Shared), dan tanggal estimasi untuk langsung dialihkan ke paket yang relevan.
* **Trust Elements:** Penempatan lencana reputasi resmi (TripAdvisor Certificate of Excellence, Google 5-Star Rating, lisensi pemandu lokal resmi).
* **WhatsApp Quick CTA:** Tombol melayang (*floating button*) di sudut kanan bawah dengan opsi pesan pembuka otomatis.

### 4.2. Katalog & Detail Paket Wisata
* **Filter Interaktif:** Filter dinamis tanpa reload halaman berdasarkan:
  * Destinasi (Kawah Ijen, Bromo, Baluran, Sukamade, Tumpak Sewu).
  * Durasi (Midnight Trip, 2D1N, 3D2N, 4D3N+).
  * Jenis Tur (Private Tour, Open Trip / Shared Group).
* **Itinerary Accordion:** Tampilan jadwal jam demi jam yang rapi dan mudah dilipat/dibuka.
* **Pricing Tier Table:** Tabel transparansi harga bertingkat berdasarkan jumlah peserta (misal: 2 pax, 3-4 pax, 5+ pax).
* **Sticky Booking Box:** Kotak pemesanan melayang di sisi kanan (desktop) atau bagian bawah (mobile) yang memungkinkan pengguna langsung memilih tanggal dan jumlah tamu.

### 4.3. Mesin Pemesanan & Alur Checkout
* **Pilihan Checkout Cepat (Direct WhatsApp Booking):**
  * Input: Nama lengkap, email, nomor WhatsApp, tanggal tur, titik jemput (*hotel/station/airport*), jumlah orang, dan permintaan khusus.
  * Output: Sistem menghasilkan pesan terformat rapi yang otomatis membuka WhatsApp Admin:
    ```
    Halo Tim Ijen Bridge, saya ingin konfirmasi pemesanan:
    - Paket: 3D2N Bromo Ijen Tour
    - Tanggal: 15 Oktober 2026
    - Peserta: 2 Dewasa
    - Tipe: Private Tour
    - Titik Jemput: Surabaya Gubeng
    Mohon info ketersediaan dan invoice resminya. Terima kasih!
    ```
* **Pilihan Checkout Mandiri (Payment Gateway Ready):**
  * Integrasi opsi pembayaran uang muka (DP 30% atau pelunasan) via Virtual Account, QRIS, Kartu Kredit (Stripe/Midtrans).
  * Penerbitan email konfirmasi reservasi otomatis beserta invoice PDF.

### 4.4. Dukungan Multi-Bahasa & Konversi Kurs
* **Language Switcher:** Bahasa Indonesia dan Bahasa Inggris (dukungan ekspansi ke Bahasa Prancis/Mandarin).
* **Currency Switcher:** Tampilan nominal dalam IDR (Rupiah), USD (Dolar AS), dan EUR (Euro) dengan kurs acuan dinamis atau *fixed manual rate*.

### 4.5. Panel Admin (CMS / Manajemen Konten)
* Autentikasi aman untuk admin dan pemandu lapangan.
* Manajemen paket tur: Tambah paket, atur harga reguler & hari libur nasional (*peak season surcharge*), kelola galeri gambar.
* Manajemen prospek & reservasi: Status pesanan (New Lead, Contacted, DP Paid, Completed, Cancelled).
* Blog editor berbasis visual (Rich Text / Markdown) untuk artikel strategi konten SEO.

---

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Parameter | Kebutuhan & Standar Kualitas |
| :--- | :--- |
| **Kecepatan & Performa** | Google Core Web Vitals minimal skor 90 pada mobile dan desktop. First Contentful Paint (FCP) < 1.2 detik, Largest Contentful Paint (LCP) < 2.2 detik. |
| **Optimasi Gambar** | Format gambar modern (WebP / AVIF) dengan *lazy loading* adaptif untuk menghemat kuota seluler wisatawan. |
| **SEO Teknis** | Struktur URL bersih (`/tours/kawah-ijen-blue-fire-tour`), Schema.org markup tipe `TouristTrip`, `Product`, dan `FAQPage`, Open Graph tags untuk pratinjau media sosial. |
| **Aksesibilitas & Responsivitas** | Desain responsif 100% dari resolusi smartphone 360px hingga layar desktop 4K. Standar WCAG 2.1 Level AA. |
| **Keamanan** | Protokol HTTPS/TLS 1.3, proteksi formulir Cloudflare Turnstile / Google reCAPTCHA v3 untuk menangkal bot spam, sanitasi input data. |

---

## 6. Arsitektur Teknologi yang Direkomendasikan

* **Frontend Framework:** Next.js (App Router, Server-Side Rendering untuk SEO optimal) atau Astro (kecepatan maksimal untuk situs berbasis konten wisata).
* **Styling & UI:** Tailwind CSS + Lucide Icons (ringan dan modern).
* **Backend / Headless CMS:** Strapi / Directus / Sanity.io (memudahkan staf operasional memperbarui tur tanpa sentuhan kode).
* **Database:** PostgreSQL (via Supabase atau Neon) untuk data reservasi dan relasi tur.
* **Hosting & CDN:** Vercel atau Cloudflare Pages dengan caching tepi (*edge caching*) global.
* **Integrasi Pihak Ketiga:**
  * WhatsApp Business API / Click-to-Chat Deep Linking.
  * Payment Gateway: Midtrans / Xendit (Domestik) & Stripe (Internasional).
  * Cloudinary / AWS S3 untuk manajemen aset visual resolusi tinggi.

---

## 7. Rencana Pelaksanaan & Tahapan Peluncuran (Roadmap)

| Fase | Durasi | Sasaran & Deliverables |
| :--- | :--- | :--- |
| **Fase 1: Riset & Desain (UI/UX)** | Minggu 1 - 2 | Wireframing, perancangan prototipe Figma (mobile & desktop), pemetaan alur reservasi. |
| **Fase 2: Setup Basis Data & Frontend Core** | Minggu 3 - 4 | Konfigurasi Next.js/Tailwind, penyiapan komponen katalog, halaman detail tur, dan CMS paket. |
| **Fase 3: Integrasi Mesin Booking & Multi-Bahasa** | Minggu 5 - 6 | Implementasi form pemesanan, generator WhatsApp message, multi-bahasa (i18n), konversi kurs. |
| **Fase 4: Pengujian & Optimasi SEO** | Minggu 7 | Audit Core Web Vitals, pengujian responsivitas multi-device, optimasi metadata & schema SEO. |
| **Fase 5: Peluncuran (Go-Live) & Serah Terima** | Minggu 8 | Migrasi domain, pengalihan DNS, pelatihan staf admin untuk pengelolaan paket dan blog. |

---

## 8. Metrik Keberhasilan (KPI)

* **Tingkat Konversi Pengunjung:** Minimal 3.5% dari total kunjungan web menekan tombol pemesanan atau chat WhatsApp.
* **Bounce Rate:** Di bawah 45% pada halaman detail tur utama (*Ijen Blue Fire* dan *Bromo Sunrise*).
* **Rata-rata Waktu di Halaman:** Lebih dari 2 menit pada halaman rencana perjalanan (*itinerary*).
* **Peringkat Kata Kunci:** Masuk 5 besar halaman pertama Google untuk pencarian tur primer (contoh: *"Ijen tour package from Bali"*, *"Bromo Ijen tour 3 days"*).
