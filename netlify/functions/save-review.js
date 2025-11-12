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
    const { name, email, phone, rating, comment, consent, contactMethod } = JSON.parse(event.body);

    // normaliza o valor que veio do front
    const consentimentoFinal =
      consent === true ||
      consent === 'true' ||
      consent === 'on' ||
      consent === 1 ||
      consent === '1';

    // validação da nota
    if (!rating || rating < 1 || rating > 5) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Avaliação deve ser entre 1 e 5 estrelas' })
      };
    }

    // data/hora SP
    const dataAvaliacao = new Date()
      .toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo', hour12: false })
      .replace(' ', 'T');

    const { data, error } = await supabase
      .from('avaliacoes')
      .insert([
        {
          nome: name,
          email: contactMethod === 'email' ? email : null,
          telefone: contactMethod === 'phone' ? phone : null,
          nota: rating,
          comentario: comment,
          metodo_contato: contactMethod,
          consentimento: consentimentoFinal,              // marcado no front
          aprovado: consentimentoFinal ? true : false,    // já libera pra aparecer
          data_avaliacao: dataAvaliacao
        }
      ]);

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Avaliação salva com sucesso!',
        data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro ao salvar avaliação',
        details: error.message
      })
    };
  }
};
