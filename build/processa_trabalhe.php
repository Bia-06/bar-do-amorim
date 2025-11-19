<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Pasta para salvar currículos
    $pasta_curriculos = 'curriculos/';
    if (!is_dir($pasta_curriculos)) {
        mkdir($pasta_curriculos, 0755, true);
    }

    $nome = $_POST['nome'] ?? '';
    $idade = $_POST['idade'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? null;
    $bairro = $_POST['bairro'] ?? '';
    $cidade = $_POST['cidade'] ?? '';
    $mensagem = $_POST['mensagem'] ?? null;
    $consentimento = isset($_POST['consentimento']) ? 1 : 0;
    $curriculo_nome = null;

    // Processar arquivo do currículo
    if (isset($_FILES['curriculo_arquivo']) && $_FILES['curriculo_arquivo']['error'] === UPLOAD_ERR_OK) {
        $arquivo = $_FILES['curriculo_arquivo'];
        $extensao = pathinfo($arquivo['name'], PATHINFO_EXTENSION);
        $nome_arquivo = 'curriculo_' . time() . '_' . uniqid() . '.' . $extensao;
        $caminho_arquivo = $pasta_curriculos . $nome_arquivo;
        
        // Mover arquivo para pasta
        if (move_uploaded_file($arquivo['tmp_name'], $caminho_arquivo)) {
            $curriculo_nome = $nome_arquivo;
        }
    }

    // Validação (mantém igual)
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