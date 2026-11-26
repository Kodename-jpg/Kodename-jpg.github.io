# Pola Bilingual Blog Kodename JPG (ID + EN)

Blog ini bilingual: **Bahasa Indonesia (ID) dan Inggris (EN) saja — tanpa bahasa lain.**
Setiap halaman baru WAJIB dibuat dalam kedua bahasa mengikuti pola di file ini,
tanpa ditanya lagi. Pola ini dibuat 27 Nov 2026 saat 16 halaman pertama diterjemahkan.

## 1. Struktur file

- Halaman Indonesia (ID): root repo, mis. `index.html`, `tutorial.html`,
  `cara-deploy-blog-statis-ke-github-pages.html`.
- Halaman Inggris (EN): folder `en/` dengan **nama file IDENTIK**, mis. `en/index.html`,
  `en/tutorial.html`, `en/cara-deploy-blog-statis-ke-github-pages.html`.
- Diagram Inggris: folder `img/en/` dengan nama file identik, mis.
  `img/en/diagram-bughunter-flow.svg`. SVG tanpa teks (mis. `img/acrobat.svg`)
  disalin apa adanya ke `img/en/` supaya setnya lengkap.
- CSS switcher sudah ada di `css/style.css` (class `.lang-switch`).
  Jangan duplikasi aturannya di halaman.

## 2. Head halaman EN (berdasarkan salinan halaman ID)

- `<html lang="en">` (ID: `lang="id"`).
- `<title>`, `<meta name="description">`, `og:title`, `og:description`:
  diterjemahkan ke Inggris yang natural dan fasih (register tutorial teknologi).
- `og:url`: URL EN. `og:locale`: `en_US` (ID: `id_ID`).
  `og:image` tetap `https://kodename-jpg.github.io/img/og-image.jpg` (sama di kedua versi).
- `<link rel="canonical">`: self-referential per versi.
  ID: `https://kodename-jpg.github.io/<file>` (index: `https://kodename-jpg.github.io/`).
  EN: `https://kodename-jpg.github.io/en/<file>` (index: `https://kodename-jpg.github.io/en/`).
- JSON-LD: `inLanguage` jadi `"en"`, `description` dan `url` ikut versi EN.
- Script GTM (`GTM-TKZ69BJN`) dan gtag GA4 (`G-E8PLTTEFKX`) dibiarkan persis sama.
- Struktur dan class HTML SAMA dengan versi ID. Jangan mengubah layout.

## 3. hreflang — di SEMUA halaman (kedua versi, isi sama)

Letakkan di `<head>`, tepat setelah `<link rel="canonical">`.
`<file>` = nama file halaman ini; untuk `index.html` pakai URL root (tanpa nama file).

```html
<link rel="alternate" hreflang="id" href="https://kodename-jpg.github.io/<file>">
<link rel="alternate" hreflang="en" href="https://kodename-jpg.github.io/en/<file>">
<link rel="alternate" hreflang="x-default" href="https://kodename-jpg.github.io/<file>">
```

Contoh untuk `tutorial.html`:

```html
<link rel="alternate" hreflang="id" href="https://kodename-jpg.github.io/tutorial.html">
<link rel="alternate" hreflang="en" href="https://kodename-jpg.github.io/en/tutorial.html">
<link rel="alternate" hreflang="x-default" href="https://kodename-jpg.github.io/tutorial.html">
```

Contoh untuk `index.html` (URL root, tanpa nama file):

```html
<link rel="alternate" hreflang="id" href="https://kodename-jpg.github.io/">
<link rel="alternate" hreflang="en" href="https://kodename-jpg.github.io/en/">
<link rel="alternate" hreflang="x-default" href="https://kodename-jpg.github.io/">
```

## 4. Switcher bahasa — di header semua halaman

Letakkan di dalam `<div class="wrap topbar-inner">`, **tepat setelah tombol
`<button id="theme-toggle" ...>...</button>`** (elemen terakhir sebelum `</div>`
penutup `.topbar-inner`).

Versi ID (ganti `<file>` dengan nama file halaman ini; index pakai `/en/`):

```html
<div class="lang-switch" role="group" aria-label="Pilih bahasa"><span class="lang-active" aria-current="true">ID</span><span class="lang-sep" aria-hidden="true">|</span><a href="/en/<file>" lang="en" onclick="try{localStorage.setItem('site-lang','en')}catch(e){}">EN</a></div>
```

Versi EN (ganti `<file>`; index pakai `/`):

```html
<div class="lang-switch" role="group" aria-label="Choose language"><a href="/<file>" lang="id" onclick="try{localStorage.setItem('site-lang','id')}catch(e){}">ID</a><span class="lang-sep" aria-hidden="true">|</span><span class="lang-active" aria-current="true">EN</span></div>
```

## 5. Script auto-detect — di `<head>` semua halaman

