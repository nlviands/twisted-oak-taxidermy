import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];
  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
    }
  };
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-[#C4A265] text-[#2C2C2C]'
                : 'bg-white text-[#6B5A42] border border-gray-200 hover:border-[#C4A265]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            onClick={() => openLightbox(i)}
            className="aspect-square overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C4A265]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white text-3xl hover:text-[#C4A265] transition-colors z-10"
            aria-label="Close lightbox"
          >
            &times;
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white text-4xl hover:text-[#C4A265] transition-colors z-10"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <img
            src={filtered[lightboxIndex].src}
            alt={filtered[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white text-4xl hover:text-[#C4A265] transition-colors z-10"
            aria-label="Next image"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 text-white text-sm text-center">
            {filtered[lightboxIndex].alt} — {filtered[lightboxIndex].category}
            <span className="ml-4 text-gray-400">{lightboxIndex + 1} / {filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
