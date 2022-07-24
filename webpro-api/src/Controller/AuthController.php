<?php
namespace Src\Controller;
require __DIR__ . '/classes/JwtHandler.php';

use JwtHandler as GlobalJwtHandler;
use Src\Controller\classes\JwtHandler;
use Src\Model\Auth;

class AuthController {

    private $db;
    private $requestMethod;
    private $function;

    private $auth;

    public function __construct($db, $requestMethod, $function)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->function = $function;

        $this->auth = new Auth($db);
    }

    public function processRequest()
    {
        $input = $_POST;
        switch($this->requestMethod){
            case 'POST':
                switch ($this->function) {
                    case 'register':
                        $response = $this->createUserFromRequest();
                        break;
                    case 'login':
                        $response = $this->checkLogin();
                        break;
                    case 'password':
                        $response = $this->password();
                        break;
                    default:
                        $response = $this->notFoundResponse();
                        break;
                }
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        
        header($response['status_code_header']);
        if (isset($response['body'])) {
            echo $response['body'];
        }
        echo(json_encode($response));
    }

    private function checkLogin(){
        $input = $_POST;
        $result = $this->auth->check($input);
        $userId = (int)$result[0]['id'];
        
        if (!$result) {
            return $this->unAuthorizedResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $jwt = new GlobalJwtHandler();
        $token = $jwt->jwtEncodeData(
            'http://localhost/auth/',
            array()
        );
        $response['idToken'] = $token;
        $response['userId'] = $userId;
        
        $returnData = [
            'success' => 1,
            'message' => 'You have successfully logged in.',
            'token' => $token
        ];
        $response['data'] = $returnData;
        return $response;
    }

    private function createUserFromRequest()
    {
        $input = $_POST;
        if (! $this->validateUser($input)) {
            return $this->unprocessableEntityResponse();
        }
        if ($this->auth->checkEmailUsable($input)>0) {
            return $this->emailUsed();
        }
        $this->auth->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }


    private function validateUser($input)
    {
        if (! isset($input['email'])) {
            return false;
        }
        if (! isset($input['password'])) {
            return false;
        }
        
        return true;
    }

    private function emailUsed()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'the email has been taken'
        ]);
        return $response;
    }

    private function password(){
        $input = $_POST;
        if (! $this->validateUser($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->auth->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function unAuthorizedResponse(){
        $response['status_code_header'] = 'HTTP/1.1 419 Not Found';
        $response['body'] = null;
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}