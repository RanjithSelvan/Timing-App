var oH = 0;
var oM = 0;
var oS = 0;
var nH = 0;
var nM = 0;
var nS = 0;
var timeElapsed = [[0,0,0],[0,0,0],[0,0,0]];
var AMPM = "";
var active = [0,0,0];	//0:StopWatch; 1:Alarm; 2:CountDown
var mode = 0;		//0:StopWatch; 1:Alarm; 2:CountDown

function mainLoop() {
	var today = new Date();
	nH = today.getHours();
	nM = today.getMinutes();
	nS = today.getSeconds();
	
	if( nH > 12){
		nH = nH -12;
		AMPM = "PM";
	}
	if( nH == 0){
		nH = nH + 12;
		AMPM = "AM";
	}
	//Stop Watch
	if(active[0] == 1){
		if(oS > nS){
			timeElapsed[0][2] += 60 - parseInt(oS) + parseInt(nS);
			oS = nS;
		}
		else{
			timeElapsed[0][2] += nS - oS;
			oS = nS;
		}
		if(timeElapsed[0][2] >= 60){
			timeElapsed[0][1] += Math.floor(timeElapsed[0][2]/60);
			timeElapsed[0][2] = timeElapsed[0][2]%60;
		}
		if(timeElapsed[0][1] >= 60){
			timeElapsed[0][0] += Math.floor(timeElapsed[0][1]/60);
			timeElapsed[0][1] = timeElapsed[0][1]%60;
		}
	}
	//Alarm
	if(active[1] == 1){
		if(timeElapsed[1][0] == nH && timeElapsed[1][1] == nM && timeElapsed[1][2] == nS){
			alert("Its Time!");
			var remMode = mode;
			mode = 1;
			ClearWatch();
			mode = remMode;
		}
		else{
			var tS = 0, tM = 0, tH = 0;
			if( timeElapsed[1][2] < nS){
				tM -= 1;
				tS = 60 - nS + timeElapsed[1][2];
			}
			else{
				tS += timeElapsed[1][2] - nS;
			}
			if( timeElapsed[1][1] < nM){
				tH -= 1;
				tM += 60 - nM + timeElapsed[1][1];
			}
			else{
				tM += timeElapsed[1][1] - nM;
			}
			tH += timeElapsed[1][0] - nH;
			document.getElementById('APAT_Text').innerHTML = checkTime(tH) + ":" + checkTime(tM) + ":" + checkTime(tS);
		}
	}
	//CountDown
	if(active[2] == 1){
		if(timeElapsed[2][0] == 0 && timeElapsed[2][1] == 0 && timeElapsed[2][2] == 0){
			//alert("Its Time!");
		}
		// else{
			// var tS = 0, tM = 0, tH = 0;
			// if( timeElapsed[2][2] < 59){
				// tS = timeElapsed[2][2] - ( nS - oS )
			// }
			// else{
				
			// }
			// document.getElementById('APCDT_Text').innerHTML = checkTime(tH) + ":" + checkTime(tM) + ":" + checkTime(tS);
		// }
	}
	
	document.getElementById('CurrentTime').innerHTML = checkTime(nH) + ":" + checkTime(nM) + ":" + checkTime(nS) + " " + AMPM;
	document.getElementById('APSWD_Text').innerHTML = timeElapsed[0][0] + ":" + checkTime(timeElapsed[0][1]) + ":" + checkTime(timeElapsed[0][2]);
	document.getElementById("APAC_HourText").innerHTML = checkTime(timeElapsed[1][0]);
	document.getElementById("APAC_MinuteText").innerHTML = checkTime(timeElapsed[1][1]);
	document.getElementById("APAC_SecondText").innerHTML =  checkTime(timeElapsed[1][2]);
	document.getElementById("APCD_HourText").innerHTML = checkTime(timeElapsed[2][0]);
	document.getElementById("APCD_MinuteText").innerHTML = checkTime(timeElapsed[2][1]);
	document.getElementById("APCD_SecondText").innerHTML =  checkTime(timeElapsed[2][2]);
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
		case 0:	
			oH = nH;
			oM = nM;
			oS = nS;
			active[0] = 1;
			break;
		case 1:
			document.getElementById('Start').style.display = "none"
			document.getElementById('Clear').style.display = "inline";
			document.getElementById('APA_Menu').hidden = true;
			document.getElementById('APAT_Display').hidden = false;
			active[1] = 1;
			break;
		case 2:
			oH = nH;
			oM = nM;
			oS = nS;
			document.getElementById('APCD_Menu').hidden = true;
			document.getElementById('APCDT_Display').hidden = false;
			active[2] = 1;
			break;
	}
}
function StopWatch(){
	switch(mode){
		case 0:
			active[0] = 0;
			break;
		case 1:
			break;
		case 2:
			active[2] = 0;
			break;
	}
}
function ClearWatch(){
	switch(mode){
		case 0:
			timeElapsed[0] = [0,0,0];
			active[0] = 0;
			break;
		case 1:
			document.getElementById('Start').style.display = "inline"
			document.getElementById('Clear').style.display = "none";
			document.getElementById('APA_Menu').hidden = false;
			document.getElementById('APAT_Display').hidden = true;
			timeElapsed[1] = [0,0,0];
			active[1] = 0;
			document.getElementById('APAT_Text').innerHTML = checkTime(0) + ":" + checkTime(0) + ":" + checkTime(0);
			break;
		case 2:
			document.getElementById('APCD_Menu').hidden = false;
			document.getElementById('APCDT_Display').hidden = true;
			timeElapsed[2] = [0,0,0];
			active[2] = 0;
			break;
	}	
}


