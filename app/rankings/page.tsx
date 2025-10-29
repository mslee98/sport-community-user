import { Header, Footer } from "@/components";
import { createClient } from "@/lib/supabase/server";
import RankingsClient from "@/app/rankings/client";

export default async function RankingsPage() {
  const supabase = await createClient();
  
  let sites: any[] = [];
  
  try {
    // v_site_ranking_full 뷰에서 전체 사이트 정보 가져오기
    const { data, error } = await supabase
      .from('v_site_ranking_full')
      .select('*')
      .order('overall_rank', { ascending: true });

    if (error) {
      console.error('Error fetching sites:', error);
    } else if (data) {
      sites = data;
    }
  } catch (error) {
    console.error('Failed to fetch rankings data:', error);
  }

  return (
    <>
      <Header />
      <RankingsClient sites={sites} />
      <Footer />
    </>
  );
}
