// scripts.js

function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

function redirectTo(url) {
  window.open(url, "_blank");
}

// Placeholder for future API integration
function fetchAPI() {
  document.querySelector(".api-text").textContent = "Loading data...";
  // Add API call logic here
}

// Mock data for magazines
// Mock data for magazines
const magazines = [
  {
    title: "Magazine Title 1",
    img: "preview1.png",
    link: "test2.html",
    id: 1,
    description: "this is 1"
  },
  {
    title: "Magazine Title 2",
    img: "preview2.png",
    link: "magazine2.html",
    id: 2,
    description: "this is 2"
  },
  {
    title: "Magazine Title 3",
    img: "preview3.png",
    link: "magazine3.html",
    id: 3,
    description: "this is 3"
  },
  {
    title: "Magazine Title 4",
    img: "preview4.png",
    link: "magazine4.html",
    id: 4,
    description: "this is 4"
  },
  {
    title: "Magazine Title 5",
    img: "preview5.png",
    link: "test.html",
    id: 5,
    description: "this is 5"
  },
  {
    title: "Magazine Title 6",
    img: "preview6.png",
    link: "magazine2.html",
    id: 6,
    description: "this is 6"
  },
];

// 배너 슬라이더 애니메이션
const slider = document.querySelector(".banner-slider");
const items = document.querySelectorAll(".banner-item");
let currentIndex = 0; // 현재 이미지 인덱스
const totalImages = items.length;

function slideBanner() {
  // 다음 이미지로 이동
  currentIndex = (currentIndex + 1) % totalImages;

  // 슬라이더 이동
  slider.style.transform = `translateX(-${currentIndex * 66}vw)`;
}

// 클릭 이벤트 설정
function handleBannerClick() {
  const currentItem = items[currentIndex];
  const link = currentItem.getAttribute("data-link");

  if (link) {
    window.open(link, "_blank"); // 새 탭에서 링크 열기
  }
}

// 각 이미지에 클릭 이벤트 적용
items.forEach((item) => {
  const link = item.getAttribute("data-link");
  if (!link) {
    item.classList.add("no-link"); // 링크가 없는 경우 클릭 비활성화
  }

  item.addEventListener("click", () => {
    if (item === items[currentIndex]) handleBannerClick(); // 현재 활성화된 이미지에서만 클릭 가능
  });
});

// 일정 시간마다 슬라이더 이동
setInterval(slideBanner, 4000);

// Function to render magazines
function renderMagazines(filteredMagazines) {
  const magazineList = document.getElementById("magazine-list");
  magazineList.innerHTML = ""; // Clear existing magazines

  if (filteredMagazines.length === 0) {
    magazineList.innerHTML = `<p>No results found.</p>`;
    return;
  }

  filteredMagazines.forEach((magazine) => {
    const magazineDiv = document.createElement("div");
    magazineDiv.className = "magazine";
    magazineDiv.innerHTML = `
            <img src="${magazine.img}" alt="${magazine.title}">
            <p>${magazine.title}</p>
        `;

    // Add onclick event to show modal
    magazineDiv.onclick = () => {
      const modal = document.getElementById('magazine-modal');
      document.getElementById('modal-image').src = magazine.img;
      document.getElementById('modal-title').textContent = magazine.title;
      document.getElementById('modal-description').textContent = magazine.description;

      // 모달 창의 버튼 업데이트: 잡지 링크로 연결
      const viewMagazineButton = document.getElementById('view-magazine');
      viewMagazineButton.onclick = () => {
        window.location.href = magazine.link; // 현재 탭에서 링크 열기
      };

      modal.style.display = 'flex'; // Show modal

      // ESC 키로 모달 닫기 활성화
      document.addEventListener('keydown', handleEscClose);
    };

    magazineList.appendChild(magazineDiv);
  });

  // Close modal when clicking on the close button
  document.querySelector(".close").onclick = function () {
    closeModal();
  };

  document.getElementById("magazine-modal").onclick = function (event) {
    if (event.target === this) { // 클릭한 영역이 모달 자체인 경우
      closeModal();
    }
  };
}

  // ESC 키로 모달 닫기 함수
  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  // 모달 닫기 공통 함수
  function closeModal() {
    const modal = document.getElementById("magazine-modal");
    modal.style.display = "none";
    document.removeEventListener('keydown', handleEscClose); // 이벤트 리스너 제거
  }

// Filter function
function filterMagazines() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredMagazines = magazines.filter((magazine) =>
    magazine.title.toLowerCase().includes(query)
  );
  renderMagazines(filteredMagazines);
}

// Initial render
renderMagazines(magazines);

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  // 버튼 클릭 이벤트 추가
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0, // 맨 위로 이동
      behavior: "smooth", // 부드러운 스크롤 효과
    });
  });
});

// 생방송 상태 확인 및 업데이트
async function checkLiveStatus() {
  const baseURL = "https://play.sooplive.co.kr/alsdudtjdud1/"; // 기본 URL
  const statusElement = document.getElementById("live-status");

  try {
    // 요청 보내기
    const response = await fetch(baseURL, {
      method: "GET",
      redirect: "follow",
    });
    const finalURL = response.url; // 최종적으로 리디렉션된 URL

    // URL의 마지막 부분 추출
    const lastPart = finalURL.split("/").pop();

    if (lastPart === "null") {
      // 생방송이 아닌 경우
      statusElement.textContent = "No Live Broadcast.";
      statusElement.classList.remove("live");
    } else if (/^\d+$/.test(lastPart)) {
      // 생방송 중인 경우
      statusElement.textContent = `Live Broadcast is ON! Stream ID: ${lastPart}`;
      statusElement.classList.add("live");
    } else {
      // 예외 처리
      statusElement.textContent = "Error: Invalid status.";
      statusElement.classList.remove("live");
    }
  } catch (error) {
    // 네트워크 오류 또는 요청 실패 처리
    console.error("Failed to check live status:", error);
    statusElement.textContent = "Error: Unable to fetch live status.";
    statusElement.classList.remove("live");
  }
}

// DOM이 로드된 후 초기 상태 업데이트
document.addEventListener("DOMContentLoaded", checkLiveStatus);

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();  
});

document.addEventListener("DOMContentLoaded", () => {
  const playAudioButton = document.getElementById("play-audio");
  

  // Audio file paths
  const audioFiles = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];

  // Cooldown timer in milliseconds
  const cooldownTime = 3000;

  // Enable the button after cooldown
  const enableButton = () => {
    playAudioButton.disabled = false;
    
  };

  // Play audio and start cooldown
  const playAudioWithCooldown = () => {
    playAudioButton.disabled = true;
    setTimeout(enableButton, cooldownTime);

    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const audio = new Audio(audioFiles[randomIndex]);
    audio.play();

    // Start cooldown
  };

  // Attach event listener to the button
  playAudioButton.addEventListener("click", playAudioWithCooldown);

  // Initial cooldown
  setTimeout(enableButton, cooldownTime);
});

/*
// Display results on result page
if (window.location.pathname.includes("result.html")) {
  const resultContainer = document.getElementById("result-container");
  const searchResults = JSON.parse(localStorage.getItem("searchResults")) || [];

  // Render results
  searchResults.forEach((magazine) => {
    const magazineDiv = document.createElement("div");
    magazineDiv.className = "magazine";
    magazineDiv.innerHTML = `
            <img src="${magazine.img}" alt="${magazine.title}">
            <p>${magazine.title}</p>
        `;
    magazineDiv.onclick = () => (window.location.href = magazine.link);
    resultContainer.appendChild(magazineDiv);
  });
}

*/
