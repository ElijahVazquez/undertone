$(function(){
	var counter=0;
	$('#stuffhere').hide();
	$("#colorPalette").hide();
	$("#hideMe").hide();
	var dropbox = $('#dropbox'),
		message = $('.message', dropbox),
		mainBody = $('#lifeForce'),
		sourceImage;

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
			alert("init image set");
			counter++;
		}
		else if(counter > 1){
			alert("new image replace old");
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
		
		message.hide();

		if(counter == 0){
			preview.appendTo(mainBody);
			counter++;
			alert("counter increase");
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
	        }
	        /*for(i=0; i<paletteArray.length; i++){
	           var ? = paletteArray[i]
	        }*/

	        console.log(firstcolorR + " " + firstcolorG + " " + firstcolorB + " YES SEXY ");

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
	    ['000000', 'black'],
	    ['000033', 'black'],
	    ['000066', 'blue'],
	    ['000099', 'blue'],
	    ['0000CC', 'blue'],
	    ['0000FF', 'blue'],
	    ['003300', 'black'],
	    ['003333', 'black'],
	    ['003366', 'blue'],
	    ['003399', 'blue'],
	    ['0033CC', 'blue'],
	    ['0033FF', 'blue'],
	    ['006600', 'green'],
	    ['006633', 'green'],
	    ['006666', 'green'],
	    ['006699', 'blue'],
	    ['0066CC', 'blue'],
	    ['0066FF', 'blue'],
	    ['009900', 'green'],
	    ['009933', 'green'],
	    ['009966', 'green'],
	    ['009999', 'blue'],
	    ['0099CC', 'blue'],
	    ['0099FF', 'blue'],
	    ['00CC00', 'green'],
	    ['00CC33', 'green'],
	    ['00CC66', 'green'],
	    ['00CC99', 'green'],
	    ['00CCCC', 'blue'],
	    ['00CCFF', 'blue'],
	    ['00FF00', 'green'],
	    ['00FF33', 'green'],
	    ['00FF66', 'green'],
	    ['00FF99', 'green'],
	    ['00FFCC', 'green'],
	    ['00FFFF', 'blue'],
	    ['330000', 'black'],
	    ['330033', 'black'],
	    ['330066', 'purple'],
	    ['330099', 'purple'],
	    ['3300CC', 'purple'],
	    ['3300FF', 'purple'],
	    ['333300', 'grey'],
	    ['333333', 'grey'],
	    ['333366', 'purple'],
	    ['333399', 'purple'],
	    ['3333CC', 'purple'],
	    ['3333FF', 'purple'],
	    ['336600', 'green'],
	    ['336633', 'green'],
	    ['336666', 'green'],
	    ['336699', 'blue'],
	    ['3366CC', 'blue'],
	    ['3366FF', 'blue'],
	    ['339900', 'green'],
	    ['339933', 'green'],
	    ['339966', 'green'],
	    ['339999', 'green'],
	    ['3399CC', 'blue'],
	    ['3399FF', 'blue'],
	    ['33CC00', 'green'],
	    ['33CC33', 'green'],
	    ['33CC66', 'green'],
	    ['33CC99', 'green'],
	    ['33CCCC', 'blue'],
	    ['33CCFF', 'blue'],
	    ['33FF00', 'green'],
	    ['33FF33', 'green'],
	    ['33FF66', 'green'],
	    ['33FF99', 'green'],
	    ['33FFCC', 'green'],
	    ['33FFFF', 'blue'],
	    ['660000', 'grey'],
	    ['660033', 'grey'],
	    ['660066', 'purple'],
	    ['660099', 'purple'],
	    ['6600CC', 'purple'],
	    ['6600FF', 'purple'],
	    ['663300', 'grey'],
	    ['663333', 'grey'],
	    ['663366', 'purple'],
	    ['663399', 'purple'],
	    ['6633CC', 'purple'],
	    ['6633FF', 'purple'],
	    ['666600', 'green'],
	    ['666633', 'green'],
	    ['666666', 'grey'],
	    ['666699', 'grey'],
	    ['6666CC', 'purple'],
	    ['6666FF', 'purple'],
	    ['669900', 'green'],
	    ['669933', 'green'],
	    ['669966', 'green'],
	    ['669999', 'grey'],
	    ['6699CC', 'purple'],
	    ['6699FF', 'purple'],
	    ['66CC00', 'green'],
	    ['66CC33', 'green'],
	    ['66CC66', 'green'],
	    ['66CC99', 'green'],
	    ['66CCCC', 'blue'],
	    ['66CCFF', 'blue'],
	    ['66FF00', 'green'],
	    ['66FF33', 'green'],
	    ['66FF66', 'green'],
	    ['66FF99', 'green'],
	    ['66FFCC', 'green'],
	    ['66FFFF', 'blue'],
	    ['990000', 'red'],
	    ['990033', 'red'],
	    ['990066', 'purple'],
	    ['990099', 'purple'],
	    ['9900CC', 'purple'],
	    ['9900FF', 'purple'],
	    ['993300', 'red'],
	    ['993333', 'red'],
	    ['993366', 'purple'],
	    ['993399', 'purple'],
	    ['9933CC', 'purple'],
	    ['9933FF', 'purple'],
	    ['996600', 'orange'],
	    ['996633', 'orange'],
	    ['996666', 'grey'],
	    ['996699', 'purple'],
	    ['9966CC', 'purple'],
	    ['9966FF', 'purple'],
	    ['999900', 'green'],
	    ['999933', 'green'],
	    ['999966', 'grey'],
	    ['999999', 'grey'],
	    ['9999CC', 'purple'],
	    ['9999FF', 'purple'],
	    ['99CC00', 'green'],
	    ['99CC33', 'green'],
	    ['99CC66', 'green'],
	    ['99CC99', 'green'],
	    ['99CCCC', 'blue'],
	    ['99CCFF', 'blue'],
	    ['99FF00', 'green'],
	    ['99FF33', 'green'],
	    ['99FF66', 'green'],
	    ['99FF99', 'green'],
	    ['99FFCC', 'green'],
	    ['99FFFF', 'blue'],
	    ['CC0000', 'red'],
	    ['CC0033', 'red'],
	    ['CC0066', 'red'],
	    ['CC0099', 'purple'],
	    ['CC00CC', 'purple'],
	    ['CC00FF', 'purple'],
	    ['CC3300', 'red'],
	    ['CC3333', 'red'],
	    ['CC3366', 'red'],
	    ['CC3399', 'purple'],
	    ['CC33CC', 'purple'],
	    ['CC33FF', 'purple'],
	    ['CC6600', 'orange'],
	    ['CC6633', 'orange'],
	    ['CC6666', 'orange'],
	    ['CC6699', 'purple'],
	    ['CC66CC', 'purple'],
	    ['CC66FF', 'purple'],
	    ['CC9900', 'orange'],
	    ['CC9933', 'orange'],
	    ['CC9966', 'orange'],
	    ['CC9999', 'grey'],
	    ['CC99CC', 'pink'],
	    ['CC99FF', 'pink'],
	    ['CCCC00', 'yellow'],
	    ['CCCC33', 'yellow'],
	    ['CCCC66', 'yellow'],
	    ['CCCC99', 'yellow'],
	    ['CCCCCC', 'grey'],
	    ['CCCCFF', 'blue'],
	    ['CCFF00', 'yellow'],
	    ['CCFF33', 'yellow'],
	    ['CCFF66', 'yellow'],
	    ['CCFF99', 'green'],
	    ['CCFFCC', 'green'],
	    ['CCFFFF', 'blue'],
	    ['FF0000', 'red'],
	    ['FF0033', 'red'],
	    ['FF0066', 'red'],
	    ['FF0099', 'pink'],
	    ['FF00CC', 'pink'],
	    ['FF00FF', 'pink'],
	    ['FF3300', 'red'],
	    ['FF3333', 'red'],
	    ['FF3366', 'red'],
	    ['FF3399', 'purple'],
	    ['FF33CC', 'pink'],
	    ['FF33FF', 'pink'],
	    ['FF6600', 'orange'],
	    ['FF6633', 'orange'],
	    ['FF6666', 'orange'],
	    ['FF6699', 'pink'],
	    ['FF66CC', 'pink'],
	    ['FF66FF', 'pink'],
	    ['FF9900', 'orange'],
	    ['FF9933', 'orange'],
	    ['FF9966', 'orange'],
	    ['FF9999', 'orange'],
	    ['FF99CC', 'pink'],
	    ['FF99FF', 'pink'],
	    ['FFCC00', 'yellow'],
	    ['FFCC33', 'yellow'],
	    ['FFCC66', 'yellow'],
	    ['FFCC99', 'orange'],
	    ['FFCCCC', 'orange'],
	    ['FFCCFF', 'pink'],
	    ['FFFF00', 'yellow'],
	    ['FFFF33', 'yellow'],
	    ['FFFF66', 'yellow'],
	    ['FFFF99', 'yellow'],
	    ['FFFFCC', 'yellow'],
	    ['FFFFFF', 'white']
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
	    var bright = r+g+b;

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

	    var n_match  = ntc.name(hexcolor);
	        n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
	        n_name       = n_match[1]; // This is the text string for the name of the match
	        n_exactmatch = n_match[2]; // True if exact color match, False if close-match

	var mood;
	var moodName;

	if (n_name == 'red'){
	    mood = '42958';//Aggressive';
	    moodName = 'Aggressive';
	} else if (n_name == 'green'){
	    mood = '65332';//Lively';
	    moodName = 'Lively';
	} else if (n_name == 'blue'){
	    mood = '65326'; //Cool';
	    moodName = 'Cool';
	} else if (n_name == 'yellow'){
	    mood = '42960';//Excited';
	    moodName = 'Excited';
	} else if (n_name == 'purple'){
	    mood = '42954'; //Sophisticated
	    moodName = 'Sophisticated';
	} else if (n_name == 'orange'){
	    mood = '42961';//Energizing';
	    moodName = 'Energizing';
	} else if (n_name == 'pink'){
	    mood = '65323';//Romantic';
	    moodName = 'Romantic';
	} else if (n_name == 'grey'){
	    mood = '42949';//Melancholy';
	    moodName = 'Melancholy';
	} else if (n_name == 'black'){
	    mood = '65327';//Gritty';
	    moodName = 'Gritty';
	} else if (n_name == 'white'){
	    mood = '65332'; //Peaceful
	    moodName = 'Peaceful';
	} else{ alert('I tried to make ramen in the coffee pot and broke everything..') }

	var colorPalette = 
	                    "<h2>Color Palette</h2>"+
	                    "<h1>"+ moodName +"</h1>"+
	                    "<div id='colorsInHere'>"+
	                        "<div class='swatches'></div><div class='swatches'></div><div class='swatches'></div><div class='swatches'></div>"+
	                    "</div>";

	//alert("Mood # is: "+ mood);
	    $.get( "php/undertone.php", { themood: mood } )
	        .done(function( data ) {
	            //alert( "Data Loaded: " + data );
	            
	            $('#stuffhere').html(data);
	            $('#colorPalette').html(colorPalette);
	            $(".swatches").css("background-color",hexcolor);
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