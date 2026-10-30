import {notFound} from "next/navigation";import Link from "next/link";import {db,articles,type Article} from "@/lib/data";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {data}=await db().from("articles").select("title,summary").eq("slug",slug).maybeSingle();return{title:data?.title,description:data?.summary??undefined}}
export default async function Detail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const {data}=await db().from("articles").select("*").eq("slug",slug).eq("status","published").maybeSingle();if(!data)notFound();const a=data as Article;
 const {items}=await articles({cat:a.category,limit:5});
 return <article className="max-w-2xl mx-auto rise"><p className="text-xs uppercase tracking-wide text-accent">{a.category} · {a.source_name}</p>
 <h1 className="font-serif text-4xl leading-tight my-3">{a.title}</h1><time className="text-sm text-ink/60">{new Date(a.published_at).toLocaleString("id-ID",{dateStyle:"full",timeStyle:"short"})}</time>
 {a.image_url&&<img src={a.image_url} alt="" className="w-full my-6"/>}<p className="text-lg leading-relaxed">{a.summary}</p>
 <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-ink text-paper px-5 py-2">Baca selengkapnya di {a.source_name} ↗</a>
 <h2 className="font-serif text-2xl mt-12 mb-2 border-t border-ink pt-4">Berita terkait</h2><ul>{items.filter(i=>i.id!==a.id).slice(0,4).map(i=><li key={i.id} className="py-2 border-b border-line"><Link className="hover:underline" href={`/berita/${i.slug}`}>{i.title}</Link></li>)}</ul></article>}
