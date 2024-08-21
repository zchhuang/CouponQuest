
import { CouponItem } from '../components/Coupon';
  
// Function to open the IndexedDB database
export function openDB(): Promise<IDBDatabase> {
return new Promise((resolve, reject) => {
    const request = indexedDB.open('couponDB', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
    if (!db.objectStoreNames.contains('coupons')) {
        db.createObjectStore('coupons', { keyPath: 'id', autoIncrement: true });
    }
    };

    request.onsuccess = () => resolve(request.result as IDBDatabase);
    request.onerror = () => reject(request.error);
});
}

// Function to retrieve all coupons from the IndexedDB database
export function getCoupons(): Promise<CouponItem[]> {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
        const transaction = db.transaction('coupons', 'readonly');
        const store = transaction.objectStore('coupons');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result as CouponItem[]);
        request.onerror = () => reject(request.error);
        }).catch(error => reject(error));
    });
}
  