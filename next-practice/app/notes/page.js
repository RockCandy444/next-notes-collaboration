import Notes from "@/components/Notes";

export const metadata = { title: "내 메모 · 작은 노트" };

export default function NotesPage() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">YOUR THOUGHTS, ALL TOGETHER</p>
        <h1>
          내 메모<span className="heading-dot">.</span>
        </h1>
        <p>흩어지는 생각을 붙잡아두는 작은 공간.</p>
      </div>
      <Notes />
    </>
  );
}
