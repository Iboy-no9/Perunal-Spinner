import { SpinningWheel } from "@/components/spinning-wheel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center" style={{ color: "hsl(var(--accent))" }}>
          പെരുന്നാൾ പൈസ
        </h1>
        <p className="text-lg text-center text-muted-foreground max-w-xl">
          Spin the wheel and try your luck to win exciting prizes this Perunnal!
        </p>
        
        <SpinningWheel />
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Perunnal Spinner. Celebrate responsibly!</p>
        </footer>
      </div>
    </main>
  );
}
