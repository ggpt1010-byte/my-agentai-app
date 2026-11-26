import { lazy, type ComponentType, type LazyExoticComponent } from "react";

// 새 앱 모듈을 추가할 때는 이 목록에 한 줄을 넣고 src/apps/<id>/ 폴더를 만듭니다.
export type AppEntry = {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  ready: boolean;
  component?: LazyExoticComponent<ComponentType>;
};

export const apps: AppEntry[] = [
  { id: "ucsb", name: "미국 방문", desc: "UCSB 방문연수 플래너 · 항공권, 집, 예산, 체크리스트", emoji: "✈️", color: "#2f7165", ready: true, component: lazy(() => import("../apps/ucsb")) },
  { id: "budget", name: "가계부", desc: "수입·지출 기록과 월별 정리", emoji: "💰", color: "#c8907b", ready: false, component: lazy(() => import("../apps/budget")) },
  { id: "games", name: "게임", desc: "잠깐 쉬어 가는 미니 게임", emoji: "🎮", color: "#8f9fba", ready: false, component: lazy(() => import("../apps/games")) },
];
