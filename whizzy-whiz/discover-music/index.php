<html>
<head>
	<meta charset=utf-8 />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
	<title>Fabric</title>
	<link rel="icon" type="image/png" href="https://s3.mzstatic.com/us/r30/Purple3/v4/b5/5d/a6/b55da65f-785f-a230-2ba4-6ec4ed161f5f/mzl.dyoamfxc.png?downloadKey=1422924262_33a6dd6efb5a591f659d4d70d5ace147">



<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68506304-1', 'auto');
  ga('send', 'pageview');

</script>

<script>

  
function hide() {
 //    document.getElementById('introinput').style.display='none';
 //     document.getElementById('intro').style.display='none';
    document.getElementById('ending').style.display='block'; 
//     document.getElementById('newsearch').style.display='block';
}

function show() {
      document.getElementById('intro').style.display='block';
      document.getElementById('newsearch').style.display='none'; 
   showResult("");       
    document.getElementById('gemForm').reset();
}

$(document).ready(function() {
  var timer;
  $("input").keyup(function() {
    clearTimeout(timer);
    var ms = 200; // milliseconds
    var val = this.value;
    timer = setTimeout(function() {
      lookup(val);
    }, ms);
  });
});


function showResult(str) {
  if (str.length==0) { 
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch").style.border="0px";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}



function getGems(publishedid) {
$('#backdrop')[0].scrollIntoView();
showResult("");
document.getElementById('gemForm').reset();
 if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch2").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch2").style.border="0px";
      hide();
    }
  }
  xmlhttp.open("GET","getgems.php?q="+publishedid,true);
  xmlhttp.send();
}

</script>

<style>

body {
	font-family: Helvetica, arial, sans-serif;
	margin: 0;
	padding: 0;
	background-color:#eaeaea;
}
#backdrop {
margin: 0 auto;
width:798px;
height:auto;
background-color:white;
z-index:-1;

}
#backdrop100 {
position:absolute;
left:50%;
width:798px;
margin-left:-399px;
height:100%;
background-color:white;
z-index:-1;

}
.maintext {
	font-size:24px;
	line-height:32px;
}
.container {
	margin: 0 auto;
	max-width: 550px;
	min-width: 320px;
}
.container #header {
	width: 550px;
	overflow: hidden;
	margin-bottom:10px;
}
#logo {
	margin-top:11px;
    height: 60px;
    width:158px;	
}
#app-store, #app-store-header, #app-store-header-gplus {
    float: right;
    margin-top: 11px;
    background: none;
}
#app-store-header {
	margin-right: 5px;
	margin-top: 14px;
	width: 150px;
    height: 55px;
}
#app-store-header-gplus {
    margin-top: 16px;
    width: 150px;
    height: 50px;
}
#intro {
	margin: 0 auto;
	margin-top:40px;
	width:550px;
	background-color:white;
}
#headline {
	font-weight:bold;
	font-size:28pt;
}
#question {
	font-weight:bold;
	font-size:20pt;
	line-height:34px;
}
#inputwrapper {
	margin: 0 auto;
	width:300;
	position:relative;
	left:-124px;
}	
#introinput {
	width:300px;
	height:35px;
	font-size:18px;
}
#livesearch {
	margin: 0 auto;
	width:800px;
	text-align:center;
	position:absolute;
	z-index:100;
}
#searchtext {
width:222px; 
text-align:left; 
padding:5px; 
position:absolute; 
border-right:1px solid #dedede; 
border-bottom:1px solid #dedede; 
background:white; 
height:59px; 
display:inline-block;
cursor:pointer;
}
#searchwrapper { 
position:relative; 
left:-240px;
}
#livesearch2 {
	margin: 0 auto;
	width:100%;
	text-align:center;
}
#resultstext {
	font-size:20pt;
	line-height:32px;
	position:relative;
	top:-15px;
	z-index:0;
}	
#emptystate {
	font-size:14pt;
	position:relative;
	left:-104px;
	top:-50px;
}	

/*#peoplewrapper {
	margin: 0 auto;
	width:550px;
	text-align:left;
	position:relative;
	top:-5px;
}	
*/

#peoplewrapper {
	margin: 20px auto 0;
	height: 100px;
	/*width:550px;*/
	/*text-align:left;*/
	position:relative;
	top:-5px;
}	

.contentheader {
	font-size:28px;
	font-weight:bold;
}
.contentwrapper {
	margin: 0 auto;
	margin-top:10px;
	text-align:center;
	width:800px;
	position:relative;
	left:-1px;
}
#newsearch {
	margin: 0 auto;
	width:550px;
	margin-top:40px;
	margin-bottom:2px;
	color:black;
	font-size:14px;
}		