Letakkan **tepat setelah blok script tema** (script yang mengatur
`localStorage 'kodename-theme'`), masih di dalam `<head>`.
Pakai `location.replace` supaya redirect tidak menambah riwayat browser.
Aturan: redirect HANYA bila tidak ada `?lang=` di URL DAN tidak ada preferensi
tersimpan (`localStorage 'site-lang'`) DAN bahasa browser tidak cocok dengan
bahasa halaman ini. Klik switcher manual menyimpan preferensi, jadi tidak
akan di-redirect balik.

Versi ID:

```html
<script>
/* Auto-detect bahasa: arahkan ke versi Inggris bila browser bukan Indonesia */
(function () {
    try {
        if (new URLSearchParams(location.search).get('lang')) return;
        if (localStorage.getItem('site-lang')) return;
        var lang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
        if (lang.indexOf('id') !== 0 && lang.indexOf('in') !== 0) {
            var path = location.pathname.replace(/^\//, '');
            location.replace('/en/' + path);
        }
    } catch (e) {}
})();
</script>
```

Versi EN (cerminan — redirect kembali ke ID bila browser berbahasa Indonesia):

```html
<script>
/* Auto-detect language: redirect to the Indonesian version for Indonesian browsers */
(function () {
    try {
        if (new URLSearchParams(location.search).get('lang')) return;
        if (localStorage.getItem('site-lang')) return;
        var lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        if (lang.indexOf('id') === 0 || lang.indexOf('in') === 0) {
            var path = location.pathname.replace(/^\/en\//, '');
            location.replace('/' + path);
        }
    } catch (e) {}
})();
</script>
```

## 6. Aturan terjemahan halaman EN

- Terjemahkan SEMUA teks yang terlihat: judul, heading, paragraf, label nav,
  tombol, badge (`Pemula` → `Beginner`, `Menengah` → `Intermediate`),
  tanggal (`26 Nov 2026` → `Nov 26, 2026`), footer, dan `alt` gambar.
- JANGAN PERNAH terjemahkan/ubah: code block, perintah terminal, URL, path file,
  nama produk/layanan (GitHub, make.fun, Ventoy, Ollama, dsb.), ID GTM/GA4,
  link Saweria (`https://saweria.co/Febri007`), dan isi JSON-LD selain
  `description`/`inLanguage`/`url`.
- Inline code SELALU dalam `<code>`. JANGAN PERNAH pakai class `.c` untuk inline
  code — class `.c` hanya untuk code BLOCK.
- Jangan ubah link yang mengarah ke luar situs.
- Link internal di halaman EN diarahkan ke padanan EN-nya:
  `href="/tutorial.html"` → `href="/en/tutorial.html"`, `href="/"` → `href="/en/"`.
  Link jangkar (`href="#..."`) tidak berubah.
- Path aset di halaman EN pakai root-absolute:
  `css/style.css` → `/css/style.css`, `js/theme.js` → `/js/theme.js`,
  `img/<diagram>.svg` → `/img/en/<diagram>.svg`.
  (Halaman ID tetap memakai path relatif seperti semula.)

## 7. Diagram SVG versi Inggris

- Terjemahkan HANYA isi `<text>` Bahasa Indonesia; semua atribut, koordinat,
  warna, dan geometri dibiarkan persis sama. Nama produk/URL di dalam SVG
  tidak diterjemahkan (mis. `ventoy.net`, `analytics.google.com`).
- Simpan ke `img/en/<nama-sama>.svg`. Halaman ID tetap memakai SVG asli.
- `alt` pada `<img>` di halaman EN ikut diterjemahkan.

## 8. Sitemap

- `sitemap.xml` memuat SEMUA halaman ID dan EN: 16 ID + 16 EN = 32 URL.
- Entri EN: `<loc>https://kodename-jpg.github.io/en/<file></loc>`
  (index: `https://kodename-jpg.github.io/en/`).
- `lastmod` diisi tanggal perubahan (`2026-11-27` untuk batch pertama),
  dan diperbarui tiap ada halaman baru/berubah.
- `robots.txt` sudah `Allow: /` — tidak perlu diubah; `/en/` ikut ter-crawl.

## 9. Checklist halaman baru

1. Tulis halaman ID seperti biasa (ikuti pola halaman yang sudah ada).
2. Salin ke `en/` dengan nama file identik, terjemahkan sesuai §2 dan §6.
3. Tambah hreflang (§3) di kedua versi; tambah switcher (§4) di kedua versi;
   tambah script auto-detect (§5) di kedua versi.
4. Bila ada diagram baru: buat versi EN di `img/en/` (§7), ubah `src` di halaman
   EN, dan jangan lupa `alt`-nya.
5. Tambah kedua URL ke `sitemap.xml` (§8) dengan `lastmod` hari ini.
6. Verifikasi: pasangan ID/EN ada, tidak ada link internal putus, tidak ada
   teks Indonesia tertinggal di halaman EN (kecuali proper noun/code/URL),
   hreflang ada di semua halaman, dan sitemap valid.
