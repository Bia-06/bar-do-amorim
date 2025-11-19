<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $nome = $data['nome'] ?? '';
    $idade = $data['idade'] ?? '';
    $telefone = $data['telefone'] ?? '';
    $email = $data['email'] ?? null;
    $bairro = $data['bairro'] ?? '';
    $cidade = $data['cidade'] ?? '';
    $mensagem = $data['mensagem'] ?? null;
    $curriculo_nome = $data['curriculo_nome'] ?? null;
    $consentimento = isset($data['consentimento']) ? 1 : 0;

    // Validação
    if (empty($nome) || empty($idade) || empty($telefone) || empty($bairro) || empty($cidade)) {
        echo json_encode(["success" => false, "message" => "Preencha todos os campos obrigatórios"]);
        exit;
    }

    if ($idade < 18) {
        echo json_encode(["success" => false, "message" => "Apenas maiores de 18 anos podem se candidatar"]);
        exit;
    }

    try {
        $sql = "INSERT INTO trabalhe_conosco (nome, idade, telefone, email, bairro, cidade, mensagem, curriculo_nome, consentimento) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $idade, $telefone, $email, $bairro, $cidade, $mensagem, $curriculo_nome, $consentimento]);
        
        echo json_encode(["success" => true, "message" => "Candidatura enviada com sucesso!"]);
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método não permitido"]);
}
?>