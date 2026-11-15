/* ==========================================================================
   GAME CONFIGURATION & DIALOGUES (PENGATURAN DIALOG DAPAT DIEDIT DI SINI)
   ==========================================================================
   Kamu dapat dengan mudah mengedit teks cerita, percakapan karakter,
   maupun soal refleksi pada bagian-bagian berikut:
   1. Prologue: advancePrologue() -> const steps = [...]
   2. Pertanyaan Refleksi & Musuh: const STAGES_DATA = [...]
   3. Dialog Reaksi Boss: bossReactions = [...]
   4. Dialog Kekalahan Boss: triggerBossDefeatScene() -> const lines = [...]
   ========================================================================== */

/* ==========================================================================
   GAME CONFIGURATION & DIALOGUES (PENGATURAN DIALOG DAPAT DIEDIT DI SINI)
   ==========================================================================
   Kamu dapat dengan mudah mengedit teks cerita, percakapan karakter,
   maupun soal refleksi pada bagian-bagian berikut:
   1. Prologue: advancePrologue() -> const steps = [...]
   2. Pertanyaan Refleksi & Musuh: const STAGES_DATA = [...]
   3. Dialog Reaksi Boss: bossReactions = [...]
   4. Dialog Kekalahan Boss: triggerBossDefeatScene() -> const lines = [...]
   ========================================================================== */

/* ==========================================================================
   BIRTHDAY QUEST V5 JAVASCRIPT ENGINE (script.js)
   - Photobooth Template 2 with Real 2D Anime Face Portraits of Hero & Friend
   - Ghea Indrawari - 1000X Birthday Reveal Melody & MP3 Audio Player
   - Multi-Candle Birthday Cake Assembly with Smoke & Wind
   - 4 Dynamic World Palettes (Day -> Sunset -> Starry Night -> Midnight Castle)
   - Screen Shake & Slash VFX
   ========================================================================== */

// --- 1. WEB AUDIO API RETRO CHIPTUNE SYNTHESIZER ---
class RetroAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmTimer = null;
    this.bgmIndex = 0;
    this.song1000xTimer = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch(e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
      this.stopSong1000X();
    } else {
      this.startBGM();
    }
    return !this.isMuted;
  }

  playTone(freq, type = 'square', duration = 0.08, gainVal = 0.07) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playBleep() {
    this.playTone(520, 'square', 0.03, 0.04);
  }

  playSelect() {
    this.playTone(523.25, 'triangle', 0.08, 0.08);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.08), 70);
  }

  playJump() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch(e) {}
  }

  playCoin() {
    this.playTone(987.77, 'sine', 0.07, 0.09);
    setTimeout(() => this.playTone(1318.51, 'sine', 0.18, 0.09), 60);
  }

  playUltimateSkillSFX(round = 1) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (round === 1) {
        // 5 rapid omnislash katana swooshes + final crystal impact!
        for (let i = 0; i < 5; i++) {
          const t = now + i * 0.11;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(850 + i * 120, t);
          osc.frequency.exponentialRampToValueAtTime(110, t + 0.1);
          g.gain.setValueAtTime(0.14, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          osc.connect(g);
          g.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.1);
        }
        this.playTone(523.25, 'triangle', 0.4, 0.18, 0.55);
        this.playTone(783.99, 'sine', 0.45, 0.15, 0.65);
      } else if (round === 2) {
        // Starlight meteor shower chimes + heavenly pillar boom!
        const notes = [587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
        notes.forEach((freq, idx) => {
          this.playTone(freq, 'sine', 0.18, 0.12, idx * 0.08);
        });
        this.playTone(130.81, 'sawtooth', 0.6, 0.22, 0.45);
        this.playTone(523.25, 'triangle', 0.55, 0.18, 0.5);
      } else {
        // Round 3: Solar Charge-up sweep + Colossal Kamehameha Laser Beam + Supernova!
        const chargeOsc = this.ctx.createOscillator();
        const chargeGain = this.ctx.createGain();
        chargeOsc.type = 'sine';
        chargeOsc.frequency.setValueAtTime(220, now);
        chargeOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
        chargeGain.gain.setValueAtTime(0.15, now);
        chargeGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        chargeOsc.connect(chargeGain);
        chargeGain.connect(this.ctx.destination);
        chargeOsc.start(now);
        chargeOsc.stop(now + 0.35);

        // Laser roar
        const beamOsc = this.ctx.createOscillator();
        const beamGain = this.ctx.createGain();
        beamOsc.type = 'sawtooth';
        beamOsc.frequency.setValueAtTime(180, now + 0.36);
        beamOsc.frequency.linearRampToValueAtTime(95, now + 1.25);
        beamGain.gain.setValueAtTime(0.22, now + 0.36);
        beamGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
        beamOsc.connect(beamGain);
        beamGain.connect(this.ctx.destination);
        beamOsc.start(now + 0.36);
        beamOsc.stop(now + 1.25);

        // Victory chord shimmer
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          this.playTone(f, 'triangle', 0.5, 0.14, 0.85 + idx * 0.06);
        });
      }
    } catch(e) {}
  }

  playSlash() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch(e) {}
  }

  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.15, 0.1), i * 90);
    });
  }

  playFanfare() {
    const melody = [
      { f: 523.25, d: 0.14 },
      { f: 523.25, d: 0.14 },
      { f: 523.25, d: 0.14 },
      { f: 659.25, d: 0.35 },
      { f: 587.33, d: 0.18 },
      { f: 523.25, d: 0.18 },
      { f: 659.25, d: 0.2 },
      { f: 783.99, d: 0.5 },
    ];
    let t = 0;
    melody.forEach(n => {
      setTimeout(() => this.playTone(n.f, 'square', n.d, 0.12), t * 1000);
      t += n.d + 0.04;
    });
  }

  playCameraClick() {
    this.playTone(880, 'sine', 0.03, 0.15);
    setTimeout(() => this.playTone(1320, 'square', 0.06, 0.12), 40);
  }

  startBGM(mode = 'adventure') {
    this.bgmMode = mode;
    if (this.isMuted) return;
    this.stopBGM();
    const advLead = [523.25,0,587.33,659.25,783.99,0,659.25,587.33, 523.25,0,440.00,523.25,587.33,0,0,0, 659.25,0,783.99,880.00,783.99,0,659.25,523.25, 587.33,659.25,523.25,440.00,392.00,0,0,0];
    const advBass = [130.81,196.00,261.63,196.00,130.81,196.00,261.63,196.00, 110.00,164.81,220.00,164.81,146.83,220.00,293.66,220.00, 174.61,261.63,349.23,261.63,130.81,196.00,261.63,196.00, 146.83,220.00,196.00,246.94,130.81,196.00,261.63,196.00];
    const bossLead = [587.33,587.33,659.25,698.46,880.00,0,783.99,698.46, 659.25,587.33,523.25,587.33,659.25,0,440.00,0];
    const bossBass = [146.83,146.83,220.00,146.83,116.54,116.54,174.61,116.54, 130.81,130.81,196.00,130.81,110.00,110.00,164.81,110.00];
    const tempoMs = (mode === 'boss') ? 190 : 240;
    this.bgmTimer = setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      if (this.bgmMode === 'boss') {
        const i = this.bgmIndex % bossLead.length;
        if (bossLead[i]) this.playTone(bossLead[i], 'square', 0.16, 0.045);
        this.playTone(bossBass[i], 'sawtooth', 0.17, 0.04);
      } else {
        const i = this.bgmIndex % advLead.length;
        if (advLead[i]) this.playTone(advLead[i], 'triangle', 0.22, 0.065);
        this.playTone(advBass[i], 'sine', 0.23, 0.055);
      }
      this.bgmIndex++;
    }, tempoMs);
  }

  stopBGM() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // --- SPECIAL: SYNTHESIZED MELODY OF 1000X BY GHEA INDRAWARI ---
  playSong1000X() {
    this.stopBGM();
    this.stopSong1000X();
    if (this.isMuted || !this.ctx) return;

    // Chorus: 'Dan bila aku terlahir seribu kali lagi... di dunia yang lain aku tak peduli kau akan kucari...'
    const notes1000X = [
      // Dan bila aku
      { f: 329.63, d: 0.35 }, // E4
      { f: 329.63, d: 0.35 }, // E4
      { f: 349.23, d: 0.35 }, // F4
      { f: 392.00, d: 0.5 },  // G4
      // terlahir seribu kali lagi
      { f: 392.00, d: 0.35 }, // G4
      { f: 392.00, d: 0.35 }, // G4
      { f: 440.00, d: 0.35 }, // A4
      { f: 392.00, d: 0.4 },  // G4
      { f: 349.23, d: 0.35 }, // F4
      { f: 329.63, d: 0.35 }, // E4
      { f: 293.66, d: 0.35 }, // D4
      { f: 329.63, d: 0.8 },  // E4
      { f: 0, d: 0.3 },       // rest

      // di dunia yang lain aku tak peduli
      { f: 329.63, d: 0.35 }, // E4
      { f: 329.63, d: 0.35 }, // E4
      { f: 349.23, d: 0.35 }, // F4
      { f: 392.00, d: 0.5 },  // G4
      { f: 392.00, d: 0.35 }, // G4
      { f: 392.00, d: 0.35 }, // G4
      { f: 440.00, d: 0.35 }, // A4
      { f: 392.00, d: 0.4 },  // G4
      { f: 349.23, d: 0.35 }, // F4
      { f: 329.63, d: 0.7 },  // E4
      { f: 0, d: 0.25 },      // rest

      // kau akan kucari
      { f: 329.63, d: 0.35 }, // E4
      { f: 349.23, d: 0.35 }, // F4
      { f: 392.00, d: 0.35 }, // G4
      { f: 440.00, d: 0.35 }, // A4
      { f: 493.88, d: 0.4 },  // B4
      { f: 523.25, d: 0.8 },  // C5
      { f: 0, d: 0.3 },       // rest

      // sampai kau tahu betapa kau kucintai
      { f: 523.25, d: 0.4 },  // C5
      { f: 493.88, d: 0.35 }, // B4
      { f: 440.00, d: 0.35 }, // A4
      { f: 392.00, d: 0.45 }, // G4
      { f: 523.25, d: 0.5 },  // C5
      { f: 493.88, d: 0.35 }, // B4
      { f: 440.00, d: 0.35 }, // A4
      { f: 392.00, d: 0.35 }, // G4
      { f: 349.23, d: 0.35 }, // F4
      { f: 329.63, d: 0.4 },  // E4
      { f: 293.66, d: 0.5 },  // D4
      { f: 261.63, d: 1.2 },  // C4
    ];

    let t = 0;
    notes1000X.forEach(note => {
      setTimeout(() => {
        if (note.f > 0 && !this.isMuted) {
          // Warm music box bell sound
          this.playTone(note.f, 'sine', note.d, 0.1);
          this.playTone(note.f * 2, 'triangle', note.d * 0.7, 0.04);
        }
      }, t * 1000);
      t += note.d + 0.05;
    });

    // Loop after finished
    this.song1000xTimer = setTimeout(() => {
      this.playSong1000X();
    }, (t + 1) * 1000);
  }

  stopSong1000X() {
    if (this.song1000xTimer) {
      clearTimeout(this.song1000xTimer);
      this.song1000xTimer = null;
    }
  }
}

// --- 2. CONFETTI PARTICLES ---
class ConfettiRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  start(count = 90) {
    if (!this.canvas) return;
    this.particles = [];
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#ff9ff3'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height,
        w: 6 + Math.random() * 6,
        h: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: 2.5 + Math.random() * 3,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 8
      });
    }
    if (!this.animId) this.loop();
  }

  stop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  loop() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      if (p.y > this.canvas.height) {
        p.y = -10;
        p.x = Math.random() * this.canvas.width;
      }
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();
    });
    this.animId = requestAnimationFrame(() => this.loop());
  }
}

// --- 3. STAGES DATA (4 ATMOSPHERES: DAY -> SUNSET -> NIGHT -> MIDNIGHT) ---
const STAGES_DATA = [
  {
    stageId: 1,
    levelTitle: "DUNIA 1-1: LEMBAH RUMPUT TERANG",
    levelSub: "Pagi yang cerah... Hentikan monster pertama di padang bunga!",
    skyTheme: 'day',
    enemyName: "SHADOW SLIME",
    enemyBustClass: "enemy-slime-bust",
    enemyTaunt: "Sluurp! Sebelum kamu mengejar lebih jauh, ceritakan dulu bagaimana harimu!",
    skillName: "✨ TEBASAN CAHAYA REFLEKSI!",
    questions: [
      {
        q: "Bagaimana kabarmu sebenarnya belakangan ini? Sudahkah kamu cukup beristirahat dan bernapas?",
        options: [
          "Kadang lelah, tapi aku tetap berusaha melangkah.",
          "Cukup baik dan banyak bersyukur atas hal kecil.",
          "Sibuk dan padat, tapi aku belajar bertahan.",
          "Sedang belajar menikmati ritme hidupku apa adanya."
        ]
      },
      {
        q: "Hal sederhana apa yang paling sering membuatmu tersenyum atau merasa hangat belakangan ini?",
        options: [
          "Secangkir minuman hangat dan musik yang menenangkan.",
          "Obrolan tulus bersama sahabat dan orang tersayang.",
          "Waktu me-time santai tanpa memikirkan tugas/pekerjaan.",
          "Melihat hal lucu dan tertawa lepas tanpa beban."
        ]
      }
    ]
  },
  {
    stageId: 2,
    levelTitle: "DUNIA 1-2: HUTAN SENJA KEEMASAN",
    levelSub: "Matahari mulai terbenam... Musuh bersayap menghadang di balik pepohonan jingga!",
    skyTheme: 'sunset',
    enemyName: "SHADOW FAIRY",
    enemyBustClass: "enemy-fairy-bust",
    enemyTaunt: "Sayap senjaku tak akan membiarkanmu lewat jika hatimu masih diliputi resah!",
    skillName: "🌠 BADAI BINTANG HARAPAN!",
    questions: [
      {
        q: "Ketika ada hari yang terasa begitu berat dan melelahkan, apa yang biasanya menjadi tempat pelarian ternyamanmu?",
        options: [
          "Tidur lelap dan merebahkan semua kepenatan.",
          "Bercerita dan menumpahkan isi hati ke sahabat dekat.",
          "Menyendiri menikmati hobi yang kusukai.",
          "Menulis atau merenung sambil menatap langit senja."
        ]
      },
      {
        q: "Pencapaian atau keberanian apa dari dirimu dalam setahun terakhir yang paling patut kamu banggakan?",
        options: [
          "Keberanian untuk tetap bangkit saat berkali-kali terjatuh.",
          "Belajar menetapkan batasan demi menjaga kedamaian hati.",
          "Mencoba hal baru yang dulu terasa sangat menakutkan.",
          "Menjadi pribadi yang jauh lebih sabar dan pengertian."
        ]
      }
    ]
  },
  {
    stageId: 3,
    levelTitle: "DUNIA 1-3: TEBING MALAM BERBINTANG",
    levelSub: "Malam telah tiba... Kristal ungu bersinar di benteng berbintang!",
    skyTheme: 'night',
    enemyName: "SHADOW KNIGHT",
    enemyBustClass: "enemy-knight-bust",
    enemyTaunt: "Perisaiku sekuat batu tebing malam ini! Buktikan ketangguhan mentalmu!",
    skillName: "⚔️ SERANGAN PEDANG KEBERANIAN!",
    questions: [
      {
        q: "Pelajaran hidup paling berharga yang semakin kamu pahami di usiamu saat ini adalah...",
        options: [
          "Tidak apa-apa untuk tidak selalu terlihat sempurna.",
          "Waktu bersama orang-orang tulus itu tak ternilai harganya.",
          "Bahagia itu diciptakan dari rasa syukur, bukan perbandingan.",
          "Setiap kesulitan selalu membawa benih kedewasaan baru."
        ]
      },
      {
        q: "Jika kamu bisa berdiri di depan dirimu sendiri 5 tahun yang lalu, kalimat apa yang ingin kamu bisikkan?",
        options: [
          "'Tenang saja, masa depanmu akan baik-baik saja.'",
          "'Terima kasih banyak sudah tidak pernah menyerah.'",
          "'Nikmati masa mudamu dan jangan terlalu cemas.'",
          "'Kamu akan tumbuh menjadi sosok tangguh yang kamu kagumi.'"
        ]
      }
    ]
  },
  {
    stageId: 4,
    levelTitle: "DUNIA 1-4: TAHTA SENJA SANG PENCURI",
    levelSub: "Pencuri Bayangan terpojok dengan kado emasmu! 3 Soal Terakhir!",
    skyTheme: 'midnight',
    enemyName: "SHADOW LORD (BOSS PENCURI)",
    enemyBustClass: "enemy-boss-bust",
    enemyTaunt: "Hahaha! Kau sampai ke benteng kegelapanku? Hadapi 3 cermin refleksi pamungkas ini!",
    skillName: "🌟 KILATAN KEDAMAIAN ABADI (FINISHER)!",
    questions: [
      {
        q: "Apa impian atau harapan rahasia yang paling ingin kamu wujudkan di babak usiamu yang baru ini?",
        options: [
          "Hati yang damai, badan yang sehat, dan bebas overthinking.",
          "Mencapai target karya dan masa depan yang kubanggakan.",
          "Petualangan baru dan menjelajahi tempat-tempat indah.",
          "Melihat orang-orang yang kusayangi tersenyum bahagia."
        ]
      },
      {
        q: "Jika kamu bisa melepaskan satu beban pikiran yang mengganjal, apa yang ingin kamu buang selamanya?",
        options: [
          "Rasa cemas berlebihan tentang masa depan yang belum tiba.",
          "Beban ekspektasi orang lain yang melelahkan pundak.",
          "Penyesalan atas keputusan masa lalu yang tak bisa diulang.",
          "Kebiasaan meragukan dan mengecilkan kemampuan diri sendiri."
        ]
      },
      {
        q: "Di lembaran hidup barumu saat ini, janji terindah apa yang ingin kamu berikan untuk dirimu sendiri?",
        options: [
          "Aku berjanji akan lebih menyayangi dan merawat diriku.",
          "Aku berjanji akan lebih sering tersenyum dan menikmati hidup.",
          "Aku berjanji akan melangkah berani menggapai mimpiku.",
          "Aku berjanji akan mensyukuri setiap detik perjalanan ini."
        ]
      }
    ]
  }
];

