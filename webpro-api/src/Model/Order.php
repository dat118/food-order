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
                (name, city, postal, street)
            VALUES
                (:name, :city, :postal, :street);
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
            // return $statement->rowCount();
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