import { Chart } from 'react-charts'
import { useState, useEffect, useMemo} from "react";
import { Box } from "@mui/material";
import DuckDb from "./DuckDb.js";
const LineChart = () => {

  const [rows, setRows] = useState([]);

  const doTest = async () => {
    var result = await DuckDb.test(`
    SELECT semaine as x, sum(nfa) as y
    FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
    WHERE enquete = 'EEC'
    GROUP BY semaine
    `);
    setRows(result);
  };

  useEffect(() => {
    doTest();
  }, []);

 function MyChart() {
   const data = [
     {
       label: 'React Charts',
       data: [
         {
           date: new Date(),
           stars: 23467238,
         },
       ],
     },
   ]
 
   const primaryAxis = useMemo(
     ()=> ({
       getValue: datum => datum.date,
     }),
     []
   )
 
   const secondaryAxes = useMemo(
     ()=> [
       {
         getValue: datum => datum.stars,
       },
     ],
     []
   )
 
   return (
    <Box>
     <Chart options={{data,primaryAxis,secondaryAxe}}/>
    </Box>
   )
 }
};

export default LineChart;