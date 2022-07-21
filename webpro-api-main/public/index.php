<?php
require "../bootstrap.php";
use Src\Controller\PersonController;
use Src\Controller\FoodController;
use Src\Controller\OrderController;
use Src\Controller\AuthController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of our endpoints start with /person
// everything else results in a 404 Not Found

if ($uri[1] == 'person') {
    
    // the user id is, of course, optional and must be a number:
    $userId = null;
    if (isset($uri[2])) {
        $userId = (int) $uri[2];
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new PersonController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
}
else if ($uri[1] == 'food') {
    // the user id is, of course, optional and must be a number:
    $userId = null;
    if (isset($uri[2])) {
        $userId = (int) $uri[2];
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new FoodController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
}
else if ($uri[1] == 'order') {

    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new OrderController($dbConnection, $requestMethod);
    $controller->processRequest();
}
else if($uri[1] == 'auth'){
    $function = null;
    if(isset($uri[2])){
        $function = $uri[2];
    }
    
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $controller = new AuthController($dbConnection, $requestMethod, $function);
    $controller->processRequest();
}
else if ($uri[1] == 'food') {
    // the user id is, of course, optional and must be a number:
    $userId = null;
    if (isset($uri[2])) {
        $userId = (int) $uri[2];
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new FoodController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
}


else{
    header("HTTP/1.1 404 Not Found");
    exit();
}
