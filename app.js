const views = {
  setup: document.querySelector("#setupView"),
  dashboard: document.querySelector("#dashboardView"),
  results: document.querySelector("#resultsView"),
};

const tabs = [...document.querySelectorAll(".nav-tab")];
const jumpButtons = [...document.querySelectorAll("[data-view-jump]")];
const participantRange = document.querySelector("#participantRange");
const participantReadout = document.querySelector("#participantReadout");
const metricParticipants = document.querySelector("#metricParticipants");
const gameSelect = document.querySelector("#gameSelect");
const scheduleInput = document.querySelector("#scheduleInput");
const experienceSelect = document.querySelector("#experienceSelect");
const ruleSummary = document.querySelector("#ruleSummary");
const riskChecklist = document.querySelector("#riskChecklist");
const matchList = document.querySelector("#matchList");
const roundState = document.querySelector("#roundState");
const copyButton = document.querySelector("#copyAnnouncement");
const copyState = document.querySelector("#copyState");
const announcementText = document.querySelector("#announcementText");

let selectedFormat = "스쿼드 포인트 레이스";
let currentRoundReady = false;

const matches = [
  {
    id: "A-01",
    title: "Team Blue Zone vs Sanhok Lab",
    meta: "결과 검수 완료",
    status: "완료",
    tone: "done",
  },
  {
    id: "A-02",
    title: "Erangel Runners vs Vikendi Mix",
    meta: "라이브 진행 18분",
    status: "진행",
    tone: "live",
  },
  {
    id: "A-03",
    title: "Miramar Crew vs Haven Four",
    meta: "결과 제출 12분 지연",
    status: "지연",
    tone: "delay",
  },
  {
    id: "B-02",
    title: "Taego Night vs Bootcamp",
    meta: "스크린샷 불일치 신고",
    status: "검토",
    tone: "delay",
  },
];

function showView(viewName) {
  Object.entries(views).forEach(([name, view]) => {
    view.classList.toggle("is-active", name === viewName);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === viewName);
  });
}

function renderMatches() {
  matchList.innerHTML = matches
    .map(
      (match) => `
        <article class="match-card">
          <div>
            <strong>${match.id} · ${match.title}</strong>
            <small>${match.meta}</small>
          </div>
          <span class="match-status ${match.tone}">${match.status}</span>
        </article>
      `,
    )
    .join("");
}

function updateParticipants() {
  const value = participantRange.value;
  participantReadout.textContent = value;
  metricParticipants.textContent = `${value}명`;
}

function formatSchedule(value) {
  if (!value) return "대회 시작 30분 전";
  const date = new Date(value);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function generateRulebook() {
  const participants = participantRange.value;
  const game = gameSelect.value;
  const schedule = formatSchedule(scheduleInput.value);
  const experience = experienceSelect.value;

  ruleSummary.innerHTML = `
    <p><strong>${game}</strong> ${participants}명 규모의 <strong>${selectedFormat}</strong> 대회 기준으로 생성했습니다.
    ${schedule} 시작, 운영자 경험 수준은 "${experience}"로 보고 체크인과 이의제기 기준을 보수적으로 잡습니다.</p>
  `;

  riskChecklist.innerHTML = `
    <li class="done">체크인은 경기 시작 20분 전 마감, 미체크인은 대체 참가자로 자동 전환</li>
    <li class="done">결과 제출은 스크린샷 1장과 팀장 확인 버튼을 함께 요구</li>
    <li class="done">이의제기는 결과 제출 후 5분 안에 운영 채널에서만 접수</li>
    <li class="warning">동점 처리 기준은 킬 수, 생존 시간, 최종 라운드 순위 순서로 확정 필요</li>
  `;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showView(tab.dataset.view));
});

jumpButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.viewJump));
});

document.querySelectorAll(".segment").forEach((segment) => {
  segment.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("is-selected"));
    segment.classList.add("is-selected");
    selectedFormat = segment.dataset.format;
  });
});

participantRange.addEventListener("input", updateParticipants);
document.querySelector("#generateRulebook").addEventListener("click", generateRulebook);

document.querySelector("#advanceRound").addEventListener("click", () => {
  currentRoundReady = !currentRoundReady;
  roundState.textContent = currentRoundReady ? "다음 라운드 준비됨" : "진행 중";
  roundState.classList.toggle("quality-chip", currentRoundReady);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(announcementText.value);
    copyState.textContent = "복사 완료";
  } catch {
    announcementText.select();
    copyState.textContent = "텍스트 선택됨";
  }
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  participantRange.value = 48;
  selectedFormat = "스쿼드 포인트 레이스";
  currentRoundReady = false;
  document.querySelectorAll(".segment").forEach((item, index) => {
    item.classList.toggle("is-selected", index === 0);
  });
  roundState.textContent = "진행 중";
  roundState.classList.remove("quality-chip");
  copyState.textContent = "준비됨";
  ruleSummary.innerHTML =
    "<p>게임, 인원, 방식, 일정 입력값을 바탕으로 체크인 기준과 노쇼 처리, 결과 제출, 이의제기 제한 시간을 자동 제안합니다.</p>";
  riskChecklist.innerHTML = `
    <li class="done">체크인 마감 시간 명시</li>
    <li class="done">결과 제출 인증 방식 포함</li>
    <li class="warning">동점 처리 기준 확인 필요</li>
    <li class="warning">이의제기 접수 채널 확인 필요</li>
  `;
  updateParticipants();
  showView("setup");
});

renderMatches();
updateParticipants();
