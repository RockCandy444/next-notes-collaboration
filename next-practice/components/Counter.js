"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <section className="panel counter">
      <div>
        <p className="eyebrow">ONE STEP AT A TIME</p>
        <h2>작은 시작, 한 번 더.</h2>
        <p>버튼을 누르며 작은 변화를 만들어 보세요.</p>
      </div>
      <div className="counter-row">
        <output aria-label="현재 숫자" aria-live="polite">
          {count.toString().padStart(2, "0")}
        </output>
        <div className="counter-actions">
          <button
            className="primary"
            onClick={() => setCount((value) => value + 1)}
          >
            숫자 증가 +
          </button>
          <button className="secondary" onClick={() => setCount(0)}>
            초기화
          </button>
        </div>
      </div>
    </section>
  );
}