function IncAlarmHour(){
	if( timeElapsed[1][0] < 12){
		timeElapsed[1][0] += 1;
	}
	else{
		timeElapsed[1][0] = 0;
	}
}
function IncAlarmMinute(){
	if( timeElapsed[1][1] < 59){
		timeElapsed[1][1] += 1;
	}
	else{
		timeElapsed[1][1] = 0;
	}
}
function IncAlarmSecond(){
	if( timeElapsed[1][2] < 59){
		timeElapsed[1][2] += 1;
	}
	else{
		timeElapsed[1][2] = 0;
	}
}
function DecAlarmHour(){
	if(timeElapsed[1][0] > 0){
		timeElapsed[1][0] -= 1;
	}
	else{
		timeElapsed[1][0] = 12;
	}
}
function DecAlarmMinute(){
	if(timeElapsed[1][1] > 0){
		timeElapsed[1][1] -= 1;
	}
	else{
		timeElapsed[1][1] = 59;
	}
}
function DecAlarmSecond(){
	if(timeElapsed[1][2] > 0){
		timeElapsed[1][2] -= 1;
	}
	else{
		timeElapsed[1][2] = 59;
	}
}

function IncCountDownHour(){
	if( timeElapsed[2][0] < 99){
		timeElapsed[2][0] += 1;
	}
	else{
		timeElapsed[2][0] = 0;
	}
}
function IncCountDownMinute(){
	if( timeElapsed[2][1] < 59){
		timeElapsed[2][1] += 1;
	}
	else{
		timeElapsed[2][1] = 0;
	}
}
function IncCountDownSecond(){
	if( timeElapsed[2][2] < 59){
		timeElapsed[2][2] += 1;
	}
	else{
		timeElapsed[2][2] = 0;
	}
}
function DecCountDownHour(){
	if(timeElapsed[2][0] > 0){
		timeElapsed[2][0] -= 1;
	}
	else{
		timeElapsed[2][0] = 12;
	}
}
function DecCountDownMinute(){
	if(timeElapsed[2][1] > 0){
		timeElapsed[2][1] -= 1;
	}
	else{
		timeElapsed[2][1] = 59;
	}
}
function DecCountDownSecond(){
	if(timeElapsed[2][2] > 0){
		timeElapsed[2][2] -= 1;
	}
	else{
		timeElapsed[2][2] = 59;
	}
}

DStopWatch()