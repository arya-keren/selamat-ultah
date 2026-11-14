# Birthday Quest V7: The Interactive Boss Battle & Mystery Gift Surprise Edition

Game petualangan eksplorasi web interaktif bertema 2D Mario-style platformer dan Visual Novel 2D Anime untuk kejutan ulang tahun sahabat.

## Fitur & Pembaruan Versi V7:
1. **Kejutan Murni Ulang Tahun (Tanpa Spoiler di Awal)**:
   - Cerita awal difokuskan pada "Hadiah Rahasia Spesial" tanpa membocorkan kata ulang tahun.
   - Kejutan ulang tahun (*SURPRISEEE!!*) pecah secara megah saat kado berhasil direbut dan dibuka!
2. **Karakter Pixel Sahabat Sesuai Gambar 2D Anime**:
   - Karakter pixel Sahabat cowok kini menggunakan mantel trench coat cokelat camel, sweater rajut cream bergaris, rambut cokelat rapi, kacamata bulat kawat, dan memegang buku catatan, sama persis dengan ilustrasi 2D Anime aslinya!
3. **Kue Ulang Tahun Mega Pixel Art Sempurna**:
   - Desain kue bertingkat cokelat dan stroberi lengkap dengan piringan emas dan 3 lilin menyala tegak di atas kue (tanpa api yang melayang/terputus).
4. **Mekanik Boss Battle Interaktif (Dodge & Attack System)**:
   - **Tahap Hindaran**: Boss mengeluarkan jurus kegelapan (Meteor, Kilat Bayangan, Badai Pedang). Pemain harus menghindar ke kiri/kanan atau melompat melewati 3 gelombang serangan!
   - **Tahap Cooldown / Kelelahan**: Boss kehabisan tenaga (*panting* dan bintang pusing `💫`), memunculkan tombol `[⚔️ SERANG BOSS!]`.
   - **Serangan Refleksi Diri**: Menjawab soal refleksi melancarkan tebasan cahaya maha dahsyat yang mengurangi 1 HP Boss (3 ronde untuk menang).
   - **Dialog Reaksi & Cutscene Kekalahan Boss**: Boss bereaksi di setiap serangan dan menyerahkan kembali kado emas sebelum lenyap menjadi serbuk bintang.
5. **Vintage Retro Music Box (1000X - Ghea Indrawari)**:
   - Terpasang rapi di Menu Hub dengan piringan hitam berputar dan tombol stop/play.

## Panduan Mengedit Dialog Sendiri:
Buka file `script.js`, di bagian paling atas terdapat panduan:
- Dialog Prologue: cari fungsi `advancePrologue()`
- Soal Refleksi: cari array `const STAGES_DATA`
- Dialog Reaksi Boss: cari array `bossReactions`
- Dialog Kekalahan Boss: cari fungsi `triggerBossDefeatScene()`
