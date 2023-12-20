function updateCountdown(nextMinyan) {
    let now = new Date();
    let countDownDate = countdownToNextMinyan(nextMinyan);
    let distance = countDownDate - now;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    let countDownText = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    
    document.getElementById("countdown").innerHTML = countDownText;
  }
  
  function attemptUpdateMinyan() {
    let now = new Date();
    let nextMinyan = findNextMinyan(now);
  
    if (!nextMinyan) {
      // Schedule the next attempt in 1 minute if no Minyan is found
      setTimeout(attemptUpdateMinyan, 1000 * 60);
      return;
    }
  
    updateCountdown(nextMinyan);
  }
  
  function startMinyanCountdown() {
    attemptUpdateMinyan(); // Initial attempt to update the Minyan
  
    // Set the interval to update every second
    return setInterval(() => {
      let nextMinyan = findNextMinyan(new Date());
      if (nextMinyan) {
        updateCountdown(nextMinyan);
      }
    }, 1000);
  }
  
  // Start the countdown process
  startMinyanCountdown();