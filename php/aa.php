<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();


//渲染页面
function lst(){
	//一页四条
	$lenght = 4;
	$pageNow = $_GET['pageNow'];
	//计算起始位置
	$start = ($pageNow -1)*$lenght;
	//查询数据库中总条数
	$sqlAll = "select count(activeId) allCount from hi";
	$allCount = select($sqlAll)[0]['allCount'];
	
	//计算总页数
	$pageCount = round($allCount/$lenght);
	
	 // echo  $sqlAll;
	$sql = "select * from hi  order by activeId limit $start,$lenght";
	$data = select($sql);
	// var_dump($data) ;
	echo json_encode([
		"stateCode"=>200,
		"state"=>"success",
		"data"=>$data,
		"pageCount"=>$pageCount
	]);
};


?>