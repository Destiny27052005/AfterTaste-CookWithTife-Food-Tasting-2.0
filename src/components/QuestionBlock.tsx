import type { Question } from "../lib/survey-data";

type Props = {
  question: Question;
  index: number;
  value: string | undefined;
  onChange: (value: string) => void;
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
      <legend className="w-full">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-spice">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {question.title}
        </h2>
      </legend>

      {question.prompt && (
        <p className="mt-1 text-sm text-muted-foreground">{question.prompt}</p>
      )}

      <div className="mt-5 grid gap-2.5" role="radiogroup">
        {question.options.map((option) => {
          const selected = value === option;
          const inputId = `${question.id}-${option}`;

          return (
            <label
              key={option}
              htmlFor={inputId}
              className={`group flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-[0.95rem] leading-snug transition-all duration-200 has-focus-visible:ring-2 has-focus-visible:ring-spice has-focus-visible:ring-offset-2 ${
                selected
                  ? "border-spice bg-spice/10 text-foreground shadow-warm"
                  : "border-border bg-background text-foreground/85 hover:border-spice/50 hover:bg-spice/5"
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name={question.id}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-spice" : "border-border group-hover:border-spice/60"
                }`}
              >
                <span
                  className={`size-2.5 rounded-full bg-spice transition-transform duration-150 ${
                    selected ? "scale-100" : "scale-0"
                  }`}
                />
              </span>
              <span>{option}</span>
            </label>
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