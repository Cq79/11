<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();
/*****获取cart中指定用户的商品id****/
function getGoodsId()
{
   $userId = $_REQUEST['userId'];
   $sql = 'select id,num from carts where userId='.$userId;
   $data = select($sql);
   echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
 }

function lst()
{
  $id = $_POST['goodsId'];
  $id = substr($id,0,strlen($id)-1);
  // 一次性获取多条数据
  $sql = "select * from products where id in ($id)";
 $data = select($sql);
 echo json_encode([
  'stateCode'=>200,
  'state'=>'success',
  'data'=>$data
]);
}

function update()
{
  $gId = $_REQUEST['goodsId'];
  $num = $_REQUEST['goodsNum'];
  $user = $_REQUEST['userId'];
  $sql = "update carts set num=$num where id=$gId and userId= $user";
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

function delete()
{
  $gId = $_REQUEST['goodsId'];
  $user = $_REQUEST['userId'];
  $sql = "delete from carts where id=$gId and userId= $user";
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