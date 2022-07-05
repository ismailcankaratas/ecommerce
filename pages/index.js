import Layout from "../components/Layout";
import Header from "../components/home/header";
import Slider from './../components/home/Slider';
import PopularProducts from "../components/home/PopularProducts";
import Product from "../models/Product";
import { convertDocToObj } from "../utils/helpers";

export default function Home({ products }) {
  
  return (
    <Layout title="Anasayfa">
      <Header />
      <Slider />
      <PopularProducts products={products} />
    </Layout>
  )
}


export async function getServerSideProps() {
  const products = await Product.findAll({ raw: true });
  return {
    props: { products: products.map(convertDocToObj) }
  }
}

 