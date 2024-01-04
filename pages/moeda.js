import styles from '../styles/moeda.module.css'
import { useState } from "react"
import { Chart } from "react-google-charts";
import { useRouter } from 'next/router'

export default function Moeda() {

  let dados = useRouter()

  let dadosDias = dados.query.dias
  for(let i = 0; i < 15; i++){
    dadosDias[i] = parseFloat(dadosDias[i])
  }
  console.log(dadosDias)

  return (
    <div className={styles.tela}>
      <h1>{dados.query.name}</h1>
      <p>Valor atual em reais: {dados.query.bid}</p>
      <h2>Valor nos últimos 15 dias:</h2>
      <Chart
            chartType="Line"
            data={[["Data", "Valor"], 
                    [0, dadosDias[0]], 
                    [-1, dadosDias[1]], 
                    [-2, dadosDias[2]], 
                    [-3, dadosDias[3]], 
                    [-4, dadosDias[4]],
                    [-5, dadosDias[5]],
                    [-6, dadosDias[6]],
                    [-7, dadosDias[7]],
                    [-8, dadosDias[8]],
                    [-9, dadosDias[9]],
                    [-10, dadosDias[10]],
                    [-11, dadosDias[11]],
                    [-12, dadosDias[12]],
                    [-13, dadosDias[13]],
                    [-14, dadosDias[14]]]}
            width="100%"
            height="400px"
            legendToggle
        />
    </div>
  )
}