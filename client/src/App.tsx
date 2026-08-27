// Design direction: Play Lab — bento-grid editorial education site with ink navy, chalk white, marigold, cobalt, and coral.
// Keep interactions tactile, direct, and lightly animated; preserve unusual section rhythm across pages.
import { Children, cloneElement, isValidElement, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, Menu, X, ArrowDown, MapPin, Mail, Instagram, Linkedin, Sparkles, Wrench, Compass, Users, CalendarDays } from "lucide-react";

const RAW_ASSET_BASE = "https://raw.content-delivery.centrova.id/Centrova-ID/ruang-karya/main/github-assets";
const ASSETS = {
  hero: `${RAW_ASSET_BASE}/ruang-karya-hero.webp`,
  students: `${RAW_ASSET_BASE}/ruang-karya-students.webp`,
  mentor: `${RAW_ASSET_BASE}/ruang-karya-mentor.webp`,
  space: `${RAW_ASSET_BASE}/ruang-karya-space.webp`,
  mark: `${RAW_ASSET_BASE}/ruang-karya-mark.webp`,
};
const IMAGE_WIDTHS = { hero: [640, 1024, 1440], students: [480, 768, 1200], mentor: [480, 768, 1200], space: [480, 768, 1200] } as const;
type ResponsiveImageName = keyof typeof IMAGE_WIDTHS;
function responsiveImageUrl(name: ResponsiveImageName, width: number) { return `${RAW_ASSET_BASE}/responsive/ruang-karya-${name}-${width}.webp`; }
function ResponsiveImage({ image, alt, className = "", sizes = "100vw", priority = false }: { image: ResponsiveImageName; alt: string; className?: string; sizes?: string; priority?: boolean }) { const widths = IMAGE_WIDTHS[image]; return <img className={className} src={responsiveImageUrl(image, widths[widths.length - 1])} srcSet={widths.map(width => `${responsiveImageUrl(image, width)} ${width}w`).join(", ")} sizes={sizes} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} />; }

