// Home page main component
// src/pages/Home.tsx
import { useEffect } from "react";
// import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import ProductDisplay from "../components/home/ProductDisplay";
import Values from "../components/home/Values";
import FAQ from "../components/home/FAQ";
import Shipping from "../components/home/Shipping";
import Hero2 from "@/components/home/Hero2";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" w-full overflow-x-hidden">
      <Hero2 />
      {/* <Hero /> */}
      <Categories />
      <ProductDisplay />
      <Values />
      <FAQ />
      <Shipping />
    </div>
  );
};

export default Home;
