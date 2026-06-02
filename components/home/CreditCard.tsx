import ImageIcon from "../common/svgs/Home/ImageIcon";
import VideoIcon from "../common/svgs/Home/VideoIcon";

interface CreditCardProps {
  imageCount: number;
  videoCount: number;
}

export function CreditCard({
  imageCount = 0,
  videoCount = 0,
}: CreditCardProps) {
  return (
    <div
      className="w-full rounded-2xl px-4 py-3"
      style={{
        background: "#0A152F",
        border: "1.5px solid rgba(100, 150, 220, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p className="mb-2 text-xs font-medium text-white/50">Credit Left</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Image credits */}
          <div className="flex items-center gap-2">
            <ImageIcon />
            <span className="text-lg font-light text-[#D7E2FF]">
              {imageCount}
            </span>
          </div>
          {/* Video credits */}
          <div className="flex items-center gap-2">
            <VideoIcon />
            <span className="text-lg font-light text-[#D7E2FF]">
              {videoCount}
            </span>
          </div>
        </div>
        {/* <button
          type="button"
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-white"
          style={{
            background: "rgba(10, 22, 55, 0.85)",
            border: "1.5px solid rgba(100, 150, 220, 0.22)",
          }}
        >
          Add Alert
        </button> */}
      </div>
    </div>
  );
}
