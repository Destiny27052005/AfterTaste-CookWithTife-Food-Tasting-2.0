import { useState } from "react";
import { z } from "zod";

import QuestionBlock from "../components/QuestionBlock";
import { questions, type QuestionId, type SurveyAnswers } from "../lib/survey-data";

const textSchema = z.string().trim().max(300, "Maximum 300 characters allowed");

export default function SurveyPage() {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [loved, setLoved] = useState("");
  const [better, setBetter] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const missing = questions.filter((q) => !answers[q.id]);
  const lovedValid = textSchema.safeParse(loved).success;
  const betterValid = textSchema.safeParse(better).success;
  const hasTextError = !lovedValid || !betterValid;

  function handleSelect(questionId: QuestionId, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (missing.length > 0 || hasTextError) {
      setShowErrors(true);
      const targetId = missing[0] ? `q-${missing[0].id}` : "extra-thoughts";
      const targetElement = document.getElementById(targetId);
      targetElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      // Prepared payload ready for your API or Supabase insert
      // const payload = {
      //   answers,
      //   loved: loved.trim() || null,
      //   better: better.trim() || null,
      //   submittedAt: new Date().toISOString(),
      // };
      // await fetch("/api/survey", { method: "POST", body: JSON.stringify(payload) });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Unable to save your responses. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Added relative and z-10 to guarantee form receives clicks */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10 mx-auto grid max-w-2xl gap-5 px-4 py-12 sm:px-6 sm:py-16"
      >
        {questions.map((question, index) => (
          <div key={question.id} id={`q-${question.id}`}>
            <QuestionBlock
              question={question}
              index={index}
              value={answers[question.id]}
              onChange={handleSelect}
              invalid={showErrors && !answers[question.id]}
            />
          </div>
        ))}

        <fieldset
          id="extra-thoughts"
          className={`rounded-3xl border bg-card px-5 py-6 transition-colors sm:px-8 sm:py-8 ${
            showErrors && hasTextError ? "border-destructive" : "border-border"
          }`}
        >
          <legend className="w-full">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-spice">
              In your own words
            </p>
          </legend>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="loved-input" className="block text-sm font-medium text-foreground">
                One thing you loved
              </label>
              <span className="text-xs text-muted-foreground">{loved.length}/300</span>
            </div>
            <textarea
              id="loved-input"
              value={loved}
              onChange={(e) => setLoved(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Optional"
              className={`mt-2 w-full resize-none rounded-2xl border bg-background px-4 py-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-spice ${
                showErrors && !lovedValid ? "border-destructive" : "border-border"
              }`}
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="better-input" className="block text-sm font-medium text-foreground">
                One thing we can do better
              </label>
              <span className="text-xs text-muted-foreground">{better.length}/300</span>
            </div>
            <textarea
              id="better-input"
              value={better}
              onChange={(e) => setBetter(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Optional"
              className={`mt-2 w-full resize-none rounded-2xl border bg-background px-4 py-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-spice ${
                showErrors && !betterValid ? "border-destructive" : "border-border"
              }`}
            />
          </div>
        </fieldset>

        {showErrors && missing.length > 0 && (
          <p role="alert" className="text-center text-sm font-medium text-destructive">
            {missing.length} question{missing.length > 1 ? "s" : ""} still need an answer.
          </p>
        )}

        {serverError && (
          <p role="alert" className="text-center text-sm font-medium text-destructive">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-full bg-spice px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-spice-foreground shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send my feedback"}
        </button>

        <p className="pb-6 text-center font-mono text-xs tracking-widest text-muted-foreground">
          @cookwithtife
        </p>
      </form>
    </main>
  );
}