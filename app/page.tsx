import Link from "next/link";import {articles,ago,type Article} from "@/lib/data";
export const revalidate=60;
const Row=({a}:{a:Article})=><li className="py-4 border-b border-line"><Link href={`/berita/${a.slug}`} className="group block"><p className="text-xs uppercase tracking-wide text-accent">{a.category} · {a.source_name} · {ago(a.published_at)}</p><h3 className="font-serif text-xl leading-snug group-hover:underline">{a.title}</h3></Link></li>;
export default async function Home({searchParams}:{searchParams:Promise<{q?:string;page?:string}>}){
 const {q,page}=await searchParams;const p=+(page??1);const {items,count}=await articles({q,page:p,limit:21});
 if(!items.length)return <p className="py-20 text-center text-ink/60">Belum ada berita. Jalankan sinkronisasi sumber terlebih dahulu.</p>;
 const [hero,...rest]=items;const breaking=items.find(i=>i.is_breaking);
 return <div className="rise">
 {breaking&&<p className="mb-6 text-sm"><b className="bg-accent text-white px-2 py-0.5 mr-2">BREAKING</b><Link href={`/berita/${breaking.slug}`} className="underline">{breaking.title}</Link></p>}
 <article className="grid md:grid-cols-5 gap-6 pb-8 border-b border-ink">
  {hero.image_url&&<img src={hero.image_url} alt="" className="md:col-span-3 w-full aspect-[16/10] object-cover"/>}
  <div className={hero.image_url?"md:col-span-2":"md:col-span-5"}><p className="text-xs uppercase tracking-wide text-accent">{hero.category} · {hero.source_name}</p>
  <h1 className="font-serif text-4xl leading-tight my-2"><Link href={`/berita/${hero.slug}`}>{hero.title}</Link></h1><p className="text-ink/75">{hero.summary}</p></div></article>
 <ul className="grid md:grid-cols-2 gap-x-10">{rest.map(a=><Row key={a.id} a={a}/>)}</ul>
 <p className="mt-6 flex gap-4 text-sm">{p>1&&<Link href={`/?page=${p-1}${q?`&q=${q}`:""}`}>← Sebelumnya</Link>}{count>p*21&&<Link href={`/?page=${p+1}${q?`&q=${q}`:""}`}>Berikutnya →</Link>}</p></div>}
