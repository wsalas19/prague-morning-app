import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

const calculateOrderAmount = () => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

export async function POST(req: Request) {
	try {
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(),
			currency: "usd",
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
			automatic_payment_methods: {
				enabled: true,
			},
		});

		return Response.json({
			clientSecret: paymentIntent.client_secret,
			// [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
			dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
		});
	} catch (error: unknown) {
		return NextResponse.json({ error: error, message: "Internal server error" }, { status: 500 });
	}
}