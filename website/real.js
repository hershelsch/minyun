const YiddishWords = {
  cheider: 'חדר',
  bruchois: 'ברכות',
  hoidy: 'הודו',
  kurbunois: 'קרבנות',
  ashrei: 'אשרי',
  mariv: 'מעריב'
};
async function initialFunction() {
  async function getTheMinyunim() {
    try {
      let response = await fetch('/minyunim-json')
      return response.json()
    } catch (e) { return false }
  }

  let Minyunim = await getTheMinyunim()
  console.log(Minyunim)

  const MINIMUM_TIME_TO_SHOW_COUNTDOWN = 30;
  const MINIMUM_TIME_TO_SHOW_NEXT_MINYUN = 30;
  const NextMinyanBruchoisMsg = 'די קומענדיגע מנין ברכות וועט זיין';
  let previousNextMinyanHoidy;
  let previousNextMinyanBruchois;
  let NextMinyanBruchois;
  let NextMinyanHoidy;


  //function to find the next minyan
  function findNextRaletiveMinyan(minyunim, time, whichTime) {
    const Time = dateToHHMM(time);
    let nextMinyan = undefined;
    for (let cheider in Minyunim) {
      let minyunimForCheider = Minyunim[cheider];
      for(let minyan of minyunimForCheider){
      if (minyan[whichTime] > Time &&
        (nextMinyan == undefined || minyan[whichTime] < nextMinyan[whichTime])) {
        nextMinyan = minyan;
      }
    }}
    return nextMinyan;
  };
  function findNextMinyan(now) {
    NextMinyanBruchois = findNextRaletiveMinyan(Minyunim, now, 'bruchois');
    handleNextMinyanBruchois(now)
    NextMinyanHoidy = findNextRaletiveMinyan(Minyunim, now, 'hoidy');
    handleNextMinyanHoidy(now)
  }

  function handleNextMinyanBruchois(now) {
    if (!NextMinyanBruchois) {
      document.getElementById('bruchois').innerHTML = null;
    }
    else if (NextMinyanBruchois !== previousNextMinyanBruchois) {
      handleNextMinyanChange(NextMinyanBruchois, previousNextMinyanBruchois, 'bruchois', now)
    } else if (NextMinyanBruchois) {
      updateCountdown(NextMinyanBruchois, 'bruchois', now)
    }
  }

  function handleNextMinyanHoidy(now) {
    if (!NextMinyanHoidy) {
      document.getElementById('hoidy').innerHTML = null;
    }
    else if (NextMinyanHoidy !== previousNextMinyanHoidy) {
      handleNextMinyanChange(NextMinyanHoidy, previousNextMinyanHoidy, 'hoidy', now)
    } else if (NextMinyanHoidy) {
      updateCountdown(NextMinyanHoidy, 'hoidy', now)
    }
  }

  function handleNextMinyanChange(nextMinyan, previousNextMinyan, whichTime, now) {
    let previousMinyan = previousNextMinyan;
    if (whichTime == 'bruchois') {
      previousNextMinyanBruchois = nextMinyan;
    } else if (whichTime == 'hoidy') {
      previousNextMinyanHoidy = nextMinyan;
    }
    writeNextMinyan(nextMinyan, whichTime);
    updateCountdown(nextMinyan, whichTime, now);
    updateClasses(nextMinyan.id, whichTime, previousMinyan)
  }

  function updateClasses(id, whichTime, idOfEllementToRemove) {
    let nextMinyanClass = `next_minyan_${whichTime}`;
    if (idOfEllementToRemove) {
      let elementToRemove = document.getElementById(idOfEllementToRemove.id);
      elementToRemove.classList.remove(nextMinyanClass);
    }
    let elementToAdd = document.getElementById(id);
    elementToAdd.classList.add(nextMinyanClass)
  }




  function updateCountdown(nextMinyan, whichTime, time) {
    const TimeToCount = HHMMToDate(nextMinyan[whichTime]);
    let countdownMilliseconds = colculateDifferenceBetweenDates(time, TimeToCount);
    let countdownSeconds = millisecondsToReadableTime(countdownMilliseconds, 0, 1, 2);
    let countdownEllement = document.getElementById(`${whichTime}_countdown`);
    countdownEllement.innerHTML = countdownSeconds;
  }
  function HHMMToDate(time) {
    let [hours, minutes] = time.split(':');
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }


  function writeNextMinyan(nextMinyan, whichTime) {
    let NextMinyanEllement = document.getElementById(`next_minyan_${whichTime}`);
    let NextMinyanTimeEllement = document.getElementById(`next_minyan_${whichTime}_time`);
    let nextMinyanTime = convertTo12HrFormat(nextMinyan[whichTime])
    NextMinyanEllement.innerHTML = `די קומענדיגע מנין ${YiddishWords[whichTime]} וועט זיין`;
    NextMinyanTimeEllement.innerHTML = `${nextMinyanTime}`
  }


  function dateToHHMM(date) {
    const Hours = date.getHours().toString().padStart(2, 0)
    const Minutes = date.getMinutes().toString().padStart(2, '0')
    return `${Hours}:${Minutes}`
  };
  function millisecondsToReadableTime(milliseconds, padHours, padMinutes, padSeconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    padMinutes = hours ? 2 : padMinutes;
    padSeconds = hours || minutes ? 2 : padSeconds;

    const formattedHours = (padHours || hours) ? hours.toString().padStart(padHours, '0') + ':' : '';
    const formattedMinutes = (padMinutes || minutes) ? minutes.toString().padStart(padMinutes, '0') + ':' : '';
    const formattedSeconds = (padSeconds || seconds) ? seconds.toString().padStart(padSeconds, '0') : '';

    return formattedHours + formattedMinutes + formattedSeconds;
  };

  function colculateDifferenceBetweenDates(dateFrom, dateTo) {
    return dateTo - dateFrom;
  }

  //function to change from 24hr format to 12hr format with AM/PM
  function convertTo12HrFormat(time) {
    let [hours, minutes] = time.split(':');
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }
  function createTablesForAllChedurim() {
    const minyunimGroupedByCheider = Minyunim
    for (const cheider in minyunimGroupedByCheider) {
      const minyunimForCheider = minyunimGroupedByCheider[cheider];
      createTable(cheider, minyunimForCheider);

    }
  }
  //function to create table
  function createTable(cheider, minyunim) {

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.innerText = `חדר ${cheider}`;
    table.appendChild(caption);
    const head = document.createElement('thead');


    const BruchoisTh = document.createElement('th');
    BruchoisTh.innerText = YiddishWords.bruchois;
    head.appendChild(BruchoisTh);
    const HoidyTh = document.createElement('th');
    HoidyTh.innerText = YiddishWords.hoidy;
    head.appendChild(HoidyTh);


    table.appendChild(head);

    for (const minyan of minyunim) {

      const row = table.insertRow()

      const BruchoisCell = row.insertCell()
      BruchoisCell.innerHTML = convertTo12HrFormat(minyan.bruchois)
      const HoidyCell = row.insertCell()
      HoidyCell.innerHTML = convertTo12HrFormat(minyan.hoidy)

      row.id = minyan.id
    }
    document.getElementById('tables').appendChild(table);
  }

  function intervalFunction() {
    setInterval(function () {
      findNextMinyan(new Date())
    }, 1000)
  }
  createTablesForAllChedurim(Minyunim)
  findNextMinyan(new Date());
  intervalFunction()
}

window.addEventListener('load', function () {
  initialFunction()
})

