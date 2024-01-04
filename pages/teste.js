import { Chart } from "react-google-charts";

export default function teste(){
    return(
        <Chart
            chartType="Line"
            data={[["Data", "Valor"], 
                    [0, 4.90], 
                    [1, 4.91], 
                    [2, 4.87], 
                    [3, 4.85], 
                    [4, 4.88],
                    [5, 4.90],
                    [6, 4.94],
                    [7, 4.95],
                    [8, 5.01],
                    [9, 5.05],
                    [10, 4.98],
                    [11, 5.10],
                    [12, 4.92],
                    [13, 4.87],
                    [14, 4.90]]}
            width="100%"
            height="400px"
            legendToggle
        />
    )
}
