let time = '08:03AM'

function convert(str){
    //convert the hours
    let hours = parseInt(str.split(':')[0]) + 12;    //-> 20
    //construct string
    let minutesArr = str.split(':').slice(1);
    minutesArr.unshift(hours);
    console.log(minutesArr)
    let newTime = minutesArr.toString().replace(/,/, ':');
    return newTime;
}

convert(time)   //-> '20:03AM'