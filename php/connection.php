<?php 
//include_once "seguridad.php";
   class conexion{
   	private $sql;
   	private $result;
   	private $conn;

   	public function abrir()
   	{
   		try{
   			$this->conn=new PDO('mysql:host=localhost; dbname=mybike; charset=utf8','root','');
   			return $this->conn;
   		}
   		catch(PDOException $e)
   		{
   			echo "Error en la conexion". $e->getMessage();
   		}
   	}

   	public function cerrar()
   	{
   		$this->conn=null;
   	}

   	public function consulta($sql)
   	{
   		$this->sql=$sql;
   		$this->result=$this->conn->prepare($this->sql);
   		return $this->result;
   	}

      public function lastInsertId()
      {
         
         return $this->conn->lastInsertId();
      }
   }
   
?>