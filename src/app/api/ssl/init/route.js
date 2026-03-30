// Removed SSLCommerzPayment imported since we use fetch api directly
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_email, amount, coins } = body;

    const store_id = process.env.SSLCOMMERZ_STORE_ID || 'testbox';
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD || 'qwerty';
    const is_live = false; // true for live, false for sandbox

    const tran_id = crypto.randomUUID().replace(/-/g, '').substring(0, 16);

    const data = {
      total_amount: amount,
      currency: 'BDT', // Adjust currency as needed (e.g. USD optionally supported depending on ssl account)
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ssl/success?tran_id=${tran_id}&email=${user_email}&amount=${amount}&coins=${coins}`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ssl/verify?status=fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ssl/verify?status=cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ssl/ipn`,
      shipping_method: 'No',
      product_name: 'Coins',
      product_category: 'Virtual Asset',
      product_profile: 'non-physical-goods',
      cus_name: user_email.split('@')[0],
      cus_email: user_email,
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: user_email.split('@')[0],
      ship_add1: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      value_a: user_email,
      value_b: amount,
      value_c: coins
    };

    const initUrl = is_live 
      ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
      : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

    const postData = new URLSearchParams({
        ...data,
        store_id: store_id,
        store_passwd: store_passwd
    });

    const sslRes = await fetch(initUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData.toString()
    });

    const apiResponse = await sslRes.json();
    
    if (apiResponse.status === "SUCCESS") {
        return NextResponse.json({ url: apiResponse.GatewayPageURL });
    } else {
        console.error("SSLCommerz Init Error API Response:", apiResponse);
        return NextResponse.json({ message: "Init payment failed", details: apiResponse }, { status: 500 });
    }

  } catch (error) {
    console.error("SSL Init Route Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
