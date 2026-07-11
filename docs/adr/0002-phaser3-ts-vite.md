# Phaser 3 + TypeScript + Vite, GitHub Pages 배포

혼자, 게임 개발 무경험, 30일, AI 주도 개발이라는 제약에서 엔진을 골랐다. Unity/Godot은 에디터 학습 비용과 바이너리(씬) 파일 탓에 AI 보조 품질과 커밋 가독성이 떨어지고, Godot 4 웹 익스포트는 GitHub Pages에서 SharedArrayBuffer 헤더 문제(coi-serviceworker 필요)가 있다. Phaser 3는 코드가 전부 텍스트라 Claude Code 보조가 가장 강하고, 심사자가 커밋 diff를 읽을 수 있으며, Vite 빌드를 GitHub Actions로 Pages에 올리면 배포 마찰이 없다.
