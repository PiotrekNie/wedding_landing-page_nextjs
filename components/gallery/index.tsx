import React, { useState } from "react";
import Image from "next/image";

interface Image {
  photos: {
    id: string;
    url: string;
    fileName: string;
    height: number;
    width: number;
  };
}

export interface GalleryItems {
  weddingGalleries: Image[];
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlurImage({
  image,
  imageUrl,
}: {
  image: Image;
  imageUrl: (url: string) => void;
}) {
  const [isLoading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(true);

  return (
    <button
      className='group'
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        imageUrl(image.photos.url);
      }}>
      <span className='w-full block aspect-w-1 aspect-h-1 xl:aspect-h-7 xl:aspect-w-8 bg-gray-200'>
        <Image
          src={image.photos.url}
          layout='fill'
          objectFit='cover'
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out",
            isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100",
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </span>
    </button>
  );
}
