import HeroSection from "@/components/Homecomponents/herohead";
import FeaturedProducts from "@/components/Homecomponents/FeaturedProducts";
import AboutSection from "@/components/Homecomponents/AboutSection";
import HowItWorks from "@/components/Homecomponents/HowItWorks";
import HeroProductsSection from "@/components/ProductsSection";




export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturedProducts />
      <AboutSection/>
      <HeroProductsSection/>
      <HowItWorks/>
      
    </div>
  );
}
