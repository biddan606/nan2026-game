import { defineConfig } from 'vite';

// GitHub Pages는 https://<user>.github.io/<repo>/ 경로로 서빙되므로
// Actions 빌드에서만 base를 리포 이름으로 맞춘다. 로컬은 '/'.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  base: repo ? `/${repo}/` : '/',
});
