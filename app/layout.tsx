import "./globals.css";import type {Metadata} from "next";import Link from "next/link";
import {Newsreader,Inter} from "next/font/google";import {CATEGORIES} from "@/lib/categories";
const serif=Newsreader({subsets:["latin"],variable:"--font-serif"}),sans=Inter({subsets:["latin"],variable:"--font-sans"});
export const metadata:Metadata={title:{default:"Kanasa News",template:"%s | Kanasa News"},description:"Ringkasan berita Indonesia dan dunia dari sumber tepercaya."};
export default function L({children}:{children:React.ReactNode}){return(
<html lang="id" className={`${serif.variable} ${sans.variable}`}><body className="font-sans">
<header className="border-b border-line"><div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
<Link href="/" className="flex items-center gap-2"><img src="/logo-gelap.png" alt="" width={40} height={40}/><span className="font-serif text-3xl font-semibold tracking-tight">Kanasa News</span></Link>
<form action="/" className="hidden sm:block"><input name="q" placeholder="Cari berita…" aria-label="Cari berita" className="bg-transparent border-b border-ink/40 py-1 w-56 text-sm"/></form></div>
<nav aria-label="Kategori" className="border-t border-line"><ul className="mx-auto max-w-6xl px-4 flex gap-5 overflow-x-auto text-sm py-2 whitespace-nowrap">
{CATEGORIES.map(([s,n])=><li key={s}><Link className="hover:text-accent" href={`/kategori/${s}`}>{n}</Link></li>)}</ul></nav></header>
<main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
<footer className="bg-ink text-paper mt-16"><div className="mx-auto max-w-6xl px-4 py-8 flex items-center gap-3 text-sm"><img src="/logo-putih.png" alt="Kanasa News" width={36} height={36}/><p className="opacity-70">Agregator berita. Hak cipta artikel ada pada penerbit asli; kami menautkan ke sumber.</p></div></footer>
</body></html>)}
