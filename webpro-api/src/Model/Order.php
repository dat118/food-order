<?php
namespace Src\Model;

class Order {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        $statement = "
            SELECT 
                *
            FROM
                food_order
            JOIN
                food
            WHERE id = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO orders 
                (name, city, postal, street, user_id)
            VALUES
                (:name, :city, :postal, :street, :user_id);
        ";

        $lastOrderIdStatement="SELECT MAX(id) FROM orders";

        $orderFoodStatement = "
            INSERT INTO order_food 
                (order_id, food_id, amount)
            VALUES
                (:order_id, :food_id, :amount);
        ";



        try {
            $statement = $this->db->prepare($statement);
            $orderFoodStatement = $this->db->prepare($orderFoodStatement);
            $lastOrderIdStatement = $this->db->prepare($lastOrderIdStatement);
            
            $statement->execute(array(
                'name' => $input['user']['name'] ?? null,
                'city'  => $input['user']['city'],
                'postal' => $input['user']['postal'] ?? null,
                'street' => $input['user']['street'] ?? null,
                'user_id' => $input['user']['userId'] ?? null,
            ));

            $lastOrderIdStatement->execute();
            $result = $lastOrderIdStatement->fetchAll(\PDO::FETCH_ASSOC);
            $lastorder = (int)$result[0]['MAX(id)'];
            $items = $input["items"];
            
            foreach ($items as $key => $value) {
                $orderFoodStatement->execute(array(
                    'order_id' => $lastorder,
                    'food_id'  => $value['id'],
                    'amount' => $value['amount'],
                ));
            }
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function getHistory($userId){
        $deliInfoStatement = "
            SELECT id as order_id, name, city, postal, street
            FROM orders 
            WHERE user_id = :id
        ";

        $orderFoodStatement = "
            SELECT order_id, food_id, amount, name, price
            FROM order_food 
            JOIN food 
            ON order_food.food_id = food.id
            WHERE order_id = :order_id
        ";
        try {
            $deliInfoStatement = $this->db->prepare($deliInfoStatement);
            $orderFoodStatement = $this->db->prepare($orderFoodStatement);
            
            $deliInfoStatement->execute(array(
                'id' => $userId,
            ));
            
            $order = $deliInfoStatement->fetchAll(\PDO::FETCH_ASSOC);
             
            foreach ($order as $key => $value) {
                $result[$key]['user'] = $value;
                $orderFoodStatement->execute(array(
                    'order_id' => $order[$key]['order_id'],
                ));
                $food =  $orderFoodStatement->fetchAll(\PDO::FETCH_ASSOC);
                foreach ($food as $k => $val) {
                    $items[$k] = $val; 
                }
                $result[$key]['items'] = $items;

            }
            return json_encode($result);
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM order
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('id' => $id));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}