"use client";
import ImgSlider from "@/components/ImgSlider";
import NowPlaying from "@/app/(pages)/(movies)/NowPlaying/page";
import Upcomming from "@/app/(pages)/(movies)/Upcomming/page.";
import Recommends from "@/app/(pages)/(movies)/Recommended/page";
import Trending from "@/app/(pages)/(movies)/Trending/page";
import Viewers from "@/app/(pages)/(movies)/Viewers";

const Home = () => {

  return (
     <main className="relative min-h-[calc(100vh-250px)] overflow-x-hidden pt-[72px] px-[calc(3.5vw+5px)]">
    <div className="absolute inset-0 -z-10 bg-[url('/images/home-background.png')] bg-cover bg-center bg-fixed opacity-100" />
    <ImgSlider />
    <Viewers />
    <Recommends />
    <NowPlaying />
    <Trending />
    <Upcomming />
  </main> 
  );
};

export default Home;
