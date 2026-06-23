type ShowMoreButtonProps = {
  onClick: () => void;
  label?: string;
};

export function ShowMoreButton({ onClick, label = "Показати ще" }: ShowMoreButtonProps) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="rounded-lg border border-gold/50 px-6 py-2.5 text-sm font-semibold text-text-muted transition-all duration-300 hover:border-gold hover:text-text"
      >
        {label}
      </button>
    </div>
  );
}
