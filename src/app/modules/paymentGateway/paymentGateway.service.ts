import config from '../../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import { userModel } from '../user/user.model';
import AppError from '../../error/AppError';
import { ObjectId } from 'mongodb';

const store_id = config.sslcommerzStoreId;
const store_passwd = config.sslcommerzSecretId;
const is_live = false;

const paymentProcessIntoDB = async (
  payload: { email: string, payableAmount: number, redirectUrl: string },
) => {
  // checking user exist
  const user = await userModel.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(404, 'user not found');
  }
  // creating transitions id
  const tran_id = new ObjectId().toString();
  console.log(payload);
  const data = {
    total_amount: payload.payableAmount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/user/update/status/${tran_id}/${payload.redirectUrl ? payload.redirectUrl : 'basicUser'}`,
    fail_url: `http://localhost:5000/api/v1/payment/redirect/fail`,
    cancel_url: 'https://assignment-three-sable.vercel.app/api/payment/redirect/facility',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: user.phoneNumber,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const generateLink = async () => {
    const res = await sslcz.init(data).then((apiResponse: any) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      return GatewayPageURL;
    });
    return res;
  };
  const updateInfo = {
    premiumStatus: false,
    transitionId: tran_id,
  }
  const userUpdate = await userModel.updateOne({ email: user.email }, updateInfo, { new: true });
  const url = await generateLink();
  return url;
};

export const paymentGatewayService = {
  paymentProcessIntoDB,
};
