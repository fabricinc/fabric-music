<?php
ini_set('memory_limit','2048M');
//ini_set('display_errors', 'On'); 
date_default_timezone_set("America/Los_Angeles");
ini_set('max_execution_time', 1800);
set_time_limit(0);

$artistInfo = $_GET['artistInfo'];

$username = "hol6ods4op";
$password = "el6oG1I7ce";
$hostname = "fbrc-prod-db.cwukysbxzzqr.us-east-1.rds.amazonaws.com"; 

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");
   
//select a database to work with
$selected = mysql_select_db("Fabric",$dbhandle) 
  or die("Could not select Fabric");  

$query="SET NAMES utf8";
$result_select = mysql_query($query);	

//Example input data
$keyartistID="2RdwBSPQiwcmiDo9kixcl8";
$keyartistName="Pharrell Williams";

//Keep track of all related artists in an array to query against them later
$artistarray = array();

$finalResults = array();


//PART I - Search Fabric data for all artists 1 degree of separation away
$select_query="SELECT * from(
select publishedid,studio as artistName,title,CONCAT('http://api-admin.trailerpop.com/files/posters/',publishedid,'_poster.jpg') as art,year,mpaa_rating as spotifyID,ad_path as preview from MovieTags 
inner join movie_details_developments on publishedid=moviePublishedID and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL
where tag=\"$keyartistName\" and studio!=\"$keyartistName\"
UNION
select publishedid,studio as artistName,title,CONCAT('http://api-admin.trailerpop.com/files/posters/',publishedid,'_poster.jpg') as art,year,mpaa_rating as spotifyID,ad_path as preview from (
select distinct tag from movie_details_developments 
inner join MovieTags on publishedid=moviePublishedID and studio=\"$keyartistName\"
where source='SpotifyRelatedArtist' and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL) alias
inner join movie_details_developments on studio=tag and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL
ORDER BY RAND()
) finalalias
GROUP BY artistName
ORDER BY RAND();";

$result=mysql_query($select_query);



while ($row = mysql_fetch_array($result)) {

	$spotifyID		= str_replace("spotify:track:","",$spotifyID);	
	$publishedid	= $row['publishedid'];	
	$artistName		= $row['artistName'];	
	$spotifyID		= $row['spotifyID'];
	$preview		= $row['preview'];
	$title			= $row['title'];	
	$art			= $row['art'];

	array_push($artistarray, "$artistName");
		 
	array_push($finalResults,
		array (
			'publishedid'	=> $publishedid,
			'artistName'	=> $artistName,
			'spotifyID'		=> $spotifyID,
			'preview'		=> $preview,
			'title'			=> $title,
			'artistID'		=> null,
			'art'			=> $art,
		)
	);
}

// echo json_encode($finalResults);

//PART II - Check Spotify once to compare their list of related artists to the above Fabric data
$url="https://api.spotify.com/v1/artists/".$keyartistID."/related-artists";
$get_contents=file_get_contents($url);
$search_results = json_decode($get_contents);	

$artistResults=$search_results->artists;
shuffle($artistResults);	


//Loop through the 20 related artists
for ($j=0; $j<=19; $j++) {		

	$artistName=$artistResults[$j]->name;
	$artistID=$artistResults[$j]->id;		

//Check to see if we've already covered the artist; if so, skip further calls to Spotify				
	if (!in_array("$artistName", $artistarray)) {		
		array_push($artistarray, "$artistName");
						
		$tracksurl="https://api.spotify.com/v1/artists/$artistID/top-tracks?country=US";
	
		$get_contents=file_get_contents($tracksurl);
		$search_results = json_decode($get_contents);	

		$trackResults=$search_results->tracks;
		$trackrandomizer=rand(0, 9);
	
		for ($jj=0; $jj<=9; $jj++) {

			$title		= $trackResults[$jj]->name;
			$preview	= $trackResults[$jj]->preview_url;
			$art		= $trackResults[$jj]->album->images[0]->url;
			$artistName	= $trackResults[$jj]->artists[0]->name;
			$spotifyID	= $trackResults[$jj]->uri;			
			$spotifyID	= str_replace("spotify:track:","",$spotifyID);			
				
			if ($trackrandomizer==$jj && $art!="") {

				array_push($finalResults,
					array (
						'publishedid'	=> "" ,
						'artistName'	=> $artistName,
						'title'			=> $title,
						'art'			=> $art,
						'spotifyID'		=> $spotifyID,
						'preview'		=> $preview,
						'artistID'		=> $artistID
					)
				);
			}			
		}
	}	
}


// echo "string2";
// echo json_encode($finalResults);

//PART III - Search Fabric data for all artists 2 degrees of separation away - i.e. 1 degree of separation away from related artists
$artistarrayimplode= implode('","', $artistarray);

$select_query="SELECT * from(
	select publishedid,studio as artistName,title,CONCAT('http://api-admin.trailerpop.com/files/posters/',publishedid,'_poster.jpg') as art,year,mpaa_rating as spotifyID,ad_path as preview from MovieTags 
	inner join movie_details_developments on publishedid=moviePublishedID and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL
	where tag in (\"$artistarrayimplode\") and tag!='' and studio!=\"$keyartistName\"
	UNION
	select publishedid,studio as artistName,title,CONCAT('http://api-admin.trailerpop.com/files/posters/',publishedid,'_poster.jpg') as art,year,mpaa_rating as spotifyID,ad_path as preview from (
	select distinct tag from movie_details_developments 
	inner join MovieTags on publishedid=moviePublishedID and studio in (\"$artistarrayimplode\")
	where source='SpotifyRelatedArtist' and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL) alias
	inner join movie_details_developments on studio=tag and section_id=4 and poster_path is NOT NULL and ad_path is NOT NULL and studio!=\"$keyartistName\"
	ORDER BY RAND()
	) finalalias
	GROUP BY artistName
	ORDER BY RAND();";



 $result=mysql_query($select_query);

 while ($row = mysql_fetch_array($result)) {
	 $publishedid=$row['publishedid'];	
	 $artistName=$row['artistName'];	
	 $title=$row['title'];	
	 $art=$row['art'];
	 $spotifyID=$row['spotifyID'];
	 $spotifyID=str_replace("spotify:track:","",$spotifyID);	
	 $preview=$row['preview'];
	 
		if (!in_array("$artistName", $artistarray)) {

		 	array_push($artistarray, "$artistName");

			array_push($finalResults,
			array (
				'publishedid'	=> $publishedid,
				'artistName'	=> $artistName,
				'title'			=> $title,
				'art'			=> $art,
				'spotifyID'		=> $spotifyID,
				'preview'		=> $preview,
				'artistID'		=> null
			));
		}
		 
 }

 echo json_encode($finalResults);
?>