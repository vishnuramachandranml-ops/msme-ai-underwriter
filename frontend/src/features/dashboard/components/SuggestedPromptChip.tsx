interface Props {
    label: string;
    onClick: (label: string) => void;
}

const SuggestedPromptChip = ({ label, onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={() => onClick(label)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-left text-[10px] font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
            {label}
        </button>
    );
};

export default SuggestedPromptChip;