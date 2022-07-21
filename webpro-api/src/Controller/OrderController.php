<?php
namespace Src\Controller;

use Src\TableGateways\Food;
use Src\Model\Order;

class OrderController {

    private $db;
    private $requestMethod;
    private $userId;

    private $order;

    public function __construct($db, $requestMethod)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;

        $this->order = new Order($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->createOrderFromRequest();
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

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}