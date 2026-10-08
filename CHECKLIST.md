# 공동 점검표

- [x] 각 작업 브랜치에서 서로 다른 파일 커밋
- [x] PR 생성 뒤 민수 보완 커밋 반영
- [x] 두 PR의 Files changed 검토 및 merge commit 병합
- [x] 양쪽 main에서 pull 후 minsu.md와 jiyun.md 확인
- [x] Next.js 앱 및 DB 연결 검증 결과는 VERIFICATION.md에서 확인

## 과제 요구사항 확인

| 번호 | 요구사항 | 구현·실제 근거 |
| --- | --- | --- |
| 필수 1 | 동일 origin의 두 clone | GIT_WORK.md, git-commands.txt의 clone·remote 출력 |
| 필수 2 | 각 브랜치의 서로 다른 파일·커밋 | feature/minsu·feature/jiyun, minsu.md·jiyun.md |
| 필수 3 | 전환 차이와 로컬 merge 방향 | 양쪽 main에서 ls-files·git merge, GIT_WORK 답변 |
| 필수 4 | push와 main base PR 두 개 | PR #1·#2 |
| 필수 5 | PR 생성 후 보완 커밋 | PR #1의 두 커밋, 같은 브랜치 push |
| 필수 6 | diff 검토·merge commit | PR #1·#2 본문·mergeCommit, 실제 gh pr diff |
| 필수 7 | 양쪽 main pull | PR #2 병합 후 양쪽 파일·pull 출력 |
| 필수 8 | 새 작업·새 PR·양쪽 pull·브랜치 정리 | PR #3 feature/checklist, branch -d 출력 |
| 필수 9 | 공식 JS·App Router 프로젝트와 관계 설명 | create-next-app 기본 화면 실행, README |
| 필수 10 | page·layout 화면과 역할 설명 | app/layout.js·page.js·notes/page.js, README |
| 필수 11 | Link 홈·메모 이동 | Navigation·layout·page, state 첫 테스트 |
| 필수 12 | use client·useState Counter | Counter.js, 00→02→00 브라우저 확인 |
| 필수 13 | map·고유 ID key | Notes.js, 중복 내용 UUID 확인 |
| 필수 14 | 입력 state·폼·고유 ID 등록 | Notes.js content·submit·crypto.randomUUID |
| 필수 15 | 수정 표시·ID 저장·취소 | state 두 번째 테스트 |
| 필수 16 | 삭제 확인·취소·편집 대상 삭제 초기화 | window.confirm·filter, state 두 번째 테스트 |
| 필수 17 | 빈 값·공백 안내·기존 메모 보존 | trim 검사, 브라우저 공백 등록·수정 확인 |
| 필수 18 | 빈 목록·새로고침과 DB 차이 | Notes.js 빈 목록, README, 브라우저 reload |
| 필수 19 | build·start와 홈·메모 검증 | state-build·start-servers·production-browser-tests |
| 필수 20 | 실행 소스·문서·실제 기록 | 두 package-lock, README·GIT_WORK·VERIFICATION·evidence |
| 선택 1 | 실제 같은 줄 충돌과 같은 PR 해결 | PR #4·#5, UU README.md·해결 커밋·양쪽 pull |
| 선택 2 | Next.js 변경의 새 PR 흐름 | PR #6, Notes.js·빈 목록 화면·검사·병합·pull |
| 선택 3 | 기존 API 목록·상세·등록·DB 유지 | mini-watch/monitor/next-frontend, database 첫 테스트 |
| 선택 4 | PUT·DELETE·취소·400·404·DB 유지 | database 두 테스트, PostgreSQL 통합 검사 |
