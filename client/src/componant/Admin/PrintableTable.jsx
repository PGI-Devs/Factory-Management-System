import React, { forwardRef } from 'react';
import { Table } from 'antd';

const PrintableTable = forwardRef(({ columns, data }, ref) => {
  return (
    <div id="printable-table" ref={ref}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
      />
    </div>
  );
});

export default PrintableTable;
