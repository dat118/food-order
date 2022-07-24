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
            $input['password'] = password_hash($input['password'], PASSWORD_DEFAULT);
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
            SELECT password, id
            FROM users
            WHERE
                email = :email
        ";
        
        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'email'  => $input['email'],
            ));
            
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $result['password_verify'] = (password_verify($input['password'],$result[0]['password']));
            return $result;

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }   
    }

    public function checkOldPassword($input){
        $statement = "
            SELECT password, email
            FROM users
            WHERE
                id = :id
        ";
        
        try {
            $statement = $this->db->prepare($statement);
            var_dump($input['id']);
            $statement->execute(array(
                'id'  => $input['id'],
            ));
            
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $result['password_verify'] = (password_verify($input['password'],$result[0]['password']));
            var_dump($result);
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
            $input['password'] = password_hash($input['password'], PASSWORD_DEFAULT);
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