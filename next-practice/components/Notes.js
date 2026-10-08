"use client";

import { useRef, useState } from "react";

export const INITIAL_NOTES = [
  { id: "welcome", content: "떠오른 생각을 한 줄로 남겨보세요." },
  { id: "learning", content: "오늘 배운 것 하나, 내일 시도할 것 하나." },
];

export default function Notes() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const inputRef = useRef(null);

  function resetForm() {
    setContent("");
    setEditingId(null);
    setError("");
  }
  function submit(event) {
    event.preventDefault();
    const value = content.trim();
    setNotice("");
    if (!value) {
      setError(
        "메모 내용을 입력해 주세요. 공백만 있는 내용은 저장할 수 없어요.",
      );
      inputRef.current?.focus();
      return;
    }
    if (editingId !== null) {
      setNotes((items) =>
        items.map((note) =>
          note.id === editingId ? { ...note, content: value } : note,
        ),
      );
      setNotice("메모를 수정했습니다.");
    } else {
      setNotes((items) => [
        ...items,
        { id: crypto.randomUUID(), content: value },
      ]);
      setNotice("새 메모를 등록했습니다.");
    }
    resetForm();
  }
  function edit(note) {
    setEditingId(note.id);
    setContent(note.content);
    setError("");
    setNotice("");
    inputRef.current?.focus();
  }
  function remove(note) {
    if (!window.confirm(`이 메모를 삭제할까요?\n\n${note.content}`)) return;
    setNotes((items) => items.filter((item) => item.id !== note.id));
    if (editingId === note.id) resetForm();
    setNotice("메모를 삭제했습니다.");
  }
  return (
    <>
      <div className="notes-grid">
        <section className="note-list" aria-label="메모 목록">
          <div className="section-title">
            <h2>
              모든 메모 <span className="count">{notes.length}</span>
            </h2>
            <span className="small-label">YOUR COLLECTION</span>
          </div>
          {notes.length === 0 && (
            <div className="empty panel">
              <span aria-hidden="true">▤</span>
              <h3>아직 메모가 없어요</h3>
              <p>새 메모를 작성해 보세요.</p>
            </div>
          )}
          <div className="cards">
            {notes.map((note, index) => (
              <article
                key={note.id}
                data-testid="note-card"
                data-note-id={note.id}
                className={`note-card ${editingId === note.id ? "editing" : ""}`}
              >
                <div className="note-meta">
                  <span>NOTE {String(index + 1).padStart(2, "0")}</span>
                  <span>{editingId === note.id ? "수정 중" : "나의 기록"}</span>
                </div>
                <p className="note-text">{note.content}</p>
                <div className="note-actions">
                  <span className="note-id" title={note.id}>
                    #{note.id.slice(0, 8)}
                  </span>
                  <button className="text-button" onClick={() => edit(note)}>
                    수정
                  </button>
                  <button
                    className="text-button danger"
                    onClick={() => remove(note)}
                  >
                    삭제
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="panel composer">
          <p className="eyebrow">
            {editingId !== null
              ? "A FRESH PERSPECTIVE"
              : "MAKE ROOM FOR A THOUGHT"}
          </p>
          <h2>{editingId !== null ? "메모 수정" : "새 메모"}</h2>
          <p className="composer-description">
            {editingId !== null
              ? "생각이 달라져도 괜찮아요. 다시 다듬어보세요."
              : "지금 떠오른 생각을 자유롭게 남겨보세요."}
          </p>
          <form onSubmit={submit} noValidate>
            <label htmlFor="note-content">메모 내용</label>
            <textarea
              ref={inputRef}
              id="note-content"
              rows={7}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="기억하고 싶은 생각을 적어주세요…"
              aria-invalid={!!error}
              aria-describedby={error ? "note-error" : "note-hint"}
            />
            <div className="input-foot">
              <span id="note-hint">한 줄의 기록도 충분해요.</span>
              <span>{content.length}자</span>
            </div>
            {error && (
              <p id="note-error" className="error" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions">
              {editingId !== null && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    resetForm();
                    setNotice("수정을 취소했습니다. 원래 메모를 유지합니다.");
                  }}
                >
                  수정 취소
                </button>
              )}
              <button className="primary">
                {editingId !== null ? "수정 저장" : "메모 등록"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
          <div className="composer-tip">
            <span aria-hidden="true">✳</span>
            <p>
              완벽한 문장이 아니어도 좋아요.
              <br />
              가장 좋은 기록은 지금 쓰는 기록.
            </p>
          </div>
        </section>
      </div>
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      <p className="storage-hint">새로고침하면 초기 메모로 돌아갑니다.</p>
    </>
  );
}
