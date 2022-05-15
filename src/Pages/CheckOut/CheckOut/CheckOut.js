import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const CheckOut = () => {
    const { serviceId } = useParams();
    // using custom hook for load the data
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);


    /*  const [user, setUser] = useState(
         {
             name: 'Akbar the Great',
             email: 'akbar@momo.taj',
             address: 'Tajmohol Road Md.Pur',
             phone: '01611111111'
         }
     )
 
     const handleAddressChange = event => {
         console.log(event.target.value);
         const { address, ...rest } = user;
         const newAddress = event.target.value;
         const newUser = { address: newAddress, ...rest };
         setUser(newUser);
     } */

    // form event handler
    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        // using axios
        axios.post('https://ancient-bastion-68064.herokuapp.com/order', order)
            .then(response => {
                const { data } = response;
                console.log(response);
                if (data.insertedId) {
                    toast('Your order is booked');
                    event.target.reset();
                }
            })
    }



    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text"
                    value={user?.displayName} name='name' placeholder='name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='service' required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" name='address' autoComplete='off' placeholder='address' required />
                <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value='Place Order' />
            </form>
        </div>
    );
};

export default CheckOut;