# node-ts-server

## 프로젝트 생성

- 새 프로젝트 생성
  mkdir my-typescript-server
  cd my-typescript-server
  npm init -y

- 타입스크립트 및 필수 패키지 설치
  npm install typescript ts-node-dev @types/node --save-dev

- 타입스크립트 설정(tsconfig.json)
  npx tsc --init

```bash
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- 코드 작성
  mkdir src
  touch src/index.ts

- package.json 스크립트 추가

```bash
"scripts": {
  "start": "node dist/index.js",
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc"
}
```

## 서버 실행

- npm run dev

## 디렉토리 구조

```bash
src/
├── controllers/
│   ├── authController.js
│   └── userController.js
├── database/
│   ├── connect
│       ├── mariadb.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── utils/
│   └── tokenUtils.js
├── index.ts
├── package.json
└── .env
```