// --- 4. 2D MARIO PLATFORMER ENGINE ---
class PlatformerEngine {
  constructor(canvasId, onEncounterTrigger) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.onEncounterTrigger = onEncounterTrigger;

    this.width = 800;
    this.height = 450;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Player State: Cewek Berhijab Kacamata
    this.player = {
      x: 60,
      y: 300,
      vx: 0,
      vy: 0,
      w: 32,
      h: 40,
      speed: 4.8,
      jumpPower: -11.5,
      isGrounded: false,
      facing: 1
    };

    this.keys = { left: false, right: false, jump: false };
    this.gravity = 0.58;
    this.friction = 0.82;
    this.cameraX = 0;
    this.worldWidth = 2400;

    this.coins = [];
    this.platforms = [];
    this.enemyTarget = null;
    this.coinsCount = 0;
    this.currentStageIndex = 0;
    this.isRunning = false;
    this.animFrameId = null;

    this.bindControls();
  }

  bindControls() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = true;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        // If in boss stage, near dizzy boss, Space triggers Attack!
        if (this.isBossStage && this.boss && this.boss.state === 'dizzy' && this.canAttackBoss) {
          this.triggerBossQuestionAttack();
          return;
        }
        if (!this.keys.jump && this.player.isGrounded) {
          try { window.birthdayApp.audio.playJump(); } catch(e){}
        }
        this.keys.jump = true;
      }
      if (['KeyE', 'KeyX', 'Enter'].includes(e.code)) {
        if (this.isBossStage && this.boss && this.boss.state === 'dizzy' && this.canAttackBoss) {
          this.triggerBossQuestionAttack();
        }
      }
    });

    const btnTouchAttack = document.getElementById('btn-touch-attack');
    if (btnTouchAttack) {
      btnTouchAttack.addEventListener('click', () => {
        if (this.isBossStage && this.boss && this.boss.state === 'dizzy' && this.canAttackBoss) {
          this.triggerBossQuestionAttack();
        }
      });
    }

    // Clicking anywhere near boss or canvas when prompt is active attacks boss
    if (this.canvas) {
      this.canvas.addEventListener('click', () => {
        if (this.isBossStage && this.boss && this.boss.state === 'dizzy' && this.canAttackBoss) {
          this.triggerBossQuestionAttack();
        }
      });
    }

    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) this.keys.jump = false;
    });

    const btnLeft = document.getElementById('btn-touch-left');
    const btnRight = document.getElementById('btn-touch-right');
    const btnJump = document.getElementById('btn-touch-jump');

    const handleTouch = (btn, keyState) => {
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[keyState] = true; });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[keyState] = false; });
      btn.addEventListener('mousedown', () => { this.keys[keyState] = true; });
      btn.addEventListener('mouseup', () => { this.keys[keyState] = false; });
      btn.addEventListener('mouseleave', () => { this.keys[keyState] = false; });
    };

    if (btnLeft && btnRight && btnJump) {
      handleTouch(btnLeft, 'left');
      handleTouch(btnRight, 'right');
      btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.player.isGrounded) {
          try { window.birthdayApp.audio.playJump(); } catch(e){}
        }
        this.keys.jump = true;
      });
      btnJump.addEventListener('touchend', (e) => { e.preventDefault(); this.keys.jump = false; });
      btnJump.addEventListener('mousedown', () => {
        if (this.player.isGrounded) {
          try { window.birthdayApp.audio.playJump(); } catch(e){}
        }
        this.keys.jump = true;
      });
      btnJump.addEventListener('mouseup', () => { this.keys.jump = false; });
    }
  }

  loadStage(stageIndex) {
    this.currentStageIndex = stageIndex;
    this.player.x = 60;
    this.player.y = 300;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.slashTimer = 0;
    this.cameraX = 0;
    this.isBossStage = (stageIndex === 3);

    const bossHud = document.getElementById('platformer-boss-hud');
    const touchAttackBtn = document.getElementById('btn-touch-attack');
    // Always hide Boss HUD at the start of the stage until player reaches the boss!
    if (bossHud) bossHud.classList.add('hidden');
    if (touchAttackBtn) touchAttackBtn.classList.add('hidden');

    if (this.isBossStage) {
      // DUNIA 1-4: IN-WORLD MARIO BOSS BATTLE ARENA!
      this.worldWidth = 1550;
      this.platforms = [
        { x: 0, y: 380, w: 1550, h: 70, type: 'ground' },
        { x: 180, y: 290, w: 140, h: 22, type: 'brick' },
        { x: 420, y: 220, w: 150, h: 22, type: 'brick' },
        { x: 660, y: 290, w: 140, h: 22, type: 'brick' },
        { x: 920, y: 240, w: 140, h: 22, type: 'brick' }
      ];
      this.coins = [
        { x: 220, y: 250, collected: false },
        { x: 460, y: 180, collected: false },
        { x: 700, y: 250, collected: false },
        { x: 960, y: 200, collected: false }
      ];
      this.enemyTarget = null;

      // Live In-World Boss (Shadow Lord) - starts in 'waiting' until player arrives!
      this.boss = {
        x: 1240,
        y: 296,
        baseY: 165,
        groundY: 296,
        w: 64,
        h: 84,
        hp: 3,
        maxHp: 3,
        round: 1,
        engaged: false,
        state: 'waiting', // 'waiting', 'shooting', 'dizzy', 'hurt', 'defeated'
        shotsFired: 0,
        maxShots: 3,
        shootTimer: 0,
        dizzyTimer: 0,
        projectiles: [],
        dialogue: "Kau berani mengejarku sampai ke sini?!",
        dialogueTimer: 0
      };
      this.canAttackBoss = false;
      this.chestEntity = null;
      this.vfxParticles = [];
      this.vfxShockwaves = [];
      this.vfxSlashes = [];
      this.vfxFloatingTexts = [];
      this.activeUltimate = null;
    } else {
      this.worldWidth = 2400;
      this.platforms = [
        { x: 0, y: 380, w: 2400, h: 70, type: 'ground' },
        { x: 260, y: 290, w: 140, h: 22, type: 'brick' },
        { x: 480, y: 220, w: 160, h: 22, type: 'brick' },
        { x: 740, y: 290, w: 140, h: 22, type: 'brick' },
        { x: 980, y: 230, w: 160, h: 22, type: 'brick' },
        { x: 1240, y: 280, w: 180, h: 22, type: 'brick' },
        { x: 1520, y: 220, w: 150, h: 22, type: 'brick' },
        { x: 1780, y: 290, w: 160, h: 22, type: 'brick' }
      ];

      this.coins = [
        { x: 300, y: 250, collected: false },
        { x: 340, y: 250, collected: false },
        { x: 530, y: 180, collected: false },
        { x: 570, y: 180, collected: false },
        { x: 780, y: 250, collected: false },
        { x: 1030, y: 190, collected: false },
        { x: 1300, y: 240, collected: false },
        { x: 1570, y: 180, collected: false },
        { x: 1830, y: 250, collected: false }
      ];

      this.enemyTarget = {
        x: 2000,
        y: 320,
        w: 48,
        h: 60,
        triggered: false
      };
      this.boss = null;
    }

    const banner = document.getElementById('level-banner');
    const title = document.getElementById('level-title');
    const sub = document.getElementById('level-sub');
    const stageBadgeTop = document.getElementById('stage-badge-top');
    const sData = STAGES_DATA[stageIndex];
    if (sData) {
      if (stageBadgeTop) stageBadgeTop.innerText = `DUNIA 1-${stageIndex + 1}`;
      if (title) title.innerText = sData.levelTitle;
      if (sub) sub.innerText = sData.levelSub;
      if (banner) {
        banner.style.opacity = '1';
        setTimeout(() => { banner.style.opacity = '0'; }, 3200);
      }
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  update() {
    if (this.keys.left) {
      this.player.vx = -this.player.speed;
      this.player.facing = -1;
    } else if (this.keys.right) {
      this.player.vx = this.player.speed;
      this.player.facing = 1;
    } else {
      this.player.vx *= this.friction;
    }

    if (this.keys.jump && this.player.isGrounded) {
      this.player.vy = this.player.jumpPower;
      this.player.isGrounded = false;
    }

    this.player.vy += this.gravity;
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;

    if (this.player.x < 0) this.player.x = 0;
    if (this.player.x > this.worldWidth - this.player.w) {
      this.player.x = this.worldWidth - this.player.w;
    }

    this.player.isGrounded = false;
    this.platforms.forEach(p => {
      if (
        this.player.x + this.player.w > p.x &&
        this.player.x < p.x + p.w &&
        this.player.y + this.player.h >= p.y &&
        this.player.y + this.player.h <= p.y + p.h + this.player.vy &&
        this.player.vy >= 0
      ) {
        this.player.y = p.y - this.player.h;
        this.player.vy = 0;
        this.player.isGrounded = true;
      }
    });

    this.cameraX = this.player.x - 220;
    if (this.cameraX < 0) this.cameraX = 0;
    if (this.cameraX > this.worldWidth - this.width) {
      this.cameraX = this.worldWidth - this.width;
    }

    this.coins.forEach(c => {
      if (!c.collected) {
        const dist = Math.hypot((this.player.x + this.player.w / 2) - c.x, (this.player.y + this.player.h / 2) - c.y);
        if (dist < 26) {
          c.collected = true;
          this.coinsCount += 10;
          const coinEl = document.getElementById('coin-counter');
          if (coinEl) coinEl.innerText = this.coinsCount;
          try { window.birthdayApp.audio.playCoin(); } catch(e){}
        }
      }
    });

    if (this.enemyTarget && !this.enemyTarget.triggered) {
      const distToEnemy = Math.abs((this.player.x + this.player.w / 2) - (this.enemyTarget.x + this.enemyTarget.w / 2));
      if (distToEnemy < 80) {
        this.enemyTarget.triggered = true;
        this.stop();
        this.onEncounterTrigger(this.currentStageIndex);
      }
    }

    // --- IN-WORLD BOSS BATTLE UPDATE LOOP (DUNIA 1-4) ---
    if (this.isBossStage && this.boss) {
      this.updateBossBattle();
    }
  }

    updateBossBattle() {
    if (!this.vfxParticles) this.vfxParticles = [];
    if (!this.vfxShockwaves) this.vfxShockwaves = [];
    if (!this.vfxSlashes) this.vfxSlashes = [];
    if (!this.vfxFloatingTexts) this.vfxFloatingTexts = [];

    if (this.player.slashTimer > 0) {
      this.player.slashTimer--;
    }

    // Update active 60fps Canvas Ultimate Skill Sequence!
    if (this.activeUltimate) {
      this.updateCanvasUltimate();
    }

    // Update VFX Particles, Shockwaves, Slash Arcs, Floating Texts
    this.updateCanvasVfxElements();

    const bossHud = document.getElementById('platformer-boss-hud');
    const touchAttackBtn = document.getElementById('btn-touch-attack');

    // A. Wait until player walks near the Boss arena (x >= 760) before starting Boss Battle & showing HUD!
    if (!this.boss.engaged) {
      this.boss.y = this.boss.groundY + Math.sin(Date.now() / 350) * 6;
      if (this.player.x >= 760) {
        this.boss.engaged = true;
        this.boss.state = 'shooting';
        this.boss.shootTimer = 25;
        this.boss.shotsFired = 0;
        this.boss.dialogue = "Hahaha! Kau sampai juga! Rasakan jurus bayanganku!";
        this.boss.dialogueTimer = 140;
        if (bossHud) bossHud.classList.remove('hidden');
        this.updateBossHud();
        this.spawnShockwave(this.boss.x + 32, this.boss.y + 42, '#e056fd', 95, 5);
        this.spawnFloatingText(this.boss.x + 32, this.boss.y - 20, "⚠️ BOSS ENGAGED!", "#e056fd");
        try { window.birthdayApp.audio.playTone(240, 'sawtooth', 0.25, 0.15); } catch(e){}
      }
      return;
    }

    if (this.boss.dialogueTimer > 0) {
      this.boss.dialogueTimer--;
    }

    // B. Boss State Machine once engaged
    if (this.boss.state === 'shooting') {
      this.canAttackBoss = false;
      if (touchAttackBtn) touchAttackBtn.classList.add('hidden');

      // Boss hovers in the air while casting skills
      this.boss.y = this.boss.baseY + Math.sin(Date.now() / 220) * 18;
      this.boss.shootTimer++;

      // Boss charging aura particles
      if (this.boss.shootTimer % 6 === 0) {
        this.vfxParticles.push({
          x: this.boss.x + 32 + (Math.random() - 0.5) * 65,
          y: this.boss.y + 42 + (Math.random() - 0.5) * 65,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -1.5 - Math.random() * 1.5,
          size: 3 + Math.random() * 3,
          color: (this.boss.round === 1) ? '#9b59b6' : (this.boss.round === 2) ? '#00ffff' : '#ff0055',
          alpha: 0.9,
          life: 24,
          maxLife: 24,
          shape: 'circle'
        });
      }

      if (this.boss.shootTimer % 85 === 0 && this.boss.shotsFired < this.boss.maxShots) {
        // Aim towards player's current position
        const dx = (this.player.x + this.player.w / 2) - (this.boss.x + 10);
        const dy = (this.player.y + this.player.h / 2) - (this.boss.y + 40);
        const dist = Math.hypot(dx, dy) || 1;
        const speed = 5.4 + (this.boss.round * 0.4);

        this.boss.projectiles.push({
          x: this.boss.x + 10,
          y: this.boss.y + 40,
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          r: 14,
          round: this.boss.round,
          angle: 0
        });

        this.spawnShockwave(this.boss.x + 10, this.boss.y + 40, '#ff0055', 45, 4);
        this.boss.shotsFired++;
        this.updateBossHud();
        try { window.birthdayApp.audio.playTone(320, 'sawtooth', 0.15, 0.12); } catch(e){}
      }

      // After firing all 3 shots and projectiles travel across screen, Boss gets dizzy & drops to ground!
      if (this.boss.shotsFired >= this.boss.maxShots && this.boss.shootTimer >= (this.boss.maxShots * 85 + 75)) {
        this.boss.state = 'dizzy';
        this.boss.y = this.boss.groundY;
        this.boss.dialogue = "Hosh... hosh... Tenagaku habis! Jangan mendekat!";
        this.boss.dialogueTimer = 600;
        this.boss.dizzyTimer = 600;
        this.spawnShockwave(this.boss.x + 32, this.boss.y + 70, '#ffd359', 65, 3);
        this.spawnFloatingText(this.boss.x + 32, this.boss.y - 30, "💫 BOSS PUSING! SERANG!", "#ffd359");
        this.updateBossHud();
        try { window.birthdayApp.audio.playTone(190, 'sine', 0.35, 0.2); } catch(e){}
      }
    } else if (this.boss.state === 'dizzy') {
      // Boss is on the ground (y = 296), exhausted and dizzy!
      this.boss.y = this.boss.groundY;

      // Check horizontal & vertical distance between player and boss
      const dx = Math.abs((this.player.x + this.player.w / 2) - (this.boss.x + this.boss.w / 2));
      const dy = Math.abs((this.player.y + this.player.h / 2) - (this.boss.y + this.boss.h / 2));

      this.canAttackBoss = (dx < 115 && dy < 110);
      if (touchAttackBtn) {
        if (this.canAttackBoss) touchAttackBtn.classList.remove('hidden');
        else touchAttackBtn.classList.add('hidden');
      }

      this.boss.dizzyTimer--;
      if (this.boss.dizzyTimer <= 0) {
        this.boss.state = 'shooting';
        this.boss.shotsFired = 0;
        this.boss.shootTimer = 0;
        this.boss.dialogue = "Hahaha! Tenaga bayanganku sudah pulih kembali!";
        this.boss.dialogueTimer = 120;
        this.updateBossHud();
      }
    }

    // C. Update Boss Projectiles + Trail Particles
    for (let i = this.boss.projectiles.length - 1; i >= 0; i--) {
      const p = this.boss.projectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.angle = (p.angle || 0) + 0.25;

      // Spawn dark flame trail particle
      if (Math.random() < 0.75) {
        this.vfxParticles.push({
          x: p.x + (Math.random() - 0.5) * 10,
          y: p.y + (Math.random() - 0.5) * 10,
          vx: -p.vx * 0.2 + (Math.random() - 0.5) * 1.2,
          vy: -p.vy * 0.2 + (Math.random() - 0.5) * 1.2,
          size: 4 + Math.random() * 4,
          color: (p.round === 2) ? '#00ffff' : (p.round === 3) ? '#ff0055' : '#a55eea',
          alpha: 0.85,
          life: 16,
          maxLife: 16,
          shape: 'star'
        });
      }

      // Check collision with player
      const distToPlayer = Math.hypot(
        (this.player.x + this.player.w / 2) - p.x,
        (this.player.y + this.player.h / 2) - p.y
      );

      if (distToPlayer < (p.r + this.player.w / 2 - 4)) {
        this.player.vx = (p.vx > 0) ? 5 : -5;
        this.player.vy = -4;
        this.spawnParticleBurst(p.x, p.y, 18, ['#ff0055', '#a55eea', '#ffd359'], 4.5);
        this.spawnShockwave(p.x, p.y, '#ff0055', 50, 4);
        this.spawnFloatingText(this.player.x + 16, this.player.y - 12, "💥 AWAS!", "#ff4757");
        try {
          window.birthdayApp.audio.playTone(150, 'sawtooth', 0.2, 0.15);
          window.birthdayApp.gameAppContainer.classList.add('shake-screen');
          setTimeout(() => window.birthdayApp.gameAppContainer.classList.remove('shake-screen'), 300);
        } catch(e){}
        this.boss.projectiles.splice(i, 1);
        continue;
      }

      // Remove off-screen or ground-hitting projectiles with impact burst!
      if (p.y > 375) {
        this.spawnParticleBurst(p.x, 375, 10, ['#a55eea', '#ff0055'], 3.2);
        this.spawnShockwave(p.x, 375, '#a55eea', 32, 3);
        this.boss.projectiles.splice(i, 1);
      } else if (p.x < this.cameraX - 60 || p.x > this.worldWidth + 60 || p.y < -50) {
        this.boss.projectiles.splice(i, 1);
      }
    }

    // D. Check Golden Chest touch after boss defeat
    if (this.chestEntity && !this.chestEntity.collected) {
      // Gentle sparkle particles around chest
      if (Math.random() < 0.3) {
        this.vfxParticles.push({
          x: this.chestEntity.x + 24 + (Math.random() - 0.5) * 44,
          y: this.chestEntity.y + 20 + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -1 - Math.random() * 1.5,
          size: 4 + Math.random() * 3,
          color: '#ffd359',
          alpha: 1,
          life: 25,
          maxLife: 25,
          shape: 'star'
        });
      }
      const distToChest = Math.hypot(
        (this.player.x + this.player.w / 2) - (this.chestEntity.x + 24),
        (this.player.y + this.player.h / 2) - (this.chestEntity.y + 24)
      );
      if (distToChest < 55) {
        this.chestEntity.collected = true;
        this.stop();
        if (bossHud) bossHud.classList.add('hidden');
        try { window.birthdayApp.audio.playVictory(); } catch(e){}
        window.birthdayApp.confetti.start(80);
        setTimeout(() => {
          window.birthdayApp.confetti.stop();
          window.birthdayApp.switchScene('giftReveal');
        }, 1200);
      }
    }
  }

  // --- CANVAS 60FPS VFX HELPERS (PARTICLES, SHOCKWAVES, SLASHES, ULTIMATES) ---
  spawnParticleBurst(x, y, count = 20, colors = ['#ffd359', '#00ffff', '#ffffff'], maxSpeed = 6) {
    if (!this.vfxParticles) this.vfxParticles = [];
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const spd = 1.5 + Math.random() * maxSpeed;
      this.vfxParticles.push({
        x: x,
        y: y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1.2,
        gravity: 0.14,
        size: 4 + Math.random() * 5,
        color: colors[i % colors.length],
        alpha: 1,
        life: 28 + Math.floor(Math.random() * 18),
        maxLife: 45,
        shape: (i % 2 === 0) ? 'star' : 'diamond'
      });
    }
  }

  spawnShockwave(x, y, color = '#ffd359', maxR = 110, lineWidth = 6) {
    if (!this.vfxShockwaves) this.vfxShockwaves = [];
    this.vfxShockwaves.push({
      x: x,
      y: y,
      r: 8,
      maxR: maxR,
      color: color,
      lineWidth: lineWidth,
      alpha: 1
    });
  }

  spawnCrescentSlash(x, y, angle = -0.5, color = '#ffd359', scale = 1.2) {
    if (!this.vfxSlashes) this.vfxSlashes = [];
    this.vfxSlashes.push({
      x: x,
      y: y,
      angle: angle,
      color: color,
      scale: scale,
      life: 18,
      maxLife: 18
    });
  }

  spawnFloatingText(x, y, text, color = '#ffd359') {
    if (!this.vfxFloatingTexts) this.vfxFloatingTexts = [];
    this.vfxFloatingTexts.push({
      x: x,
      y: y,
      text: text,
      color: color,
      vy: -1.6,
      life: 45,
      maxLife: 45
    });
  }

  updateCanvasVfxElements() {
    // Particles
    for (let i = this.vfxParticles.length - 1; i >= 0; i--) {
      const pt = this.vfxParticles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.gravity) pt.vy += pt.gravity;
      if (pt.y > 376 && pt.vy > 0) {
        pt.y = 376;
        pt.vy *= -0.45;
      }
      pt.life--;
      pt.alpha = Math.max(0, pt.life / pt.maxLife);
      if (pt.life <= 0) this.vfxParticles.splice(i, 1);
    }

    // Shockwaves
    for (let i = this.vfxShockwaves.length - 1; i >= 0; i--) {
      const sw = this.vfxShockwaves[i];
      sw.r += (sw.maxR - sw.r) * 0.22;
      sw.alpha -= 0.048;
      if (sw.alpha <= 0) this.vfxShockwaves.splice(i, 1);
    }

    // Crescent Slashes
    for (let i = this.vfxSlashes.length - 1; i >= 0; i--) {
      const sl = this.vfxSlashes[i];
      sl.life--;
      sl.scale += 0.06;
      if (sl.life <= 0) this.vfxSlashes.splice(i, 1);
    }

    // Floating Texts
    for (let i = this.vfxFloatingTexts.length - 1; i >= 0; i--) {
      const ft = this.vfxFloatingTexts[i];
      ft.y += ft.vy;
      ft.life--;
      if (ft.life <= 0) this.vfxFloatingTexts.splice(i, 1);
    }
  }

  startCanvasUltimateVfx(round) {
    const bx = this.boss ? (this.boss.x + this.boss.w / 2) : 1250;
    const by = this.boss ? (this.boss.y + this.boss.h / 2) : 330;
    this.activeUltimate = {
      round: round,
      frame: 0,
      maxFrames: (round === 3) ? 105 : 85,
      targetX: bx,
      targetY: by,
      meteors: []
    };
  }

  updateCanvasUltimate() {
    const ult = this.activeUltimate;
    if (!ult || !this.boss) return;
    ult.frame++;
    const bx = this.boss.x + this.boss.w / 2;
    const by = this.boss.y + this.boss.h / 2;
    this.boss.shakeOffset = (Math.random() - 0.5) * 14;

    if (ult.round === 1) {
      // ROUND 1: 6-HIT OMNISLASH GOLDEN & CYAN CRESCENT COMBO!
      const hitFrames = [4, 14, 24, 34, 44, 54];
      const angles = [-0.65, 0.65, -1.35, 0.25, -0.35, 1.1];
      const colors = ['#ffd359', '#00ffff', '#ff6bcb', '#ffd359', '#00ffff', '#ffffff'];
      const hitIdx = hitFrames.indexOf(ult.frame);
      if (hitIdx !== -1) {
        const ox = (Math.random() - 0.5) * 36;
        const oy = (Math.random() - 0.5) * 36;
        this.spawnCrescentSlash(bx + ox, by + oy, angles[hitIdx], colors[hitIdx], 1.35 + hitIdx * 0.12);
        this.spawnParticleBurst(bx + ox, by + oy, 18, ['#ffd359', '#00ffff', '#ffffff'], 6.5);
        this.spawnShockwave(bx + ox, by + oy, colors[hitIdx], 75 + hitIdx * 12, 5);
        if (hitIdx === 0) this.spawnFloatingText(bx - 20, by - 45, "⚔️ SLASH COMBO x1!", "#ffd359");
        if (hitIdx === 2) this.spawnFloatingText(bx + 15, by - 60, "✨ LIGHT SLASH x3!", "#00ffff");
        if (hitIdx === 5) {
          // Final X-Cross Burst!
          this.spawnCrescentSlash(bx, by, -0.75, '#ffd359', 2.1);
          this.spawnCrescentSlash(bx, by, 0.75, '#00ffff', 2.1);
          this.spawnShockwave(bx, by, '#ffd359', 150, 8);
          this.spawnFloatingText(bx, by - 75, "💥 CRITICAL HIT! -1 HP!", "#ff4757");
        }
      }
    } else if (ult.round === 2) {
      // ROUND 2: STARLIGHT METEOR SHOWER & HEAVENLY PILLAR OF LIGHT!
      if (ult.frame <= 50 && ult.frame % 5 === 0) {
        ult.meteors.push({
          x: bx - 180 + (Math.random() - 0.5) * 160,
          y: -30,
          vx: 4.5 + Math.random() * 2,
          vy: 9.5 + Math.random() * 2.5,
          color: (ult.frame % 10 === 0) ? '#ffd359' : '#00ffff',
          size: 12 + Math.random() * 6
        });
      }
      for (let i = ult.meteors.length - 1; i >= 0; i--) {
        const m = ult.meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        this.vfxParticles.push({
          x: m.x, y: m.y,
          vx: -m.vx * 0.25, vy: -m.vy * 0.25,
          size: 5, color: m.color, alpha: 0.9, life: 14, maxLife: 14, shape: 'star'
        });
        if (m.y >= by + 10) {
          this.spawnParticleBurst(m.x, m.y, 14, [m.color, '#ffffff', '#ff6bcb'], 5.5);
          this.spawnShockwave(m.x, m.y, m.color, 65, 4);
          ult.meteors.splice(i, 1);
        }
      }
      if (ult.frame === 45) {
        this.spawnFloatingText(bx, by - 70, "🌟 HEAVENLY LIGHT PILLAR! -1 HP!", "#ffd359");
        this.spawnShockwave(bx, by, '#ffd359', 160, 8);
        this.spawnShockwave(bx, by, '#00ffff', 120, 5);
        this.spawnParticleBurst(bx, by, 35, ['#ffd359', '#00ffff', '#ffffff'], 8);
      }
    } else {
      // ROUND 3: SOLAR KAMEHAMEHA LASER BEAM & SUPERNOVA SHATTER!
      const px = this.player.x + this.player.w / 2 + 18;
      const py = this.player.y + 12;
      if (ult.frame < 24) {
        // Phase 1: Converging Solar Energy Charge at Hero's Sword!
        for (let i = 0; i < 3; i++) {
          const ang = Math.random() * Math.PI * 2;
          const dist = 35 + Math.random() * 35;
          this.vfxParticles.push({
            x: px + Math.cos(ang) * dist,
            y: py + Math.sin(ang) * dist,
            vx: -Math.cos(ang) * 2.8,
            vy: -Math.sin(ang) * 2.8,
            size: 4 + Math.random() * 3,
            color: (i % 2 === 0) ? '#ffd359' : '#00ffff',
            alpha: 1, life: 12, maxLife: 12, shape: 'star'
          });
        }
        if (ult.frame === 5) {
          this.spawnFloatingText(px, py - 35, "⚡ CHARGING SOLAR LIGHT...", "#ffd359");
        }
      } else if (ult.frame === 24) {
        this.spawnShockwave(px, py, '#ffd359', 90, 6);
        this.spawnFloatingText(bx, by - 75, "💫 SOLAR OBLITERATION BEAM!", "#00ffff");
      } else if (ult.frame > 24 && ult.frame < 78) {
        // Phase 2: Continuous impact sparks on Boss from the Laser Beam!
        if (ult.frame % 3 === 0) {
          this.spawnParticleBurst(bx + (Math.random() - 0.5) * 24, by + (Math.random() - 0.5) * 30, 8, ['#ffd359', '#00ffff', '#ffffff', '#ff6bcb'], 7.5);
        }
        if (ult.frame % 8 === 0) {
          this.spawnShockwave(bx, by, (ult.frame % 16 === 0) ? '#ffd359' : '#00ffff', 110, 5);
        }
      } else if (ult.frame === 78) {
        // Phase 3: Giant Supernova Finale!
        this.spawnShockwave(bx, by, '#ffffff', 240, 10);
        this.spawnShockwave(bx, by, '#ffd359', 190, 8);
        this.spawnShockwave(bx, by, '#00ffff', 140, 6);
        this.spawnParticleBurst(bx, by, 65, ['#ffd359', '#00ffff', '#ffffff', '#ff6bcb', '#e056fd'], 10);
        this.spawnFloatingText(bx, by - 85, "🏆 BOSS OBLITERATED! VICTORY!", "#ffd359");
      }
    }

    if (ult.frame >= ult.maxFrames) {
      this.boss.shakeOffset = 0;
      this.activeUltimate = null;
    }
  }

  drawCanvasVfx(ctx) {
    // 1. Draw Active Ultimate Special Geometries (Pillar, Meteors, Solar Laser Beam)
    if (this.activeUltimate && this.boss) {
      const ult = this.activeUltimate;
      const bx = this.boss.x + this.boss.w / 2;
      const by = this.boss.y + this.boss.h / 2;
      const px = this.player.x + this.player.w / 2;
      const py = this.player.y + this.player.h / 2;

      ctx.save();
      // Hero Super Saiyan / Light Aura during Ultimate
      const auraGrad = ctx.createRadialGradient(px, py, 6, px, py, 44);
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      auraGrad.addColorStop(0.5, 'rgba(255, 211, 89, 0.55)');
      auraGrad.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(px, py, 44 + Math.sin(ult.frame * 0.6) * 6, 0, Math.PI * 2);
      ctx.fill();

      if (ult.round === 1 && ult.frame < 60) {
        // Round 1: Hero Dash Afterimage Silhouettes around Boss!
        for (let s = 0; s < 2; s++) {
          const sx = bx + Math.cos(ult.frame * 0.35 + s * Math.PI) * 58 - 16;
          const sy = by + Math.sin(ult.frame * 0.35 + s * Math.PI) * 28 - 20;
          ctx.globalAlpha = 0.45;
          this.drawHijabGirlSprite(sx, sy, (sx < bx) ? 1 : -1);
        }
        ctx.globalAlpha = 1;
      } else if (ult.round === 2) {
        // Round 2: Draw falling Starlight Meteors
        for (let m of ult.meteors) {
          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.rotate(ult.frame * 0.25);
          ctx.fillStyle = m.color;
          ctx.shadowColor = m.color;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          for (let k = 0; k < 4; k++) {
            const a = (k * Math.PI) / 2;
            ctx.lineTo(Math.cos(a) * m.size, Math.sin(a) * m.size);
            ctx.lineTo(Math.cos(a + Math.PI / 4) * (m.size * 0.35), Math.sin(a + Math.PI / 4) * (m.size * 0.35));
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        // Round 2 Frames 42-82: Towering Heavenly Pillar of Light!
        if (ult.frame >= 42 && ult.frame <= 82) {
          const pAlpha = Math.sin(((ult.frame - 42) / 40) * Math.PI);
          const pWidth = 96 * pAlpha;
          const pillarGrad = ctx.createLinearGradient(bx - pWidth / 2, 0, bx + pWidth / 2, 0);
          pillarGrad.addColorStop(0, 'rgba(0, 255, 255, 0)');
          pillarGrad.addColorStop(0.2, `rgba(0, 255, 255, ${0.65 * pAlpha})`);
          pillarGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * pAlpha})`);
          pillarGrad.addColorStop(0.8, `rgba(255, 211, 89, ${0.75 * pAlpha})`);
          pillarGrad.addColorStop(1, 'rgba(255, 211, 89, 0)');
          ctx.fillStyle = pillarGrad;
          ctx.fillRect(bx - pWidth / 2, 0, pWidth, 385);

          // Spiraling light rings ascending the pillar
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * pAlpha})`;
          ctx.lineWidth = 3;
          for (let r = 0; r < 5; r++) {
            const ry = 370 - ((ult.frame * 9 + r * 75) % 360);
            ctx.beginPath();
            ctx.ellipse(bx, ry, pWidth * 0.55, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else if (ult.round === 3) {
        // Round 3: Solar Charge Orb + Colossal Kamehameha Laser Beam!
        const startX = px + 18;
        const startY = py - 4;
        if (ult.frame < 24) {
          const r = 6 + (ult.frame / 24) * 22;
          const orbGrad = ctx.createRadialGradient(startX, startY, 2, startX, startY, r);
          orbGrad.addColorStop(0, '#ffffff');
          orbGrad.addColorStop(0.5, '#ffd359');
          orbGrad.addColorStop(1, 'rgba(0, 255, 255, 0)');
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(startX, startY, r, 0, Math.PI * 2);
          ctx.fill();
        } else if (ult.frame >= 24 && ult.frame <= 80) {
          const beamProgress = Math.min(1, (ult.frame - 24) / 6);
          const endX = startX + (bx + 90 - startX) * beamProgress;
          const beamH = 48 + Math.sin(ult.frame * 0.8) * 10;

          // Outer Golden Plasma
          const bGrad = ctx.createLinearGradient(0, startY - beamH / 2, 0, startY + beamH / 2);
          bGrad.addColorStop(0, 'rgba(255, 159, 26, 0)');
          bGrad.addColorStop(0.2, 'rgba(255, 211, 89, 0.85)');
          bGrad.addColorStop(0.38, 'rgba(0, 255, 255, 0.95)');
          bGrad.addColorStop(0.5, '#ffffff');
          bGrad.addColorStop(0.62, 'rgba(0, 255, 255, 0.95)');
          bGrad.addColorStop(0.8, 'rgba(255, 211, 89, 0.85)');
          bGrad.addColorStop(1, 'rgba(255, 159, 26, 0)');

          ctx.fillStyle = bGrad;
          ctx.fillRect(startX, startY - beamH / 2, endX - startX, beamH);

          // Muzzle Sunburst Sphere at Hero's Sword
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(startX, startY, beamH * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Impact Sphere on Boss
          ctx.beginPath();
          ctx.arc(bx, by, beamH * 0.65, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Crackling Electric Lightning Bolts spiraling along the Beam
          ctx.strokeStyle = (ult.frame % 2 === 0) ? '#ffffff' : '#00ffff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          const steps = 10;
          for (let s = 1; s <= steps; s++) {
            const lx = startX + ((endX - startX) * s) / steps;
            const ly = startY + (Math.random() - 0.5) * (beamH * 1.15);
            ctx.lineTo(lx, ly);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // 2. Draw Expanding Shockwave Rings
    if (this.vfxShockwaves) {
      for (let sw of this.vfxShockwaves) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.lineWidth;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 3. Draw Curved Crescent Energy Slashes
    if (this.vfxSlashes) {
      for (let sl of this.vfxSlashes) {
        ctx.save();
        ctx.translate(sl.x, sl.y);
        ctx.rotate(sl.angle);
        ctx.scale(sl.scale, sl.scale);
        ctx.globalAlpha = Math.max(0, sl.life / sl.maxLife);
        ctx.fillStyle = sl.color;
        ctx.shadowColor = sl.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(-55, 0);
        ctx.quadraticCurveTo(0, -34, 55, 0);
        ctx.quadraticCurveTo(0, -14, -55, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // 4. Draw Glowing Stars & Sparks Particles
    if (this.vfxParticles) {
      for (let pt of this.vfxParticles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.translate(pt.x, pt.y);
        if (pt.shape === 'star') {
          ctx.rotate(pt.life * 0.2);
          ctx.beginPath();
          for (let k = 0; k < 4; k++) {
            const a = (k * Math.PI) / 2;
            ctx.lineTo(Math.cos(a) * pt.size, Math.sin(a) * pt.size);
            ctx.lineTo(Math.cos(a + Math.PI / 4) * (pt.size * 0.35), Math.sin(a + Math.PI / 4) * (pt.size * 0.35));
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, pt.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // 5. Draw Floating Combat Texts
    if (this.vfxFloatingTexts) {
      for (let ft of this.vfxFloatingTexts) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, ft.life / 15);
        ctx.font = "bold 12px 'Press Start 2P', monospace";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText(ft.text, ft.x + 2, ft.y + 2);
        ctx.fillStyle = ft.color;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 8;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }
    }
  }

  updateBossHud() {
    const heartsEl = document.getElementById('pb-hearts');
    const skillText = document.getElementById('pb-skill-text');

    if (heartsEl && this.boss) {
      let str = '';
      for (let i = 0; i < 3; i++) {
        str += (i < this.boss.hp) ? '❤️' : '🖤';
      }
      heartsEl.textContent = str;
    }

    if (skillText && this.boss) {
      if (this.boss.state === 'dizzy') {
        skillText.textContent = "💫 BOSS PUSING! DEKATI & SERANG SEKARANG!";
      } else if (this.boss.state === 'hurt') {
        skillText.textContent = "💥 SERANGAN TELAK! BOSS TERLUKA!";
      } else if (this.boss.state === 'defeated') {
        skillText.textContent = "🏆 BOSS KALAH! AMBIL KADO EMAS DI DEPANMU!";
      } else {
        const skills = [
          "☄️ METEOR BAYANGAN",
          "⚡ KILAT GELAP",
          "🌪️ BADAI TEBASAN PENCURI"
        ];
        const sName = skills[this.boss.round - 1] || skills[0];
        skillText.textContent = `SKILL: ${sName} (Hindari ${this.boss.shotsFired}/${this.boss.maxShots})`;
      }
    }
  }

  triggerBossQuestionAttack() {
    if (!this.boss || this.boss.state !== 'dizzy') return;

    // Play sword slash animation + sparks on player first!
    this.player.slashTimer = 25;
    this.player.facing = (this.boss.x >= this.player.x) ? 1 : -1;
    const bx = this.boss.x + this.boss.w / 2;
    const by = this.boss.y + this.boss.h / 2;
    this.spawnCrescentSlash(bx, by, -0.45, '#ffd359', 1.4);
    this.spawnParticleBurst(bx, by, 22, ['#ffd359', '#00ffff', '#ffffff'], 5.5);
    this.spawnShockwave(bx, by, '#ffd359', 70, 4);
    try { window.birthdayApp.audio.playSlash(); } catch(e){}
    this.render();

    const touchAttackBtn = document.getElementById('btn-touch-attack');
    if (touchAttackBtn) touchAttackBtn.classList.add('hidden');

    this.stop();

    const pbmModal = document.getElementById('platformer-boss-modal');
    const pbmBadge = document.getElementById('pbm-round-badge');
    const pbmHp = document.getElementById('pbm-boss-hp');
    const pbmQ = document.getElementById('pbm-question-text');
    const pbmGrid = document.getElementById('pbm-options-grid');

    const sData = STAGES_DATA[3];
    const qIdx = this.boss.round - 1;
    const qItem = sData.questions[qIdx] || sData.questions[0];

    if (pbmBadge) pbmBadge.textContent = `⚔️ SERANGAN CAHAYA (RONDE ${this.boss.round} / 3)`;
    if (pbmHp) pbmHp.textContent = `BOSS HP: ${'❤️'.repeat(this.boss.hp)}${'🖤'.repeat(3 - this.boss.hp)}`;
    if (pbmQ) pbmQ.textContent = qItem.q;

    if (pbmGrid) {
      pbmGrid.innerHTML = '';
      const badges = ['A', 'B', 'C', 'D'];
      qItem.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'pbm-opt-btn';
        btn.innerHTML = `<span class="opt-badge">${badges[idx]}</span> <span>${opt}</span>`;
        btn.addEventListener('click', () => {
          this.handleBossQuestionAnswer(idx);
        });
        pbmGrid.appendChild(btn);
      });
    }

    if (pbmModal) pbmModal.classList.remove('hidden');
  }

  handleBossQuestionAnswer(optIdx) {
    const pbmModal = document.getElementById('platformer-boss-modal');
    if (pbmModal) pbmModal.classList.add('hidden');

    const currentRound = this.boss.round;
    try {
      window.birthdayApp.audio.playUltimateSkillSFX(currentRound);
    } catch(e){}

    // Resume platformer and run 60fps Canvas Ultimate Skill Sequence!
    this.player.slashTimer = 65;
    this.boss.hp--;
    this.boss.state = 'hurt';
    this.boss.projectiles = [];
    this.canAttackBoss = false;

    const reactions = [
      "Ughhh!! Cahaya apa ini?! Kenapa tekadmu begitu kuat?!",
      "K-khhh... Tidak mungkin! Bagaimana bisa kalian begitu gigih merebut hadiah ini?!",
      "Aaaaaarrrghhh!! Aku kalah... Ambillah kembali hadiah berharga kalian!"
    ];
    this.boss.dialogue = reactions[currentRound - 1] || reactions[0];
    this.boss.dialogueTimer = 180;
    this.updateBossHud();

    // Start 60fps Canvas Ultimate Animation!
    this.startCanvasUltimateVfx(currentRound);
    this.start();

    const skillNames = [
      "✨ TEBASAN CAHAYA TEKAD! (OMNISLASH COMBO)",
      "🌟 BADAI CAHAYA PERSAHABATAN! (STARLIGHT STORM)",
      "💫 SINAR MAHA DAHSYAT PENAKLUK KEGELAPAN! (SOLAR BEAM)"
    ];
    const sBanner = skillNames[currentRound - 1] || skillNames[0];
    window.birthdayApp.triggerSkillAnimation(sBanner, () => {});

    setTimeout(() => {
      if (!this.boss) return;
      this.boss.shakeOffset = 0;
      if (this.boss.hp > 0) {
        // Boss leaps back up for the next round!
        this.boss.round++;
        this.boss.state = 'shooting';
        this.boss.shotsFired = 0;
        this.boss.shootTimer = 15;
        this.boss.y = this.boss.baseY;
        this.boss.dialogue = "Jangan senang dulu! Rasakan jurusku berikutnya!";
        this.boss.dialogueTimer = 120;
        this.updateBossHud();
      } else {
        // Boss Defeated! Spawn Golden Chest on the ground with golden burst!
        this.boss.state = 'defeated';
        this.chestEntity = { x: this.boss.x, y: 334, collected: false };
        this.spawnParticleBurst(this.boss.x + 24, 345, 45, ['#ffd359', '#ffffff', '#00ffff'], 7);
        this.spawnShockwave(this.boss.x + 24, 345, '#ffd359', 140, 6);
        this.updateBossHud();
        try { window.birthdayApp.audio.playVictory(); } catch(e){}
        window.birthdayApp.confetti.start(60);
        setTimeout(() => window.birthdayApp.confetti.stop(), 2500);
      }
    }, 2200);
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.translate(-this.cameraX, 0);

    const sData = STAGES_DATA[this.currentStageIndex] || STAGES_DATA[0];
    this.drawAtmosphericSky(sData.skyTheme);

    this.platforms.forEach(p => {
      if (p.type === 'ground') {
        if (sData.skyTheme === 'day') {
          this.ctx.fillStyle = '#2ecc71';
          this.ctx.fillRect(p.x, p.y, p.w, 14);
          this.ctx.fillStyle = '#27ae60';
          this.ctx.fillRect(p.x, p.y + 14, p.w, p.h - 14);
          this.ctx.fillStyle = '#5c3d1e';
          this.ctx.fillRect(p.x, p.y + 24, p.w, p.h - 24);
        } else if (sData.skyTheme === 'sunset') {
          this.ctx.fillStyle = '#e67e22';
          this.ctx.fillRect(p.x, p.y, p.w, 14);
          this.ctx.fillStyle = '#d35400';
          this.ctx.fillRect(p.x, p.y + 14, p.w, p.h - 14);
          this.ctx.fillStyle = '#4a2810';
          this.ctx.fillRect(p.x, p.y + 24, p.w, p.h - 24);
        } else if (sData.skyTheme === 'night') {
          this.ctx.fillStyle = '#9b59b6';
          this.ctx.fillRect(p.x, p.y, p.w, 14);
          this.ctx.fillStyle = '#8e44ad';
          this.ctx.fillRect(p.x, p.y + 14, p.w, p.h - 14);
          this.ctx.fillStyle = '#2c1e4a';
          this.ctx.fillRect(p.x, p.y + 24, p.w, p.h - 24);
        } else {
          this.ctx.fillStyle = '#c0392b';
          this.ctx.fillRect(p.x, p.y, p.w, 14);
          this.ctx.fillStyle = '#2c0b0e';
          this.ctx.fillRect(p.x, p.y + 14, p.w, p.h - 14);
          this.ctx.fillStyle = '#150507';
          this.ctx.fillRect(p.x, p.y + 24, p.w, p.h - 24);
        }
      } else {
        this.ctx.fillStyle = (sData.skyTheme === 'midnight') ? '#4a154b' : (sData.skyTheme === 'night') ? '#34495e' : '#e67e22';
        this.ctx.fillRect(p.x, p.y, p.w, p.h);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(p.x, p.y, p.w, p.h);
      }
    });

    this.coins.forEach(c => {
      if (!c.collected) {
        this.ctx.save();
        this.ctx.fillStyle = '#f1c40f';
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#f39c12';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 9px monospace';
        this.ctx.fillText('★', c.x - 4, c.y + 3);
        this.ctx.restore();
      }
    });

    if (this.enemyTarget) {
      this.drawEnemySprite(this.enemyTarget.x, this.enemyTarget.y, this.currentStageIndex);
    }

    // Draw In-World Boss (Shadow Lord) in Stage 4
    if (this.isBossStage && this.boss && this.boss.state !== 'defeated') {
      this.drawInWorldBoss();
    }

    // Draw Dropped Golden Chest
    if (this.chestEntity && !this.chestEntity.collected) {
      this.drawGoldenChestEntity(this.chestEntity.x, this.chestEntity.y);
    }

    this.drawHijabGirlSprite(this.player.x, this.player.y, this.player.facing);

    // Draw 60fps In-Canvas VFX (Omnislash, Starlight Storm, Solar Laser Beam, Shockwaves, Particles, Combo Text!)
    if (this.isBossStage) {
      this.drawCanvasVfx(this.ctx);
    }

    this.ctx.restore();
  }

  drawAtmosphericSky(theme) {
    const sky = this.ctx.createLinearGradient(0, 0, 0, this.height);

    if (theme === 'day') {
      sky.addColorStop(0, '#2980b9');
      sky.addColorStop(1, '#6dd5fa');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(this.cameraX, 0, this.width, this.height);

      this.ctx.fillStyle = 'rgba(255,255,255,0.75)';
      for (let i = 0; i < 12; i++) {
        const cx = (i * 240) - (this.cameraX * 0.2);
        this.ctx.fillRect(cx, 40 + (i % 3) * 22, 70, 22);
        this.ctx.fillRect(cx + 10, 30 + (i % 3) * 22, 50, 32);
      }
      this.ctx.fillStyle = '#16a085';
      for (let j = 0; j < 10; j++) {
        const hx = (j * 300) - (this.cameraX * 0.5);
        this.ctx.beginPath();
        this.ctx.arc(hx, 380, 100, Math.PI, 0);
        this.ctx.fill();
      }
    } else if (theme === 'sunset') {
      sky.addColorStop(0, '#d35400');
      sky.addColorStop(0.5, '#e67e22');
      sky.addColorStop(1, '#f39c12');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(this.cameraX, 0, this.width, this.height);

      this.ctx.fillStyle = '#f1c40f';
      this.ctx.beginPath();
      this.ctx.arc(this.cameraX + 650, 140, 50, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#783816';
      for (let j = 0; j < 10; j++) {
        const hx = (j * 300) - (this.cameraX * 0.5);
        this.ctx.beginPath();
        this.ctx.arc(hx, 380, 110, Math.PI, 0);
        this.ctx.fill();
      }
    } else if (theme === 'night') {
      sky.addColorStop(0, '#0c071e');
      sky.addColorStop(0.6, '#1e103c');
      sky.addColorStop(1, '#3b1c6e');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(this.cameraX, 0, this.width, this.height);

      this.ctx.fillStyle = '#ffffff';
      for (let s = 0; s < 30; s++) {
        const sx = (s * 90) % 2400;
        const sy = (s * 37) % 200;
        this.ctx.fillRect(sx, sy, 3, 3);
      }
      this.ctx.fillStyle = '#f5b041';
      this.ctx.beginPath();
      this.ctx.arc(this.cameraX + 700, 80, 30, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = '#0c071e';
      this.ctx.beginPath();
      this.ctx.arc(this.cameraX + 690, 75, 26, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#1a1033';
      for (let j = 0; j < 10; j++) {
        const hx = (j * 300) - (this.cameraX * 0.5);
        this.ctx.beginPath();
        this.ctx.arc(hx, 380, 100, Math.PI, 0);
        this.ctx.fill();
      }
    } else {
      sky.addColorStop(0, '#09000a');
      sky.addColorStop(0.5, '#2b001a');
      sky.addColorStop(1, '#52001e');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(this.cameraX, 0, this.width, this.height);

      this.ctx.fillStyle = '#e74c3c';
      this.ctx.beginPath();
      this.ctx.arc(this.cameraX + 680, 100, 42, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#15000e';
      for (let p = 0; p < 8; p++) {
        const px = (p * 320) - (this.cameraX * 0.4);
        this.ctx.fillRect(px, 120, 40, 260);
        this.ctx.fillRect(px - 10, 100, 60, 20);
      }
    }
  }

  drawHijabGirlSprite(x, y, facing) {
    const now = Date.now();
    const isMoving = Math.abs(this.player.vx) > 0.4;
    const isAir = !this.player.isGrounded;
    const runCycle = isMoving ? Math.sin(now / 75) : 0;
    const idleBob = (!isMoving && !isAir) ? Math.sin(now / 320) * 1.6 : 0;
    const isBlinking = (now % 3400) < 130;

    this.ctx.save();
    this.ctx.translate(x + this.player.w / 2, y + this.player.h / 2 + idleBob);
    if (facing === -1) this.ctx.scale(-1, 1);

    // Slight dynamic tilt when running or jumping
    if (isAir) {
      this.ctx.rotate(this.player.vy < 0 ? -0.08 : 0.08);
    } else if (isMoving) {
      this.ctx.rotate(0.06 + runCycle * 0.04);
    }

    // Running dust puff behind feet
    if (isMoving && !isAir && Math.abs(runCycle) > 0.7) {
      this.ctx.fillStyle = 'rgba(255,255,255,0.45)';
      this.ctx.beginPath();
      this.ctx.arc(-14, 24, 3 + Math.random() * 2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Animated White Shoes (swinging when running, tucked when jumping)
    const leftLegY = isAir ? 19 : (23 + runCycle * 3.5);
    const rightLegY = isAir ? 21 : (23 - runCycle * 3.5);
    const leftLegX = isAir ? -10 : (-9 + runCycle * 3);
    const rightLegX = isAir ? 3 : (2 - runCycle * 3);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(leftLegX, leftLegY, 7, 4);
    this.ctx.fillRect(rightLegX, rightLegY, 7, 4);

    // Cream Pleated Skirt (flutters slightly when running/jumping)
    const skirtSway = isAir ? 2 : (runCycle * 1.5);
    this.ctx.fillStyle = '#e8dcc5';
    this.ctx.fillRect(-12 - Math.abs(skirtSway)*0.5, 11, 24 + Math.abs(skirtSway), 12);
    this.ctx.fillStyle = '#d8c8ae';
    this.ctx.fillRect(-7, 11, 2, 12);
    this.ctx.fillRect(0, 11, 2, 12);
    this.ctx.fillRect(6, 11, 2, 12);

    // Pink Blouse & Black Crossbody
    this.ctx.fillStyle = '#f5b7c6';
    this.ctx.fillRect(-11, -3, 22, 15);
    this.ctx.strokeStyle = '#2c2c2c';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath(); this.ctx.moveTo(-7, -3); this.ctx.lineTo(7, 11); this.ctx.stroke();
    this.ctx.fillStyle = '#2c2c2c';
    this.ctx.fillRect(4, 9, 7, 6);

    // Face & Round Glasses + Blinking Eyes
    this.ctx.fillStyle = '#ffdbac';
    this.ctx.fillRect(-7, -18, 14, 11);
    this.ctx.strokeStyle = '#5c4033';
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeRect(-6, -15, 5, 5);
    this.ctx.strokeRect(1, -15, 5, 5);
    this.ctx.fillStyle = '#3a2218';
    if (isBlinking) {
      this.ctx.fillRect(-5, -13, 3, 1);
      this.ctx.fillRect(2, -13, 3, 1);
    } else {
      this.ctx.fillRect(-4, -13, 2, 2);
      this.ctx.fillRect(3, -13, 2, 2);
    }

    // Pink Pastel Hijab + Fluttering Hijab Tail
    this.ctx.fillStyle = '#f2b5c4';
    this.ctx.fillRect(-10, -24, 20, 8);
    this.ctx.fillStyle = '#e89eb0';
    this.ctx.fillRect(-11 - (isMoving ? 2 : 0), -18, 4, 16);
    this.ctx.fillRect(7, -18, 4, 16);

    // Golden Sword (bobs with run/jump, swings on slash!)
    if (this.player.slashTimer > 0) {
      this.ctx.save();
      this.ctx.rotate(0.65);
      this.ctx.fillStyle = '#f1c40f';
      this.ctx.fillRect(12, -16, 6, 24);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(10, 0, 28, -Math.PI / 2.2, Math.PI / 2.2);
      this.ctx.stroke();
      this.ctx.restore();
    } else {
      const swordBob = isAir ? -3 : runCycle * 2;
      this.ctx.fillStyle = '#f1c40f';
      this.ctx.fillRect(10, -8 + swordBob, 4, 16);
      this.ctx.fillStyle = '#e74c3c';
      this.ctx.fillRect(9, 6 + swordBob, 6, 3);
    }

    this.ctx.restore();
  }

  drawEnemySprite(x, y, stageIdx) {
    const bob = Math.sin(Date.now() / 240) * 5;
    this.ctx.save();
    this.ctx.translate(x, y + bob);

    // Glowing dark aura
    this.ctx.fillStyle = 'rgba(142, 68, 173, 0.28)';
    this.ctx.beginPath();
    this.ctx.arc(30, 34, 38, 0, Math.PI * 2);
    this.ctx.fill();

    if (stageIdx === 0) {
      // SHADOW SLIME (V14)
      this.ctx.fillStyle = '#5f27cd';
      this.ctx.beginPath();
      this.ctx.arc(30, 44, 26, Math.PI, 0);
      this.ctx.lineTo(56, 56);
      this.ctx.lineTo(4, 56);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = '#d6a2e8';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.fillStyle = '#341f97';
      this.ctx.beginPath();
      this.ctx.moveTo(16, 20); this.ctx.lineTo(22, 6); this.ctx.lineTo(30, 18);
      this.ctx.lineTo(38, 6); this.ctx.lineTo(44, 20);
      this.ctx.fill();
      this.ctx.fillStyle = '#ff0055';
      this.ctx.fillRect(16, 34, 9, 6);
      this.ctx.fillRect(35, 34, 9, 6);
      this.ctx.fillStyle = '#ffd359';
      this.ctx.fillRect(19, 36, 3, 3);
      this.ctx.fillRect(38, 36, 3, 3);
    } else if (stageIdx === 1) {
      // SHADOW FAIRY (V14)
      const flap = Math.sin(Date.now() / 120) * 6;
      this.ctx.fillStyle = '#e056fd';
      this.ctx.beginPath(); this.ctx.ellipse(8, 28 + flap, 18, 12, -0.4, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.beginPath(); this.ctx.ellipse(52, 28 + flap, 18, 12, 0.4, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.fillStyle = '#2c0b4e';
      this.ctx.fillRect(18, 24, 24, 34);
      this.ctx.fillStyle = '#f5e6e8';
      this.ctx.beginPath(); this.ctx.arc(30, 16, 11, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.fillStyle = '#ffd359';
      this.ctx.fillRect(24, 2, 12, 4);
      this.ctx.fillRect(25, 14, 4, 3);
      this.ctx.fillRect(32, 14, 4, 3);
    } else {
      // SHADOW KNIGHT (V14)
      this.ctx.fillStyle = '#4a154b';
      this.ctx.fillRect(8, 18, 44, 44);
      this.ctx.fillStyle = '#2f3542';
      this.ctx.fillRect(14, 14, 32, 46);
      this.ctx.strokeStyle = '#a4b0be';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(14, 14, 32, 46);
      this.ctx.fillStyle = '#a4b0be';
      this.ctx.beginPath(); this.ctx.moveTo(14, 14); this.ctx.lineTo(4, 0); this.ctx.lineTo(20, 10); this.ctx.fill();
      this.ctx.beginPath(); this.ctx.moveTo(46, 14); this.ctx.lineTo(56, 0); this.ctx.lineTo(40, 10); this.ctx.fill();
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(18, 22, 24, 7);
      this.ctx.fillStyle = '#ff0055';
      this.ctx.fillRect(20, 24, 8, 3);
      this.ctx.fillRect(32, 24, 8, 3);
      this.ctx.fillStyle = '#747d8c';
      this.ctx.fillRect(48, 4, 6, 48);
      this.ctx.fillStyle = '#ff0055';
      this.ctx.fillRect(50, 8, 2, 36);
    }

    this.ctx.fillStyle = '#ffd359';
    this.ctx.font = 'bold 14px monospace';
    this.ctx.fillText('⚔️', 22, -6);
    this.ctx.restore();
  }

  drawInWorldBoss() {
    const b = this.boss;
    if (!b) return;
    const px = 4.5; // 16x16 pixel grid scaled to 72x72px matching Prologue Thief!
    this.ctx.save();
    if (b.shakeOffset) {
      this.ctx.translate(b.shakeOffset, (Math.random() - 0.5) * 6);
    }

    // Dark violet-magenta Boss aura
    this.ctx.fillStyle = (b.state === 'dizzy') ? 'rgba(241, 196, 15, 0.28)' : 'rgba(155, 40, 220, 0.32)';
    this.ctx.beginPath();
    this.ctx.arc(b.x + 36, b.y + 42, 48, 0, Math.PI * 2);
    this.ctx.fill();

    // EXACT PROLOGUE PIXEL THIEF SPRITE (16x16 grid * 4.5 = 72x72)
    const ox = b.x;
    const oy = b.y + 8;
    const hurt = (b.state === 'hurt');

    // Dark Shadow Hood
    this.ctx.fillStyle = hurt ? '#c0392b' : '#1a0b2e';
    this.ctx.fillRect(ox + 4*px, oy + 0*px, 8*px, 3*px);
    this.ctx.fillStyle = hurt ? '#e74c3c' : '#2c164a';
    this.ctx.fillRect(ox + 3*px, oy + 2*px, 10*px, 5*px);
    // Deep Shadow Face Inside Hood
    this.ctx.fillStyle = '#07020e';
    this.ctx.fillRect(ox + 5*px, oy + 3*px, 6*px, 4*px);
    // Glowing Magenta Eyes (Yellow when dizzy, White when hurt)
    this.ctx.fillStyle = (b.state === 'dizzy') ? '#ffd359' : hurt ? '#ffffff' : '#ff0066';
    this.ctx.fillRect(ox + 5.5*px, oy + 4.5*px, 2*px, 1.3*px);
    this.ctx.fillRect(ox + 8.5*px, oy + 4.5*px, 2*px, 1.3*px);
    // Cloak Shoulders & Inner Robe
    this.ctx.fillStyle = hurt ? '#c0392b' : '#1e0f36';
    this.ctx.fillRect(ox + 2*px, oy + 7*px, 12*px, 6*px);
    this.ctx.fillStyle = hurt ? '#a93226' : '#120621';
    this.ctx.fillRect(ox + 4*px, oy + 7*px, 8*px, 7*px);
    // Golden Clasp
    this.ctx.fillStyle = '#ffd359';
    this.ctx.fillRect(ox + 7*px, oy + 7.5*px, 2*px, 1.5*px);
    // Flowing Purple Cape Edges (animated wave!)
    const capeWave = Math.sin(Date.now() / 180) * 2;
    this.ctx.fillStyle = '#4a154b';
    this.ctx.fillRect(ox + 1*px - capeWave, oy + 9*px, 2*px, 5*px);
    this.ctx.fillRect(ox + 13*px + capeWave, oy + 9*px, 2*px, 5*px);
    // Boots
    this.ctx.fillStyle = '#0d0517';
    this.ctx.fillRect(ox + 4*px, oy + 14*px, 3*px, 2*px);
    this.ctx.fillRect(ox + 9*px, oy + 14*px, 3*px, 2*px);

    // Stolen Golden Chest held by Boss while floating
    if (b.state === 'waiting' || b.state === 'shooting') {
      this.ctx.fillStyle = '#d35400';
      this.ctx.fillRect(b.x - 16, b.y + 38, 22, 16);
      this.ctx.fillStyle = '#f1c40f';
      this.ctx.fillRect(b.x - 8, b.y + 38, 6, 16);
    }

    // Mini HP Bar above Boss
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this.ctx.fillRect(b.x - 6, b.y - 22, 84, 14);
    for (let i = 0; i < 3; i++) {
      this.ctx.fillStyle = (i < b.hp) ? '#e74c3c' : '#555';
      this.ctx.fillRect(b.x - 2 + i * 26, b.y - 19, 22, 8);
    }

    // Dizzy stars & prompt
    if (b.state === 'dizzy') {
      const starOffset = Math.sin(Date.now() / 150) * 6;
      this.ctx.font = 'bold 20px sans-serif';
      this.ctx.fillText('💫', b.x + 4 + starOffset, b.y - 28);
      this.ctx.fillText('💫', b.x + 40 - starOffset, b.y - 28);

      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
      this.ctx.strokeStyle = '#f1c40f';
      this.ctx.lineWidth = 2;
      const boxX = b.x - 85, boxY = b.y - 72;
      this.ctx.fillRect(boxX, boxY, 240, 32);
      this.ctx.strokeRect(boxX, boxY, 240, 32);
      this.ctx.fillStyle = '#ffd359';
      this.ctx.font = 'bold 11px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.canAttackBoss ? '⚔️ KLIK / TEKAN SPASI UNTUK SERANG!' : '💫 BOSS PUSING! DEKATI BOSS SEKARANG!', b.x + 35, boxY + 20);
      this.ctx.textAlign = 'left';
    } else if (b.dialogueTimer > 0 && b.dialogue) {
      this.ctx.fillStyle = 'rgba(20, 10, 35, 0.9)';
      this.ctx.strokeStyle = '#e056fd';
      this.ctx.lineWidth = 2;
      const boxX = b.x - 95, boxY = b.y - 64;
      this.ctx.fillRect(boxX, boxY, 255, 30);
      this.ctx.strokeRect(boxX, boxY, 255, 30);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(b.dialogue.slice(0, 38), b.x + 32, boxY + 19);
      this.ctx.textAlign = 'left';
    }

    // Draw Boss Projectiles
    for (let p of b.projectiles) {
      this.ctx.save();
      this.ctx.fillStyle = '#8e44ad';
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.fillStyle = '#ff0055';
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.fillStyle = '#f1c40f';
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  drawGoldenChestEntity(x, y) {
    const bob = Math.sin(Date.now() / 220) * 4;
    const cy = y + bob;
    this.ctx.save();
    // Glowing golden-pink aura
    this.ctx.fillStyle = 'rgba(255, 211, 89, 0.38)';
    this.ctx.beginPath(); this.ctx.arc(x + 24, cy + 20, 38, 0, Math.PI * 2); this.ctx.fill();
    // Ribbon Bow on Top
    this.ctx.fillStyle = '#ff3b6b';
    this.ctx.fillRect(x + 12, cy - 2, 10, 7);
    this.ctx.fillRect(x + 26, cy - 2, 10, 7);
    this.ctx.fillStyle = '#ff6b8b';
    this.ctx.fillRect(x + 20, cy, 8, 6);
    // Chest Lid & Body
    this.ctx.fillStyle = '#ffd359'; this.ctx.fillRect(x, cy + 5, 48, 12);
    this.ctx.fillStyle = '#e67e22'; this.ctx.fillRect(x + 2, cy + 17, 44, 24);
    this.ctx.fillStyle = '#f39c12'; this.ctx.fillRect(x + 5, cy + 19, 38, 19);
    // Vertical Red Ribbon & Golden Star Clasp
    this.ctx.fillStyle = '#ff3b6b'; this.ctx.fillRect(x + 19, cy + 5, 10, 36);
    this.ctx.fillStyle = '#ffd359'; this.ctx.fillRect(x + 17, cy + 14, 14, 10);
    this.ctx.fillStyle = '#ffffff'; this.ctx.fillRect(x + 22, cy + 17, 4, 4);
    // Outline
    this.ctx.strokeStyle = '#5c2d06'; this.ctx.lineWidth = 2; this.ctx.strokeRect(x + 2, cy + 5, 44, 36);
    // Floating Prompt
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'; this.ctx.fillRect(x - 75, cy - 32, 198, 24);
    this.ctx.fillStyle = '#ffd359'; this.ctx.font = 'bold 11px monospace'; this.ctx.textAlign = 'center';
    this.ctx.fillText('🎁 AMBIL HADIAH EMAS! 🎁', x + 24, cy - 16);
    this.ctx.textAlign = 'left';
    this.ctx.restore();
  }
}

// --- 5. MAIN GAME APPLICATION CONTROLLER ---
class BirthdayGameApp {
  constructor() {
    this.audio = new RetroAudioSynthesizer();
    this.confetti = new ConfettiRain('confetti-canvas');
    this.platformer = new PlatformerEngine('platformer-canvas', (stg) => this.handleEncounterTrigger(stg));

    this.currentScene = 'scene-title';
    this.currentStage = 0;
    this.stageQuestionIdx = 0;
    this.prologueStep = 0;
    this.candlesBlownOut = false;

    this.boothStream = null;
    this.activeTemplate = 1;
    this.activeFilter = 'normal';
    this.isCameraFlipped = false;

    // Load actual 2D anime face portraits for Photobooth Template 2
    this.imgHeroFace = new Image();
    this.imgHeroFace.src = "assets/hero_girl_face.png";
    this.imgFriendFace = new Image();
    this.imgFriendFace.src = "assets/friend_boy_face.png";

    this.cacheDom();
    this.bindEvents();
  }

  cacheDom() {
    this.btnAudio = document.getElementById('btn-audio');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.gameAppContainer = document.getElementById('game-app');

    this.scenes = {
      title: document.getElementById('scene-title'),
      prologue: document.getElementById('scene-prologue'),
      platformer: document.getElementById('scene-platformer'),
      encounter: document.getElementById('scene-encounter'),
      giftReveal: document.getElementById('scene-gift-reveal'),
      menuHub: document.getElementById('scene-menu-hub'),
      subCandle: document.getElementById('scene-sub-candle'),
      subLetter: document.getElementById('scene-sub-letter'),
      subPhoto: document.getElementById('scene-sub-photo')
    };

    this.victoryModal = document.getElementById('victory-modal');
    this.modalVictoryTitle = document.getElementById('modal-victory-title');
    this.modalVictoryDesc = document.getElementById('modal-victory-desc');
    this.btnModalContinue = document.getElementById('btn-modal-continue');

    this.btnPlayGame = document.getElementById('btn-play-game');

    this.prologueFriend = document.getElementById('prologue-friend');
    this.prologueHero = document.getElementById('prologue-hero');
    this.prologueChest = document.getElementById('prologue-chest');
    this.prologueThief = document.getElementById('prologue-thief');

    this.dialogueBustLeft = document.getElementById('dialogue-bust-left');
    this.dialogueBustRight = document.getElementById('dialogue-bust-right');
    this.vnSpeakerName = document.getElementById('vn-speaker-name');
    this.vnDialogueText = document.getElementById('vn-dialogue-text');
    this.btnVnNext = document.getElementById('btn-vn-next');

    // Standard Encounter Elements
    this.standardEncounterOverlay = document.getElementById('standard-encounter-overlay');
    this.encounterEnemyName = document.getElementById('encounter-enemy-name');
    this.encounterEnemyBust = document.getElementById('encounter-enemy-bust');
    this.enemyTauntText = document.getElementById('enemy-taunt-text');
    this.eqProgressBadge = document.getElementById('eq-progress-badge');
    this.eqStageName = document.getElementById('eq-stage-name');
    this.eqQuestionText = document.getElementById('eq-question-text');
    this.eqOptionsGrid = document.getElementById('eq-options-grid');
    this.skillVfxContainer = document.getElementById('skill-vfx-container');
    this.skillNameBanner = document.getElementById('skill-name-banner');

    // Dedicated Boss Battle Elements
    this.bossBattleOverlay = document.getElementById('boss-battle-overlay');
    this.bhearts = [
      document.getElementById('bheart-1'),
      document.getElementById('bheart-2'),
      document.getElementById('bheart-3')
    ];
    this.bossSkillBanner = document.getElementById('boss-skill-banner');
    this.skillBannerText = document.getElementById('skill-banner-text');
    this.arenaPlayer = document.getElementById('arena-player');
    this.playerDodgeBadge = document.getElementById('player-dodge-badge');
    this.arenaBoss = document.getElementById('arena-boss');
    this.bossDizzyStars = document.getElementById('boss-dizzy-stars');
    this.dodgeCountDisplay = document.getElementById('dodge-count-display');
    this.bossDodgeControls = document.getElementById('boss-dodge-controls');
    this.btnDodgeLeft = document.getElementById('btn-dodge-left');
    this.btnDodgeJump = document.getElementById('btn-dodge-jump');
    this.btnDodgeRight = document.getElementById('btn-dodge-right');
    this.bossExhaustedPanel = document.getElementById('boss-exhausted-panel');
    this.btnAttackBoss = document.getElementById('btn-attack-boss');
    this.bossSpeechBubble = document.getElementById('boss-speech-bubble');
    this.bossBubbleDialogue = document.getElementById('boss-bubble-dialogue');
    this.bossDefeatModal = document.getElementById('boss-defeat-modal');
    this.defeatDialogueLine = document.getElementById('defeat-dialogue-line');
    this.btnClaimChest = document.getElementById('btn-claim-chest');

    this.bossHp = 3;
    this.playerLane = 1; // 0: left, 1: center, 2: right
    this.isPlayerJumping = false;
    this.dodgeWave = 0;
    this.isDodgeActive = false;
    this.dodgeTimer = null;

    // Gift & Celebration Elements
    this.chestWrapper = document.getElementById('interactive-chest-box');
    this.chestSprite = document.getElementById('chest-sprite');
    this.btnOpenChestNow = document.getElementById('btn-open-chest-now');
    this.emergedCakeBox = document.getElementById('emerged-cake-box');
    this.btnGotoMenuHub = document.getElementById('btn-goto-menu-hub');
    this.audio1000xTrack = document.getElementById('audio-1000x-track');
    this.btnReplaySong = document.getElementById('btn-replay-song');

    // Retro Music Box Elements
    this.retroMusicbox = document.getElementById('retro-musicbox-widget');
    this.vinylDisc = document.getElementById('vinyl-disc');
    this.tonearmMech = document.getElementById('tonearm-mech');
    this.musicboxStatusDot = document.getElementById('musicbox-status-dot');
    this.musicboxStatusText = document.getElementById('musicbox-status-text');
    this.pixelEqualizer = document.getElementById('pixel-equalizer');
    this.musicboxTimeCurrent = document.getElementById('musicbox-time-current');
    this.musicboxTimeDuration = document.getElementById('musicbox-time-duration');
    this.musicboxProgressTrack = document.getElementById('musicbox-progress-track');
    this.musicboxProgressFill = document.getElementById('musicbox-progress-fill');
    this.btnMusicboxToggle = document.getElementById('btn-musicbox-toggle');
    this.musicboxBtnIcon = document.getElementById('musicbox-btn-icon');
    this.musicboxBtnLabel = document.getElementById('musicbox-btn-label');
    this.btnMusicboxReplay = document.getElementById('btn-musicbox-replay');
    this.turntableArea = document.getElementById('turntable-interactive-area');
    this.btnHeaderMusicbox = document.getElementById('btn-header-musicbox');
    this.headerDiscIcon = document.getElementById('header-disc-icon');
    this.headerMusicTitle = document.getElementById('header-music-title');
    this.is1000xPlaying = false;
    this.hasAutoStartedMusic = false;

    // Hub Cards & Sub-scenes
    this.cardOptionCandle = document.getElementById('card-option-candle');
    this.cardOptionLetter = document.getElementById('card-option-letter');
    this.cardOptionPhoto = document.getElementById('card-option-photo');
    this.backToHubBtns = document.querySelectorAll('.btn-back-to-hub');

    this.btnBlowSubCandle = document.getElementById('btn-blow-sub-candle');
    this.windGustOverlay = document.getElementById('wind-gust-overlay');
    this.candleFlames = document.querySelectorAll('.candle-flame');
    this.candleSmokes = document.querySelectorAll('.candle-smoke');
    this.candleStatusHeading = document.getElementById('candle-status-heading');
    this.candleStatusSub = document.getElementById('candle-status-sub');

    // Photobooth Elements
    this.boothVideo = document.getElementById('booth-video');
    this.templateOverlayLayer = document.getElementById('template-overlay-layer');
    this.btnSnapBooth = document.getElementById('btn-snap-booth');
    this.boothCountdown = document.getElementById('booth-countdown');
    this.boothFlash = document.getElementById('booth-flash');
    this.templateChoices = document.querySelectorAll('.template-choice');
    this.filterPillBtns = document.querySelectorAll('.filter-pills .pill-btn');
    this.btnToggleCamFlip = document.getElementById('btn-toggle-cam-flip');
    this.boothResultBox = document.getElementById('booth-result-box');
    this.boothFinalCanvas = document.getElementById('booth-final-canvas');
    this.btnDownloadBoothPng = document.getElementById('btn-download-booth-png');
    this.btnRetakeBooth = document.getElementById('btn-retake-booth');

    // STRICT INITIAL STATE: hide all boss battle modals & overlays
    if (this.bossDefeatModal) this.bossDefeatModal.classList.add('hidden');
    if (this.bossBattleOverlay) this.bossBattleOverlay.classList.add('hidden');
    if (this.bossExhaustedPanel) this.bossExhaustedPanel.classList.add('hidden');
    if (this.bossSpeechBubble) this.bossSpeechBubble.classList.add('hidden');
    if (this.standardEncounterOverlay) this.standardEncounterOverlay.classList.remove('hidden');
  }

  bindEvents() {
    this.btnAudio.addEventListener('click', () => {
      this.audio.init();
      const isPlay = this.audio.toggleMute();
      this.btnAudio.innerHTML = isPlay ? `<span>🔊</span> BGM: ON` : `<span>🔇</span> BGM: OFF`;
    });

    this.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(()=>{});
      } else {
        document.exitFullscreen().catch(()=>{});
      }
    });

    this.btnPlayGame.addEventListener('click', () => {
      try {
        this.audio.init();
        this.audio.playSelect();
        this.audio.startBGM();
      } catch(e) {}
      this.switchScene('prologue');
      this.startPrologue();
    });

    this.btnVnNext.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.advancePrologue();
    });

    this.btnModalContinue.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.victoryModal.classList.add('hidden');
      if (this.currentStage < STAGES_DATA.length - 1) {
        this.startPlatformerStage(this.currentStage + 1);
      } else {
        this.switchScene('giftReveal');
      }
    });

    this.btnOpenChestNow.addEventListener('click', () => this.handleOpenChestAnimation());
    this.chestSprite.addEventListener('click', () => this.handleOpenChestAnimation());

    if (this.btnReplaySong) {
      this.btnReplaySong.addEventListener('click', () => {
        this.replay1000XMusic();
      });
    }

    // Retro Music Box Event Bindings
    if (this.btnMusicboxToggle) {
      this.btnMusicboxToggle.addEventListener('click', () => {
        this.toggle1000XMusic();
      });
    }

    if (this.turntableArea) {
      this.turntableArea.addEventListener('click', () => {
        this.toggle1000XMusic();
      });
    }

    if (this.btnMusicboxReplay) {
      this.btnMusicboxReplay.addEventListener('click', () => {
        this.replay1000XMusic();
      });
    }

    if (this.btnHeaderMusicbox) {
      this.btnHeaderMusicbox.addEventListener('click', () => {
        this.toggle1000XMusic();
      });
    }

    if (this.musicboxProgressTrack) {
      this.musicboxProgressTrack.addEventListener('click', (e) => {
        const rect = this.musicboxProgressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        if (this.audio1000xTrack && this.audio1000xTrack.duration) {
          this.audio1000xTrack.currentTime = pct * this.audio1000xTrack.duration;
        }
      });
    }

    if (this.audio1000xTrack) {
      this.audio1000xTrack.addEventListener('timeupdate', () => {
        const cur = this.audio1000xTrack.currentTime || 0;
        const dur = this.audio1000xTrack.duration || 0;
        if (this.musicboxTimeCurrent) {
          const m = Math.floor(cur / 60);
          const s = Math.floor(cur % 60);
          this.musicboxTimeCurrent.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        if (this.musicboxProgressFill && dur > 0) {
          const pct = (cur / dur) * 100;
          this.musicboxProgressFill.style.width = `${pct}%`;
        }
      });

      this.audio1000xTrack.addEventListener('loadedmetadata', () => {
        const dur = this.audio1000xTrack.duration || 0;
        if (this.musicboxTimeDuration && dur > 0) {
          const m = Math.floor(dur / 60);
          const s = Math.floor(dur % 60);
          this.musicboxTimeDuration.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
      });

      this.audio1000xTrack.addEventListener('ended', () => {
        // Loop back smoothly
        this.audio1000xTrack.currentTime = 0;
        this.audio1000xTrack.play().catch(() => {});
      });

      this.audio1000xTrack.addEventListener('play', () => {
        this.updateMusicboxUI(true);
      });

      this.audio1000xTrack.addEventListener('pause', () => {
        this.updateMusicboxUI(false);
      });
    }

    this.btnGotoMenuHub.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.switchScene('menuHub');
    });

    this.cardOptionCandle.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.switchScene('subCandle');
    });

    this.cardOptionLetter.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.switchScene('subLetter');
    });

    this.cardOptionPhoto.addEventListener('click', () => {
      try { this.audio.playSelect(); } catch(e){}
      this.switchScene('subPhoto');
      this.initBoothCamera();
    });

    this.backToHubBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        try { this.audio.playSelect(); } catch(e){}
        this.stopBoothCamera();
        this.switchScene('menuHub');
      });
    });

    this.btnBlowSubCandle.addEventListener('click', () => this.handleBlowMultiCandles());

    this.templateChoices.forEach(choice => {
      choice.addEventListener('click', (e) => {
        this.templateChoices.forEach(c => c.classList.remove('active'));
        const el = e.currentTarget;
        el.classList.add('active');
        this.activeTemplate = parseInt(el.dataset.tpl);
        this.templateOverlayLayer.className = `template-overlay-layer template-${this.activeTemplate}-active`;
        try { this.audio.playBleep(); } catch(e){}
      });
    });

    this.filterPillBtns.forEach(pill => {
      if (pill.id === 'btn-toggle-cam-flip') return;
      pill.addEventListener('click', (e) => {
        this.filterPillBtns.forEach(p => {
          if (p.id !== 'btn-toggle-cam-flip') p.classList.remove('active');
        });
        e.target.classList.add('active');
        this.activeFilter = e.target.dataset.filter;
        this.boothVideo.className = `filter-${this.activeFilter} ${this.isCameraFlipped ? 'video-flipped' : ''}`;
        try { this.audio.playBleep(); } catch(e){}
      });
    });

    this.btnToggleCamFlip.addEventListener('click', () => {
      this.isCameraFlipped = !this.isCameraFlipped;
      this.boothVideo.classList.toggle('video-flipped', this.isCameraFlipped);
      try { this.audio.playSelect(); } catch(e){}
    });

    this.btnSnapBooth.addEventListener('click', () => this.triggerBoothCountdown());

    this.btnRetakeBooth.addEventListener('click', () => {
      this.boothResultBox.classList.add('hidden');
      this.btnSnapBooth.scrollIntoView({ behavior: 'smooth' });

    // --- BOSS BATTLE EVENT BINDINGS ---
    if (this.btnDodgeLeft) {
      this.btnDodgeLeft.addEventListener('click', () => {
        this.handlePlayerDodge(Math.max(0, this.playerLane - 1));
      });
    }
    if (this.btnDodgeRight) {
      this.btnDodgeRight.addEventListener('click', () => {
        this.handlePlayerDodge(Math.min(2, this.playerLane + 1));
      });
    }
    if (this.btnDodgeJump) {
      this.btnDodgeJump.addEventListener('click', () => {
        this.handlePlayerJump();
      });
    }
    if (this.btnAttackBoss) {
      this.btnAttackBoss.addEventListener('click', () => {
        this.openBossReflectionQuestion();
      });
    }
    if (this.btnClaimChest) {
      this.btnClaimChest.addEventListener('click', () => {
        if (this.bossDefeatModal) this.bossDefeatModal.classList.add('hidden');
        this.switchScene('giftReveal');
      });
    }

    // Direct lane click to move/dodge on screen
    for (let laneIdx = 0; laneIdx < 3; laneIdx++) {
      const laneEl = document.getElementById(`lane-col-${laneIdx}`);
      if (laneEl) {
        laneEl.addEventListener('click', () => {
          this.handlePlayerDodge(laneIdx);
        });
      }
    }

    // Keyboard support for dodging & moving during boss battle
    window.addEventListener('keydown', (e) => {
      if (this.currentScene === 'scene-encounter' && this.currentStage === 3) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          this.handlePlayerDodge(Math.max(0, this.playerLane - 1));
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          this.handlePlayerDodge(Math.min(2, this.playerLane + 1));
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
          this.handlePlayerJump();
        }
      }
    });
    });
  }

  switchScene(sceneKey) {
    Object.values(this.scenes).forEach(s => s && s.classList.remove('active'));
    if (this.scenes[sceneKey]) {
      this.scenes[sceneKey].classList.add('active');
      this.currentScene = `scene-${sceneKey}`;
    }

    // When entering the menu hub or sub-scenes after quest victory:
    if (sceneKey === 'menuHub' || sceneKey === 'subCandle' || sceneKey === 'subLetter' || sceneKey === 'subPhoto') {
      if (this.btnHeaderMusicbox) {
        this.btnHeaderMusicbox.classList.remove('hidden');
      }
      if (!this.hasAutoStartedMusic) {
        this.hasAutoStartedMusic = true;
        this.play1000XMusic();
      }
    }
  }

  typeWriter(el, text, speed = 20, onDone = null) {
    el.innerHTML = '';
    let i = 0;
    if (this.typeTimer) clearInterval(this.typeTimer);

    this.typeTimer = setInterval(() => {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        if (i % 2 === 0) {
          try { this.audio.playBleep(); } catch(e){}
        }
        i++;
      } else {
        clearInterval(this.typeTimer);
        this.typeTimer = null;
        if (onDone) onDone();
      }
    }, speed);
  }

  // --- PROLOGUE: 2 PIXEL CHARACTERS ON VILLAGE STAGE FIRST ---
  startPrologue() {
    this.prologueStep = 0;
    this.prologueThief.classList.add('hidden');
    this.prologueChest.classList.remove('hidden');
    this.dialogueBustLeft.classList.add('hidden');
    this.dialogueBustRight.classList.add('hidden');
    this.advancePrologue();
  }

  advancePrologue() {
    const steps = [
      {
        speaker: "Arya",
        text: "Hai sahabatku! Di hari yang istimewa ini, aku ada sebuah hadiah rahasia spesial yang sudah kusiapkan khusus buat kamu nih...",
        showLeft: false,
        showRight: true,
        rightClass: "friend-letter-bust",
        action: () => {}
      },
      {
        speaker: "Arya",
        text: "Eh tunggu sebentar... Apa itu suara langkah kaki mencurigakan dari balik pepohonan?!",
        showLeft: false,
        showRight: true,
        rightClass: "friend-letter-bust",
        action: () => {
          this.prologueThief.classList.remove('hidden');
          try { this.audio.playSlash(); } catch(e){}
          this.gameAppContainer.classList.add('shake-screen');
          setTimeout(() => this.gameAppContainer.classList.remove('shake-screen'), 450);
        }
      },
      {
        speaker: "Pencuri Bayangan",
        text: "Hahaha! Kado emas bercahaya ini milikku sekarang! Tangkap aku jika berani!",
        showLeft: false,
        showRight: true,
        rightClass: "thief-bust",
        action: () => {
          this.prologueChest.classList.add('hidden');
          try { this.audio.playTone(180, 'sawtooth', 0.3, 0.12); } catch(e){}
        }
      },
      {
        speaker: "Farah",
        text: "Loh, kenapa hadiah rahasiaku malah dicuri paksa?! Tenang, biar aku yang kejar dan rebut kembali hadiah itu!",
        showLeft: true,
        showRight: false,
        btnText: "KEJAR SEKARANG! 🏃‍♀️",
        action: () => {}
      }
    ];

    if (this.prologueStep < steps.length) {
      const s = steps[this.prologueStep];
      this.vnSpeakerName.innerText = s.speaker;
      s.action();

      if (s.showLeft) {
        this.dialogueBustLeft.className = "bust-transparent left-bust";
        this.dialogueBustLeft.classList.remove('hidden');
      } else {
        this.dialogueBustLeft.classList.add('hidden');
      }

      if (s.showRight) {
        this.dialogueBustRight.className = `bust-transparent right-bust ${s.rightClass || ''}`;
        this.dialogueBustRight.classList.remove('hidden');
      } else {
        this.dialogueBustRight.classList.add('hidden');
      }

      if (s.btnText) this.btnVnNext.innerText = s.btnText;

      this.typeWriter(this.vnDialogueText, s.text);
      this.prologueStep++;
    } else {
      this.btnVnNext.innerText = "LANJUT ▶";
      this.startPlatformerStage(0);
    }
  }

  startPlatformerStage(stageIdx) {
    this.currentStage = stageIdx;
    this.switchScene('platformer');
    this.audio.startBGM(stageIdx === 3 ? 'boss' : 'adventure');
    this.platformer.loadStage(stageIdx);
    this.platformer.start();
  }

  handleEncounterTrigger(stageIdx) {
    this.currentStage = stageIdx;
    this.stageQuestionIdx = 0;
    try { this.audio.playVictory(); } catch(e){}

    const sData = STAGES_DATA[stageIdx];

    if (stageIdx === 3) {
      // STAGE 4: DEDICATED BOSS BATTLE MODE!
      if (this.standardEncounterOverlay) this.standardEncounterOverlay.classList.add('hidden');
      if (this.bossBattleOverlay) this.bossBattleOverlay.classList.remove('hidden');
      this.switchScene('encounter');
      this.startBossBattle();
    } else {
      // STAGES 1, 2, 3: STANDARD ENCOUNTER MODE
      if (this.standardEncounterOverlay) this.standardEncounterOverlay.classList.remove('hidden');
      if (this.bossBattleOverlay) this.bossBattleOverlay.classList.add('hidden');
      this.encounterEnemyName.innerText = sData.enemyName;
      this.encounterEnemyBust.style.opacity = '1';
      this.encounterEnemyBust.style.visibility = 'visible';
      this.encounterEnemyBust.classList.remove('enemy-death-anim');
      this.encounterEnemyBust.className = `half-body-portrait enemy-combat-bust ${sData.enemyBustClass}`;
      this.enemyTauntText.innerText = `"${sData.enemyTaunt}"`;

      this.switchScene('encounter');
      this.renderStageQuestion();
    }
  }

  // ================= BOSS BATTLE ENGINE =================
  startBossBattle() {
    this.bossHp = 3;
    this.stageQuestionIdx = 0;
    this.updateBossHpHearts();
    this.arenaBoss.className = "arena-boss-container";
    this.bossDizzyStars.classList.add('hidden');
    this.bossSpeechBubble.classList.add('hidden');
    this.bossExhaustedPanel.classList.add('hidden');
    if (this.bossDefeatModal) this.bossDefeatModal.classList.add('hidden');
    this.setPlayerLane(1);

    this.startBossRound();
  }

  updateBossHpHearts() {
    for (let i = 0; i < 3; i++) {
      if (this.bhearts[i]) {
        if (i < this.bossHp) {
          this.bhearts[i].className = "boss-heart full";
          this.bhearts[i].textContent = "❤️";
        } else {
          this.bhearts[i].className = "boss-heart empty";
          this.bhearts[i].textContent = "🖤";
        }
      }
    }
  }

  setPlayerLane(lane) {
    this.playerLane = lane;
    if (this.arenaPlayer) {
      this.arenaPlayer.className = `arena-player-container lane-${lane}${this.isPlayerJumping ? ' jumping' : ''}`;
    }
  }

  handlePlayerDodge(targetLane) {
    try { this.audio.playSelect(); } catch(e){}
    this.setPlayerLane(targetLane);
    this.showDodgeFeedback("💨 GESER!");
  }

  handlePlayerJump() {
    if (!this.isDodgeActive || this.isPlayerJumping) return;
    this.isPlayerJumping = true;
    try { this.audio.playJump(); } catch(e){}
    this.setPlayerLane(this.playerLane);
    this.showDodgeFeedback("⬆ LOMPAT!");

    setTimeout(() => {
      this.isPlayerJumping = false;
      this.setPlayerLane(this.playerLane);
    }, 450);
  }

  showDodgeFeedback(text) {
    if (this.playerDodgeBadge) {
      this.playerDodgeBadge.textContent = text;
      this.playerDodgeBadge.classList.remove('hidden');
      setTimeout(() => {
        if (this.playerDodgeBadge) this.playerDodgeBadge.classList.add('hidden');
      }, 500);
    }
  }

  startBossRound() {
    const roundIdx = 3 - this.bossHp; // 0, 1, 2
    const skills = [
      { name: "☄️ METEOR BAYANGAN KEGELAPAN!", icon: "☄️" },
      { name: "⚡ KILAT PEDANG BAYANGAN!", icon: "⚡" },
      { name: "🌪️ BADAI TEBASAN PENCURI!", icon: "🌪️" }
    ];
    const curSkill = skills[roundIdx] || skills[0];

    // Status & Skill Announcements
    this.skillBannerText.textContent = `BOSS SKILL: ${curSkill.name}`;
    this.arenaBoss.className = "arena-boss-container";
    this.bossDizzyStars.classList.add('hidden');
    this.bossExhaustedPanel.classList.add('hidden');
    this.bossSpeechBubble.classList.add('hidden');
    this.bossDodgeControls.classList.remove('hidden');

    this.dodgeWave = 0;
    this.isDodgeActive = true;
    this.runDodgeWave(curSkill.icon);
  }

  runDodgeWave(icon) {
    if (this.dodgeWave >= 3) {
      // 3 waves successfully survived -> Boss becomes exhausted!
      this.onBossSkillComplete();
      return;
    }

    this.dodgeWave++;
    this.dodgeCountDisplay.textContent = `GELOMBANG ${this.dodgeWave} / 3`;

    // Choose 1 or 2 hazard lanes
    const hazardLanes = [];
    const safeLane = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++) {
      if (i !== safeLane) hazardLanes.push(i);
    }

    // Flash warning indicators
    hazardLanes.forEach(lane => {
      const warn = document.getElementById(`lane-warn-${lane}`);
      if (warn) warn.classList.remove('hidden');
    });

    try { this.audio.playTone(300, 'square', 0.15, 0.1); } catch(e){}

    // After 600ms telegraph, projectile fires down lane!
    setTimeout(() => {
      hazardLanes.forEach(lane => {
        const warn = document.getElementById(`lane-warn-${lane}`);
        if (warn) warn.classList.add('hidden');

        const proj = document.getElementById(`proj-${lane}`);
        if (proj) {
          proj.textContent = icon;
          proj.classList.remove('hidden');
          proj.classList.add('falling');
        }
      });

      try { this.audio.playSlash(); } catch(e){}

      // Check dodge outcome after projectile lands (750ms duration of dropHazardAnim)
      setTimeout(() => {
        hazardLanes.forEach(lane => {
          const proj = document.getElementById(`proj-${lane}`);
          if (proj) {
            proj.classList.add('hidden');
            proj.classList.remove('falling');
          }
        });

        const isHit = hazardLanes.includes(this.playerLane) && !this.isPlayerJumping;
        if (isHit) {
          this.gameAppContainer.classList.add('shake-screen');
          this.showDodgeFeedback("⚠️ KENA SERPIHAN!");
          try { this.audio.playTone(150, 'sawtooth', 0.2, 0.15); } catch(e){}
          setTimeout(() => this.gameAppContainer.classList.remove('shake-screen'), 300);
        } else {
          this.showDodgeFeedback("✨ HINDARAN SEMPURNA!");
        }

        // Delay to next wave
        setTimeout(() => {
          this.runDodgeWave(icon);
        }, 600);
      }, 600);

    }, 700);
  }

  onBossSkillComplete() {
    this.isDodgeActive = false;
    // this.bossDodgeControls.classList.add('hidden');

    // Boss Exhausted / Cooldown State!
    this.arenaBoss.className = "arena-boss-container exhausted";
    this.bossDizzyStars.classList.remove('hidden');
    try { this.audio.playTone(220, 'sine', 0.4, 0.2); } catch(e){}

    const pantes = [
      "Hosh... hosh... Mengapa seranganku meleset?! Tenagaku... habis...",
      "K-khh... Tubuhku kelelahan... Nafasku terasa berat...",
      "Ughhh... Aku kehabisan jurus kegelapan... Jangan mendekat!"
    ];
    const roundIdx = 3 - this.bossHp;
    this.bossBubbleDialogue.textContent = `"${pantes[roundIdx] || pantes[0]}"`;
    this.bossSpeechBubble.classList.remove('hidden');

    // Show Attack Opportunity Panel
    this.bossExhaustedPanel.classList.remove('hidden');
  }

    openBossReflectionQuestion() {
    this.bossExhaustedPanel.classList.add('hidden');
    this.bossSpeechBubble.classList.add('hidden');

    const sData = STAGES_DATA[3];
    const qItem = sData.questions[this.stageQuestionIdx];

    const bapPanel = document.getElementById('boss-attack-panel');
    const bapRoundBadge = document.getElementById('bap-round-badge');
    const bapPromptText = document.getElementById('bap-prompt-text');
    const bapOptionsGrid = document.getElementById('bap-options-grid');

    if (bapRoundBadge) {
      bapRoundBadge.textContent = `⚔️ TEBASAN REFLEKSI CAHAYA (RONDE ${this.stageQuestionIdx + 1} / 3)`;
    }
    if (bapPromptText) {
      bapPromptText.textContent = qItem.q;
    }
    if (bapOptionsGrid) {
      bapOptionsGrid.innerHTML = '';
      const badges = ['A', 'B', 'C', 'D'];
      qItem.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'bap-opt-btn';
        btn.innerHTML = `<span class="opt-badge">${badges[idx]}</span> <span>${opt}</span>`;
        btn.addEventListener('click', () => this.handleBossAttackAnswer(idx));
        bapOptionsGrid.appendChild(btn);
      });
    }

    if (bapPanel) {
      bapPanel.classList.remove('hidden');
      bapPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  handleBossAttackAnswer(optIndex) {
    try { this.audio.playSlash(); } catch(e){}

    // Hide attack question panel
    const bapPanel = document.getElementById('boss-attack-panel');
    if (bapPanel) bapPanel.classList.add('hidden');

    const sData = STAGES_DATA[3];
    const skillNames = [
      "✨ TEBASAN CAHAYA TEKAD!",
      "🌟 BADAI CAHAYA PERSAHABATAN!",
      "💫 SINAR MAHA DAHSYAT PENAKLUK KEGELAPAN (FINISHER)!"
    ];
    const currentSkillName = skillNames[this.stageQuestionIdx] || sData.skillName;

    // Player lunges forward in arena!
    if (this.arenaPlayer) {
      this.arenaPlayer.classList.add('lunging');
      setTimeout(() => {
        if (this.arenaPlayer) this.arenaPlayer.classList.remove('lunging');
      }, 500);
    }

    this.triggerSkillAnimation(currentSkillName, () => {
      // Boss takes damage!
      this.bossHp--;
      this.stageQuestionIdx++;
      this.updateBossHpHearts();

      // Boss damage effect in arena
      this.arenaBoss.classList.add('hit-damage');
      setTimeout(() => this.arenaBoss.classList.remove('hit-damage'), 600);

      // Boss Reaction Dialogue
      const bossReactions = [
        "Ughhh!! Sial... Cahaya apa ini?! Kenapa serangan refleksi dirimu begitu menyilaukan?!",
        "K-khhh... Tidak mungkin! Bagaimana bisa ikatan kalian begitu kokoh hanya demi sebuah hadiah?!",
        "Aaaaaarrrghhh!! Aku... aku kalah... Hadiah ini dilindungi oleh ketulusan yang tak bisa ku curi..."
      ];
      const rText = bossReactions[this.stageQuestionIdx - 1] || bossReactions[0];
      this.bossBubbleDialogue.textContent = `"${rText}"`;
      this.bossSpeechBubble.classList.remove('hidden');

      if (this.bossHp > 0) {
        // Proceed to next round after 2.5 seconds
        setTimeout(() => {
          this.startBossRound();
        }, 2600);
      } else {
        // Boss Defeated!
        setTimeout(() => {
          this.triggerBossDefeatScene();
        }, 1800);
      }
    });
  }

  triggerBossDefeatScene() {
    try { this.audio.playVictory(); } catch(e){}
    this.confetti.start(80);
    setTimeout(() => this.confetti.stop(), 3000);

    if (this.bossDefeatModal) {
      this.bossDefeatModal.classList.remove('hidden');
    }

    const lines = [
      "Shadow Lord: 'A-aku menyerah... Cahaya persahabatan kalian... terlalu murni untuk direbut...'",
      "Shadow Lord: 'Ambillah kembali... Hadiah berharga ini memang sejak awal milik kalian berdua...'",
      "Arya: 'Kado rahasiamu berhasil kita selamatkan! Hebat sekali perjuanganmu!'",
      "Farah: 'Ayo cepat kita bawa kado ini dan buka bersama-sama!'"
    ];

    let lineIdx = 0;
    this.defeatDialogueLine.textContent = lines[0];

    const dialogueTimer = setInterval(() => {
      lineIdx++;
      if (lineIdx < lines.length) {
        this.defeatDialogueLine.textContent = lines[lineIdx];
      } else {
        clearInterval(dialogueTimer);
      }
    }, 2000);
  }

  renderStageQuestion() {
    const sData = STAGES_DATA[this.currentStage];
    const totalQInStage = sData.questions.length;
    const qItem = sData.questions[this.stageQuestionIdx];

    this.eqProgressBadge.innerText = `PERTANYAAN ${this.stageQuestionIdx + 1} / ${totalQInStage}`;
    this.eqStageName.innerText = `Tahap ${this.currentStage + 1} / 4`;
    this.eqQuestionText.innerText = qItem.q;

    this.eqOptionsGrid.innerHTML = '';
    const badges = ['A', 'B', 'C', 'D'];
    qItem.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'eq-opt-btn';
      btn.innerHTML = `<span class="opt-badge">${badges[idx]}</span> <span>${opt}</span>`;
      btn.addEventListener('click', () => this.handleStageAnswer(idx));
      this.eqOptionsGrid.appendChild(btn);
    });
  }

  handleStageAnswer(optIndex) {
    const sData = STAGES_DATA[this.currentStage];
    try { this.audio.playSlash(); } catch(e){}

    this.eqOptionsGrid.querySelectorAll('button').forEach(b => b.disabled = true);

    this.triggerSkillAnimation(sData.skillName, () => {
      this.stageQuestionIdx++;
      if (this.stageQuestionIdx < sData.questions.length) {
        this.renderStageQuestion();
      } else {
        if (this.encounterEnemyBust) this.encounterEnemyBust.classList.add('enemy-death-anim');
        try { this.audio.playTone(140, 'sawtooth', 0.45, 0.18); } catch(e){}
        setTimeout(() => {
          if (this.encounterEnemyBust) {
            this.encounterEnemyBust.style.opacity = '0';
            this.encounterEnemyBust.style.visibility = 'hidden';
            this.encounterEnemyBust.classList.remove('enemy-death-anim');
          }
          this.handleStageComplete();
        }, 1050);
      }
    });
  }

  triggerSkillAnimation(skillName, callback) {
    this.skillNameBanner.innerText = skillName;
    // Clone/re-trigger SVG animations cleanly
    const svgEl = this.skillVfxContainer.querySelector('.vfx-anime-svg');
    if (svgEl) {
      const clone = svgEl.cloneNode(true);
      svgEl.parentNode.replaceChild(clone, svgEl);
    }
    this.skillVfxContainer.classList.remove('hidden');
    this.gameAppContainer.classList.add('shake-screen');

    setTimeout(() => {
      this.gameAppContainer.classList.remove('shake-screen');
      this.skillVfxContainer.classList.add('hidden');
      if (callback) callback();
    }, 950);
  }

  handleStageComplete() {
    try { this.audio.playVictory(); } catch(e){}
    this.confetti.start(50);
    setTimeout(() => this.confetti.stop(), 2000);

    const sData = STAGES_DATA[this.currentStage];
    if (this.currentStage === 2) {
      // Stage 3 (Shadow Knight) defeated -> Gate to Boss Stage 4 opens!
      this.modalVictoryTitle.innerText = "PENJAGA TERAKHIR DIKALAHKAN!";
      this.modalVictoryDesc.innerText = `🎉 Anda berhasil mengalahkan ${sData.enemyName}!
Gerbang Tahta Senja terbuka! Bersiaplah menghadapi Sang Pencuri Bayangan (Boss Fight)!`;
      this.btnModalContinue.innerText = "⚔️ HADAPI SANG PENCURI (DUNIA 1-4) ▶";
    } else if (this.currentStage < STAGES_DATA.length - 1) {
      this.modalVictoryTitle.innerText = "VICTORY!";
      this.modalVictoryDesc.innerText = `🎉 Anda berhasil mengalahkan ${sData.enemyName}!
Segel kegelapan terbuka. Melanjutkan petualangan ke dunia berikutnya...`;
      this.btnModalContinue.innerText = "LANJUT JELAJAHI DUNIA BERIKUTNYA ▶";
    } else {
      this.modalVictoryTitle.innerText = "BOSS DEFEATED!";
      this.modalVictoryDesc.innerText = `🏆 Anda berhasil mengalahkan ${sData.enemyName}!
Hadiah emas rahasiamu berhasil direbut kembali!`;
      this.btnModalContinue.innerText = "🎁 AMBIL KADO & BUKA SEKARANG ▶";
    }

    this.victoryModal.classList.remove('hidden');
  }

  // --- OPEN GIFT & PLAY 1000X BY GHEA INDRAWARI ---
  handleOpenChestAnimation() {
    try { this.audio.playSlash(); } catch(e){}
    this.chestSprite.classList.add('chest-shaking');

    setTimeout(() => {
      try { this.audio.playFanfare(); } catch(e){}
      this.confetti.start(100);
      this.chestWrapper.classList.add('hidden');
      this.emergedCakeBox.classList.remove('hidden');
      try { this.audio.playVictory(); } catch(e){}
    }, 1100);
  }

    play1000XMusic() {
    this.is1000xPlaying = true;
    let playedAudioTag = false;
    if (this.audio1000xTrack) {
      const p = this.audio1000xTrack.play();
      if (p !== undefined) {
        p.then(() => {
          playedAudioTag = true;
          this.audio.stopBGM();
          this.updateMusicboxUI(true);
        }).catch(err => {
          console.log("Audio element blocked/fallback to synth:", err);
          this.audio.playSong1000X();
          this.updateMusicboxUI(true);
        });
      }
    } else {
      this.audio.playSong1000X();
      this.updateMusicboxUI(true);
    }
  }

  stop1000XMusic() {
    this.is1000xPlaying = false;
    if (this.audio1000xTrack) {
      this.audio1000xTrack.pause();
    }
    this.audio.stopSong1000X();
    this.updateMusicboxUI(false);
  }

  toggle1000XMusic() {
    if (this.is1000xPlaying) {
      this.stop1000XMusic();
    } else {
      this.play1000XMusic();
    }
  }

  replay1000XMusic() {
    if (this.audio1000xTrack) {
      this.audio1000xTrack.currentTime = 0;
      this.audio1000xTrack.play().then(() => {
        this.is1000xPlaying = true;
        this.audio.stopBGM();
        this.updateMusicboxUI(true);
      }).catch(() => {
        this.audio.playSong1000X();
        this.is1000xPlaying = true;
        this.updateMusicboxUI(true);
      });
    } else {
      this.audio.playSong1000X();
      this.is1000xPlaying = true;
      this.updateMusicboxUI(true);
    }
  }

  updateMusicboxUI(isPlaying) {
    this.is1000xPlaying = isPlaying;
    
    // Turntable Vinyl disc
    if (this.vinylDisc) {
      if (isPlaying) {
        this.vinylDisc.classList.add('playing');
      } else {
        this.vinylDisc.classList.remove('playing');
      }
    }

    // Tonearm needle
    if (this.tonearmMech) {
      if (isPlaying) {
        this.tonearmMech.classList.add('playing');
      } else {
        this.tonearmMech.classList.remove('playing');
      }
    }

    // Status pill
    if (this.musicboxStatusDot) {
      if (isPlaying) {
        this.musicboxStatusDot.classList.add('playing');
      } else {
        this.musicboxStatusDot.classList.remove('playing');
      }
    }
    if (this.musicboxStatusText) {
      this.musicboxStatusText.textContent = isPlaying ? 'MEMUTAR LAGU' : 'BERHENTI';
    }

    // Equalizer
    if (this.pixelEqualizer) {
      if (isPlaying) {
        this.pixelEqualizer.classList.add('playing');
      } else {
        this.pixelEqualizer.classList.remove('playing');
      }
    }

    // Control Toggle Button
    if (this.btnMusicboxToggle) {
      if (isPlaying) {
        this.btnMusicboxToggle.className = 'rpg-btn-musicbox btn-stop-state';
        if (this.musicboxBtnIcon) this.musicboxBtnIcon.textContent = '⏹';
        if (this.musicboxBtnLabel) this.musicboxBtnLabel.textContent = 'STOP LAGU';
      } else {
        this.btnMusicboxToggle.className = 'rpg-btn-musicbox btn-play-state';
        if (this.musicboxBtnIcon) this.musicboxBtnIcon.textContent = '▶';
        if (this.musicboxBtnLabel) this.musicboxBtnLabel.textContent = 'PUTAR LAGU';
      }
    }

    // Header mini indicator
    if (this.headerDiscIcon) {
      if (isPlaying) {
        this.headerDiscIcon.classList.add('spinning');
      } else {
        this.headerDiscIcon.classList.remove('spinning');
      }
    }
    if (this.headerMusicTitle) {
      this.headerMusicTitle.textContent = isPlaying ? '1000X: ON' : '1000X: OFF';
    }
  }

  playBirthdaySong1000X() {
    this.play1000XMusic();
  }

  // --- MULTI-CANDLE BLOWING WITH WIND & SMOKE ---
  handleBlowMultiCandles() {
    if (this.candlesBlownOut) return;
    this.candlesBlownOut = true;

    try { this.audio.playWhoosh(); } catch(e){}
    this.windGustOverlay.classList.remove('hidden');

    setTimeout(() => {
      this.candleFlames.forEach(f => f.classList.add('extinguished'));
      this.candleSmokes.forEach(s => s.classList.remove('hidden'));
      try { this.audio.playFanfare(); } catch(e){}
      this.confetti.start(120);

      this.candleStatusHeading.innerText = "✨ LILIN TELAH DITIUP DENGAN INDAH! ✨";
      this.candleStatusSub.innerText = "Doa tulusmu telah terukir di langit... Semoga terkabul dan bahagia selalu!";
      this.btnBlowSubCandle.innerText = "✅ PERMOHONAN SUDAH TERBANG KE LANGIT";
      this.btnBlowSubCandle.style.background = "#7f8c8d";
      this.btnBlowSubCandle.classList.remove('pulse-btn');
      this.windGustOverlay.classList.add('hidden');
    }, 450);
  }

  // --- PHOTOBOOTH STUDIO ---
  async initBoothCamera() {
    this.stopBoothCamera();
    try {
      this.boothStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });
      this.boothVideo.srcObject = this.boothStream;
      await this.boothVideo.play();
    } catch(err) {
      console.warn("Kamera tidak diizinkan / offline:", err);
    }
  }

  stopBoothCamera() {
    if (this.boothStream) {
      this.boothStream.getTracks().forEach(t => t.stop());
      this.boothStream = null;
    }
  }

  triggerBoothCountdown() {
    let count = 3;
    this.boothCountdown.classList.remove('hidden');
    this.boothCountdown.innerText = count;
    try { this.audio.playTone(440, 'triangle', 0.1, 0.1); } catch(e){}

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        this.boothCountdown.innerText = count;
        try { this.audio.playTone(440, 'triangle', 0.1, 0.1); } catch(e){}
      } else {
        clearInterval(timer);
        this.boothCountdown.classList.add('hidden');
        this.capturePhotobooth();
      }
    }, 1000);
  }

  capturePhotobooth() {
    this.boothFlash.classList.add('flash-active');
    try { this.audio.playCameraClick(); } catch(e){}
    setTimeout(() => this.boothFlash.classList.remove('flash-active'), 160);

    const cvs = this.boothFinalCanvas;
    const ctx = cvs.getContext('2d');
    const W = cvs.width;
    const H = cvs.height;

    ctx.clearRect(0, 0, W, H);

    // Frame Border
    if (this.activeTemplate === 1) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, W - 10, H - 10);
    } else if (this.activeTemplate === 2) {
      ctx.fillStyle = "#161b2e";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#f5b041";
      ctx.lineWidth = 12;
      ctx.strokeRect(6, 6, W - 12, H - 12);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, W - 32, H - 32);
    } else {
      ctx.fillStyle = "#151124";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#9b59b6";
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, W - 8, H - 8);
    }

    // Camera Video Feed
    const frameX = 30;
    const frameY = 40;
    const frameW = W - 60;
    const frameH = H - 190;

    ctx.save();
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(frameX, frameY, frameW, frameH);

    if (this.activeFilter === 'pixel') {
      ctx.filter = 'contrast(135%) saturate(125%) brightness(95%)';
    } else if (this.activeFilter === 'warm') {
      ctx.filter = 'sepia(40%) saturate(150%)';
    } else if (this.activeFilter === 'cyber') {
      ctx.filter = 'contrast(120%) saturate(180%) hue-rotate(35deg)';
    }

    if (this.boothVideo && this.boothVideo.videoWidth > 0) {
      ctx.save();
      if (!this.isCameraFlipped) {
        ctx.translate(frameX + frameW, frameY);
        ctx.scale(-1, 1);
        ctx.drawImage(this.boothVideo, 0, 0, frameW, frameH);
      } else {
        ctx.drawImage(this.boothVideo, frameX, frameY, frameW, frameH);
      }
      ctx.restore();
    } else {
      ctx.fillStyle = "#2c3e50";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("📷 PHOTOBOOTH CAPTURE", frameX + frameW / 2, frameY + frameH / 2);
    }
    ctx.restore();

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 4;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    const today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    if (this.activeTemplate === 1) {
      // TEMPLATE 1: Pixel Birthday Party
      ctx.fillStyle = "#e74c3c";
      ctx.fillRect(W / 2 - 140, 16, 280, 36);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.strokeRect(W / 2 - 140, 16, 280, 36);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("HAPPY BIRTHDAY!", W / 2, 38);

      this.drawMiniPixelHijabGirl(ctx, 40, H - 150);
      this.drawMiniPixelCake(ctx, W / 2 - 25, H - 140);
      this.drawMiniPixelBoy(ctx, W - 90, H - 150);

      ctx.fillStyle = "#2c3e50";
      ctx.font = "bold 13px 'Press Start 2P', monospace";
      ctx.fillText("BEST FRIEND FOREVER", W / 2, H - 65);
      ctx.font = "12px monospace";
      ctx.fillStyle = "#7f8c8d";
      ctx.fillText(`★ Hari Ulang Tahun Spesial • ${today} ★`, W / 2, H - 38);

    } else if (this.activeTemplate === 2) {
      // TEMPLATE 2: Anime Title WITH ACTUAL 2D FACE PORTRAITS (REAL FACES OF GIRL & BOY!)
      ctx.fillStyle = "rgba(0,0,0,0.88)";
      ctx.fillRect(W / 2 - 160, 14, 320, 38);
      ctx.strokeStyle = "#f5b041";
      ctx.lineWidth = 2;
      ctx.strokeRect(W / 2 - 160, 14, 320, 38);
      ctx.fillStyle = "#f5b041";
      ctx.font = "bold 11px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("BIRTHDAY QUEST : THE LOST GIFT", W / 2, 38);

      // Real 2D Anime Face of Hero Girl (Left Avatar Circle)
      ctx.save();
      ctx.beginPath();
      ctx.arc(80, H - 100, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#b8a9c9";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f5b041";
      ctx.stroke();
      ctx.clip();
      if (this.imgHeroFace && this.imgHeroFace.complete && this.imgHeroFace.naturalWidth > 0) {
        ctx.drawImage(this.imgHeroFace, 50, H - 130, 60, 60);
      } else {
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🧕", 80, H - 90);
      }
      ctx.restore();

      // Real 2D Anime Face of Friend Boy (Right Avatar Circle)
      ctx.save();
      ctx.beginPath();
      ctx.arc(W - 80, H - 100, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#2980b9";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f5b041";
      ctx.stroke();
      ctx.clip();
      if (this.imgFriendFace && this.imgFriendFace.complete && this.imgFriendFace.naturalWidth > 0) {
        ctx.drawImage(this.imgFriendFace, W - 110, H - 130, 60, 60);
      } else {
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("👦", W - 80, H - 90);
      }
      ctx.restore();

      ctx.font = "30px sans-serif";
      ctx.fillText("👑", W / 2, H - 95);

      ctx.fillStyle = "#f5b041";
      ctx.font = "bold 13px 'Press Start 2P', monospace";
      ctx.fillText("PERSAHABATAN SEJATI", W / 2, H - 60);
      ctx.font = "12px monospace";
      ctx.fillStyle = "#dcdde1";
      ctx.fillText(`Quest Victory Episode • ${today}`, W / 2, H - 32);

    } else {
      // TEMPLATE 3: Twilight Memories Strip
      ctx.fillStyle = "#f5b041";
      ctx.font = "bold 12px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("✦ A DAY TO REMEMBER ✦", W / 2, 28);

      ctx.font = "30px sans-serif";
      ctx.fillText("✨", 55, H - 90);
      ctx.fillText("🎂", W / 2, H - 90);
      ctx.fillText("💖", W - 55, H - 90);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText("Terima kasih sudah lahir dan menjadi sahabat terbaik!", W / 2, H - 55);
      ctx.font = "12px monospace";
      ctx.fillStyle = "#f5b041";
      ctx.fillText(`★ Memories of Twilight • ${today} ★`, W / 2, H - 30);
    }

    const dataUrl = cvs.toDataURL('image/png');
    this.btnDownloadBoothPng.href = dataUrl;
    this.boothResultBox.classList.remove('hidden');
    this.boothResultBox.scrollIntoView({ behavior: 'smooth' });
    try { this.audio.playVictory(); } catch(e){}
  }

  // --- PROCEDURAL SPRITES FOR PHOTOBOOTH CANVAS T1 ---
  drawMiniPixelHijabGirl(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#f5b7c6"; ctx.fillRect(x, y + 16, 45, 22);
    ctx.fillStyle = "#e8dcc5"; ctx.fillRect(x, y + 38, 45, 22);
    ctx.fillStyle = "#f2b5c4"; ctx.fillRect(x + 4, y - 8, 37, 30);
    ctx.fillStyle = "#ffdbac"; ctx.fillRect(x + 12, y + 2, 21, 16);
    ctx.strokeStyle = "#5c4033"; ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 13, y + 6, 8, 8); ctx.strokeRect(x + 23, y + 6, 8, 8);
    ctx.fillStyle = "#3a2218"; ctx.fillRect(x + 16, y + 9, 3, 3); ctx.fillRect(x + 26, y + 9, 3, 3);
    ctx.strokeStyle = "#000"; ctx.lineWidth = 3; ctx.strokeRect(x, y - 8, 45, 68);
    ctx.restore();
  }

  drawMiniPixelBoy(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#222222"; ctx.fillRect(x, y + 15, 45, 45);
    ctx.fillStyle = "#3d6b47"; ctx.fillRect(x + 12, y + 15, 21, 45);
    ctx.fillStyle = "#ffdbac"; ctx.fillRect(x + 10, y, 25, 18);
    ctx.fillStyle = "#1e1e1e"; ctx.fillRect(x + 6, y - 8, 33, 12);
    ctx.strokeStyle = "#111111"; ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 11, y + 4, 9, 8); ctx.strokeRect(x + 23, y + 4, 9, 8);
    ctx.fillStyle = "#111111"; ctx.fillRect(x + 14, y + 7, 3, 3); ctx.fillRect(x + 26, y + 7, 3, 3);
    ctx.strokeStyle = "#000"; ctx.lineWidth = 3; ctx.strokeRect(x, y - 8, 45, 68);
    ctx.restore();
  }

  drawMiniPixelCake(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#d35400";
    ctx.fillRect(x, y + 15, 50, 25);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 5, y + 4, 40, 14);
    ctx.fillStyle = "#3498db";
    ctx.fillRect(x + 22, y - 8, 6, 12);
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(x + 25, y - 11, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y + 4, 50, 36);
    ctx.restore();
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.birthdayApp = new BirthdayGameApp();
});