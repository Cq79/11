<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();


function lst()
{
  $id = $_POST['goodsId'];
  //$id = substr($id,0,strlen($id)-1);
  // 一次性获取多条数据
  $sql = "select * from products where id=".$id;
  //echo $sql;
 $data = select($sql);
 //echo $data;
 echo json_encode([
  'stateCode'=>200,
  'state'=>'success',
  'data'=>$data
]);
}


function add()
{
 //echo '我是添加';
 $userId = $_POST['userId'];
 $gId = $_POST['gId'];
 $gNum = $_POST['gNum'];

 $sql = "insert into carts(userId,id,num,size) values('$userId','$gId','$gNum',40) on duplicate key update num=num+$gNum";
 //echo $sql;die;
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
?>