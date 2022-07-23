const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




const placePayment = (request, response, next) => {
    const { product, token } = request.body;
    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => stripe.charges.create({
        amount: product.price,
        description: product.name,
        currency: 'USD',
        customer: customer.id
    })).then(charge => response.status(200).json(charge))
        .catch(err => console.log(err));
}


module.exports = {
    placePayment: placePayment
}
