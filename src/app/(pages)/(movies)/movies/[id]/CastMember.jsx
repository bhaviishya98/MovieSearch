import Image from "next/image";

export default function CastMember({ actor }) {
  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
    : "/placeholder.svg?height=278&width=185"; // A fallback image

  return (
    <div className="text-center">
      <div className="relative aspect-[2/3] w-full mb-2 rounded-md overflow-hidden bg-muted">
        <Image
          src={profileUrl}
          alt={actor.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 15vw"
        />
      </div>
      <p className="font-semibold text-sm truncate">{actor.name}</p>
      <p className="text-xs text-muted-foreground truncate">
        {actor.character}
      </p>
    </div>
  );
}
