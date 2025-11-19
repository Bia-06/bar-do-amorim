<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexao.php';

// GET - Carregar avaliações aprovadas
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['action']) && $_GET['action'] == 'get') {
    try {
        $sql = "SELECT * FROM avaliacoes WHERE aprovado = 1 ORDER BY data_avaliacao DESC LIMIT 10";
        $stmt = $conn->query($sql);
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(["success" => true, "reviews" => $reviews]);
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Erro ao carregar: " . $e->getMessage()]);
    }
    exit;
}

// POST - Salvar nova avaliação
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $nome = $data['nome'] ?? '';
    $email = $data['email'] ?? null;
    $telefone = $data['telefone'] ?? null;
    $nota = $data['nota'] ?? 0;
    $comentario = $data['comentario'] ?? null;
    $metodo_contato = $data['metodo_contato'] ?? 'email';
    $consentimento = isset($data['consentimento']) ? 1 : 0;

    // Validação
    if (empty($nome) || $nota == 0) {
        echo json_encode(["success" => false, "message" => "Preencha nome e avaliação"]);
        exit;
    }

    try {
        // Aprovação automática se consentiu
        $aprovado = $consentimento ? 1 : 0;
        
        $sql = "INSERT INTO avaliacoes (nome, email, telefone, nota, comentario, metodo_contato, consentimento, aprovado) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $email, $telefone, $nota, $comentario, $metodo_contato, $consentimento, $aprovado]);
        
        echo json_encode(["success" => true, "message" => "Avaliação enviada com sucesso!"]);
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método não permitido"]);
}
?>