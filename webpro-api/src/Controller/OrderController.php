<?php
namespace Src\Controller;

use Src\TableGateways\Food;
use Src\Model\Order;

class OrderController {

    private $db;
    private $requestMethod;
    private $userId;

    private $order;

    public function __construct($db, $requestMethod,$userId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;

        $this->order = new Order($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->createOrderFromRequest();
                break;
            case 'GET':
                if ($this->userId) {
                    $response = $this->getHistory($this->userId);
                }
                else {
                    $response = $this->notFoundResponse();
                };
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function createOrderFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $this->order->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function getHistory($userId){
        $result = $this->order->getHistory($userId);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $result;
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}