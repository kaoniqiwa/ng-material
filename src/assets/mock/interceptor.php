<?php
header('content-type:application/json');

class Fruit{
    public $name;
   public  $price;

    function __construct($name,$price){
        $this->name = $name;
        $this->price = $price;
    }
}
$posts = array(
    new Fruit('apple',100),
    new Fruit('pear',200),
    new Fruit('banana',300),
);


// 等待3s后返回结果
sleep(3);
echo json_encode($posts);