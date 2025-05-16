import React, { useMemo, useState } from 'react';
import { Table } from 'antd';
import './table.css'

const ItemTable = ({ columns, data ,renderExpandedRow }) => {


    const [stockOrder, setStockOrder] = useState(null); 

// Handle table changes
const handleTableChange = (pagination, filters, sorter) => {
  if (filters.stock && filters.stock[0]) {
    setStockOrder(filters.stock[0]);
  } else {
    setStockOrder(null);
  }
};

// Prepare sorted data
const sortedData = useMemo(() => {
  if (stockOrder === 'asc') {
    return [...data].sort((a, b) => a.stock - b.stock);
  } else if (stockOrder === 'desc') {
    return [...data].sort((a, b) => b.stock - a.stock);
  }
  return data;
}, [data, stockOrder]);
    return (
        <Table

            columns={columns}
            dataSource={sortedData}
            onChange={handleTableChange}
            expandable={{
                 expandedRowRender : renderExpandedRow ||(  (record) =>


                    <div>
                        <h1>HIMANGSHU KHOUND</h1>
                        <p style={{ margin: 0 }}>{record.description}</p>
                        <span></span>
                    </div>)
                ,

              rowExpandable: (record) =>
          renderExpandedRow ? !!renderExpandedRow(record) : !!record.description,
      
            }}
        />
    );
};

export default ItemTable;
