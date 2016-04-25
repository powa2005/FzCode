//创建目录
//params
//1.path:符合相对路径或绝对路径的字符串
//2.cb:回调函数
var fs = require('fs');
var curPath = '';

function mkdirs(path,cb){
	var isFirst = false;
	if (path.length < 1) {
		cb({err: '缺少文件路径'});
	}
	var p = path;
	//判断是相对路径还是绝对路径--win下'盘符:/'，类linux下'/'
	if(p.indexOf(':/') > -1 || p[0] == '/'){
		cb({err: '暂不支持绝对路径'});
		return;
	}
	//非法路径
	var i = p.lastIndexOf('./');
	var res = p.substr(0,i+2);
	if(/[\.]{3,}\//.test(p) || ( i > -1 && /[\w\u4E00-\u9FA5]/.test(res))){
		cb({err: '非法的路径'});
		return;
	}
	//取出'../'的相对路径
	var relativePathArr = p.match(/\.\.\/|\.\//g);
	var otherPath = p;
	var relativePath = '';
	if(relativePathArr){
		var relativePath = relativePathArr.join('');
		var otherPath = p.substr(relativePath.length);
		isFirst = true;
	}
	
	var resp3 = otherPath.split('/');
	//文件名不能包括非法字符：\/:*?"<>|
	if(/[\\\/\:\*\?\<\>\|]/.test(resp3[0])){
		cb({err: '文件名不能包括非法字符：\/:*?"<>|'});
		return;
	}
	curPath += relativePath + resp3[0] + '/';
	if(!fs.existsSync(curPath)){
		fs.mkdir(curPath,function(err,res){
			createNodeDir(isFirst, p, cb);
		})
	}else{
		createNodeDir(isFirst, p, cb);
	}
}

function createNodeDir(isFirst, p, cb){
	if(isFirst){
		var resp = p.substr(curPath.length);
	}else{
		if(p.indexOf('/') > -1){
			var resp = p.substr(p.indexOf('/') + 1);
		}else{
			resp = '';
		}
	}
	if(resp.length > 1){
		//arguments.callee(resp,cb);
		mkdirs(resp,cb);
	}else{
		cb(null, {res: '创建成功'});
		return;
	}
}

module.exports = mkdirs;
