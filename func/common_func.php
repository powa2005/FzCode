<?php
/**
 * ��ʾ������Ϣ�ģ�������ת
 * @param string $mes
 * @param string $url
 */
function alertMes($mes,$url){
	echo "<script type='text/javascript'>alert('{$mes}');location.href='{$url}';</script>";
}
/**
 * ��ȡ�ļ���չ��
 * @param string $filename
 * @return string
 */
function getExt($filename){
	return strtolower(pathinfo($filename,PATHINFO_EXTENSION));
}

/**
 * ����Ψһ����
 * @param int $length
 * @return string
 */
function getUniqidName($length=10){
	return substr(md5(uniqid(microtime(true),true)),0,$length);
}
?>