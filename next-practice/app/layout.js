import Link from "next/link";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata = {
  title: "작은 노트 · 생각을 담는 공간",
  description: "오늘의 생각과 배움을 기록하는 작은 메모 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              ▤
            </span>
            작은 노트<span className="brand-caption">LITTLE NOTES</span>
          </Link>
          <Navigation />
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <span>작은 기록이 모여, 더 큰 생각이 됩니다.</span>
          <span>LITTLE NOTES / 2026</span>
        </footer>
      </body>
    </html>
  );
}
