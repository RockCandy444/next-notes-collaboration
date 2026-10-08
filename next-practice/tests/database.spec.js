import { test, expect } from "@playwright/test";

test.skip(!process.env.TEST_DATABASE_UI, "Run only with the disposable PostgreSQL verification server.");
const origin = "http://127.0.0.1:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(`${origin}/notes`);
  await page.getByLabel("아이디", { exact: true }).fill("task50_tester");
  await page.getByLabel("비밀번호", { exact: true }).fill("task50-test-only-password");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.getByRole("heading", { name: "관찰 메모." })).toBeVisible();
});

test("PostgreSQL 목록·상세·등록·수정 취소·공백 400·수정 저장·새로고침·삭제 취소·삭제 유지·404", async ({ page }) => {
  const title = `task50 browser persistence ${Date.now()}`;
  await page.getByRole("button", { name: "새 메모", exact: true }).click();
  await page.getByLabel("제목", { exact: true }).fill(title);
  await page.getByLabel("내용", { exact: true }).fill("DB에 저장하고 새로고침으로 다시 조회");
  await page.getByRole("button", { name: "메모 저장" }).click();
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole("button").filter({ hasText: title }).click();
  await expect(page.getByText("DB에 저장하고 새로고침으로 다시 조회", { exact: true })).toBeVisible();
  const list = await page.request.get(`${origin}/api/notes`);
  const saved = (await list.json()).notes.find((note) => note.title === title);
  expect(saved).toBeTruthy();
  const initialDetail = await page.request.get(`${origin}/api/notes/${saved.id}`);
  const originalBody = (await initialDetail.json()).note.body;
  await page.getByRole("button", { name: "수정", exact: true }).click();
  await expect(page.getByLabel("제목", { exact: true })).toHaveValue(title);
  await page.getByLabel("제목", { exact: true }).fill("cancelled change");
  await page.getByRole("button", { name: "취소", exact: true }).click();
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  await page.getByRole("button", { name: "수정", exact: true }).click();
  await page.getByLabel("내용", { exact: true }).fill("   ");
  const failed = page.waitForResponse((response) => response.url().endsWith(`/api/notes/${saved.id}`) && response.request().method() === "PUT");
  await page.getByRole("button", { name: "메모 저장" }).click();
  expect((await failed).status()).toBe(400);
  await expect(page.locator(".note-form [role=alert]")).toBeVisible();
  await expect(page.getByText("메모를 저장했습니다.", { exact: true })).toHaveCount(0);
  const preserved = await page.request.get(`${origin}/api/notes/${saved.id}`);
  expect((await preserved.json()).note.body).toBe(originalBody);
  await page.getByLabel("내용", { exact: true }).fill("수정된 DB 내용");
  await page.getByLabel("처리 상태", { exact: true }).selectOption("완료");
  await page.getByRole("button", { name: "메모 저장" }).click();
  await expect(page.getByText("수정된 DB 내용", { exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole("button").filter({ hasText: title }).click();
  await expect(page.getByText("수정된 DB 내용", { exact: true })).toBeVisible();
  await page.screenshot({ path: "../evidence/database-notes.png", fullPage: true });
  await page.getByRole("button", { name: "삭제", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "취소", exact: true }).click();
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  await page.getByRole("button", { name: "삭제", exact: true }).click();
  await page.getByRole("button", { name: "삭제 확인", exact: true }).click();
  await expect(page.getByText("메모를 삭제했습니다.", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button").filter({ hasText: title })).toHaveCount(0);
  for (const method of ["get", "put", "delete"]) {
    const response = await page.request[method](`${origin}/api/notes/${saved.id}`, { data: { title: "valid", body: "valid" } });
    expect(response.status()).toBe(404);
  }
});

test("없는 메모 수정·삭제는 오류 안내하고 성공 표시 안 함", async ({ page }) => {
  await page.getByRole("button", { name: "새 메모", exact: true }).click();
  await page.getByLabel("제목", { exact: true }).fill("missing-note-test");
  await page.getByLabel("내용", { exact: true }).fill("another client will delete this note");
  await page.getByRole("button", { name: "메모 저장" }).click();
  await expect(page.getByRole("heading", { name: "missing-note-test", exact: true })).toBeVisible();
  const response = await page.request.get(`${origin}/api/notes`);
  const note = (await response.json()).notes.find((item) => item.title === "missing-note-test");
  await page.getByRole("button", { name: "수정", exact: true }).click();
  expect((await page.request.delete(`${origin}/api/notes/${note.id}`)).status()).toBe(200);
  await page.getByRole("button", { name: "메모 저장" }).click();
  await expect(page.locator(".note-form [role=alert]")).toContainText("메모를 찾을 수 없습니다");
  await expect(page.getByLabel("제목", { exact: true })).toHaveValue("missing-note-test");
  await expect(page.getByText("메모를 저장했습니다.", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "취소", exact: true }).click();
  await page.getByRole("button", { name: "삭제", exact: true }).click();
  await page.getByRole("button", { name: "삭제 확인", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText("메모를 찾을 수 없습니다");
  await expect(page.getByText("메모를 삭제했습니다.", { exact: true })).toHaveCount(0);
});
