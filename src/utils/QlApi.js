export const API_URL = "http://localhost:5000";
export const ORG_SLUG = "acme";
export const TABLE = "credit_cards";
export const DATA_SOURCE_ID = 1;

async function fetchApi(url, options = {}) {
  const response = await fetch(`${API_URL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    ...options,
  });
  response.data = await response.json();
  return response;
}

export async function naturalLanguageToSql(options = {}) {
  const { query } = options;

  return await fetchApi(`${ORG_SLUG}/api/natural_language/sqlova/query`, {
    method: "POST",
    body: JSON.stringify({
      q: query,
      data_source_id: DATA_SOURCE_ID,
      table_name: TABLE,
    }),
  });
}

async function fetchJob(jobId) {
  const response = await fetchApi(`${ORG_SLUG}/api/jobs/${jobId}`);
  const status = response.data.job.status
  if (status < 3) {
    await new Promise((res)  => setTimeout(res, 800));
    const data = await fetchJob(jobId);
    return data;
  }
  if (status !== 3) {
    throw new Error("error to fetch query")
  }
  return response.data;
}

async function fetchQueryResult(queryResultId) {
  const response = await fetchApi(`${ORG_SLUG}/api/query_results/${queryResultId}`);
  return response.data
}

export async function runQuery(query) {
  try {
    const response = await fetchApi(`${ORG_SLUG}/api/query_results`, {
      method: "POST",
      body: JSON.stringify({
        data_source_id: DATA_SOURCE_ID,
        parameters: {},
        query,
        max_age: 0,
      }),
    });
    const jobReponse = await fetchJob(response.data.job.id);
    const queryResult = await fetchQueryResult(jobReponse.job.query_result_id)
    return queryResult.query_result
  } catch {
    throw new Error("error to fetch query")
  }
}

export async function getSchema () {
  const response = await fetchApi(`${ORG_SLUG}/api/data_sources/${DATA_SOURCE_ID}/schema`);
  return response.data.schema
}