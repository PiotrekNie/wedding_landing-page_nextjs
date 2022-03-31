import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Sections, Gallery, Image } from "../../index";

export default function GalleryDesktop({ data }: { data: Sections }) {
  const [gallery, setGallery]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);

  const { galleries }: Sections = data;

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      const rand: number = Math.floor(Math.random() * (galleries.length - 1 - 0 + 1)) + 0;

      setGallery(rand);

      return rand;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements: Element[] = Array.from(document.querySelectorAll(".gallery__container--col"));

    const removeHideAll: (objects: HTMLCollection) => void = (objects: HTMLCollection) => {
      Array.from(objects).forEach((key: Element) => key.classList.remove("show"));
    };

    (() =>
      new Promise<HTMLCollection>(
        (resolve: (value: HTMLCollection | PromiseLike<HTMLCollection>) => void) => {
          resolve(elements[gallery].children);
        },
      )
        .then((children: HTMLCollection) => {
          removeHideAll(children);

          return children;
        })
        .then((children: HTMLCollection) => {
          const rand: number = Math.floor(Math.random() * (children.length - 1 - 0 + 1)) + 0;

          children[rand].classList.add("show");
        }))();
  }, []);

  return (
    <section className='lg:col-span-6 grid grid-flow-row-dense lg:grid-cols-3 sm:grid-cols-2 grid-cols-none md:gap-5 gap-y-5 items-end gallery__container'>
      {galleries.map((galleryItems: Gallery, index: number) => {
        const id: Gallery = galleryItems;
        const num: number = index;
        return (
          <div key={num} className={`gallery__container--col obj-${index}`}>
            {id.images.map((img: Image, keyIndex: number) => {
              const item: Image = img;
              const i: number = keyIndex;
              return (
                <div key={i} className={`gallery__container--img ${i === 0 ? "show" : ""}`}>
                  <img src={item.url} alt={item.fileName} />
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
