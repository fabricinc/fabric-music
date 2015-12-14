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
$userIDs=0;
$avatarcount=0;
$publishedidSet="0";

$sql="select * from (select distinct publishedid,studio from movie_details_developments 
INNER JOIN ListMovies on publishedid=moviePublishedID
INNER JOIN Lists on ListMovies.listID=Lists.id and typeID in (2,3)
where MATCH(studio,title) AGAINST((select concat('\"',studio,'\"') from movie_details_developments where publishedid=$q)  IN BOOLEAN MODE)
and section_id=4) alias
where studio =(select studio from movie_details_developments where publishedid=$q)";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result)) 
 {
 	 $title=$row['studio'];
  	 $publishedid=$row['publishedid']; 
  	 
  	 $publishedidSet=$publishedidSet.",$publishedid";
 }
 


echo "<div style=\"display:inline-block; height:100px;\"><img src=http://d3j6zu3ol1gh5f.cloudfront.net/posters/thumbnails/".$q."_144-poster.jpg height=67 width=67></div>";
echo "<div id=resultstext style=\"width:453px; margin:15px; text-align:left; display:inline-block;\">";

 if ($title=="")
{
echo "<div style=\"position:relative; \">No recommendations found.<br>You have very unique taste!</div>";
}
else
{
	echo "Here's what these top fans of <b>$title</b> recommend.";
}

echo "</div>";

 if ($title=="")
{
echo "<div id=emptystate style=\"top:-18px;\">Try another <b><a href=http://api-stage.trailerpop.com/gemfinder2/index.php>search?</a></b></div>";
}

echo "<div id=peoplewrapper>";
$sql="select distinct uName,facebook_id,0 as movpub,users.id as userID,1 as overlap from FBLikes 
inner join users on users.id=user_id
where FBLikes.name='".$title."' and category LIKE 'Musician%'
UNION
select uName,facebook_id,moviePublishedID as movpub,users.id as userID,count(*) as overlap from ListMovies 
INNER JOIN Lists on Lists.id=ListMovies.listID and typeID in (2,3)
INNER JOIN users on users.id=userID
where moviePublishedID in (".$publishedidSet.")
GROUP by userID
ORDER BY RAND();";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result)) 
 {
 	 $userID=$row['userID']; 	 
 	 $userIDs=$userIDs.",".$userID;
	  $fbid=$row['facebook_id'];
	$resultsfound=1;

	if ($avatarcount<6)
	 {	  
		   if ($fbid=="")
		 {
		 $imgsrc="https://pbs.twimg.com/profile_images/517037046678827008/HTBseQaE_400x400.png";
		 }
		 else
		 {
		 $imgsrc="https://graph.facebook.com/$fbid/picture?width=100&height=100";
		 echo '<img class="title-fan" src="' . $imgsrc . '">';
			$avatarcount=$avatarcount+1;
		 }
	} 
	 
	 
 }
 echo "</div>";
 
 if ($resultsfound>0)
 {
 echo "<br><br><span class=contentheader>SONGS</span><br>";
 echo "<div class=contentwrapper>";
$sql="select * from (select ad_path,movie_details_developments.id,moviePublishedID,studio,title,year,listCount,critics_score,count(*) as count,section_id 
FROM Lists 
INNER JOIN ListMovies on Lists.id=ListMovies.listID
INNER JOIN movie_details_developments on publishedid=moviePublishedID
where Lists.userID in ($userIDs) and typeID in (3) and moviePublishedID not in ($publishedidSet) and listCount<(select count(*)*0.01 from users) 
and section_id in (4) 
and moviePublishedID not in (0) 
GROUP by moviePublishedID
ORDER BY count(*) DESC,listCount ASC) alias
INNER JOIN ShoppingLinks on alias.moviePublishedID=ShoppingLinks.moviePublishedID and vendor=12
GROUP BY studio
ORDER BY count DESC,listCount ASC
LIMIT 15
;";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result)) 
 {
 	 $title=$row['title'];
 	 $publishedid=$row['moviePublishedID']; 	
 	 $movieID=$row['id']; 	
 	 $previewURL=$row['ad_path']; 
 	 $spotifyURL=$row['url']; 
 	  	 
 	 echo "<a href=$spotifyURL target=_blank><div style=\"display:inline-block;cursor:pointer;\"><img src=http://d3j6zu3ol1gh5f.cloudfront.net/posters/".$publishedid."_poster.jpg height=240 width=160></div></a>";
 }
echo "</div>";


}

?>