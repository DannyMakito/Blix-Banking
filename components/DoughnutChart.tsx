"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement,Tooltip,Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps) => {

  
const data ={
  datasets:[
        {
            label:'Banks',
            data: [1250,2500,5000],
            backgroundColor :['#0747b6','#22655d8','#2f91fa']
        }
    ],
    labels: [
          'Bank 1','Bank 2'
    ]
}

  return( 
  
  <Doughnut
   data= {data}
  options={{
    cutout: '60%',
    plugins:{
      legend:{

        display: false
      }
    }
  }}
  />


   )
}

export default DoughnutChart