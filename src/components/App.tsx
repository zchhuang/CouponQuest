import React, {useState, useEffect} from 'react';
import Coupon from './Coupon'
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { getCoupons, coup } from '../helpers/db'
import { fetchEmails } from '../helpers/gmail_helpers'

const App: React.FC = () => {
  const [ user, setUser ] = useState({});
  const [coupons, setCoupons] = useState<coup[]>([]);

  const handleFetchAndStoreEmails = async () => {
    if (user) {
      fetchEmails(user);
    } else {
      alert("You must authenticate first!")
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
          onSuccess={credentialResponse => {
            setUser(credentialResponse);
            console.log(credentialResponse);
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
                name={coupon.name} 
                value={coupon.dealValue} 
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
