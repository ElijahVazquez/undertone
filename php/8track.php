<?php session_start();
$counter = $_SESSION['counter'];
$end;
$token;
$id;
$key = '155e00c31ee00eb4ee33bd0ac11592ef2deafc1a';
$tag = $_GET['mood'];

if($tag == $_SESSION['mood']){
	return;
}
if($tag != $_SESSION['mood']){
	session_destroy();
}


if(!$counter){
	if($tag != null && $tag != ''){
		$playlistUrl = "http://8tracks.com/mix_sets/tags:".$tag.".json?api_key=".$key."?api_version=3?&include=mixes&per_page=1";
		$playTokenUrl= "http://8tracks.com/sets/new.json?api_key=".$key;

		$playlist = file_get_contents($playlistUrl);
		$playlist = json_decode($playlist);
		$id = $playlist->mix_set->mixes[0]->id;

		$playToken = file_get_contents($playTokenUrl);
		$playToken = json_decode($playToken);
		$token = $playToken->play_token;

		$playback = "http://8tracks.com/sets/".$token."/play.json?mix_id=".$id."?api_version=3?api_key=".$key;
		$play = file_get_contents($playback);
		$play = json_decode($play);
		$artist = $play->set->track->performer;
		$title = $play->set->track->name;
		$trackUrl = $play->set->track->track_file_stream_url;
		$place = $play->set->at_beginning;  //tells you if youre at the start of the playlist (T / F)
		$end = $play->set->at_end;			//tells you if there is no more playlist  (T / F)
		$skip = $play->set->skip_allowed;   //if we add skips this will help


		$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
		echo json_encode($jsonArray);
		$_SESSION['counter'] = true;
		$_SESSION['token'] = $token;
		$_SESSION['id'] = $id;
		$_SESSION['end'] = $end;
		$_SESSION['mood'] = $tag;

	}else{
		$jsonArray = array('title'=>'sorry, something went wrong.','artist'=>' ','track'=>' ');
		echo json_encode($jsonArray);
	}
}


if($counter){
	if(!$end){
		$token = $_SESSION['token'];
		$id = $_SESSION['id'];
		$nextPlayback= "http://8tracks.com/sets/".$token."/next.json?mix_id=".$id."&api_version=3?api_key=".$key;
		$next = file_get_contents($nextPlayback);
		$next = json_decode($next);

		$artist = $next->set->track->performer;
		$title = $next->set->track->name;
		$trackUrl = $next->set->track->track_file_stream_url;
		$end = $next->set->at_end;

			/*echo "<pre>";
			echo "<br><br>";
			var_dump($next);
			echo "</pre>";*/

		$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
		echo json_encode($jsonArray);
		$_SESSION['end'] = $end;
		$_SESSION['MOOD'] = $tag;
		//session_destroy();
	}
	if($end){
		$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
		echo json_encode($jsonArray);
		session_destroy();
	}
}
?>
















