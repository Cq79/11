<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();


//注册用户名
function addUser()
{
 //echo '我是添加';
 $userId = $_REQUEST['userId'];
 $pwd=$_REQUEST['pwd'];  

 $sql = "insert into login (userId,pwd) values('$userId','$pwd')";

  $res = query($sql);
//   echo $res;
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

function selectId()
{
   $userId = $_REQUEST['userId'];
   $pwd=$_REQUEST['pwd'];
   $sql = 'select userId,pwd from login where userId='.$userId;
   $data = select($sql);
   echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
 }
?>