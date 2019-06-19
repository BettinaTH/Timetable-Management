const fs = require("fs");


function conferenceTrackManagement() {

    let textString1 = fs.readFileSync("./tracks.txt").toString('utf-8');
    let textString = textString1.replace("lightning", 5);
    let textByLine = textString.split("\n");
    //console.log(textByLine);

    let numberRegex = /[0-9]/g,
        morningSessionsLimit = 180,
        afternoonSessionsLimit = 240;

    let inputTextArray = textByLine,
        inputObjArr,
        talksArray = [];


    for (var i = 0; i < inputTextArray.length; i++) {
        inputObjArr = inputTextArray[i].split(" ");
        for (var j = 0; j < inputObjArr.length; j++) {
            if (numberRegex.test(inputObjArr[j])) {

                talksArray.push({
                    name: inputTextArray[i],
                    time: parseInt(inputObjArr[j])
                });
            }
        }
    }
    //console.log("talksArray =", talksArray);
    selectSessions(talksArray, morningSessionsLimit, afternoonSessionsLimit);
}

function selectSessions(talksArray, morningSessionsLimit, afternoonSessionsLimit) {

    let talksArray1 = talksArray,
        arr = talksArray.length,
        t = 0;

    while (arr > 0) {
        let morningTime = morningSessionsLimit,
            afternoonTime = afternoonSessionsLimit,
            talksArr = talksArray1,
            morningTrack = [],
            afternoonTrack = [],
            counter = 0,
            lunch = ["LUNCH"],
            networking = ["NEWTWORKING EVENT"];
                    
        t++;

        for (var i = 0; i < talksArr.length; i++) {
            if (talksArr[i].time < morningTime) {
                morningTime = morningTime - talksArr[i].time;
                morningTrack.push([talksArr[i].name, talksArr[i].time]);
                counter++;
                arr--;
            }
        }
        morningTrack.push(lunch);
        morningTrack.unshift(['TRACK ' + t ]);
        createTimetable(morningTrack, 'AM', 9);
       

        talksArray1.splice(0, counter);
        counter = 0;

        for (var i = 0; i < talksArr.length; i++) {
            if (talksArr[i].time < afternoonTime) {
                afternoonTime = afternoonTime - talksArr[i].time;
                afternoonTrack.push([talksArr[i].name, talksArr[i].time]);
                counter++;
                arr--;
            } 
        }
        afternoonTrack.push(networking);
        //console.log(afternoonTrack);
        createTimetable(afternoonTrack, 'PM', 1);
        talksArray1.splice(0, counter);
    }

    function createTimetable (tracklist, z, s){
        let Timetable = tracklist;
        let zone = z;
        let start = s;
      
        let sessionStart =  new Date();
        sessionStart.setHours(start, 0, 0);


        for (var i = 0; i < Timetable.length; i++){
            
            Timetable[i].unshift(sessionStart.getHours() + ':' + sessionStart.getMinutes() + " " + zone + " -");
            
            if (Timetable[i][1] == "LUNCH"){
                Timetable[i][0] = '12:00 PM - ';
            }

            if(Timetable[i][1].includes("TRACK")){
                Timetable[i].splice(0,1);
            }
            
            for(var j = 2; j < Timetable[i].length; j++){
                    
                let duration = Timetable[i][2];
                sessionStart.setMinutes(sessionStart.getMinutes() + duration);    
            } console.log(Timetable[i][0] + Timetable[i][1]);
        
        } //console.log(Timetable);
        return Timetable;
    }
}

conferenceTrackManagement();
