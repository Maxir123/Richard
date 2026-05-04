// app/lookbook/page.tsx
import RichviewLookbook from '@/components/RichviewLookbook';

export const metadata = {
  title: 'Richview — Lookbook',
  description: 'Richview FW25 — The Eclipse Drop',
};

export default function LookbookPage() {
  // pass full public URLs (relative to /public)
  const images = [
    'Post1.jpeg',
    'Post2.jpeg',
    'Post3.jpeg',
    'Post4.jpeg',
    'Post5.jpeg',
    'Post6.jpeg',
    'Post7.jpeg',
    'Post8.jpeg',
  ];

  return <RichviewLookbook images={images} />;
}
