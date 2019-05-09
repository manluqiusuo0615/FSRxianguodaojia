<?php
header("Content-Type:application/json;charset=utf-8");
@$phone = $_REQUEST['phone'];
@$user_name = $_REQUEST['user_name'];
@$did = $_REQUEST['did'];
@$addr = $_REQUEST['addr'];
@$sex = $_REQUEST['sex'];
if(empty($phone) || empty($user_name) || empty($did) || empty($addr) || empty($sex)){
  echo '[]';
  return;
}



require('init.php');

$sql = "INSERT INTO kf_order VALUES(NULL,'$phone','$user_name','$sex',now(),'$addr','$did')";

$result = mysqli_query($conn,$sql);

$addResult = [];
if($result)
{
  //返回订单编号
  $addResult['oid'] = mysqli_insert_id($conn);
  $addResult['msg'] = 'succ';
}
else
{
  $addResult['msg'] = 'error';
}

$output = [];
$output[] = $addResult;

echo json_encode($output);
?>