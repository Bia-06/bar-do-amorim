const { createClient } = require('@supabase/supabase-js');

// Use nomes mais específicos para evitar conflitos
const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verifica se as variáveis existem
if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis do Supabase não configuradas');
}

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    const { nome, idade, telefone, email, bairro, cidade, mensagem, consent } = JSON.parse(event.body);

    // Log para debug
    console.log('Dados recebidos:', { nome, email, bairro });

    // Validação básica
    if (!nome || !email || !telefone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nome, email e telefone são obrigatórios' })
      };
    }

    // Validação de idade
    if (parseInt(idade) < 18) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Apenas maiores de 18 anos podem se candidatar' })
      };
    }

    // Inserir no Supabase - CORRIGIDO
    const { data, error } = await supabase
      .from('trabalhe_conosco')
      .insert([
        {
          nome,
          idade: parseInt(idade),
          telefone,
          email,
          bairro,
          cidade,
          mensagem,
          consentimento: consent,
          curriculo_nome: 'Arquivo enviado'
          // REMOVIDO: created_at - a coluna não existe
          // A coluna data_candidatura já tem valor default (now())
        }
      ])
      .select();

    if (error) {
      console.error('Erro do Supabase:', error);
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Candidatura enviada com sucesso!',
        data 
      })
    };
  } catch (error) {
    console.error('Erro geral:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro ao enviar candidatura',
        details: error.message 
      })
    };
  }
};