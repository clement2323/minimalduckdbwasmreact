import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect} from "react";
import { Box } from "@mui/material";
import DuckDb from "./DuckDb.js";
const LineChart = () => {

  function transformResult(result) {
    return result.map(row => {
      if (row.y instanceof Uint32Array && row.y.length > 0) {
        row.y = row.y[0];
      }
      row.x = parseInt(row.x);
      delete row.id;
      return row;
    });
  }

  const doTest = async (id, color, sqlQuery) => {
    console.log("appel doTest");
    var result = await DuckDb.test(sqlQuery);
  
    // transform Uint32Array to number
    result = transformResult(result);    
      
    setData(prevData => {
      // Vérifie si la clé existe déjà
      if (prevData.some(item => item.id === "EEC")) {
        // Si la clé existe déjà, retourne le tableau de données précédent sans modifications
        return prevData;
      } else {
        // Si la clé n'existe pas, ajoute le nouvel objet au tableau
        return [...prevData, {
          id: id,
          color: color,
          data: result
        }];
      }
    });
  
    console.log(data);
  };

  const [data, setData] = useState([]);


  useEffect(() => {
    doTest("EEC", "blue", `
    SELECT semaine as x, sum(nfa) as y
    FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
    WHERE enquete = 'EEC'
    GROUP BY semaine
  `);
  
  }, []);

  return (
    <Box height="75vh">
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "grey",
            },
          },
          legend: {
            text: {
              fill: "grey",
            },
          },
          ticks: {
            line: {
              stroke: "grey",
              strokeWidth: 1,
            },
            text: {
              fill: "grey",
            },
          },
        },
        legends: {
          text: {
            fill: "grey",
          },
        },
        tooltip: {
          container: {
            color: "blue",
          },
        },
      }}
      colors={{ scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    </Box>
  );
};

export default LineChart;