<?php
//Byte/Kb/MB/GB/TB/EB
///将文件大小自动转换单位
///$size：文件大小，单位为Byte
function transByte($size){
	$arr=array("B","KB","MB","GB","TB","EB");
	$i=0;
	//得到的字节除以1024为KB，再除为MB，以此类推
	while($size>1024){
		$size/=1024;
		$i++;  //单位的索引号
	}
	return round($size,2).$arr[$i];//将结果保留两位小数，后面加上单位
}
?>
