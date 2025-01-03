document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".preview-track");
  const previews = document.querySelectorAll(".preview");
  const description = document.querySelector(".description");
  const descriptionText = document.getElementById("description-text");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  let currentIndex = 0; // 시작은 중앙 미리보기

  const updateView = () => {
    previews.forEach((preview, index) => {
      const offset = Math.abs(index - currentIndex);
      preview.style.transform = `scale(${1 - offset * 0.2})`;
      preview.style.opacity = offset > 2 ? "0" : `${1 - offset * 0.2}`;
      preview.classList.toggle("active", index === currentIndex);
    });

    const transformOffset = -(currentIndex - 2) * 20; // 중앙 정렬
    track.style.transform = `translateX(${transformOffset}%)`;

    // 설명 업데이트
    if (currentIndex >= 0 && currentIndex < previews.length) {
      descriptionText.textContent = previews[currentIndex].dataset.description;
      description.classList.add("visible");
    } else {
      description.classList.remove("visible");
    }
  };

  // 화살표 버튼 클릭 이벤트
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      description.classList.remove("visible");
      currentIndex--;
      setTimeout(updateView, 300); // 전환 후 업데이트
    }
  });

  rightArrow.addEventListener("click", () => {
    if (currentIndex < previews.length - 1) {
      description.classList.remove("visible");
      currentIndex++;
      setTimeout(updateView, 300); // 전환 후 업데이트
    }
  });

  // 키보드 입력 처리
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      leftArrow.click();
    } else if (e.key === "ArrowRight") {
      rightArrow.click();
    } else if (e.key === "Escape") {
      window.location.href = "index.html"; // 메인 페이지로 이동
    }
  });

  // 미리보기 클릭 이벤트
  previews.forEach((preview, index) => {
    preview.addEventListener("click", () => {
      if (index === currentIndex && preview.dataset.link) {
        window.location.href = preview.dataset.link;
      }
    });
  });

  // 초기 상태 설정
  updateView();

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();  
  });

  const homeButton = document.getElementById("home-button");
  homeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
