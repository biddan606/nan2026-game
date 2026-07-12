# STILL ALIVE — 멈춰야 산다

**멈춰 서야 강해지는** 서바이벌 액션. 집중 게이지는 멈춰 있을 때만 차고, 그 게이지로 대시와 불릿타임을 산다. NAN 2026 (NHN Game × AI Hackathon) 사전 과제 출품작.

## 플레이

- 웹 (링크 클릭 즉시 플레이): **https://biddan606.github.io/still-alive/**
- 조작: WASD/방향키 이동, 스페이스 대시 (예정). 공격은 자동.
- 멈추면 세상도 거의 멈춘다. 움직이는 순간 적도, 탄막도, 시간도 함께 달린다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 외부 에셋

- 스프라이트: [Tiny Swords](https://pixelfrog-assets.itch.io/tiny-swords) by Pixel Frog — **구버전 "TS_old version_CC0 Licensed" 사용 (CC0 1.0, 퍼블릭 도메인)**. 신버전(Free Pack)은 재배포 금지 조항이 있어 public 리포에 부적합하므로 CC0 명시 구버전을 채택함.
- 사운드: 외부 에셋 없음 — WebAudio 신스로 코드 생성.

## 문서

- [CONTEXT.md](./CONTEXT.md) — 프로젝트 용어집
- [docs/adr/](./docs/adr/) — 아키텍처 결정 기록
- [docs/ai-log/](./docs/ai-log/) — AI 활용 일지 (제출용 AI 활용 기술 문서의 원료)

## 제출물 체크리스트 (마감 2026-08-10 23:59)

- [ ] 플레이 가능한 웹 빌드 (GitHub Pages) + 소스 코드 (이 리포)
- [ ] 플레이 영상 30~60초 (YouTube, 실제 플레이 화면)
- [ ] 게임 소개 및 설명 문서 (PDF)
- [ ] AI 활용 기술 문서 (PDF)
