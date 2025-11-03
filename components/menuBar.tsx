import Link from 'next/link';

type MenuBarProps = {
  onSignInClick?: () => void;
};

export default function MenuBar({ onSignInClick }: MenuBarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-lg font-semibold">
            BadGroceries
          </Link>
          <Link href="/companies" className="hover:underline">
            Search For Companies
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>

        <button
          type="button"
          onClick={onSignInClick}
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          Sign In
        </button>
      </nav>
    </header>
  );
}