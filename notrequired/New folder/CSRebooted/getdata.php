<?php

$conn=mysqli_connect("localhost","root","","cybersrishti");

	$id=$_GET['id'];
	

	$st1=$conn->query("Select * from events where id='$id';");

	$response=array();

	$response["success"]=false;

	foreach ($st1 as $row) {
		
		$response["success"]=true;
		$response["name"]=$row["name"];
		$response["date"]=$row["date"];
		$response["time"]=$row["time"];

	}
	echo json_encode($response);

?>
