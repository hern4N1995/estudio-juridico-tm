export function GoldenDivider({ backgroundColor = "bg-inherit" }: { backgroundColor?: string } = {}) {
  return (
    <div className={`flex items-center justify-center ${backgroundColor}`}>
      <div className="flex items-center justify-center gap-8 w-full max-w-5xl px-4">
        <div className="flex-1" style={{ height: '4px', backgroundColor: '#d4af37', borderRadius: '2px', opacity: 0.6 }} />
        <div className="flex items-center gap-6 shrink-0">
          <div className="rounded-full" style={{ width: '96px', height: '4px', backgroundColor: '#d4af37' }} />
          <span className="text-4xl font-bold whitespace-nowrap" style={{ color: '#d4af37' }}>✦</span>
          <div className="rounded-full" style={{ width: '96px', height: '4px', backgroundColor: '#d4af37' }} />
        </div>
        <div className="flex-1" style={{ height: '4px', backgroundColor: '#d4af37', borderRadius: '2px', opacity: 0.6 }} />
      </div>
    </div>
  );
}
