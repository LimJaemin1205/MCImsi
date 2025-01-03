document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".preview-track");
  const previews = document.querySelectorAll(".preview");
  const description = document.querySelector(".description");
  const descriptionText = document.getElementById("description-text");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  const passwordModal = document.getElementById("password-modal");
  const passwordInput = document.getElementById("password-input");
  const submitPasswordButton = document.getElementById("submit-password");
  const closeModalButton = document.querySelector(".close-modal");
  const modalMessage = document.getElementById("modal-message");

  let currentIndex = 0; // 시작은 중앙 미리보기
  const passwords = ["1234", "5678", "abcd", "2025", "melcim"]; // 각 잡지의 비밀번호

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

  // 키보드 이벤트
  document.addEventListener("keydown", (e) => {
    if (passwordModal.style.display === "flex") {
      // 모달 활성화 상태에서만 동작
      if (e.key === "Enter") {
        submitPasswordButton.click(); // Enter 키는 Submit 버튼과 동일하게 동작
      } else if (e.key === "Escape") {
        closeModal(); // Esc 키는 모달 닫기
      }
    } else {
      // 모달이 비활성화된 상태에서 동작
      if (e.key === "ArrowLeft") {
        document.querySelector(".arrow.left").click(); // 왼쪽 화살표 버튼 클릭
      } else if (e.key === "ArrowRight") {
        document.querySelector(".arrow.right").click(); // 오른쪽 화살표 버튼 클릭
      } else if (e.key === "Escape") {
        window.location.href = "index.html"; // 메인 페이지로 이동
      }
    }
  });

    // 모달 열기 함수
    const openModal = (description) => {
      modalMessage.textContent = `"${description}"를 보기 위한 비밀번호를 입력하세요.`;
      passwordModal.style.display = "flex";
      passwordInput.value = ""; // 입력 필드 초기화
      passwordInput.focus(); // 입력 필드에 포커스
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      passwordModal.style.display = "none";
      passwordInput.value = ""; // 입력 필드 초기화
    };

  // 미리보기 클릭 이벤트 수정
  previews.forEach((preview, index) => {
    preview.addEventListener("click", () => {
      if (index === currentIndex) {
        const link = preview.dataset.link;

        // 비밀번호 모달 열기
        openModal(preview.dataset.description);

        // 비밀번호 확인
        submitPasswordButton.onclick = () => {
          const enteredPassword = passwordInput.value;
          if (enteredPassword === passwords[index]) {
            window.location.href = link; // 올바른 비밀번호: 링크로 이동
          } else {
            alert("비밀번호가 틀렸습니다!"); // 잘못된 비밀번호: 경고 표시
          }
          closeModal(); // 모달 닫기
        };
      }
    });
  });

  // "X" 버튼 클릭 이벤트
  closeModalButton.addEventListener("click", closeModal);

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
