'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
}: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`sticker-shadow flex h-7 w-12 items-center rounded-full border-2 border-white px-1 transition-colors disabled:pointer-events-none disabled:opacity-40 ${
        checked ? 'justify-end bg-fuchsia-500' : 'justify-start bg-gray-300'
      }`}
    >
      <div className="size-5 rounded-full bg-white shadow" />
    </button>
  );
};
