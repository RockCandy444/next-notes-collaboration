import Link from "next/link";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">A SMALL SPACE FOR YOUR THOUGHTS</p>
        <h1>
          작은 생각을,
          <br />
          <span>오래 기억할 기록으로.</span>
        </h1>
        <p className="lead">
          떠오른 아이디어와 오늘의 배움을 한곳에 담아보세요.
          <br />
          가볍게 쓰고, 다시 읽고, 나만의 속도로 정리해요.
        </p>
        <Link className="button primary" href="/notes">
          메모 쓰러 가기 <span aria-hidden="true">↗</span>
        </Link>
        <div className="paper-art" aria-hidden="true">
          <span className="paper-label">NOTE TO SELF</span>
          <strong>
            생각은 짧게,
            <br />
            기록은 선명하게.
          </strong>
          <i />
          <i />
          <i />
          <span className="paper-star">✳</span>
          <span className="paper-foot">ONE THOUGHT AT A TIME</span>
        </div>
      </section>
      <div className="home-grid">
        <Counter />
        <section className="panel guide">
          <p className="eyebrow">YOUR LITTLE NOTEBOOK</p>
          <h2>한 줄이면 충분해요.</h2>
          <p>
            등록하고, 수정하고, 필요 없는 메모는 정리하세요.
            <br />
            같은 내용도 각각의 기록으로 남길 수 있어요.
          </p>
          <Link href="/notes">
            내 메모 열기 <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
      <p className="storage-hint">
        이 노트는 현재 화면에 머물러요. 새로고침하면 처음의 메모로 돌아갑니다.
      </p>
    </>
  );
}
