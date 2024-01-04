export async function fetchApi(conv){
    let response = await fetch(`https://economia.awesomeapi.com.br/json/${conv}`)
    let data = await response.json()
    return data
  }