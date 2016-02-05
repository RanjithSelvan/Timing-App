var active = [0,0,0];	//0:StopWatch; 1:Alarm; 2:CountDown
var mode = 0;		//0:StopWatch; 1:Alarm; 2:CountDown

var lastTime;
var currentTime;
var deltaTime;

var stopWatchTime = 0;
var alarmTime = {
	hour : 0,
	minute : 0,
	second : 0,
};
var countDownTime = {
	hour : 0,
	minute : 0,
	second : 0,
};

function mainLoop() {
	
	//Current Time
	currentTime = new Date();
	deltaTime = currentTime - lastTime;
	lastTime = currentTime;
	var hour = currentTime.getHours();
	var minute = currentTime.getMinutes();
	var second = currentTime.getSeconds();
	var AMPM = "";
	
	if( hour > 12){
		hour = hour -12;
		AMPM = "PM";
	}
	if( hour == 0){
		hour = hour + 12;
		AMPM = "AM";
	}
	document.getElementById('CurrentTime').innerHTML = checkTime(hour) + ":" + checkTime(minute) + ":" + checkTime(second) + " " + AMPM;
	
	//Stop Watch
	if(active[0] == 1){
		stopWatchTime += deltaTime;
		var timeCount = Math.floor(stopWatchTime/1000);
		var hours = Math.floor(timeCount/3600);
		var minutes = Math.floor((timeCount-(hours*3600))/60);
		var seconds = Math.floor((timeCount-(hours*3600)-(minutes*60)));
		document.getElementById('APSWD_Text').innerHTML = hours + ":" + checkTime(minutes) + ":" + checkTime(seconds);
	}
	//Alarm
	if(active[1] == 1){
		if(alarmTime.hour == hour && alarmTime.minute == minute && alarmTime.second == second){
			var remMode = mode;
			alert("Its Time!");
			mode = 1;
			active[1] = 0;
			ClearWatch();
			mode = remMode;
		}
		else{
			var timeCount = ( (alarmTime.hour*3600) + (alarmTime.minute*60) + (alarmTime.second) ) - ( (hour*3600) + (minute*60) + (second) );
			var hours = Math.floor(timeCount/3600);
			var minutes = Math.floor((timeCount-(hours*3600))/60);
			var seconds = Math.floor((timeCount-(hours*3600)-(minutes*60)));
			document.getElementById('APAT_Text').innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);
		}
	}
	//CountDown
	if(active[2] == 1){
		document.getElementById('APCDT_Text').innerHTML = checkTime(countDownTime.hour) + ":" + checkTime(countDownTime.minute) + ":" + checkTime(countDownTime.second);
	}
	
	//Alarm Display
	document.getElementById("APAC_HourText").innerHTML = checkTime(alarmTime.hour);
	document.getElementById("APAC_MinuteText").innerHTML = checkTime(alarmTime.minute);
	document.getElementById("APAC_SecondText").innerHTML =  checkTime(alarmTime.second);
	//CountDown Display
	document.getElementById("APCD_HourText").innerHTML = checkTime(countDownTime.hour);
	document.getElementById("APCD_MinuteText").innerHTML = checkTime(countDownTime.minute);
	document.getElementById("APCD_SecondText").innerHTML =  checkTime(countDownTime.second);
	
	requestAnimationFrame(mainLoop);
}

function checkTime(i) {
if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
return i;
}

function DStopWatch(){
	mode = 0;
	document.getElementById('AOM_Watch').style.backgroundColor="#74C2E1";
	document.getElementById('AOM_Alarm').style.backgroundColor="#000000";
	document.getElementById('AOM_CountDown').style.backgroundColor="#000000";
	document.getElementById('AP_StopWatch').hidden = false;
	document.getElementById('AP_Alarm').hidden = true;
	document.getElementById('AP_CountDown').hidden = true;
	document.getElementById('Start').style.display = "inline";
	document.getElementById('Stop').style.display = "inline";
	document.getElementById('Clear').style.display = "inline";
}
function DAlarm(){
	mode = 1;
	document.getElementById('AOM_Watch').style.backgroundColor="#000000";
	document.getElementById('AOM_Alarm').style.backgroundColor="#74C2E1";
	document.getElementById('AOM_CountDown').style.backgroundColor="#000000";
	document.getElementById('AP_StopWatch').hidden = true;
	document.getElementById('AP_Alarm').hidden = false;
	document.getElementById('AP_CountDown').hidden = true;
	document.getElementById('Start').style.display = "inline"
	document.getElementById('Stop').style.display = "none";
	document.getElementById('Clear').style.display = "none";
	document.getElementById('APA_Menu').hidden = false;
	document.getElementById('APAT_Display').hidden = true;
}
function DCountDown(){
	mode = 2;
	document.getElementById('AOM_Watch').style.backgroundColor="#000000";
	document.getElementById('AOM_Alarm').style.backgroundColor="#000000";
	document.getElementById('AOM_CountDown').style.backgroundColor="#74C2E1";
	document.getElementById('AP_StopWatch').hidden = true;
	document.getElementById('AP_Alarm').hidden = true;
	document.getElementById('AP_CountDown').hidden = false;
	document.getElementById('Start').style.display = "inline"
	document.getElementById('Stop').style.display = "inline";
	document.getElementById('Clear').style.display = "inline";
	document.getElementById('APCD_Menu').hidden = false;
	document.getElementById('APCDT_Display').hidden = true;
}

