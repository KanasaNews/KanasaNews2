import {createClient} from "@supabase/supabase-js";
export const db=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export type Article={id:string;slug:string;title:string;summary:string|null;image_url:string|null;url:string;source_name:string;category:string;published_at:string;is_featured:boolean;is_breaking:boolean};
export async function articles(o:{cat?:string;q?:string;limit?:number;page?:number}={}){
  const l=o.limit??20,f=((o.page??1)-1)*l;
  let q=db().from("articles").select("*",{count:"exact"}).eq("status","published").order("published_at",{ascending:false}).range(f,f+l-1);
  if(o.cat)q=q.eq("category",o.cat); if(o.q)q=q.ilike("title",`%${o.q.replace(/[%,]/g,"")}%`);
  const {data,count,error}=await q; if(error)throw error; return {items:(data??[]) as Article[],count:count??0};
}
export const ago=(d:string)=>{const m=Math.max(1,Math.round((Date.now()-+new Date(d))/60000));return m<60?`${m} mnt lalu`:m<1440?`${Math.round(m/60)} jam lalu`:`${Math.round(m/1440)} hari lalu`};
