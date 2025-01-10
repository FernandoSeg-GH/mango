import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full flex-1 items-center justify-center gap-6">
      <Link href="/exercise1" className="border px-6 py-3 rounded font-semibold shadow-sm">Exercise 1</Link>
      <Link href="/exercise2" className="border px-6 py-3 rounded font-semibold shadow-sm">Exercise 2</Link>
    </div>
  );
}
