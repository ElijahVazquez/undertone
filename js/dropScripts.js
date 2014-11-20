$(function(){
	var counter=0;
	$('#stuffhere').hide();
	$("#colorPalette").hide();
	$("#hideMe").hide();
	var dropbox = $('#dropbox'),
	message = $('.message', dropbox),
	mainBody = $('#lifeForce'),
	sourceImage;

	$('#upload-image').on('click', function() {
		$('#click-image-upload').click();

	});


	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		
		maxfiles: 5,
		maxfilesize: 3,
		url: 'php/post_file.php',
		
		uploadFinished:function(i,file,response){
			$.data(file).addClass('done');
			// response is the JSON object that post_file.php returns
		},
		
		error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
				showMessage('Your browser does not support HTML5 file uploads!');
				break;
				case 'TooManyFiles':
				alert('Too many files! Please select 5 at most!');
				break;
				case 'FileTooLarge':
				alert(file.name+' is too large! Please upload files smaller than 3mb.');
				break;
				default:
				break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
			if(!file.type.match(/^image\//)){
				alert('Only images are allowed!');
				
				// Returning false will cause the
				// file to be rejected
				return false;
			}
		},
		
		uploadStarted:function(i, file, len){
			createImage(file);
			//$("header").hide();
			//$("#mainBody").hide();
			$("#hideMe").show();
			$('#stuffhere').show();
			$('#colorPalette').show();

		},
		
		//progressUpdated: function(i, file, progress) {
		//	$.data(file).find('.progress').width(progress);
		//}

	});

var template = '<div class="preview">'+
'<h2>Your Image</h2>'+
'<span class="imageHolder">'+
'<img class="uploadedImg" />'+
'</span>'+
'</div>'; 

