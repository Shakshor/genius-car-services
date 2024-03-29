import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from '../../api/axiosPrivate';

const Order = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const email = user?.email;
            const url = `https://genius-car-services-server.onrender.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user])

    return (
        <div className='w-50 mx-auto'>
            <h2>Your Orders: {orders.length}</h2>
            {
                orders.map(order => <div key={order._id}>
                    <p>{order.email} : {order.service}</p>
                </div>)
            }
        </div>
    );
};

export default Order;