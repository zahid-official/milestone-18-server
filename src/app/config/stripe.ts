import Stripe from "stripe";
import envVars from "./env";

const stripe = new Stripe(envVars.STRIPE.SECRET_KEY as string);

export default stripe;
