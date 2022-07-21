<?php
namespace Src\Model;

class Auth {

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
                users
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
            INSERT INTO users 
                (email, password)
            VALUES
                (:email, :password);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'email'  => $input['email'],
                'password' => $input['password'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function check($input){
        $statement = "
            SELECT id
            FROM users
            WHERE
                email = :email
            AND password = :password;
        ";
        
        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'email'  => $input['email'],
                'password' => $input['password'],
            ));
            
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }   
    }

    public function checkEmailUsable($input){
        $statement = "
            SELECT *
            FROM users
            WHERE
                email = :email
        ";
        
        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'email'  => $input['email'],
            ));
            return $statement->rowCount();

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }   
    }

    public function changePassword($input){
        $statement = "
            UPDATE users
            SET password = :password
            WHERE email = :email
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'email'  => $input['email'],
                'password'  => $input['password']
            ));
            return $statement->rowCount();

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }   
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM users
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