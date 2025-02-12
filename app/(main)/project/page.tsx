"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";

const images = [
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZYwMSZ2vxIKbf5HP786CAD3UTizeLcunXgQ1",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgL6eP0N5357NpnBQihcjvOx86VmWGJbKgPz1Sy",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLG2H3HvJYIBchDetdlziMZ8s6VUkq7WogTf9O",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLenkwwsVXA7cmzq0pKyUOnub5RGxHXwN6v89Y",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLa7732jQ0exu3JRmPfQalwBhoDrXWTHybOqVZ",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLlAa5mXMlQVp9ORZzedEnwxN5q8ra14DWu3s0",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVVKUL48rITC3AcWL9sY7gQj1du5fVO8FnEx",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgL8hjuM0sMmsRyroXSU172xjfe94HG6gp3l0va",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLQV8AkO1nmSgLH8aOfeA92YVCbiBDrGXZlUQo",
  "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgL8ndkzAsMmsRyroXSU172xjfe94HG6gp3l0va",
];

const ImageCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  const openModal = (src: string) => {
    setCurrentImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/70 p-4 text-white shadow-lg hover:bg-black"
      >
        &larr;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/70 p-4 text-white shadow-lg hover:bg-black"
      >
        &rarr;
      </button>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide p-4"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 cursor-pointer"
            onClick={() => openModal(src)}
          >
            <Image
              src={src}
              alt={`Carousel Image ${index + 1}`}
              width={320}
              height={288} // Increased height
              className="h-[460px] w-full rounded-lg object-cover shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && currentImage && (
        <div
          className="fixed inset-0 z-20 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal} // Click outside to close modal
        >
          <div
            className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 text-black p-2 rounded-full shadow hover:bg-gray-300"
            >
              &times;
            </button>
            <Image
              src={currentImage}
              alt="Full Size Image"
              width={600}
              height={400}
              className="rounded-lg object-contain max-h-[80vh] mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
