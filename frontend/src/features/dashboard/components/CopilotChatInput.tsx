import { Send } from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
}

const CopilotChatInput = ({ value, onChange, onSend }: Props) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            onSend();
        }
    };

    return (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4">

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about this business..."
                className="flex-1 bg-transparent text-[12px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />

            <button
                type="button"
                onClick={onSend}
                disabled={!value.trim()}
                className="shrink-0 text-slate-700 disabled:text-slate-300"
            >
                <Send className="h-4 w-4" />
            </button>

        </div>
    );
};

export default CopilotChatInput;