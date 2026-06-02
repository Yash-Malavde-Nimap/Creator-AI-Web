export function PostContent({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      {text.split('\n').filter(Boolean).map((para) => (
        <p key={para} className="text-sm leading-relaxed text-white/85">
          {para}
        </p>
      ))}
    </div>
  );
}