function Link({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) { return <a href={href} className={className}>{children}</a>; }

const nav = [
  ["Tentang", "/tentang"], ["Program", "/program"], ["Cara Belajar", "/cara-belajar"], ["Cerita", "/cerita"], ["Kontak", "/kontak"],
] as const;

function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light ? "logo-light" : ""}`}><img src={ASSETS.mark} alt="" /><span>RUANG<br /><b>KARYA</b></span></Link>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => setOpen(false), [location]);
  useEffect(() => { const bodyOverflow = document.body.style.overflow; const rootOverflow = document.documentElement.style.overflow; if (open) { document.body.style.overflow = "hidden"; document.documentElement.style.overflow = "hidden"; } return () => { document.body.style.overflow = bodyOverflow; document.documentElement.style.overflow = rootOverflow; }; }, [open]);
  return <>
    <header className={`site-header ${scrolled || location !== "/" ? "header-solid" : ""}`}>
      <Logo light={!scrolled && location === "/"} />
      <nav className="desktop-nav">{nav.map(([label, href]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}</nav>
      <Link href="/kontak" className="header-cta">Daftar kunjungan <ArrowUpRight size={16} /></Link>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Buka menu">{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="mobile-menu">
      <div className="mobile-menu-inner">{nav.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={18} /></Link>)}<Link href="/kontak" className="mobile-cta">Mulai percakaran <ArrowUpRight size={18} /></Link></div>
    </motion.div>}</AnimatePresence>
  </>;
}

function Footer() { return <footer className="footer"><div className="footer-top"><div><Logo /><p className="footer-lead">Tempat untuk belajar dengan tangan, kepala, dan rasa ingin tahu yang utuh.</p></div><div className="footer-links"><div><span>Jelajahi</span><Link href="/tentang">Tentang kami</Link><Link href="/program">Program belajar</Link><Link href="/cara-belajar">Cara belajar</Link></div><div><span>Temui kami</span><p>Jl. Kemang Timur No. 17<br />Jakarta Selatan 12730</p><a href="mailto:halo@ruangkarya.id">halo@ruangkarya.id</a></div></div></div><div className="footer-bottom"><span>© 2026 Ruang Karya Institute</span><span>Ruang aman untuk ide yang belum selesai.</span><a className="footer-credit" href="https://www.centrova.id/lanjutkan" target="_blank" rel="noreferrer">Developed by Centrova</a><div className="socials"><Instagram size={17} /><Linkedin size={17} /></div></div></footer> }

function Shell({ children }: { children: React.ReactNode }) { return <div className="app"><Header /><main>{children}</main><Footer /></div> }
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) { return <div className={className}>{Children.map(children, (child, index) => isValidElement(child) ? cloneElement(child as React.ReactElement<any>, { "data-aos": "fade-up", "data-aos-delay": Math.round(delay * 1000 + index * 55), "data-aos-duration": 700, "data-aos-easing": "cubic-bezier(0.23, 1, 0.32, 1)", "data-aos-anchor-placement": "top-bottom" }) : child)}</div> }
function Button({ children, href = "/kontak", tone = "dark" }: { children: React.ReactNode; href?: string; tone?: "dark" | "yellow" | "blue" }) { return <Link href={href} className={`btn btn-${tone}`}>{children}<ArrowUpRight size={17} /></Link> }
function PageIntro({ title, body, color = "yellow" }: { number?: string; title: string; body: string; color?: string }) { return <section className={`page-intro ${color}`}><div className="container intro-grid"><div><h1>{title}</h1><p>{body}</p></div></div></section> }


function Home() { return <Shell><section className="hero"><ResponsiveImage image="hero" alt="Mahasiswa Ruang Karya mengerjakan proyek di studio" className="hero-image" sizes="100vw" priority /><div className="hero-overlay"></div><div className="container hero-content"><div className="hero-copy"><h1>Belajar yang <br /><em>bisa disentuh.</em></h1><p className="hero-text">Ruang Karya adalah sekolah vokasi kecil dengan cara pandang besar: belajar lewat proyek nyata, mentor yang hadir, dan keberanian untuk mencoba ulang.</p><div><Button tone="yellow" href="/program">Lihat program kami</Button></div></div><div className="hero-note"><p>Studio terbuka<br />untuk ide baru</p></div></div><div className="hero-scroll"><ArrowDown size={18} /> scroll pelan-pelan</div></section>
<section className="manifesto section-pad"><div className="container manifesto-grid"><Reveal><h2>Kami tidak menyiapkan murid untuk menghafal masa depan.</h2></Reveal><Reveal delay={.1} className="manifesto-aside"><p>Kami menyiapkan mereka untuk ikut membuatnya. Sejak 2018, kami membuka ruang belajar untuk anak muda yang ingin bekerja dengan rasa ingin tahu, bukan sekadar checklist.<p><Button href="/tentang">Kenali cara kami</Button></p></Reveal></div></section>
<section className="bento-section"><div className="container bento-grid"><Reveal className="bento-card bento-yellow"><span className="big-number">06</span><p>program belajar berbasis proyek</p><ArrowUpRight /></Reveal><Reveal delay={.08} className="bento-card bento-photo"><ResponsiveImage image="students" alt="Mahasiswa Ruang Karya bekerja bersama" sizes="(max-width: 800px) 100vw, 42vw" /><div className="photo-caption">Meja kerja, bukan bangku kuliah.</div></Reveal><Reveal delay={.16} className="bento-card bento-blue"><Sparkles /><h3>Belajar dari yang benar-benar mengerjakan.</h3><p>Mentor kami datang dari studio, bengkel, dapur, dan lapangan—membawa cerita yang belum selesai.</p><Link href="/cara-belajar">Lihat cara belajar <ArrowUpRight size={16} /></Link></Reveal><Reveal delay={.24} className="bento-card bento-coral"><span className="quote-mark">„</span><p>Di sini, pertanyaan bagus lebih penting dari jawaban cepat.</p><span className="quote-by">— Dira, alumni 2024</span></Reveal></div></section>
<section className="wide-story"><div className="container wide-story-grid"><div className="story-image"><ResponsiveImage image="space" alt="Studio Ruang Karya" sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="story-copy"><h2>Satu studio.<br /><span>Banyak arah.</span></h2><p>Di lantai dua sebuah bangunan lama di Kemang, kami merawat studio yang terasa seperti persimpangan antara ruang kelas, bengkel, dan ruang tamu.</p><Button href="/cara-belajar" tone="blue">Masuk ke studionya</Button></div></div></section>
<section className="closing-cta"><div className="container closing-grid"><h2>Ide kamu<br /><span>boleh berantakan.</span></h2><div><p>Yang penting, ada ruang untuk mengerjakannya dengan serius.</p><Button href="/kontak" tone="yellow">Ayo berkenalan</Button></div></div></section></Shell> }

function About() { return <Shell><PageIntro title="Sekolah kecil untuk rasa ingin tahu yang besar." body="Ruang Karya lahir dari satu pertanyaan: mengapa belajar harus terasa jauh dari kehidupan yang ingin kita jalani?" /><section className="section-pad about-story"><div className="container about-grid"><Reveal><ResponsiveImage image="mentor" className="portrait" alt="Mentor Ruang Karya" sizes="(max-width: 800px) 100vw, 45vw" /></Reveal><Reveal delay={.12}><h2>Kami percaya tangan juga punya cara berpikir.</h2><p>Ruang Karya dibangun oleh praktisi dari dunia desain, teknologi, dan pendidikan. Kami bertemu karena sama-sama melihat ada yang hilang: ruang belajar yang cukup dekat dengan kenyataan, tapi cukup aman untuk gagal.</p><p>Hari ini, studio kami diisi oleh 48 siswa, 12 mentor, dan puluhan prototipe yang tidak selamanya berhasi—dan justru karena itu, layak dibicarakan.</p></Reveal></div></section><section className="values-band"><div className="container"><div className="values-grid"><div><span>01</span><h3>Berani mulai</h3><p>Setiap proyek dimulai sebelum semuanya teras siap.</p></div><div><span>02</span><h3>Serius mengamati</h3><p>Ide yang baik tumbuh dari perhatian pada hal-hal kecil.</p></div><div><span>03</span><h3>Berbagi meja</h3><p>Karya menjadi lebih kuat ketika dikerjakan bersama.</p></div></div></div></section></Shell> }

function Programs() { const items = [{n:"01",t:"Creative Technology",d:"Merancang pengalaman digital yang terasa manusiawi—dari riset sampai prototipe.",c:"yellow"},{n:"02",t:"Visual Storytelling",d:"Belajar membaca dunia lewat kamera, kata, dan sudut pandang yang personal.",c:"blue"},{n:"03",t:"Product & Space",d:"Mengubah masalah sehari-hari menjadi benda dan ruang yang ingin dipakai.",c:"coral"},{n:"04",t:"Food & Culture",d:"Menyelidiki hubungan antara rasa, tempat, dan cerita yang kita bawa pulang.",c:"cream"}]; return <Shell><PageIntro title="Program yang berangkat dari rasa ingin tahu." body="Empat studio intensif. Satu tahun untuk mencoba banyak cara kerja, lalu menemukan cara kerja sendiri." color="blue" /><section className="section-pad programs-layout"><div className="container programs-mosaic"><div className="program-list">{items.map((item,i)=><Reveal key={item.n} delay={i*.08}><Link href="/kontak" className={`program-row ${item.c}`}><span className="number">{item.n}</span><span className="title">{item.t}</span><p className="description">{item.d}</p><ArrowUpRight /></Link></Reveal>)}</div><Reveal delay={.3} className="program-note"><Compass /><h3>Tidak yakin pilihan mana?</h3><p>Lihat studio kami dulu, atau bicarakan dengan mentor.</p><Button href="/kontak" tone="yellow">Cari tahu lebih</Button></Reveal></div></section></Shell> }

function Method() { return <Shell><PageIntro title="Cara belajar kami dimulai dari meja kerja." body="Tidak ada kelas pasif. Setiap minggu punya pertanyaan, percobaan, dan sesuatu yang bisa dibawa pulang." /><section className="section-pad method-layout"><div className="container method-grid"><Reveal className="method-item"><Wrench size={48} /><h3>Belajar dari yang dikerjakan</h3><p>Setiap minggu ada proyek baru. Proyek adalah pertanyaan yang dikejar sambil membuat sesuatu.</p></Reveal><Reveal delay={.08} className="method-item"><Users size={48} /><h3>Belajar dari yang mengerjakan</h3><p>Mentor bukan juri. Mereka adalah teman yang bisa diceritain proses, masalah, dan pencarian kita.</p></Reveal><Reveal delay={.16} className="method-item"><CalendarDays size={48} /><h3>Satu tahun, empat karya</h3><p>Cukup waktu untuk coba, gagal, belajar dari kegagalan, lalu coba cara baru.</p></Reveal></div></section></Shell> }

function Stories() { return <Shell><PageIntro title="Yang dibuat setelah lulus, tidak pernah benar-benar selesai." body="Cerita alumni kami bukan garis akhir. Ia adalah bukti bahwa cara melihat bisnis berubah ketika Anda mulai membuat." /><section className="section-pad"><div className="container"><p style={{textAlign: "center", marginBottom: "2rem"}}>Cerita alumni Ruang Karya sedang dibuat. Mari kembali lagi bulan depan?</p><Button href="/kontak">Atau hubungi kami sekarang</Button></div></section></Shell> }

function Contact() { return <Shell><PageIntro title="Mampir dulu. Kita bicarakan pelan-pelan." body="Datang untuk melihat studio, bertanya soal program, atau sekadar mencari tahu apakah Ruang Karya tempat yang tepat buat Anda." /><section className="section-pad"><div className="container contact-grid"><Reveal><div><h2>Hubungi kami</h2><p><MapPin size={18} /> Jl. Kemang Timur No. 17, Jakarta Selatan 12730</p><p><Mail size={18} /> halo@ruangkarya.id</p><p><Instagram size={18} /> @ruangkarya.id</p></div></Reveal></div></section></Shell> }

function NotFound() { return <Shell><section className="not-found"><div className="not-found-number">404</div><div className="not-found-copy"><h1>Halaman ini sedang mencari bentuk.</h1><p>Alamat yang Anda buka sepertinya masih dalam proses. Kembali ke halaman utama atau coba kontak kami.</p><Button href="/">Kembali</Button></div></section></Shell> }
const pageMap: Record<string, React.ComponentType> = { home: Home, about: About, programs: Programs, method: Method, stories: Stories, contact: Contact, notfound: NotFound };
export default function App() { useEffect(() => { AOS.init({ duration: 760, easing: "ease-out-cubic", once: true, offset: 140, mirror: false, throttleDelay: 40, anchorPlacement: "top-bottom" }); }, []); const [page, setPage] = useState<keyof typeof pageMap>("home"); const Page = pageMap[page] || pageMap.notfound; return <Page />; }
