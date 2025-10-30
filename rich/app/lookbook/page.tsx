// app/lookbook/page.tsx
import RichviewLookbook from '@/components/RichviewLookbook';

export const metadata = {
  title: 'Richview — Lookbook',
  description: 'Richview FW25 — The Eclipse Drop',
};

export default function LookbookPage() {
  // Add the proper path to your images
  const images = [
    '/assets/lookbook/Post11.jpg',
    '/assets/lookbook/Post12.jpg',
    '/assets/lookbook/Post13.jpg',
    '/assets/lookbook/Post14.jpg',
    '/assets/lookbook/Post15.jpg',
    '/assets/lookbook/Post16.jpg',
    '/assets/lookbook/Post17.jpg',
    '/assets/lookbook/Post18.jpg',
    '/assets/lookbook/Post19.jpg',
  ];

  return <RichviewLookbook images={images} />;
}