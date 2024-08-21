import React from 'react';
import Coupon from './Coupon'
import './App.css';

// random coupons for visuals 
const coupons = [
  { name: '10% Off', value: '$10' },
  { name: 'Free Shipping', value: '$5' },
  { name: 'Buy One Get One Free', value: 'Varies' },
];

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Coupon Quest</h1>
      </header>
      <main>
        <table className="coupon-table">
          <thead>
            <tr>
              <th>Coupon Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {coupons.map((coupon) => (
              <Coupon 
                name={coupon.name} 
                value={coupon.value} 
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
