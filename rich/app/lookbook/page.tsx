// app/lookbook/page.tsx
import RichviewLookbook from '@/components/RichviewLookbook';

export const metadata = {
  title: 'Richview — Lookbook',
  description: 'Richview FW25 — The Eclipse Drop',
};

export default function LookbookPage() {
  // pass full public URLs (relative to /public)
  const images = [
    'Post1.jpg',
    'Post2.jpg',
    'Post3.jpg',
    'Post4.jpg',
    'Post5.jpg',
    'Post6.jpg',
    'Post7.jpg',
    'Post8.jpg',
    'Post9.jpg',
  ];

  return <RichviewLookbook images={images} />;
}
