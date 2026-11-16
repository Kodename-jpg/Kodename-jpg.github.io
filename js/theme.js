/* Mode siang/malam untuk blog Kodename-jpg.
   - Tema disimpan di localStorage ('kodename-theme': 'light' | 'dark')
     jadi pilihan pengunjung bertahan antar halaman & kunjungan.
   - Kalau belum pernah memilih, mengikuti preferensi sistem
     (prefers-color-scheme).
   - Cuplikan kecil di <head> tiap halaman sudah memasang data-theme
     sebelum halaman digambar (anti-kedip); skrip ini memasang ikon
     tombol dan menangani klik. */
(function () {
    var STORAGE_KEY = 'kodename-theme';
    var root = document.documentElement;

    function savedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function systemTheme() {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? 'dark'
            : 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            var dark = theme === 'dark';
            btn.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19';
            btn.setAttribute('aria-label', dark ? 'Ganti ke mode siang' : 'Ganti ke mode malam');
            btn.title = dark ? 'Ganti ke mode siang' : 'Ganti ke mode malam';
        }
    }

    var initial = savedTheme();
    if (initial !== 'light' && initial !== 'dark') {
        initial = systemTheme();
    }
    applyTheme(initial);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {}
            applyTheme(next);
        });
    }
})();
