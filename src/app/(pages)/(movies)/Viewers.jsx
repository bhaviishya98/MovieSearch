"use client";

const Viewers = () => {
  const viewers = [
    {
      img: "/images/viewers-disney.png",
      video: "/videos/1564674844-disney.mp4",
    },
    {
      img: "/images/viewers-pixar.png",
      video: "/videos/1564676714-pixar.mp4",
    },
    {
      img: "/images/viewers-marvel.png",
      video: "/videos/1564676115-marvel.mp4",
    },
    {
      img: "/images/viewers-starwars.png",
      video: "/videos/1608229455-star-wars.mp4",
    },
    {
      img: "/images/viewers-national.png",
      video: "/videos/1564676296-national-geographic.mp4",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 px-4">
      {viewers.map((viewer, index) => (
        <div
          key={index}
          className="relative pt-[56.25%] rounded-lg overflow-hidden border-[3px] border-white/10 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 group"
        >
          <img
            src={viewer.img}
            alt="viewer"
            className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <source src={viewer.video} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default Viewers;
