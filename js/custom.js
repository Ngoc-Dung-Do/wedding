document.addEventListener('DOMContentLoaded', () => {
    const numHeartsPerGroup = 1; // Số lượng trái tim trong mỗi nhóm
    const totalGroups = 100; // Tổng số nhóm bạn muốn tạo
    const fallInterval = 5000; // Khoảng thời gian giữa các nhóm trái tim (2 giây)
    const animationDuration = 15; // Thay đổi thời gian hoạt hình tại đây
  
    function createHearts() {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      for (let i = 0; i < numHeartsPerGroup; i++) {
        const heart = document.createElement('img');
        heart.src = 'https://hungthao2605.iwedding.info/common/imgs/heart.png';
        heart.className = 'snowfall-flakes';
        heart.style.width = `${Math.random() * 30 + 10}px`; // Đặt kích thước ngẫu nhiên
        heart.style.left = `${Math.random() * 100}vw`; // Đặt vị trí ngẫu nhiên trên trục ngang
        heart.style.top = `-${Math.random() * viewportHeight}px`; // Bắt đầu từ vị trí trên cùng
  
        document.body.appendChild(heart);
  
        // Cập nhật hoạt hình với thời gian mới
        heart.style.animation = `fall ${animationDuration}s linear infinite`;
      }
    }
  
    function startFallingHearts() {
      let groupCount = 0;
  
      const intervalId = setInterval(() => {
        createHearts();
        groupCount++;
  
        // Dừng lại khi đã tạo đủ nhóm
        if (groupCount >= totalGroups) {
          clearInterval(intervalId);
        }
      }, fallInterval);
    }
  
    startFallingHearts();
  });
  