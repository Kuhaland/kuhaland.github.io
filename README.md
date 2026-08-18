# kuhaland.github.io

17년차 웹퍼블리셔 **이형화(kuhaland)** 의 개인 포트폴리오 사이트입니다.
Vue 3 · Vite · SCSS · GSAP로 만든 스크롤 인터랙션 기반 단일 페이지입니다.

**Live** · <https://kuhaland.github.io>

---

## 화면 구성

좌측 **LNB 메뉴** — 가운데 **본문(Stage)** — 우측 **상세 패널**의 3-컬럼 레이아웃입니다.
본문은 마우스 휠 · 터치 · 방향키로 섹션이 세로로 전환되고, 선택한 항목에 맞춰 상세 패널 내용이 함께 바뀝니다.

| 섹션 | 내용 |
| --- | --- |
| 소개 | 헤드라인, 코드 타이핑 배경, 핵심 역량·기술 스택 |
| 경력 | 곡선 타임라인. 스크롤할 때마다 시점이 이동하며 회사별 상세를 표시 |
| 작업 | 프로젝트를 가로 슬라이드로 순회 |
| 기술 | 프레임워크 · 스타일링 · 모션 스택 소개 |
| 연락처 | 이메일 · 전화 · GitHub · 포트폴리오 링크 |

### 주요 인터랙션

- **섹션 전환** — 경력과 작업은 내부 항목을 하나씩 지나간 뒤 다음 섹션으로 이어집니다
- **경력 타임라인** — 베지어 곡선 위 노드를 따라 진행선이 차오르고, 활성 노드에 pulse 애니메이션 표시
- **이용 안내 오버레이** — 최초 진입 시 레이아웃 각 영역을 화살표로 설명. 영역에 마우스를 올리면 해당 영역만 밝아지고, 20초간 조작이 없으면 자동으로 닫힙니다. LNB 하단 `이용안내` 버튼으로 다시 열 수 있습니다
- **진입 애니메이션** — GSAP 기반. 경력 헤드는 좌→우, 카운터는 우→좌로 순차 등장

---

## 기술 스택

![Vue.js](https://img.shields.io/badge/Vue.js%203-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=flat-square&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

- **Vue 3** Composition API (`<script setup>`)
- **Vite 6** 개발 서버 및 번들링
- **SCSS** BEM 클래스 구조, 변수·믹스인 분리, 디자인 토큰을 CSS 변수로 노출
- **GSAP** 섹션 진입 리빌 애니메이션
- **OverlayScrollbars** 상세 패널 커스텀 스크롤바

---

## 시작하기

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 (http://localhost:5173)
npm run build   # 프로덕션 빌드 → dist/
npm run preview # 빌드 결과 미리보기
```

Node.js 20 이상을 권장합니다.

---

## 프로젝트 구조

```
src/
├─ App.vue                 레이아웃 조립, 섹션·항목 상태 관리
├─ components/
│  ├─ SideNav.vue          LNB 메뉴, 접기 토글, 이용안내 버튼
│  ├─ MainContent.vue      섹션 전환(휠·터치·키보드) 제어
│  ├─ DetailPanel.vue      우측 상세 패널
│  ├─ IntroOverlay.vue     이용 안내 오버레이
│  ├─ SentenceText.vue     문장 단위 줄바꿈 렌더링
│  ├─ AppIcon.vue          Material Symbols 아이콘
│  └─ sections/            소개·경력·작업·기술·연락처 섹션
├─ composables/
│  └─ useSectionReveal.js  섹션 진입 애니메이션 (옵션으로 방향·속도 지정)
├─ data/                   화면에 표시되는 모든 콘텐츠
│  ├─ menu.js              메뉴 항목, 소개·연락처 내용
│  ├─ career.js            경력 5건, 회사 CI 자동 매칭
│  └─ projects.js          작업 프로젝트 12건
├─ utils/text.js           마침표 기준 문장 분리
└─ assets/styles/          변수 · 믹스인 · 전역 스타일
```

---

## 콘텐츠 수정

화면 문구와 항목은 모두 `src/data/` 안에서 관리합니다. 컴포넌트를 건드릴 필요가 없습니다.

- **메뉴·소개·연락처** → `menu.js`
- **경력** → `career.js` (기간·직급·담당 업무·주요 직무)
- **작업 프로젝트** → `projects.js`

### 회사 CI 추가

`src/assets/images/ci/` 에 **회사 영문명**으로 이미지를 넣으면 경력 상세 패널에 자동으로 표시됩니다.
`png` · `jpg` · `svg` · `webp` 를 지원하며, 파일이 없으면 영문명에서 만든 모노그램이 대신 표시됩니다.

```
src/assets/images/ci/smartscore.jpg   → 주식회사 스마트스코어
src/assets/images/ci/plusn.jpg        → (주)플러스앤
```

---

## 반응형 · 접근성

- 루트 폰트 크기를 `clamp()` 로 지정해 **해상도에 따라 폰트와 여백이 함께 조절**됩니다 (14px ~ 18px)
- 모든 스타일 단위를 `rem` 으로 통일 (테두리 두께·브레이크포인트 제외)
- 860px 이하에서는 3-컬럼이 세로로 쌓이고, 경력 타임라인은 세로 목록으로 전환됩니다
- 세로 해상도가 낮은 화면(휴대용 모니터 등)에서도 콘텐츠가 잘리지 않도록 높이 기준 미디어쿼리를 적용했습니다
- 시맨틱 마크업, 아이콘 버튼 `aria-label`, `:focus-visible` 포커스 스타일, `prefers-reduced-motion` 대응

---

## 배포

`main` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages로 배포합니다.
설정은 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 을 참고하세요.

---

## 연락처

- **Email** · [leehx78@gmail.com](mailto:leehx78@gmail.com)
- **GitHub** · [github.com/Kuhaland](https://github.com/Kuhaland)
