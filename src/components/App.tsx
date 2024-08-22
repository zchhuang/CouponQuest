import React, {useState, useEffect} from 'react';
import Coupon, {CouponItem} from './Coupon'
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { getCoupons } from '../helpers/db'
import { fetchEmails } from '../helpers/gmail_helpers'
import { CredentialResponse } from '@react-oauth/google';

const App: React.FC = () => {
  const [ user, setUser ] = useState<CredentialResponse | null>(null);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);

  const handleFetchAndStoreEmails = async () => {
    if (user) {
      await fetchEmails(user.credential || "");
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
    fetchCoupons();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Coupon Quest</h1>
        <GoogleLogin
          shape="pill"
          onSuccess={credentialResponse => {
            setUser(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </header>
      <main>
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
