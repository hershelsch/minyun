
  const minyunim = [
    {cheider:"א",time:"07:00"},
    {cheider:"א",time:"08:00"},
    {cheider:"א",time:"09:00"},
    {cheider:"א",time:"10:00"},
    {cheider:"א",time:"11:00"},
    {cheider:"א",time:"12:00"},
    {cheider:"ב",time:"07:15"},
    {cheider:"ב",time:"08:15"},
    {cheider:"ב",time:"09:15"},
    {cheider:"ב",time:"10:15"},
    {cheider:"ב",time:"11:15"},
    {cheider:"ב",time:"12:15"},
    {cheider:"ג",time:"07:30"},
    {cheider:"ג",time:"08:30"},
    {cheider:"ג",time:"09:30"},
    {cheider:"ג",time:"10:30"},
    {cheider:"ג",time:"11:30"},
    {cheider:"ג",time:"12:30"},
    {cheider:"ד",time:"07:45"},
    {cheider:"ד",time:"08:45"},
    {cheider:"ד",time:"09:45"},
    {cheider:"ד",time:"10:45"},
    {cheider:"ד",time:"11:45"},
    {cheider:"ד",time:"12:45"},
  ];

 let previousNextMinyan = null;
  let previousMinyan = null;
  let nextMinyan = null;
  let minTimeToNextMinyan = 30;
function startMiyunimFunction() {
  let interval = setInterval(() => {
    const now = new Date();
    nextMinyan = findNextMinyan(now);
   if (nextMinyan !== previousNextMinyan) {
          handleNextMinyanChange(nextMinyan, interval);
    }
    else{
    updateCountdown(nextMinyan, now); 
    }
  }, 1000);
}
function handleNextMinyanChange(nextMinyan ,interval) {
    const now = new Date();
    previousMinyan = previousNextMinyan;
    previousNextMinyan = nextMinyan;
 if (!nextMinyan) {   
    noMinyunForToday(interval, now);}
 else{
    writeNextMinyan(nextMinyan);
    updateCountdown(nextMinyan, now);
    updateClasses(
    `${nextMinyan.time}`,
    'nextMinyanCell',
    previousMinyan  ? `${previousMinyan.time}` : undefined,
    previousMinyan  ? 'nextMinyanCell' : undefined
  );}
}
function updateClasses(addId, addClass, removeId, removeClass) {
  const elementToAdd = document.getElementById(addId);
  elementToAdd.classList.add(addClass);
  if (removeId && removeClass) {
    const elementToRemove = document.getElementById(removeId);
    if (elementToRemove) {
      elementToRemove.classList.remove(removeClass);
    }
  }
}
function findNextMinyan(currentDate) {
  const currentHours = currentDate.getHours().toString().padStart(2, '0');
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;

  let nextMinyan = undefined;
  for (let i = 0; i < minyunim.length; i++) {
    const minyan = minyunim[i];
    if (minyan.time > currentTime && 
        (nextMinyan === undefined || minyan.time < nextMinyan.time)) {
      nextMinyan = minyan;
    }
  }
  return nextMinyan;
}
function writeNextMinyan(nextMinyan) {
    const nextMinyanMsg = ` די קומענדיגע מנין וועט זיין ${nextMinyan.time}  אין חדר ${nextMinyan.cheider}`;
    document.getElementById("nextMinyan").innerHTML = nextMinyanMsg;
 
}
 function countdownToNextMinyan(nextMinyan) {
   let [hours, minutes] = nextMinyan.time.split(':');
   let countDownDate = new Date();
   countDownDate.setHours(hours);
   countDownDate.setMinutes(minutes);
   countDownDate.setSeconds(0);
   countDownDate.setMilliseconds(0);
   return countDownDate;
 }
function findFirstMinyanOfTheDay(date){
    let firstMinyanOfTheDay = minyunim[0];
    for (let i = 1; i < minyunim.length; i++) {
        let Minyan = minyunim[i];
        if (Minyan.time < firstMinyanOfTheDay.time) {
            firstMinyanOfTheDay = Minyan;
        }
      }
    let firstMinyanOfTheDayDate = date;
    let timeParts = firstMinyanOfTheDay.time.split(':');
    firstMinyanOfTheDayDate.setHours(timeParts[0]);
    firstMinyanOfTheDayDate.setMinutes(timeParts[1]);
    return firstMinyanOfTheDayDate;
}
 function findFirstMinyanOfADay(numberOfDaysToAdd){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + numberOfDaysToAdd);
    return findFirstMinyanOfTheDay(tomorrow);
}

 function setTimoutToFirstMinyanOfTomorrow(now){
        let firstMinyanOfTomorrow = findFirstMinyanOfADay(1);
        let time = firstMinyanOfTomorrow.getTime() - now.getTime();
        let hours = String(firstMinyanOfTomorrow.getHours());
        let minutes = String(firstMinyanOfTomorrow.getMinutes()).padStart(2, '0');
        document.getElementById('nextMinyan').innerHTML = `די קומענדיגע מנין וועט זיין מארגן ${hours}:${minutes}`;
         let hoursForId = String(firstMinyanOfTomorrow.getHours()).padStart(2, '0');
        let minutesForId = String(firstMinyanOfTomorrow.getMinutes()).padStart(2, '0');
        updateClasses(`${hoursForId}:${minutesForId}`, 'nextMinyanCell',  
        previousMinyan  ? `${previousMinyan.time}` : undefined,
        previousMinyan  ? 'nextMinyanCell' : undefined);
        setTimeout(() => {
            startMiyunimFunction();
            },time);
        }
        startMiyunimFunction();
  
 function createTables() {
   const groupedMinyunim = Object.groupBy(minyunim, minyun => minyun.cheider);
    const divElement = document.createElement('div');
   divElement.id = 'minyunim';
  for (const cheider in groupedMinyunim) {
      const table = document.createElement('table');
      const caption = document.createElement('caption');
      caption.textContent = `חדר ${cheider}`;
      table.appendChild(caption);
      groupedMinyunim[cheider].forEach(minyan => {
        const row = table.insertRow();
        const cellTime = row.insertCell();
        cellTime.textContent = minyan.time;
        row.id = minyan.time;
     });
      divElement.appendChild(table);
    }
    return divElement;
  };
  document.getElementById('tables').appendChild(createTables());
function noMinyunForToday(interval,now){
  clearInterval(interval); 
    document.getElementById("countdown").innerHTML = '';
    setTimoutToFirstMinyanOfTomorrow(now);
}
function updateCountdown(nextMinyan,now){
  let countDownDate = countdownToNextMinyan(nextMinyan);
    let distance = countDownDate - now;
    let hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    let seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

    let countDownText = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    document.getElementById("countdown").innerHTML = countDownText; 
 };

 function addMinyan(){
     let time = document.getElementById('time').value;
     let cheider = document.getElementById('cheider').value;
     minyunim.push({cheider,time});
     document.getElementById('tables').innerHTML = '';
     document.getElementById('tables').appendChild(createTables());
     document.getElementById('time').value = '';
     document.getElementById('cheider').value = '';
 }
