<?php 

$key = '155e00c31ee00eb4ee33bd0ac11592ef2deafc1a';
$tag = $_GET['mood'];
if($tag != null && $tag != ''){
	$playlistUrl = "http://8tracks.com/mix_sets/tags:".$tag.".json?api_key=".$key."?api_version=3?&include=mixes&per_page=1";
	$playTokenUrl= "http://8tracks.com/sets/new.json?api_key=".$key;
	$playlist = file_get_contents($playlistUrl);
	$playlist = json_decode($playlist);
	$playToken = file_get_contents($playTokenUrl);
	$playToken = json_decode($playToken);
	$id = $playlist->mix_set->mixes[0]->id;
	$token = $playToken->play_token;
	$playback = "http://8tracks.com/sets/".$token."/play.json?mix_id=".$id."?api_version=3?api_key=".$key;
	$play = file_get_contents($playback);
	$play = json_decode($play);
	//$nextPlayback= "http://8tracks.com/sets/".$token."/next.json?mix_id=".$id."?api_version=3?api_key=".$key;
	//$next = file_get_contents($nextPlayback);
	//$next = json_decode($next);

	$artist = $play->set->track->performer;
	$title = $play->set->track->name;
	$trackUrl = $play->set->track->track_file_stream_url;

		/*echo "<pre>";
		echo "<br><br>";
		var_dump($details);
		echo "</pre>";)*/

	$jsonArray = array('title'=>$tag,'artist'=>$artist,'track'=>$trackUrl);
	echo json_encode($jsonArray);
}else{
	$jsonArray = array('title'=>'sorry, ','artist'=>'Something went wrong. ','track'=>' ');
	echo json_encode($jsonArray);
}
?>