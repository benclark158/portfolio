var keys = {};
var text = {};
var commands = {};
var dirCount = {};


$( function() {
    //console.log("drag");
    createWindow(makeid());
} );

//Sets text on load
window.onload = function WindowLoad(event) {
	if(checkMobile()){
		//alert("MOBILE DEVICE");
		redirectToMobile();
	}
    //alert("Page is loaded");
}

function redirectToMobile(){
	window.location = "mobile.html";
}

function checkMobile() {
	var check = false;
	(function(a)
	{
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
		{
			check = true;
		}
	})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


//Prevents backspace?
$(document).keydown(function(e) {
    //console.log(e.which);

	var focusElement = document.activeElement;
	console.log("focusID - " + focusElement.id);

	if(focusElement.id.toString().includes("console-")) {
		var consoleName = focusElement.id.replace(/console-/g, "");
		if (e.which == 27) {
			//escape
			closeCurrent(consoleName);
		} else if ((e.which >= 112 && e.which <= 123) || e.which == 45 || e.which == 46) {
			//e.preventDefault();
			return;
		} else if (e.which >= 33 && e.which <= 40) {
			//up down left right home end pageup pagedown

			if (isWeb == 1 && (e.which == 38 || e.which == 40)) {
				return;
			}
			e.preventDefault();
			if (e.which == 38) {
				//up
				if (dirCount[consoleName] < commands[consoleName].length) {
					dirCount[consoleName]++;
				}

				if (dirCount[consoleName] != 0) {
					var cmd = commands[consoleName][commands.length - dirCount[consoleName]];
					cmdAppend(cmd, consoleName);
				} else {
					cmdAppend("", consoleName);
				}
			} else if (e.which == 40) {
				if (dirCount[consoleName] > 0) {
					dirCount[consoleName]--;
				}

				if (dirCount[consoleName] != 0) {
					var cmd = commands[consoleName][commands[consoleName].length - dirCount[consoleName]];
					cmdAppend(cmd, consoleName);
				} else {
					cmdAppend("", consoleName);
				}
			}
		} else if (e.which == 8) {
			//backspace
			if (keys[consoleName] <= 0) {
				e.preventDefault();
			} else {
				keys[consoleName]--;
			}
		} else if (e.which == 13) {
			//enter
			dirCount[consoleName] = 0;
			e.preventDefault();
			parseCommand(consoleName);
			keys[consoleName] = 0;
			append(newCommand(), consoleName);
		} else if ((e.which >= 32 && e.which <= 255)) {
			//else
			countKeys(consoleName);
		}
	}
});

function newCommand() {
    return "portfolio@benclark:~$ "
}

function help() {
  var str = "";
  str += "===============================\n";
  str += "  Ben Clark Portfolio Website\n";
  str += "===============================\n\n";
  str += "Welcome to my website! To navigate this site there are a number of commands you can use.\n";
  str += "The basic commands are listed below. There are also some not listed, if you want to try and figure out what they are! ;)\n\n";
  str += "\t1. ls - lists the pages that can be opened\n";
  str += "\t2. open pagename - opens the page stated by pagename\n";
	str += "\t3. start - runs the GUI version of this website (recommended less confident users)\n";
  str += "\t4. help - gives you help on using other commands\n";
	str += "\n";
    str += "Enjoy (Hint: think ASCII)\n\n";

    return str;
}

function ascii(){
    var str = "";
    str += "     ____________________________\n" +
        "    !\\_________________________/!\\\n" +
        "    !!                         !! \\\n" +
        "    !!                         !!  \\\n" +
        "    !!                         !!  !\n" +
        "    !!                         !!  !\n" +
        "    !!                         !!  !\n" +
        "    !!                         !!  !\n" +
        "    !!                         !!  !\n" +
        "    !!                         !!  /\n" +
        "    !!_________________________!! /\n" +
        "    !/_________________________\\!/\n" +
        "       __\\_________________/__/!_\n" +
        "      !_______________________!/\n" +
        "    ________________________\n" +
        "   /oooo  oooo  oooo  oooo /!\n" +
        "  /ooooooooooooooooooooooo/ /\n" +
        " /ooooooooooooooooooooooo/ /\n" +
        "/C=_____________________/_/\n";

    return str;

}

function countKeys(consoleName) {
	if(keys[consoleName] == null){
		keys[consoleName] = 0;
	}
    keys[consoleName]++;
}

function append(str, consoleName) {

    keys[consoleName] = 0;

    var console = document.getElementById("console-" + consoleName);

    if (console != null) {
        console.value += str;
        text[consoleName] += str;
        console.scrollTop = console.scrollHeight

    }
}

function cmdAppend(str, consoleName){

    if(str != null) {
        keys[consoleName] = str.length;
    } else {
        keys[consoleName] = 0;
    }

    var console = document.getElementById("console-" + consoleName);

    if (console != null) {
        console.value = text[consoleName] + str;
        console.scrollTop = console.scrollHeight
    }
}

function clear(consoleName){
	var console = document.getElementById("console-" + consoleName);

    if (console != null) {
		console.value = "";
	}
}

function parseCommand(consoleName) {
    var terminal = document.getElementById("console-" + consoleName);
    var cmdResult = "";

    if (terminal != null) {
		var input = terminal.value.substr(terminal.value.length - keys[consoleName]);
		var array = input.split(' ');
        var cmd = array[0];

        append("\n", consoleName);
        if(cmd == ''){
            return;
        }

        if(commands[consoleName] == null){
			text[consoleName] = "";
			commands[consoleName] = [];
			dirCount[consoleName] = 0;
		}
        commands[consoleName].push(input);

		if(cmd == "clear"){
			clear(consoleName);
			text[consoleName] = "";
			return;
		} else if(cmd == "ascii"){
            append(cmdResult = ascii(), consoleName);
        } else if (cmd == "welcome"){
            append(cmdResult = help(), consoleName);
        } else {
            append(cmdResult = matchCommand(cmd, array, consoleName), consoleName);
        }
    }
    if(cmdResult != "") {
        append("\n", consoleName);
    }
    text[consoleName] = terminal.value;
}

var topIndex = 5;

function whenClicked(conName){
    //alert("i got a click");
    var console = document.getElementById("console-" + conName);
    var window = document.getElementById("contents-" + conName);

    if (console != null) {
        var val = console.value.length;
        console.focus();
        console.selectionStart = val;
        console.selectionEnd = val;
    }
    if(window != null){
		window.style.zIndex = topIndex;
		topIndex++;
        document.getElementById("newConsoleButton").style.zIndex = topIndex;
	}
}
