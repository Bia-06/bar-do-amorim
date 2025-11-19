<?php
header('Content-Type: application/json; charset=utf-8');

$host = "localhost";
$dbname = "bardoamo_baramorim_db";
$user = "bardoamo_bardoamorim";
$pass = "49Zirtaeb@!";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro de conexão: " . $e->getMessage()]);
    exit;
}
?>