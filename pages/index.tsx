
import Banner from "@/components/Banner";
import ProductData from "@/components/ProductData";
import { Products } from "@/type";
import Head from "next/head";

interface Props {
  products: Products;
}

export default function Home({ products }: Props) {
  return (
    <>
      <Head>
        <title>Amazon 2.0</title>
        
      </Head>
      <main className="w-full bg-[#E3E6E6]">
        <Banner />
        <ProductData products={products} />
      </main>
    </>
  );
}

// ============ SSR data fetch Start here =============

export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`https://fakestoreapiserver.reactbd.com/nextamazon`);
  const products = await res.json();

  // Pass data to the page via props
  return { props: { products } };
};
