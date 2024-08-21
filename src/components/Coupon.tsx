import React from 'react';


interface Coupon {
    name: string;
    value: string;
    onClick?: () => void; 
  }

const Coupon: React.FC<Coupon> = ({ name, value, onClick }) => {
    return (
      <tr onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    );
  };

export default Coupon;