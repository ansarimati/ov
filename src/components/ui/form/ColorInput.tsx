"use client";

export function ColorInput ({
  value,
  onChange,
  label
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string
}) {
  <div className="flex items-center gap-3">
    <input 
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-12 bg-transparent border border-white/10 rounded-md overflow-hidden"
    />
    <div className="flex-1">
      { label ? <p className="text-xs text-zinc-500 mb-1">{label}</p> : null }
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
        placeholder="#16a34a"
      />
    </div>
  </div>
}