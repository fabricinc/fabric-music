


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

