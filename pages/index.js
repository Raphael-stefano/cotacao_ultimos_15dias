import styles from '../styles/Home.module.css'
import { useState } from "react"
import { useRouter } from 'next/router'
import { fetchApi } from '../public/fetchApi'

export default function Home() {

  /*async function fetchApiDias(moeda){
    let response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}/16`)
    let data = response.json()
    return data
  }*/

  async function obterUltimosDias(moeda){
    let response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}/15`)
    let data = await response.json()
    console.log(data)
    return data
  }
  /*function obterUltimosDias(moeda){
    fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}/15`).then((response) => console.log(response.json()));
  }*/
  obterUltimosDias('USD-BRL')

  function preencherDias(arr, arr2, n){
    for(let i = 0; i < n; i++){
      arr.push(arr2[i].bid)
    }
  }

  let pagina = useRouter()
  async function irParaPagina(pag){
    let coisa = await fetchApi('last/BTC-BRL,USD-BRL,EUR-BRL')
    let ultimosDiasDolar = await obterUltimosDias('USD-BRL')
    let diasDolar = []
    preencherDias(diasDolar, ultimosDiasDolar, 15)
    let ultimosDiasEuro = await obterUltimosDias('EUR-BRL')
    let diasEuro = []
    preencherDias(diasEuro, ultimosDiasEuro, 15)
    let ultimosDiasBitcoin = await obterUltimosDias('BTC-BRL')
    let diasBitcoin = []
    preencherDias(diasBitcoin, ultimosDiasBitcoin, 15)
    if(pag == 'dolar'){
      pagina.push({
        pathname: '/moeda',
        query: {
            bid: parseFloat(coisa.USDBRL.bid).toFixed(2),
            name: coisa.USDBRL.name.split('/')[0],
            dias: diasDolar
        }
       })
    }
    if(pag == 'euro'){
      pagina.push({
        pathname: '/moeda',
        query: {
            bid: parseFloat(coisa.EURBRL.bid).toFixed(2),
            name: coisa.EURBRL.name.split('/')[0],
            dias: diasEuro
        }
       })
    }
    if(pag == 'bitcoin'){
      pagina.push({
        pathname: '/moeda',
        query: {
            bid: parseFloat(coisa.BTCBRL.bid).toFixed(2),
            name: coisa.BTCBRL.name.split('/')[0],
            dias: diasBitcoin
        }
       })
    }   
  }

  const [valor, setValor] = useState('dolar')
  const [output, setOutput] = useState('Selecione uma moeda para obter o valor em reais')

  /*async function coisar(){
    let coisa = await fetchApi('BTC-BRL,USD-BRL,EUR-BRL')
    if(valor == 'dolar'){
      console.log(coisa.USDBRL)
      setOutput(`O valor do ${coisa.USDBRL.name.split('/')[0]} é de R$: ${parseFloat(coisa.USDBRL.bid).toFixed(2)}`)
    }else if(valor == 'euro'){
      console.log(coisa.EURBRL)
      setOutput(`O valor do ${coisa.EURBRL.name.split('/')[0]} é de R$: ${parseFloat(coisa.EURBRL.bid).toFixed(2)}`)
    }else if(valor == 'bitcoin'){
      console.log(coisa.BTCBRL)
      setOutput(`O valor do ${coisa.BTCBRL.name.split('/')[0]} é de R$: ${parseFloat(coisa.BTCBRL.bid).toFixed(2)}`)
    }/*else{
      console.log(coisa)
      setOutput(JSON.stringify(coisa))
    }*/
  //} 

  return (
    <div className={styles.tela}>
      <div className={styles.container}>
        <div className={styles.cabecalho}>
          <select onChange={e => setValor(e.target.value)} value={valor}>
            <option value='dolar'>Dólar</option>
            <option value='euro'>Euro</option>
            <option value='bitcoin'>BitCoin</option>
          </select>
          <button onClick={() => irParaPagina(valor)}>Pesquisar</button>
        </div>
        <p style={{textAlign: 'center'}}>{output}</p>
      </div>
    </div>
  )
}
