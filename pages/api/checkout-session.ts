import type { NextApiRequest, NextApiResponse } from 'next'

interface CheckoutItems {
    _id: number;
    title: string;
    description: string;
    category: string;
    brand: string;
    image: string;
    isNew: boolean;
    oldPrice: number;
    price: number;
    quantity: number
}
//STRIPE_SECRET_KEY!

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { items, email} = req.body;

  const modifiedItems = items.map((item : CheckoutItems) =>({
    quantity: item.quantity,
    price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
            name: item.title,
            description: item.description,
            images: [item.image],
        }
    }
  }))

  // session creation

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
        allowed_countries: ["BD", "US", "OM", "CA", "GB", "SN"]
    },
    line_items : modifiedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
        email,
        Images: JSON.stringify(items.map((item: any)=> items.image)),

    },
  })
    res.status(200).json({ id: session.id })
}
