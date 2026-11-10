import { Campaigns } from "@/components/home/campaigns";
import { Collections } from "@/components/home/collections";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { Bestsellers, NewArrivals } from "@/components/home/product-sections";
import { Services } from "@/components/home/services";
import { getBestsellers, getNewArrivals } from "@/lib/catalog-queries";

export default async function Home() {
  const [newArrivals, bestsellers] = await Promise.all([
    getNewArrivals(),
    getBestsellers(),
  ]);

  return (
    <>
      <Hero />
      <Collections />
      <NewArrivals products={newArrivals} />
      <Campaigns />
      <Bestsellers products={bestsellers} />
      <Services />
      <Newsletter />
    </>
  );
}
