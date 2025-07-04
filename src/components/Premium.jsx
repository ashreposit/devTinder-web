import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';

const Premium = () => {

    const handleBuyClick = async (type) => {
        try {
            const order = await axios.post(`${BASE_URL}/payment/createOrder`, {
                membershipType: type
            }, { withCredentials: true });

            const options = {
                key: order?.keyId,
                amount:order?.amount,
                currency:order?.currency,
                name: "Dev Tinder",
                description: "Connect to other developers",
                order_id: order?.orderId,
                prefill: {
                    name: order?.notes.firstName + " " + order?.notes.lastName,
                    contact: "9999999999",
                },
                theme: {
                    color: "#F37254",
                },
                handler: verifyPremiumUser,
            };

            // it should open razorpay dialog box
            const rzp = new window.Razorpay(options); // comes from the script added in the index.html
            rzp.open();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='m-10'>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people.</li>
                        <li> - 100 connection Requests per day.</li>
                        <li> - Blue tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("Silver")} className='btn btn-secondary'>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people.</li>
                        <li> - Infinite connection Requests per day.</li>
                        <li> - Blue tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("Gold")} className='btn btn-primary'>Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default Premium
