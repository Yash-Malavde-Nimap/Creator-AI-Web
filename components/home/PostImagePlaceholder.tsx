import { ImageCarousel } from "@/components/ui/ImageCarousel";

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #1a1060 0%, #2d1b8e 40%, #6b21a8 70%, #c2410c 100%)',
  'linear-gradient(135deg, #0c1547 0%, #1e3a8a 50%, #1d4ed8 80%, #0369a1 100%)',
];

interface PostImagePlaceholderProps {
  urls?: string[];
  fallbackIndex?: number;
}

export function PostImagePlaceholder({
  urls,
  fallbackIndex = 0,
}: PostImagePlaceholderProps) {
  if (urls && urls.length > 0) {
    return <ImageCarousel urls={urls} />;
  }

  return (
    <div
      className="mt-3 w-full rounded-2xl"
      style={{
        background: FALLBACK_GRADIENTS[fallbackIndex % FALLBACK_GRADIENTS.length],
        aspectRatio: '16/9',
      }}
    />
  );
}
