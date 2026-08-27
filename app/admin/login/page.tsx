import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-data text-xs tracking-[0.18em] text-accent uppercase">
          Portfolio Admin
        </h1>
        <p className="mt-2 mb-6 text-sm text-text-muted">
          Enter the admin password to continue.
        </p>

        <div className="border-2 border-border-strong bg-surface-raised p-5">
          <LoginForm next={next ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
