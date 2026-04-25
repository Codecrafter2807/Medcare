import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Ensure charges is a number and fallback to 0 if missing
    const charges = doctor.charges || 500; // Default to 500 if charges is missing

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: Math.round(charges * 100),
            product_data: {
              name: doctor.name,
              description: doctor.bio || "Consultation fee",
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const { appointmentDate, appointmentTime } = req.body;

    if (!appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: "Please select an appointment slot" });
    }

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      charges: charges,
      session: session.id,
      appointmentDate,
      appointmentTime,
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.log("Stripe Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session", error: err.message });
  }
};
