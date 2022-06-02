import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const COLORS = ['#204051', '#84A9AC', '#FABB51', '#3B6978', '#C74B50'];

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.includes(genre)
        ).length;
        return { name: genre, value };
      });
      console.log(data);
      return data;
    };

    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => {
            if (percent > 0) {
              return `${name} {\n}
              ${(percent * 100).toFixed(0)}%`;
            }
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