#ending {
	margin: 0 auto;
	width:550px;
	background-color:white;
	display:none;
	margin-top:20px;
}
#ending a {
	text-decoration:none;
}
#app-store-end {
	margin-right: 5px;
	margin-top: 18px;
	width: 150px;
    height: 55px;
}
#app-store-gplus-end {
    margin-top: 16px;
    width: 150px;
    height: 50px;
	position:relative;
	top:-4px;
}
footer { 
    text-transform: capitalize;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    margin-top: 40px;
    font-size: 15px;
    color: gray;
    width: 100%;   

}	
footer a { 
	color: gray; 
	margin: 0 3px; 
	text-decoration: underline; 
	display: inline-block;
}

.title-fan {
	display: inline-block;
	margin: 0 10px;
	height: 100px;
	width: 100px;
	border-radius: 50px;
}

.see-all {
	background-color: gray;
	color: white;
	height: 100px;
	line-height: 100px;
	text-transform: uppercase;
	width: 100px;
	position: relative;
	top: -46px;
}


@media only screen and (min-device-width : 320px) and (max-device-width : 736px) {

	body {
		font-family: Helvetica, arial, sans-serif;
		margin: 0;
		padding: 0;
		background-color:white;
	}
	.maintext {
		font-size:30px;
		line-height:38px;
	}

	.container {
		max-width: 700px;
	}
	.container #header {
		width: 700px;
	}

	#logo {
		height: 90px;
		width:237;
	}
	#app-store-header {
		width: 178px;
		height: 65px;
		margin-top: 24px;
	}
	#app-store-header-gplus {
		width: 180px;
		height: 60px;
		margin-top: 26px;
	}

	#intro {
		margin-top:60px;
		width: 700px;
		}

	#question {
		font-weight:bold;
		font-size:25pt;
		line-height:42px;
	}
	
	#inputwrapper {
		width:620;
		position:relative;
		left:-40px;
	}	
	#introinput {
		width:620px;
		height:50px;
		font-size:34px;
	}
	#searchimg img {
	height:100px;
	width:100px;
	}
	#searchtext {
	padding:10px; 
	font-size:28px;
	width:500px;
	height:79px;
	}
	#searchwrapper { 
	position:relative; 
	left:-300px;
	}

	#resultstext {
		font-size:25pt;
		line-height:40px;
		top:-3px;
	}	
	#emptystate {
		font-size:18pt;
		left:-84px;
	}	
	
	.contentwrapper img {	
	height:400px;
	width:266px;	
	}
	#app-store-end {
		width: 178px;
		height: 65px;
	}
	#app-store-gplus-end {
		width: 180px;
		height: 60px;
	}

}
</style>
	

</head>
<body>
<div id=backdrop100></div>
<div id=backdrop>

	<div class="container">
		<div id="header">
    		<a href="http://api-stage.trailerpop.com/gemfinder2/index.php">
    		<img id="logo" src="https://api-admin.trailerpop.com/files/cms/sets/small/logosmall.jpg" /></a>
    	    <a href="http://bit.ly/fabric_android">
    	    <img id="app-store-header-gplus" class="mobile" src="http://api-admin.trailerpop.com/files/cms/sets/small/google-play-logo1.jpg" />
    	    </a>
    		<a href="http://bit.ly/tryfabric">
    	    <img id="app-store-header" class="mobile" src="https://s3.amazonaws.com/fbrc-prod/vendor/app-store.png" alt="" />
    	    </a>
    	</div>
	</div>


<div id=newsearch style="display:none;">Try again with another favorite artist</div>

<div id=intro>
<span id=headline>Need something to listen to?</span><br><br>
<span class=maintext>Fabric provides community-driven entertainment recommendations based on what you love. </span><br><br><br>
<span id=question>What's one of your favorite musicians or bands (all-time or recent)?</span>
<br><br>
</div>

<form id=gemForm onsubmit="return false">
<div id=inputwrapper><input id=introinput type="text" size="30" onkeyup="showResult(this.value)" ></div>
<div id="livesearch">
</div>
<br><br>
<div id="livesearch2">
</div>
</form>
<br>
<div id=ending><span id=headline>Join our community</span><br><br>
<span class=maintext>The best recommendations come from people with great taste. This means you! <br><br>Check out our app to start sharing and discovering great recommendations with people like you. 
</span><br><br>
			<a href="http://bit.ly/tryfabric">
    	    	<img id="app-store-end" class="mobile" src="https://s3.amazonaws.com/fbrc-prod/vendor/app-store.png" />
    	    </a>
    	    <a href="http://bit.ly/fabric_android">
    	    	<img id="app-store-gplus-end" class="mobile" src="http://api-admin.trailerpop.com/files/cms/sets/small/google-play-logo1.jpg" />
    	    </a>
</div>




	<footer id="foot">
    	    <p>&copy; 2015 Fabric. <span id='sf'>Made in San Francisco</span></p>
    	   <a id="contact" href="mailto:support@tryfabric.com">Contact</a>
    	   <a id="terms" href="http://www.tryfabric.squarespace.com/tos">terms</a>
    	   <a id="privacy" href="http://www.tryfabric.squarespace.com/privacy">privacy</a>
     </footer>
</div>
</body>
</html>