function createImage(file){

	var preview = $(template), 
	image = $('img', preview);

	var reader = new FileReader();

	image.width = 100;
	image.height = 100;

	reader.onload = function(e){
			// e.target.result holds the DataURL which can be used as a source of the image:
			if(counter == 1){
				image.attr('src',e.target.result);
			//alert("init image set");
			counter++;
		}
		else if(counter > 1){
			//alert("new image replace old");
			$(".uploadedImg").attr('src',e.target.result);
		}
		var myImage = new Image();
		myImage.onload = function() {
			var colorThief = new ColorThief();
			paletteArray = colorThief.getPalette(myImage, 4);
			colorToMood();
		  //alert(paletteArray[0]); //IT FREAKING WORKS, HERE IS THE COLOR BITCHES
		}
		myImage.src = e.target.result;
	};

		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		// message.hide(); THIS hides the text inside the drop area.

		if(counter == 0){
			preview.appendTo(mainBody);
			counter++;
			//alert("counter increase");
		}
		
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);

	};
	function showMessage(msg){
		message.html(msg);
	}

	$(window).scroll(function() {
		var windowHeight = $(window).scrollTop();
		if(windowHeight  > 100) {
			$("#hideMe").fadeIn();
		}
		if(windowHeight  < 100) {
			$("#hideMe").hide();
		}
	});
	//$(document).ready(function(){
	    //$('#capture').hide();
	    function colorToMood(){

	    	if(paletteArray != null){
	    		firstcolorR = paletteArray[0][0];
	    		firstcolorG = paletteArray[0][1];
	    		firstcolorB = paletteArray[0][2];

	    		secondcolorR = paletteArray[1][0];
	    		secondcolorG = paletteArray[1][1];
	    		secondcolorB = paletteArray[1][2];

	    		thirdcolorR = paletteArray[2][0];
	    		thirdcolorG = paletteArray[2][1];
	    		thirdcolorB = paletteArray[2][2];
	    	}
	        /*for(i=0; i<paletteArray.length; i++){
	           var ? = paletteArray[i]
	       }*/

	        //console.log(firstcolorR + " " + firstcolorG + " " + firstcolorB + " YES SEXY ");

	        /*==================================Creates an array of all web safe colors & prints them=======================================*/
	/*var allWebsafeColors = "000000 000033 000066 000099 0000CC 0000FF 003300 003333 003366 003399 0033CC 0033FF 006600 006633 006666 006699 0066CC 0066FF 009900 009933 009966 009999 0099CC 0099FF 00CC00 00CC33 00CC66 00CC99 00CCCC 00CCFF 00FF00 00FF33 00FF66 00FF99 00FFCC 00FFFF 330000 330033 330066 330099 3300CC 3300FF 333300 333333 333366 333399 3333CC 3333FF 336600 336633 336666 336699 3366CC 3366FF 339900 339933 339966 339999 3399CC 3399FF 33CC00 33CC33 33CC66 33CC99 33CCCC 33CCFF 33FF00 33FF33 33FF66 33FF99 33FFCC 33FFFF 660000 660033 660066 660099 6600CC 6600FF 663300 663333 663366 663399 6633CC 6633FF 666600 666633 666666 666699 6666CC 6666FF 669900 669933 669966 669999 6699CC 6699FF 66CC00 66CC33 66CC66 66CC99 66CCCC 66CCFF 66FF00 66FF33 66FF66 66FF99 66FFCC 66FFFF 990000 990033 990066 990099 9900CC 9900FF 993300 993333 993366 993399 9933CC 9933FF 996600 996633 996666 996699 9966CC 9966FF 999900 999933 999966 999999 9999CC 9999FF 99CC00 99CC33 99CC66 99CC99 99CCCC 99CCFF 99FF00 99FF33 99FF66 99FF99 99FFCC 99FFFF CC0000 CC0033 CC0066 CC0099 CC00CC CC00FF CC3300 CC3333 CC3366 CC3399 CC33CC CC33FF CC6600 CC6633 CC6666 CC6699 CC66CC CC66FF CC9900 CC9933 CC9966 CC9999 CC99CC CC99FF CCCC00 CCCC33 CCCC66 CCCC99 CCCCCC CCCCFF CCFF00 CCFF33 CCFF66 CCFF99 CCFFCC CCFFFF FF0000 FF0033 FF0066 FF0099 FF00CC FF00FF FF3300 FF3333 FF3366 FF3399 FF33CC FF33FF FF6600 FF6633 FF6666 FF6699 FF66CC FF66FF FF9900 FF9933 FF9966 FF9999 FF99CC FF99FF FFCC00 FFCC33 FFCC66 FFCC99 FFCCCC FFCCFF FFFF00 FFFF33 FFFF66 FFFF99 FFFFCC FFFFFF";

	var websafeColorArray = allWebsafeColors.split(" ");

	alert(websafeColorArray);

	for(i=0;i<websafeColorArray.length;i++){
	    websafeColorArray[i] = "<br />['"+websafeColorArray[i]+"', 'ColorName']";
	};

	document.write(websafeColorArray);*/
	/*================================================================================================================*/
	var ntc = {

		init: function() {
			var color, rgb, hsl;
			for(var i = 0; i < ntc.names.length; i++)
			{
				color = "#" + ntc.names[i][0];
				rgb = ntc.rgb(color);
				hsl = ntc.hsl(color);
				ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
			}
		},

		name: function(color) {

			color = color.toUpperCase();
			if(color.length < 3 || color.length > 7)
				return ["#000000", "Invalid Color: " + color, false];
			if(color.length % 3 == 0)
				color = "#" + color;
			if(color.length == 4)
				color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

			var rgb = ntc.rgb(color);
			var r = rgb[0], g = rgb[1], b = rgb[2];
			var hsl = ntc.hsl(color);
			var h = hsl[0], s = hsl[1], l = hsl[2];
			var ndf1 = 0; ndf2 = 0; ndf = 0;
			var cl = -1, df = -1;

			for(var i = 0; i < ntc.names.length; i++)
			{
				if(color == "#" + ntc.names[i][0])
					return ["#" + ntc.names[i][0], ntc.names[i][1], true];

				ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
				ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
				ndf = ndf1 + ndf2 * 2;
				if(df < 0 || df > ndf)
				{
					df = ndf;
					cl = i;
				}
			}

			return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
		},

	          // adopted from: Farbtastic 1.2
	          // http://acko.net/dev/farbtastic
	          hsl: function (color) {

	          	var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
	          	var min, max, delta, h, s, l;
	          	var r = rgb[0], g = rgb[1], b = rgb[2];

	          	min = Math.min(r, Math.min(g, b));
	          	max = Math.max(r, Math.max(g, b));
	          	delta = max - min;
	          	l = (min + max) / 2;

	          	s = 0;
	          	if(l > 0 && l < 1)
	          		s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

	          	h = 0;
	          	if(delta > 0)
	          	{
	          		if (max == r && max != g) h += (g - b) / delta;
	          		if (max == g && max != b) h += (2 + (b - r) / delta);
	          		if (max == b && max != r) h += (4 + (r - g) / delta);
	          		h /= 6;
	          	}
	          	return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
	          },

	          // adopted from: Farbtastic 1.2
	          // http://acko.net/dev/farbtastic
	          rgb: function(color) {
	          	return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
	          },
	//black white grey red green blue yellow pink purple orange 

	names: [
		["000000","fear"],
		["000033","fear"],
		["000066","sadness"],
		["000099","sadness"],
		["0000CC","sadness"],
		["0000FF","joy"],
		["003300","fear"],
		["003333","fear"],
		["003366","sadness"],
		["003399","sadness"],
		["0033CC","joy"],
		["0033FF","joy"],
		["006600","anger"],
		["006633","anger"],
		["006666","sadness"],
		["006699","sadness"],
		["0066CC","joy"],
		["0066FF","joy"],
		["009900","joy"],
		["009933","joy"],
		["009966","joy"],
		["009999","joy"],
		["0099CC","joy"],
		["0099FF","joy"],
		["00CC00","joy"],
		["00CC33","joy"],
		["00CC66","joy"],
		["00CC99","joy"],
		["00CCCC","joy"],
		["00CCFF","joy"],
		["00FF00","joy"],
		["00FF33","joy"],
		["00FF66","joy"],
		["00FF99","joy"],
		["00FFCC","joy"],
		["00FFFF","joy"],
		["330000","anger"],
		["330033","sad"],
		["330066","sad"],
		["330099","sad"],
		["3300CC","sad"],
		["3300FF","joy"],
		["333300","anger"],
		["333333","sad"],
		["333366","sad"],
		["333399","sad"],
		["3333CC","sad"],
		["3333FF","joy"],
		["336600","anger"],
		["336633","anger"],
		["336666","sad"],
		["336699","sad"],
		["3366CC","sad"],
		["3366FF","sad"],
		["339900","anger"],
		["339933","anger"],
		["339966","sad"],
		["339999","sad"],
		["3399CC","sad"],
		["3399FF","sad"],
		["33CC00","joy"],
		["33CC33","joy"],
		["33CC66","joy"],
		["33CC99","joy"],
		["33CCCC","joy"],
		["33CCFF","joy"],
		["33FF00","joy"],
		["33FF33","joy"],
		["33FF66","joy"],
		["33FF99","joy"],
		["33FFCC","joy"],
		["33FFFF","joy"],
		["660000","anger"],
		["660033","anger"],
		["660066","anger"],
		["660099","anger"],
		["6600CC","sad"],
		["6600FF","sad"],
		["663300","sad"],
		["663333","sad"],
		["663366","sad"],
		["663399","sad"],
		["6633CC","love"],
		["6633FF","sad"],
		["666600","fear"],
		["666633","fear"],
		["666666","sad"],
		["666699","sad"],
		["6666CC","sad"],
		["6666FF","sad"],
		["669900","anger"],
		["669933","anger"],
		["669966","sad"],
		["669999","sad"],
		["6699CC","sad"],
		["6699FF","joy"],
		["66CC00","joy"],
		["66CC33","joy"],
		["66CC66","joy"],
		["66CC99","joy"],
		["66CCCC","joy"],
		["66CCFF","joy"],
		["66FF00","joy"],
		["66FF33","joy"],
		["66FF66","joy"],
		["66FF99","joy"],
		["66FFCC","joy"],
		["66FFFF","joy"],
		["990000","anger"],
		["990033","anger"],
		["990066","love"],
		["990099","love"],
		["9900CC","joy"],
		["9900FF","joy"],
		["993300","anger"],
		["993333","anger"],
		["993366","love"],
		["993399","love"],
		["9933CC","joy"],
		["9933FF","joy"],
		["996600","fear"],
		["996633","fear"],
		["996666","sad"],
		["996699","sad"],
		["9966CC","joy"],
		["9966FF","joy"],
		["999900","sad"],
		["999933","sad"],
		["999966","fear"],
		["999999","sad"],
		["9999CC","sad"],
		["9999FF","sad"],
		["99CC00","anger"],
		["99CC33","anger"],
		["99CC66","sad"],
		["99CC99","sad"],
		["99CCCC","sad"],
		["99CCFF","joy"],
		["99FF00","joy"],
		["99FF33","joy"],
		["99FF66","joy"],
		["99FF99","joy"],
		["99FFCC","joy"],
		["99FFFF","joy"],
		["CC0000","anger"],
		["CC0033","anger"],
		["CC0066","love"],
		["CC0099","love"],
		["CC00CC","love"],
		["CC00FF","surprise"],
		["CC3300","anger"],
		["CC3333","anger"],
		["CC3366","love"],
		["CC3399","love"],
		["CC33CC","love"],
		["CC33FF","surprise"],
		["CC6600","fear"],
		["CC6633","fear"],
		["CC6666","sad"],
		["CC6699","love"],
		["CC66CC","love"],
		["CC66FF","love"],
		["CC9900","sad"],
		["CC9933","sad"],
		["CC9966","sad"],
		["CC9999","sad"],
		["CC99CC","love"],
		["CC99FF","love"],
		["CCCC00","sad"],
		["CCCC33","sad"],
		["CCCC66","sad"],
		["CCCC99","sad"],
		["CCCCCC","sad"],
		["CCCCFF","sad"],
		["CCFF00","surprise"],
		["CCFF33","surprise"],
		["CCFF66","joy"],
		["CCFF99","joy"],
		["CCFFCC","joy"],
		["CCFFFF","joy"],
		["FF0000","surprise"],
		["FF0033","surprise"],
		["FF0066","love"],
		["FF0099","love"],
		["FF00CC","love"],
		["FF00FF","love"],
		["FF3300","love"],
		["FF3333","love"],
		["FF3366","love"],
		["FF3399","love"],
		["FF33CC","love"],
		["FF33FF","love"],
		["FF6600","joy"],
		["FF6633","joy"],
		["FF6666","joy"],
		["FF6699","love"],
		["FF66CC","love"],
		["FF66FF","love"],
		["FF9900","love"],
		["FF9933","joy"],
		["FF9966","joy"],
		["FF9999","love"],
		["FF99CC","love"],
		["FF99FF","love"],
		["FFCC00","joy"],
		["FFCC33","joy"],
		["FFCC66","joy"],
		["FFCC99","joy"],
		["FFCCCC","love"],
		["FFCCFF","love"],
		["FFFF00","surprise"],
		["FFFF33","joy"],
		["FFFF66","joy"],
		["FFFF99","joy"],
		["FFFFCC","joy"],
		["FFFFFF","joy"]
	]
}

ntc.init();


	//=========================================turn RGB into websafe================================


	function superDuperRoundingMagicMachine(soiledIt){

		if (soiledIt < 26){
			soiledIt = 00;
		}

		else if (soiledIt > 25 && soiledIt < 77){
			soiledIt = 51;
		}


		else if (soiledIt > 76 && soiledIt < 128){
			soiledIt = 102;
		}


		else if (soiledIt > 127 && soiledIt < 179){
			soiledIt = 153;
		}


		else if (soiledIt > 178 && soiledIt < 230){
			soiledIt = 204;
		}

		else if (soiledIt > 229){
			soiledIt = 255;
		}

		return soiledIt;
	}

	var r = superDuperRoundingMagicMachine(firstcolorR);
	var g = superDuperRoundingMagicMachine(firstcolorG);
	var b = superDuperRoundingMagicMachine(firstcolorB);

	var r2 = superDuperRoundingMagicMachine(secondcolorR);
	var g2 = superDuperRoundingMagicMachine(secondcolorG);
	var b2 = superDuperRoundingMagicMachine(secondcolorB);

	var r3 = superDuperRoundingMagicMachine(thirdcolorR);
	var g3 = superDuperRoundingMagicMachine(thirdcolorG);
	var b3 = superDuperRoundingMagicMachine(thirdcolorB);

	//==============================================================================================


	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}   

	    //alert(r + "  " + g + " " + b);
	    var hexcolor = rgbToHex(r,g,b);
	    var hexcolor2 = rgbToHex(r2,g2,b2);
	    var hexcolor3 = rgbToHex(r3,g3,b3);

	    var n_match  = ntc.name(hexcolor);
	        n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
	        n_name       = n_match[1]; // This is the text string for the name of the match
	        n_exactmatch = n_match[2]; // True if exact color match, False if close-match

	        var n_match2  = ntc.name(hexcolor2);
	        n_rgb2        = n_match2[0]; // This is the RGB value of the closest matching color
	        n_name2       = n_match2[1]; // This is the text string for the name of the match
	        n_exactmatch2 = n_match2[2]; // True if exact color match, False if close-match

	        var n_match3  = ntc.name(hexcolor);
	        n_rgb3        = n_match3[0]; // This is the RGB value of the closest matching color
	        n_name3       = n_match3[1]; // This is the text string for the name of the match
	        n_exactmatch3 = n_match3[2]; // True if exact color match, False if close-match

	        var mood = "sad";
	        var moodName;
	        var mood2;
	        var moodName2;
	        var mood3;
	        var moodName3;

	alert(n_name+" "+n_name2+" "+n_name3);

	var colorPalette = 
	"<h2>Color Palette</h2>"+
	"<h1>"+n_name+"</h1>"+
	"<div id='colorsInHere'>"+
	"<div class='swatches'></div><div class='swatches'></div><div class='swatches'></div>"+
	"</div>";

	//alert("Mood # is: "+ mood);
	$.get( "php/undertone.php", { themood: mood } )
	.done(function( data ) {
	            //alert( "Data Loaded: " + data );
	            
	            $('#stuffhere').html(data);
	            $('#colorPalette').html(colorPalette);
	            $(".swatches:first-child").css("background-color",hexcolor);
	            $(".swatches:nth-child(2)").css("background-color",hexcolor2);
	            $(".swatches:nth-child(3)").css("background-color",hexcolor3);
	            //$("body").css("background-color",hexcolor);     CHANGES THE BACKGROUND TO PRIMARY COLOR
	        });



	    };//);


$("#openWebcam").click(function(){
	var sayCheese = new SayCheese('#container-element', { snapshots: true });
	$("#capture").delay(800).fadeIn(1);
	$("#drop-zone").fadeOut(800);
	$("#openWebcam").fadeOut(800);
	sayCheese.on('start', function() {
	     // do something when started
	     
	 });

	sayCheese.on('error', function(error) {
	     // handle errors, such as when a user denies the request to use the webcam,
	     // or when the getUserMedia API isn't supported
	 });

	sayCheese.on('snapshot', function(snapshot) {
		var img = document.createElement('img');

		$(img).on('load', function() {
			$('#say-cheese-snapshots').prepend(img);
		});
		img.src = snapshot.toDataURL('image/png');
		sayCheese.stop();
		$("#container-element").hide();
		$("#capture").hide();
	});

	sayCheese.start();
	$("#capture").click(function(){
		sayCheese.takeSnapshot();
	});
});


}





);