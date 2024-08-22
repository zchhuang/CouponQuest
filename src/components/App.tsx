import React, {useState, useEffect} from 'react';
import Coupon, {CouponItem} from './Coupon'
import './App.css';
import { useAuth } from './AuthContext';
import { getCoupons } from '../helpers/db'
import { fetchEmails } from '../helpers/gmail_helpers'

const App: React.FC = () => {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const { accessToken, login, handleCallback} = useAuth();

  const handleFetchAndStoreEmails = async () => {
    if (accessToken) {
      console.log(accessToken);
      await fetchEmails(accessToken || "");
    } else {
      alert("You must authenticate first!");
    }
  }

  const fetchCoupons = async () => {
    try {
      const couponData = await getCoupons();
      setCoupons(couponData);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };

  useEffect(() => {
    handleCallback();
    fetchCoupons();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Coupon Quest</h1>
        <button onClick={login}>Sign in with Google 🚀 </button>
      </header>
      <main>
        <br></br>
        <button onClick={handleFetchAndStoreEmails}> Fetch Coupons </button>
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
                key={coupon.id} // Replace `coupon.id` with a unique identifier from your coupon data
                {...coupon}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
