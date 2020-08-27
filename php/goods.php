<?php
// 导入php文件
include('./mysql.php');
// 获取ajax请求的方法
$fn = $_GET['fn'];  // lst
$fn();  // lst()
function lst(){

  //每页显示的条数
  $length = 3;
  $pageNow = $_REQUEST['pageNow'];
  //计算起始位置
  $start = ($pageNow - 1) * $length;


  //查询数据库中条数
  $sql1 = "select count(id) cou from products";
  $pCou = select($sql1)[0]['cou'];
  
  //计算总页数
  $pageCou=round($pCou / $length);

  $sql="select * from products order by id limit $start,$length";

  // $sql = 'select * from products';
  $data = select($sql);

  //print_r($data);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data,
    "pageCou" => $pageCou
  ]);
}
//lst();
 // 添加数据的方法
function add()
{
 //echo '我是添加';
 $userId = $_POST['userId'];
 $gId = $_POST['gId'];
 $gNum = $_POST['gNum'];
 $sql = "insert into cart(userId,productId,num,size) values(' $userId','$gId','$gNum',40) on duplicate key update num=num+$gNum";
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

// 删除数据的方法
function del(){
  $id = $_GET['id'];
  $sql = "delete from products where id=$id";
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

// 修改数据的方法
function update(){
  $id    = $_POST['id'];
  $title = $_POST['title'];
  $pos   = $_POST['pos'];
  $idea  = $_POST['idea'];

  $sql = "update products set title='$title',pos='$pos',idea='$idea' where id=$id";

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