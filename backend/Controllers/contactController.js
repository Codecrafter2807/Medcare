import contact from "../models/contactSchema";

export const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await contact.create(response);
    return res.status(200).json({ message: "message send succesfully" });
  } catch (err) {
    return res.status(500).json({ message: "message not dilevered" });
  }
};
