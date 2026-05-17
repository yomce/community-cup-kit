# KRAFTON Community Cup Kit

Publishing Platform PM Internship 과제 3번 `소규모 eSports 대회 운영 지원` 제출 패키지입니다.

## Concept

30-50명 규모의 커뮤니티 eSports 대회를 처음 운영하는 사람이 `기획 -> 모집 -> 체크인 -> 대회 진행 -> 결과 공유`까지 완주할 수 있도록 돕는 노코드 운영 지원 툴입니다.

핵심 문제는 대진표 생성 자체가 아니라, 대회 당일 운영자가 노쇼, 지연 경기, 결과 제출, 이의제기, 다음 라운드 공지를 한 번에 처리해야 하는 병목입니다.

## Deliverables

- 제안서 PPT: [deliverables/KRAFTON_Community_Cup_Kit_Assignment3.pptx](deliverables/KRAFTON_Community_Cup_Kit_Assignment3.pptx)
- 정적 프로토타입: [index.html](index.html)

## Prototype Screens

1. 대회 생성
   - 게임, 참가자 수, 경기 방식, 일정, 운영 채널 입력
   - AI 룰북 초안 생성
   - 모집 페이지 발행 CTA

2. 라이브 운영 대시보드
   - 체크인 현황
   - 지연 경기, 결과 제출, 이의제기 리스크 큐
   - 매치 진행 상태와 운영 체크리스트

3. 결과 공유
   - 우승자 카드
   - 최종 순위표
   - 커뮤니티 공지 초안 복사

## Open Locally

별도 빌드가 필요 없는 정적 웹페이지입니다.

```bash
open index.html
```

Linux 환경에서는 파일 매니저나 브라우저에서 `index.html`을 직접 열면 됩니다.

## KPI

- North Star Metric: 대회 완주율
- 생성 완료율: 대회 생성 시작자 중 모집 페이지 발행까지 완료한 비율
- 체크인 완료율: 신청자 중 대회 시작 전 체크인을 완료한 비율
- 결과 제출 지연률: 경기 종료 후 N분 내 결과 미제출 비율
- 운영자 수동 공지 횟수: 운영자가 직접 작성한 반복 공지 수
- 재개최율: 운영자가 30일 또는 60일 내 다음 대회를 생성한 비율

## AI Usage

- ChatGPT: 과제 선택 기준 정리, 문제 구조화, KPI 초안, 경쟁사 비교 관점 정리
- Codex: 정적 프로토타입 구현, PPT 산출물 구성 보조, 제출물 README 정리

AI는 기획 방향을 보조하고 산출물 제작 시간을 줄이는 용도로 활용했습니다. 최종 제안의 중심은 초보 커뮤니티 운영자의 대회 완주 문제와 이를 검증할 KPI 정의입니다.
