import type { Question, QuestionId } from "../lib/survey-data";

type Props = {
  question: Question;
  index: number;
  value: string | undefined;
  onChange: (questionId: QuestionId, value: string) => void;
  invalid: boolean;
};

export default function QuestionBlock({
  question,
  index,
  value,
  onChange,
  invalid,
}: Props) {
  const errorId = `error-${question.id}`;

  return (
    <fieldset
      aria-describedby={invalid ? errorId : undefined}
      className={`rounded-3xl border bg-card px-5 py-6 transition-colors sm:px-8 sm:py-8 ${
        invalid ? "border-destructive" : "border-border"
      }`}
    >
      <legend className="sr-only">{question.title}</legend>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-spice">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {question.title}
        </h2>
        {question.prompt && (
          <p className="mt-1 text-sm text-muted-foreground">{question.prompt}</p>
        )}
      </div>

      <div className="mt-5 grid gap-2.5" role="radiogroup">
        {question.options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(question.id, option)}
              className={`flex w-full cursor-pointer select-none items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[0.95rem] leading-snug transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-spice focus-visible:ring-offset-2 ${
                selected
                  ? "border-spice bg-spice/10 text-foreground shadow-warm"
                  : "border-border bg-background text-foreground/85 hover:border-spice/50 hover:bg-spice/5"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-spice" : "border-border"
                }`}
              >
                <span
                  className={`size-2.5 rounded-full bg-spice transition-transform duration-150 ${
                    selected ? "scale-100" : "scale-0"
                  }`}
                />
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {invalid && (
        <p id={errorId} role="alert" className="mt-3 text-sm text-destructive">
          Pick one before you submit 🙏
        </p>
      )}
    </fieldset>
  );
}