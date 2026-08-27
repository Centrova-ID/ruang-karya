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
function ResponsiveImage({ image, alt, className = "", sizes = "100vw", priority = false }: { image: ResponsiveImageName; alt: string; className?: string; sizes?: string; priority?: boolean }) { c[...]

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
  useEffect(() => { const bodyOverflow = document.body.style.overflow; const rootOverflow = document.documentElement.style.overflow; if (open) { document.body.style.overflow = "hidden"; document.d[...]
  return <>
    <header className={`site-header ${scrolled || location !== "/" ? "header-solid" : ""}`}>
      <Logo light={!scrolled && location === "/"} />
      <nav className="desktop-nav">{nav.map(([label, href]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}</nav>
      <Link href="/kontak" className="header-cta">Daftar kunjungan <ArrowUpRight size={16} /></Link>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Buka menu">{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="mobile-menu">
      <div className="mobile-menu-inner">{nav.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={18} /></Link>)}<Link href="/kontak" className="mobile-cta">Mulai percak[...]
    </motion.div>}</AnimatePresence>
  </>;
}

function Footer() { return <footer className="footer"><div className="footer-top"><div><Logo /><p className="footer-lead">Tempat untuk belajar dengan tangan, kepala, dan rasa ingin tahu yang utuh.[...]

function Shell({ children }: { children: React.ReactNode }) { return <div className="app"><Header /><main>{children}</main><Footer /></div> }
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) { return <div className={className}>{Children.map(children, (child, inde[...]
function Button({ children, href = "/kontak", tone = "dark" }: { children: React.ReactNode; href?: string; tone?: "dark" | "yellow" | "blue" }) { return <Link href={href} className={`btn btn-${ton[...]
function PageIntro({ title, body, color = "yellow" }: { number?: string; title: string; body: string; color?: string }) { return <section className={`page-intro ${color}`}><div className="containe[...]


function Home() { return <Shell><section className="hero"><ResponsiveImage image="hero" alt="Mahasiswa Ruang Karya mengerjakan proyek di studio" className="hero-image" sizes="100vw" priority /><di[...]
<section className="manifesto section-pad"><div className="container manifesto-grid"><Reveal><h2>Kami tidak menyiapkan murid untuk menghafal masa depan.</h2></Reveal><Reveal delay={.1} className="[...]
<section className="bento-section"><div className="container bento-grid"><Reveal className="bento-card bento-yellow"><span className="big-number">06</span><p>program belajar berbasis proyek</p><Ar[...]
<section className="wide-story"><div className="container wide-story-grid"><div className="story-image"><ResponsiveImage image="space" alt="Studio Ruang Karya" sizes="(max-width: 800px) 100vw, 55v[...]
<section className="closing-cta"><div className="container closing-grid"><h2>Ide kamu<br /><span>boleh berantakan.</span></h2><div><p>Yang penting, ada ruang untuk mengerjakannya dengan serius.</p[...]

function About() { return <Shell><PageIntro title="Sekolah kecil untuk rasa ingin tahu yang besar." body="Ruang Karya lahir dari satu pertanyaan: mengapa belajar harus terasa jauh dari kehidupan y[...]

function Programs() { const items = [{n:"01",t:"Creative Technology",d:"Merancang pengalaman digital yang terasa manusiawi—dari riset sampai prototipe.",c:"yellow"},{n:"02",t:"Visual Storytellin[...]

function Method() { return <Shell><PageIntro title="Cara belajar kami dimulai dari meja kerja." body="Tidak ada kelas pasif. Setiap minggu punya pertanyaan, percobaan, dan sesuatu yang bisa dibawa[...]

function Stories() { return <Shell><PageIntro title="Yang dibuat setelah lulus, tidak pernah benar-benar selesai." body="Cerita alumni kami bukan garis akhir. Ia adalah bukti bahwa cara melihat bi[...]

function Contact() { return <Shell><PageIntro title="Mampir dulu. Kita bicarakan pelan-pelan." body="Datang untuk melihat studio, bertanya soal program, atau sekadar mencari tahu apakah Ruang Kary[...]

function NotFound() { return <Shell><section className="not-found"><div className="not-found-number">404</div><div className="not-found-copy"><h1>Halaman ini sedang mencari bentuk.</h1><p>Alamat y[...]
const pageMap: Record<string, React.ComponentType> = { home: Home, about: About, programs: Programs, method: Method, stories: Stories, contact: Contact, notfound: NotFound };
export default function App() { useEffect(() => { AOS.init({ duration: 760, easing: "ease-out-cubic", once: true, offset: 140, mirror: false, throttleDelay: 40, anchorPlacement: "top-bottom" }); A[...]
