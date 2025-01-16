# vue3-ts-vite

## Concept

### TypeScript 기반 Vue.js 3 + pinia

- TypeScript 기반 개발: 정적 타입 검사를 통해 코드의 안정성과 유지보수성을 향상시킵니다.
- Vue.js 3 사용: 최신 Vue.js 버전을 활용하여 효율적인 컴포넌트 기반 개발을 지원합니다.
- Pinia 상태 관리: 애플리케이션의 상태 관리를 위해 Pinia를 사용하여 중앙 집중식 상태 관리를 구현합니다.
- Vite 빌드 도구: 빠른 개발 서버와 최적화된 빌드를 제공하는 Vite를 사용하여 개발 효율성을 높입니다.

### FSD(Feature-Sliced Design) 아키텍처 적용

- 균일성
- 변경과 리팩토링에 대한 안정성
- 로직 재사용을 통제
- 비즈니스와 사용자 요구에 대한 지향성

## Project Setup

```sh

# install dependencies
npm install

# Compile and Hot-Reload for Development
npm run dev

# Type-Check, Compile and Minify for Production
npm run build

# Lint with [ESLint](https://eslint.org/)
npm run lint
```

## 디렉토리 구조

```bash
src/
├── app/                # 앱을 실행하는 모든 것 - 라우팅, 진입점, 전역 스타일, 프로바이더.
│   ├── assets/
│   ├── layout/
│   ├── router/
│   ├── stores/
│
├── entities/           # 프로젝트가 다루는 비즈니스 엔티티, 예를 들어 user 또는 product.
│
├── features/           # 제품 전반에 걸쳐 재사용되는 기능 구현체로, 사용자에게 실질적인 비즈니스 가치를 제공하는 동작.
│   ├── todo/
│   │   ├── components/
│   │   │   ├── TodoList.vue
│   │   │   ├── TodoItem.vue
│   │   │   ├── AddTodo.vue
│   │   ├── store/
│   │   │   ├── useTodoStore.ts
│   ├── memo/
│   │   ├── components/
│   │   ├── index.ts
│
├── pages/              # 전체 페이지 또는 중첩 라우팅에서 페이지의 주요 부분.
│   ├── todo/
│
├── shared/             # 재사용 가능한 기능
│       ├── components/
│       ├── utils/
│       ├── types/
│
├── App.vue
├── main.ts
```
