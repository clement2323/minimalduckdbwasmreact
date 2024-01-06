import React, {useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DuckDb from "./DuckDb.js";

const Graphique = () => {

    const [rows, setRows] = useState([]);

    const doTest = async () => {
      var result = await DuckDb.test();
      setRows(result);
    };
  
    useEffect(() => {
      doTest();
    }, []);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={rows}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semaine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="nfa" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="realises" stroke="#82ca9d" />
          <Line type="monotone" dataKey="reussi" stroke="orange" />
        </LineChart>
      </ResponsiveContainer>
    );
  }


export default Graphique;
