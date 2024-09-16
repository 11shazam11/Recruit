//handel mail confirmation
import nodemailer from "nodemailer";
export const sendConfirmation = async (req, res, next) => {
    let { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "",
            pass: "",
        },
    });

    const mailOptions = {
        from: "",
        to: email,
        subject: "Job application Recived",
        text: "Thank you for showing intrest in us.we eill be eith you soon.",
    };

    try {
        const send = await transporter.sendMail(mailOptions);
        console.log("mail sent");
    } catch (e) {
        console.error(e);
    }

    next();
};
