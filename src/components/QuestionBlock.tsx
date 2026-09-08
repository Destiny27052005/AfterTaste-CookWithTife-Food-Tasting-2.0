import type { Question } from "../lib/survey-data";

type Props = {
  question: Question;
  index: number;
  value: string | undefined;
  onChange: (value: string) => void;
  invalid: boolean;
};

export default function QuestionBlock({ question, index, value, onChange, invalid }: Props) {
  return (
    <fieldset
      className={`rounded-3xl border bg-card px-5 py-6 transition-colors sm:px-8 sm:py-8 ${
        invalid ? "border-destructive" : "border-border"
      }`}
    >
      <legend className="sr-only">{question.title}</legend>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-spice">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
        {question.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{question.prompt}</p>

      <div className="mt-5 grid gap-2.5">
        {question.options.map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-[0.95rem] leading-snug transition-all duration-200 ${
                selected
                  ? "border-spice bg-spice/10 text-foreground shadow-warm"
                  : "border-border bg-background text-foreground/85 hover:border-spice/50 hover:bg-spice/5"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-spice" : "border-border"
                }`}
              >
                <span
                  className={`size-2.5 rounded-full bg-spice transition-transform ${
                    selected ? "scale-100" : "scale-0"
                  }`}
                />
              </span>
              {option}
            </label>
          );
        })}
      </div>

      {invalid && (
        <p className="mt-3 text-sm text-destructive">Pick one before you submit 🙏</p>
      )}
    </fieldset>
  );
}
