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
    {cheider:"ד",time:"12:45"}
];
function startMiyunimFunction() {
 let interval  = setInterval(function() {

    let now = new Date();
    let nextMinyan = findNextMinyan(now);
  if (!nextMinyan) {
    clearInterval(interval); 
    document.getElementById("countdown").innerHTML = '';
           //set the timout to the first minyan of tomorrow
setTimoutToFirstMinyanOfTomorrow(now);
  }else { 
 writeNextMinyan(nextMinyan);
 let countDownDate = cowntdownToNextMinyan(nextMinyan);
  
    

    let distance = countDownDate - now;

    let hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    let seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

    let countDownText = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    document.getElementById("countdown").innerHTML = countDownText; 
 }
 }, 1000);
}


function findNextMinyan(currentDate){

    const currentHours = String(currentDate.getHours()).padStart(2, '0');
    const currentMinutes = String(currentDate.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    let nextMinyanInArr;
    for (let i = 0; i < minyunim.length; i++) {
      let  Minyan = minyunim[i];
        if (Minyan.time > currentTime && 
            (nextMinyanInArr === undefined || Minyan.time < nextMinyanInArr.time)) {
                nextMinyanInArr = Minyan;
        }
        
    }return nextMinyanInArr;
}
function writeNextMinyan(nextMinyan){
    let nextMinyanMsg = ` די קומענדיגע מנין וועט זיין ${nextMinyan.time}  אין חדר ${nextMinyan.cheider}`;
        document.getElementById("nextMinyan").innerHTML = nextMinyanMsg;
        let timeForId = nextMinyan.time;
        let id = timeForId;
        document.getElementById(id).classList.add('nextMinyanCell');
        
     
}
 function cowntdownToNextMinyan(nextMinyan){
    let timeParts = nextMinyan.time.split(':');
    let countDownDate = new Date();
    countDownDate.setHours(timeParts[0]);
    countDownDate.setMinutes(timeParts[1]);
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
    firstMinyanOfTheDayDate.setSeconds(0);
    firstMinyanOfTheDayDate.setMilliseconds(0);
    return firstMinyanOfTheDayDate;
}
//function to find the first minyan of tomorrow
 function findFirstMinyanOfTomorrow(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
    return findFirstMinyanOfTheDay(tomorrow);
}

 function setTimoutToFirstMinyanOfTomorrow(now){
            let firstMinyanOfTomorrow = findFirstMinyanOfTomorrow();
            let time = firstMinyanOfTomorrow.getTime() - now.getTime();
            console.log(`firstMinyanOfTomorrow: ${firstMinyanOfTomorrow}`);
            let hours = String(firstMinyanOfTomorrow.getHours());
            let minutes = String(firstMinyanOfTomorrow.getMinutes()).padStart(2, '0');
            document.getElementById('nextMinyan').innerHTML = `די קומענדיגע מנין וועט זיין מארגן ${hours}:${minutes}`;
            let hoursForId = String(firstMinyanOfTomorrow.getHours()).padStart(2, '0');
            let minutesForId = String(firstMinyanOfTomorrow.getMinutes()).padStart(2, '0');
            let id = `${hoursForId}:${minutesForId}`;
            document.getElementById(id).classList.add('nextMinyanCell');
            setTimeout(() => {
                startMiyunimFunction();
            },time);
        }
        startMiyunimFunction();

// function to create the table of the minyunim for each cheider with a caption

/*function createTableOfMiyunim(){
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    let tableCaption = document.createElement('caption');
    tableCaption.innerHTML = 'מנינים';
    table.appendChild(tableCaption);
    for (let i = 0; i < minyunim.length; i++) {
        let row = document.createElement('tr');
        let cheiderCell = document.createElement('td');
        let timeCell = document.createElement('td');
        cheiderCell.innerHTML = minyunim[i].cheider;
        timeCell.innerHTML = minyunim[i].time;
        row.appendChild(cheiderCell);
        row.appendChild(timeCell);
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.getElementById('miyunim').appendChild(table);
}
createTableOfMiyunim();*/

// function to create the table of the minyunim for each cheider seperately with a caption of the cheider name
/*function createTableOfMiyunim(){
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    let tableCaption = document.createElement('caption');
    tableCaption.innerHTML = 'מנינים';
    table.appendChild(tableCaption);
    let cheider = 'א';
    for (let i = 0; i < minyunim.length; i++) {
        let row = document.createElement('tr');
        let cheiderCell = document.createElement('td');
        let timeCell = document.createElement('td');
        cheiderCell.innerHTML = minyunim[i].cheider;
        timeCell.innerHTML = minyunim[i].time;
        row.appendChild(cheiderCell);
        row.appendChild(timeCell);
        tableBody.appendChild(row);
        if (minyunim[i].cheider !== cheider) {
            table.appendChild(tableBody);
            document.getElementById('miyunim').appendChild(table);
            table = document.createElement('table');
            tableBody = document.createElement('tbody');
            tableCaption = document.createElement('caption');
            tableCaption.innerHTML = 'חדר ' + minyunim[i].cheider + '';
            table.appendChild(tableCaption);
            cheider = minyunim[i].cheider;
        }
    }
    table.appendChild(tableBody);
    document.getElementById('miyunim').appendChild(table);
}
createTableOfMiyunim();*/
// Function to group minyunim by cheider
const groupByCheider = (minyunim) => {
    return minyunim.reduce((group, minyan) => {
      (group[minyan.cheider] = group[minyan.cheider] || []).push(minyan);
      return group;
    }, {});
    
  };
  const groupedMinyunim = groupByCheider(minyunim);
  
  // Function to create table for each cheider
  const createTables = (groupedMinyunim) => {
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
  
  // Assuming you have a div with id 'tables' in your HTML
  document.getElementById('tables').appendChild(createTables(groupedMinyunim));

  //check if the next minyun is after soif zenman tefilah

  function checkIfAfterZmenTfilah(){

  }
