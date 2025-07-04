import Header from "@/components/mainpage/header";
import MarqueeComponent from "@/components/mainpage/marquee";
import Featured from "@/components/mainpage/featured";
import AboutDeprobo from "@/components/mainpage/aboutdeprobo";
import Stats from "@/components/mainpage/stats";
import FAQ from "@/components/mainpage/faq";
import Future from "@/components/mainpage/future";
import Footer from "@/components/mainpage/footer";

export default function Home() {
  return (
    <>
      <Header />
      <MarqueeComponent />
      <Featured />
      <AboutDeprobo />
      <Stats />
      <FAQ />
      <MarqueeComponent />
      <Future />
      <Footer />
    </>
  );
}
