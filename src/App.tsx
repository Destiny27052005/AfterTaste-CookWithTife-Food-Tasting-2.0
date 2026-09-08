import { Routes, Route, Link } from "react-router-dom";
import SurveyPage from "./route/index";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  );
}

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-spice">
          404 Error
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold text-foreground sm:text-6xl">
          Lost your plate?
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you are looking for doesn't exist, has been moved, or is no longer on the menu.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-spice px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-spice-foreground shadow-warm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Back to survey
          </Link>
        </div>
      </div>
    </main>
  );
}