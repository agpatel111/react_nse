import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: 1,
    name: 'John Doe',
    age: 32,
    address: 'New York',
  },
  {
    key: 2,
    name: 'Jane Doe',
    age: 29,
    address: 'London',
  },
  {
    key: 3,
    name: 'Jim Brown',
    age: 40,
    address: 'Paris',
  },
];

const FixHeaderTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{ y: 240 }}
  />
);

export default FixHeaderTable;