function StartWatch(){
	switch(mode){
		// StopWatch
		case 0:
			active[0] = 1;
			break;
		//Alarm
		case 1:
			document.getElementById('Start').style.display = "none"
			document.getElementById('Clear').style.display = "inline";
			document.getElementById('APA_Menu').hidden = true;
			document.getElementById('APAT_Display').hidden = false;
			active[1] = 1;
			break;
		//CountDown
		case 2:
			document.getElementById('APCD_Menu').hidden = true;
			document.getElementById('APCDT_Display').hidden = false;
			active[2] = 1;
			break;
	}
}
function StopWatch(){
	switch(mode){
		//StopWatch
		case 0:
			active[0] = 0;
			break;
		//Alarm
		case 1:
			break;
		//CountDown
		case 2:
			active[2] = 0;
			break;
	}
}
function ClearWatch(){
	switch(mode){
		//StopWatch
		case 0:
			active[0] = 0;
			break;
		//Alarm
		case 1:
			document.getElementById('Start').style.display = "inline"
			document.getElementById('Clear').style.display = "none";
			document.getElementById('APA_Menu').hidden = false;
			document.getElementById('APAT_Display').hidden = true;
			alarmTime.hour = 0;
			alarmTime.minute = 0;
			alarmTime.second = 0;
			active[1] = 0;
			document.getElementById('APAT_Text').innerHTML = checkTime(0) + ":" + checkTime(0) + ":" + checkTime(0);
			break;
		//CountDown
		case 2:
			document.getElementById('APCD_Menu').hidden = false;
			document.getElementById('APCDT_Display').hidden = true;
			countDownTime.hour = 0;
			countDownTime.minute = 0;
			countDownTime.second = 0;
			active[2] = 0;
			break;
	}	
}


function IncAlarmHour(){
	if( alarmTime.hour < 12){
		alarmTime.hour += 1;
	}
	else{
		alarmTime.hour = 0;
	}
}
function IncAlarmMinute(){
	if( alarmTime.minute < 59){
		alarmTime.minute += 1;
	}
	else{
		alarmTime.minute = 0;
	}
}
function IncAlarmSecond(){
	if( alarmTime.second < 59){
		alarmTime.second += 1;
	}
	else{
		alarmTime.second = 0;
	}
}
function DecAlarmHour(){
	if(alarmTime.hour > 0){
		alarmTime.hour -= 1;
	}
	else{
		alarmTime.hour = 12;
	}
}
function DecAlarmMinute(){
	if( alarmTime.minute > 0){
		alarmTime.minute -= 1;
	}
	else{
		alarmTime.minute = 59;
	}
}
function DecAlarmSecond(){
	if( alarmTime.second > 0){
		alarmTime.second -= 1;
	}
	else{
		alarmTime.second = 59;
	}
}

function IncCountDownHour(){
	if( countDownTime.hour < 99){
		countDownTime.hour += 1;
	}
	else{
		countDownTime.hour = 0;
	}
}
function IncCountDownMinute(){
	if( countDownTime.minute < 59){
		countDownTime.minute += 1;
	}
	else{
		countDownTime.minute = 0;
	}
}
function IncCountDownSecond(){
	if( countDownTime.second < 59){
		countDownTime.second += 1;
	}
	else{
		countDownTime.second = 0;
	}
}
function DecCountDownHour(){
	if(countDownTime.hour > 0){
		countDownTime.hour -= 1;
	}
	else{
		countDownTime.hour = 12;
	}
}
function DecCountDownMinute(){
	if(countDownTime.minute > 0){
		countDownTime.minute -= 1;
	}
	else{
		countDownTime.minute = 59;
	}
}
function DecCountDownSecond(){
	if(countDownTime.second > 0){
		countDownTime.second -= 1;
	}
	else{
		countDownTime.second = 59;
	}
}

DStopWatch()