import { useState } from "react";
import { z } from "zod";

import QuestionBlock from "../components/QuestionBlock";
import { questions } from "../lib/survey-data";



const textSchema = z.string().trim().max(300);

export default function SurveyPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loved, setLoved] = useState("");
  const [better, setBetter] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const missing = questions.filter((q) => !answers[q.id]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validText =
      textSchema.safeParse(loved).success && textSchema.safeParse(better).success;
    if (missing.length > 0 || !validText) {
      setShowErrors(true);
      const first = document.getElementById(
        missing[0] ? `q-${missing[0].id}` : "extra-thoughts",
      );
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0 });
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-spice">
            CookWithTife
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Thank you for being at the table.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">— Tife 🖤</p>
          <p className="mt-10 font-mono text-sm tracking-widest text-spice">
            @cookwithtife
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-secondary/60 px-6 py-16 text-center sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-spice">
          CookWithTife
        </p>
        <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Food Tasting 2.0
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] text-foreground sm:text-7xl">
          How Was
          <br />
          The Food?
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-base text-muted-foreground">
          Be honest. We can take it. 😌
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto grid max-w-2xl gap-5 px-4 py-12 sm:px-6 sm:py-16"
      >
        {questions.map((question, index) => (
          <div key={question.id} id={`q-${question.id}`}>
            <QuestionBlock
              question={question}
              index={index}
              value={answers[question.id]}
              onChange={(value) =>
                setAnswers((prev) => ({ ...prev, [question.id]: value }))
              }
              invalid={showErrors && !answers[question.id]}
            />
          </div>
        ))}

        <fieldset
          id="extra-thoughts"
          className="rounded-3xl border border-border bg-card px-5 py-6 sm:px-8 sm:py-8"
        >
          <legend className="sr-only">In your own words</legend>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-spice">
            In your own words
          </p>

          <label className="mt-5 block text-sm font-medium text-foreground">
            One thing you loved
          </label>
          <textarea
            value={loved}
            onChange={(e) => setLoved(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Optional"
            className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-spice"
          />

          <label className="mt-5 block text-sm font-medium text-foreground">
            One thing we can do better
          </label>
          <textarea
            value={better}
            onChange={(e) => setBetter(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Optional"
            className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-spice"
          />
        </fieldset>

        {showErrors && missing.length > 0 && (
          <p className="text-center text-sm text-destructive">
            {missing.length} question{missing.length > 1 ? "s" : ""} still need an
            answer.
          </p>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-spice px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-spice-foreground shadow-warm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Send my feedback
        </button>

        <p className="pb-6 text-center font-mono text-xs tracking-widest text-muted-foreground">
          @cookwithtife
        </p>
      </form>
    </main>
  );
}
