import React from 'react';
import './App.css';

// Define the structure of a coupon item
interface Coupon {
  name: string;
  value: string;
}

// random coupons for visuals 
const coupons: Coupon[] = [
  { name: '10% Off', value: '$10' },
  { name: 'Free Shipping', value: '$5' },
  { name: 'Buy One Get One Free', value: 'Varies' },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coupon Quest</h1>
      </header>
      <main>
        <table className="Coupon-table">
          <thead>
            <tr>
              <th>Coupon Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index}>
                <td>{coupon.name}</td>
                <td>{coupon.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
