-- UCSB 방문 플래너 저장 테이블 (기존 앱과 같은 구조)
CREATE TABLE IF NOT EXISTS `planners` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL
);
