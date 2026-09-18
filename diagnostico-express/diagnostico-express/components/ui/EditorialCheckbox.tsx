'use client';

interface EditorialCheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  showTextField?: boolean;
  textValue?: string;
  onTextChange?: (value: string) => void;
  textPlaceholder?: string;
}

export default function EditorialCheckbox({
  label,
  checked,
  disabled = false,
  onChange,
  showTextField = false,
  textValue = '',
  onTextChange,
  textPlaceholder = 'Qual?',
}: EditorialCheckboxProps) {
  return (
    <div className="group">
      <label
        className={`flex items-start gap-4 py-3.5 cursor-pointer select-none ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        <span
          className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] border transition-all duration-150 flex items-center justify-center ${
            checked
              ? 'bg-accent border-accent'
              : 'border-border group-hover:border-secondary'
          }`}
        >
          {checked && (
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          )}
        </span>
        <span className="text-[0.9375rem] leading-snug text-primary">{label}</span>
      </label>
      {showTextField && checked && (
        <div className="ml-[34px] mt-1 mb-2">
          <input
            type="text"
            value={textValue}
            onChange={(e) => onTextChange?.(e.target.value)}
            placeholder={textPlaceholder}
            className="text-sm border-b border-border-light pb-2 w-full max-w-xs"
          />
        </div>
      )}
    </div>
  );
}
