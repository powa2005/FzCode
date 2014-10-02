<?php 
	error_reporting(0);
	require_once "func/dir_func.php";
	require_once "func/file_func.php";
	
	$path="file";
	$path=$_REQUEST['path']?$_REQUEST['path']:$path;
	$info=readDirectory($path);
	
	//print_r($info);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Web在线文件管理器</title>
<script type="text/javascript" src="jquery-ui/js/juery-1.10.2.js"></script>

<script type="text/javascript" src="jquery-ui/js/juery-1.10.4.custom.js"></script>
<script type="text/javascript" src="jquery-ui/js/juery-1.10.4.custom.min.js"></script>
<link rel="stylesheet" href="jquery-ui/css/ui-lightness/juery-ui.1.10.4.custom.css" type="text/css"/>
<link rel="stylesheet" href="cikonss.css"/>
<style type="text/css">
	.t_file{width:100%;}
	.t_file{border:1px solid #ccc;}
	.t_file td{border:1px solid #ccc;}
	.t_file_title{background:#5a9bd5;color:#caebce;}
	img{width:24px;}
	#navi a{display:block;width:48px;height:48px;}
	#navi{list-style:none;margin-left:15px;padding:0px;}
	#navi li{float:left;margin-top:4px;}
	#top{width:100%;height:48px;margin:0 auto;background:#e2e2e2;}

</style>
</head>

<body>
    <div id="top">
		<ul id="navi">
			<li>
				<a href="index.php" title="主目录">
					<span class="icon icon-small icon-square">
					<span class="icon-home"></span></span>
				</a>
			</li>
			<li>
				<a href="" title="新建文件">
					<span class="icon icon-small icon-square">
					<span class="icon-file"></span></span>
				</a>
			</li>
			<li>
				<a href="" title="新建文件夹">
					<span class="icon icon-small icon-square">
					<span class="icon-folder"></span></span>
				</a>
			</li>
			<li>
				<a href="" title="上传文件">
					<span class="icon icon-small icon-square">
					<span class="icon-upload"></span></span>
				</a>
			</li>
			<li>
				<a href="" title="返回上级目录">
					<span class="icon icon-small icon-square">
					<span class="icon-arrowLeft"></span></span>
				</a>
			</li>
		</ul>
	</div>
	<table class="t_file" cellspacing=0 cellpadding=0>
		<tr class="t_file_title"><td>编号</td><td>名称</td><td>类型</td><td>大小</td><td>可读</td><td>可写</td><td>可执行</td><td>创建时间</td><td>修改时间</td><td>访问时间</td><td>操作</td></tr>
	<?php 
		if($info['file']){
			$i=1;
			foreach($info['file'] as $val){
				$p=$path."/".$val;
	?>
	<tr>
		<td><?php echo $i;?></td>
		<td><?php echo $p;?></td>
		<td><?php $src=filetype($p)=="file"?"images/file_ico.png":"images/folder_ico.png";$filetype=filetype($p)=="file"?"文件":"文件夹";
		?><img src="<?php echo $src; ?>" title="<?php echo $filetype; ?>"</td>
		<td><?php echo transbyte(filesize($p)); ?></td>
		<td><?php $src=is_readable($p)?"images/correct.png":"images/error.png";?><img src="<?php echo $src; ?>" title=""</td>
		<td><?php $src=is_writable($p)?"images/correct.png":"images/error.png";?><img src="<?php echo $src; ?>" title=""</td>
		<td><?php $src=is_executable($p)?"images/correct.png":"images/error.png";?><img src="<?php echo $src; ?>" title=""</td>
		<td><?php echo date("Y-m-d h:i:s",filectime($p));?></td>
		<td><?php echo date("Y-m-d h:i:s",filemtime($p));?></td>
		<td><?php echo date("Y-m-d h:i:s",fileatime($p));?></td>
		<td>
			<a href="" onclick=""><img class="small" src="images/show.png" title="查看"/></a>|
			<a href="" onclick=""><img class="small" src="images/edit.png" title="编辑"/></a>|
			<a href="" onclick=""><img class="samll" src="images/rename.png" title="重命名"/></a>|
			<a href="" onclick=""><img class="small" src="images/copy.png" title="复制"/></a>|
			<a href="" onclick=""><img class="small" src="images/cut.png" title="剪切"/></a>|
			<a href="" onclick=""><img class="small" src="images/delete.png" title="删除"/></a>|
			<a href="" onclick=""><img class="small" src="images/download.png" title="下载"/></a>
		</td>
	</tr>
	<?php			
				$i++;
			}
		}
		
	?>
	</table>
 
</body>
</html>
