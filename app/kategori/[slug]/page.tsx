import Link from "next/link";import {notFound} from "next/navigation";import {articles,ago} from "@/lib/data";import {CATEGORIES} from "@/lib/categories";
export const revalidate=60;
export default async function Cat({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const c=CATEGORIES.find(x=>x[0]===slug);if(!c)notFound();const {items}=await articles({cat:slug,limit:30});
 return <div className="rise"><h1 className="font-serif text-4xl mb-6 border-b border-ink pb-2">{c[1]}</h1>
 {!items.length&&<p>Belum ada berita di kategori ini.</p>}
 <ul>{items.map(a=><li key={a.id} className="py-4 border-b border-line"><Link href={`/berita/${a.slug}`}><p className="text-xs text-ink/60">{a.source_name} · {ago(a.published_at)}</p><h2 className="font-serif text-xl hover:underline">{a.title}</h2></Link></li>)}</ul></div>}
