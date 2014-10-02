<?php
function readDirectory($path){
	//打开指定目录
	$handle=opendir($path);
	while(($item=readdir($handle))!==false){
		//.和..为当前目录和上级目录
		if($item!="."&&$item!=".."){
			$arr['file'][]=$item;
		}
		if(is_dir($path."/".$item)){
			$arr['dir'][]=$item;
		}
	}
	closedir($handle);
	return $arr;
}
//$path="../file";
//print_r(readDirectory($path));

?>