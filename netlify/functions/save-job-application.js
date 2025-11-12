const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
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

    // Validação de idade
    if (parseInt(idade) < 18) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Apenas maiores de 18 anos podem se candidatar' })
      };
    }

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
          // 👇 mesma lógica do código de avaliações
          consentimento: !!consent,
          curriculo_nome: 'Arquivo enviado'
          // data_candidatura tem default now(), não precisa enviar
        }
      ]);

    if (error) {
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