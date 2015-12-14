<?php
$username = "hol6ods4op";
$password = "el6oG1I7ce";
$hostname = "fbrc-prod-db.cwukysbxzzqr.us-east-1.rds.amazonaws.com"; 
$dbhandle = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");
$selected = mysql_select_db("Fabric",$dbhandle) 
  or die("Could not select Fabric");  


//get the q parameter from URL
$q=$_GET["q"];

//echo "<br>Now, select a search result to start finding gems!<br><br>";

//lookup all links from the xml file if length of q>0
if (strlen($q)>1) {

$sql="select * from (
		SELECT
             studio,publishedid,listCount
            FROM movie_details_developments 
            WHERE MATCH(studio,title) AGAINST('".$q."*' IN BOOLEAN MODE)
            AND studio like '%".$q."%' and section_id in (4) and poster_path is NOT NULL  
            ORDER BY listCount DESC               
 ) alias
            GROUP BY studio   
            ORDER BY listCount DESC      
            LIMIT 0, 6;";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result)) 
 {
 	 $title=utf8_encode($row['studio']);
 	 $publishedid=$row['publishedid']; 	
 	  
 	 echo "<div id=searchwrapper>
 	 <div id=searchimg onclick=getGems($publishedid); style=\"display:inline-block;cursor:pointer;\">
 	 <img src=http://d3j6zu3ol1gh5f.cloudfront.net/posters/thumbnails/".$publishedid."_144-poster.jpg height=70 width=70>
 	 </div>
 	 <div id=searchtext onclick=getGems($publishedid); style=\"\">
 	 $title
 	 </div></div>";
 }
 

}




?>