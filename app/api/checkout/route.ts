import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function POST(req: Request) {
	const body = await req.json();

	try {
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: body.title,
						},
						unit_amount: body.price * 100,
					},
					quantity: 1,
				},
			],
		});
		return NextResponse.json({ session });
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: error, message: "Could not create checkout session" },
			{ status: 500 },
		);
	}
}
