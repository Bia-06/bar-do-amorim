const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  console.log('🚀 Function save-job-application executada');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    console.log('✅ OPTIONS request - CORS pré-flight');
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    console.log('❌ Método não permitido:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    console.log('📦 Body recebido:', event.body);
    
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Dados não recebidos' })
      };
    }

    const { nome, idade, telefone, email, bairro, cidade, mensagem, consent } = JSON.parse(event.body);
    console.log('📋 Dados parseados:', { nome, idade, telefone, email, bairro, cidade });

    // Validação básica
    if (!nome || !telefone || !idade || !bairro || !cidade) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nome, telefone, idade, bairro e cidade são obrigatórios' })
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

    console.log('🚀 Tentando inserir no Supabase...');
    
    const { data, error } = await supabase
      .from('trabalhe_conosco')
      .insert([
        {
          nome,
          idade: parseInt(idade),
          telefone,
          email: email || '',
          bairro,
          cidade,
          mensagem: mensagem || '',
          consentimento: !!consent,
          curriculo_nome: 'Currículo anexado'
        }
      ]);

    if (error) {
      console.error('❌ Erro do Supabase:', error);
      throw error;
    }

    console.log('✅ Sucesso! Dados inseridos no Supabase');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Candidatura enviada com sucesso!',
        data
      })
    };
  } catch (error) {
    console.error('💥 Erro geral:', error);
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