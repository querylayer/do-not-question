export const API_URL = "http://localhost:5000"
export const ORG_SLUG = "acme";
export const TABLE = "credit_cards"
export const DATA_SOURCE_ID = 1;

async function fetchApi (url, options = {}) {
  const response = await fetch(`${API_URL}/${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors', 
    ...options
  })
  response.data = await response.json();
  return response;
}

export async function naturalLanguageToSql (options = {}) {
  const { query } = options

  return await fetchApi(`${ORG_SLUG}/api/natural_language/sqlova/query`, {
    method: 'POST',
    body: JSON.stringify({
      q: query,
      data_source_id: DATA_SOURCE_ID,
      table_name: TABLE
    })
  })
}

export async function runQuery (query) {
  const response = fetchApi(`${ORG_SLUG}/api/query_results`, {
    method: 'POST',
    body: JSON.stringify({
      data_source_id: DATA_SOURCE_ID,
      parameters: {},
      query,
      max_age: 0
    })
  })
  console.log(response)
}