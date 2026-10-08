import { test, expect } from "@playwright/test";

test("홈 숫자 증가·초기화와 Link 이동", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("status", { name: "현재 숫자" })).toHaveText("00");
  await page.getByRole("button", { name: "숫자 증가 +" }).click();
  await page.getByRole("button", { name: "숫자 증가 +" }).click();
  await expect(page.getByRole("status", { name: "현재 숫자" })).toHaveText("02");
  await page.getByRole("button", { name: "초기화" }).click();
  await expect(page.getByRole("status", { name: "현재 숫자" })).toHaveText("00");
  await page.screenshot({ path: "../evidence/state-home.png", fullPage: true });
  await page.getByRole("link", { name: "내 메모", exact: true }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.getByTestId("note-card")).toHaveCount(2);
});

test("중복 내용의 고유 ID·수정 취소·공백 오류·삭제 취소·편집 중 삭제·빈 목록·초기화", async ({ page }) => {
  await page.goto("/notes");
  const input = page.getByLabel("메모 내용", { exact: true });
  const cards = page.getByTestId("note-card");
  await input.fill("   ");
  await page.getByRole("button", { name: "메모 등록" }).click();
  await expect(page.locator("#note-error")).toContainText("공백");
  await expect(cards).toHaveCount(2);
  for (let n = 0; n < 2; n++) {
    await input.fill("같은 메모");
    await page.getByRole("button", { name: "메모 등록" }).click();
    await expect(cards).toHaveCount(3 + n);
  }
  const idA = await cards.nth(2).getAttribute("data-note-id");
  const idB = await cards.nth(3).getAttribute("data-note-id");
  expect(idA).not.toBe(idB);
  await cards.nth(2).getByRole("button", { name: "수정", exact: true }).click();
  await expect(input).toHaveValue("같은 메모");
  await input.fill("취소할 변경");
  await page.getByRole("button", { name: "수정 취소" }).click();
  await expect(cards.nth(2)).toContainText("같은 메모");
  await cards.nth(2).getByRole("button", { name: "수정", exact: true }).click();
  await input.fill(" \n ");
  await page.getByRole("button", { name: "수정 저장" }).click();
  await expect(page.locator("#note-error")).toBeVisible();
  await expect(cards.nth(2)).toContainText("같은 메모");
  await input.fill("한쪽만 수정됨");
  await page.getByRole("button", { name: "수정 저장" }).click();
  await expect(cards.nth(2)).toContainText("한쪽만 수정됨");
  await expect(cards.nth(3)).toContainText("같은 메모");
  page.once("dialog", (dialog) => dialog.dismiss());
  await cards.nth(2).getByRole("button", { name: "삭제", exact: true }).click();
  await expect(cards).toHaveCount(4);
  await cards.nth(2).getByRole("button", { name: "수정", exact: true }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await cards.nth(2).getByRole("button", { name: "삭제", exact: true }).click();
  await expect(cards).toHaveCount(3);
  await expect(input).toHaveValue("");
  await expect(page.getByRole("button", { name: "메모 등록" })).toBeVisible();
  await expect(cards.nth(2)).toContainText("같은 메모");
  while (await cards.count()) {
    page.once("dialog", (dialog) => dialog.accept());
    await cards.first().getByRole("button", { name: "삭제", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "아직 메모가 없어요" })).toBeVisible();
  await page.getByRole("button", { name: "첫 메모 쓰기" }).click();
  await expect(input).toBeFocused();
  await page.screenshot({ path: "../evidence/state-empty-guide.png", fullPage: true });
  await page.reload();
  await expect(cards).toHaveCount(2);
  await expect(page.getByText("떠오른 생각을 한 줄로 남겨보세요.")).toBeVisible();
  await page.screenshot({ path: "../evidence/state-notes.png", fullPage: true });
});

test("모바일 메모 화면에 가로 넘침 없음", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/notes");
  await expect(page.getByLabel("메모 내용", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "../evidence/state-mobile.png", fullPage: true });
});
