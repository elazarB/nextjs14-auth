import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: ` <div
      style="
        background-color: #fff;
        width: 300px;
        margin: 50px auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.2);
        text-align:center
      "
    >
      <h1 style="color: #000000">2FA Code</h1>
      <div style="display: flex; align-items: center; justify-content: center;">
      <p style="font-size: 18px; text-align:center">Your 2FA Code: </p>
        <p
          style="font-size: 18px; font-weight: bold; cursor: pointer"
        >
        ${" "}${token}
        </p>
      </div>
    </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<h1 style="text-align: center; color: rgb(7, 7, 7)">
      Reset your password
    </h1>

    <p style="font-size: 18px; text-align: center">
      Click the button to reset your password.
    </p>
    <a style="text-decoration: none;" href="${resetLink}">
    <button
      style="
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: rgb(33, 82, 162);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 18px;
      "
      onmouseover="this.style.backgroundColor='rgb(57, 105, 183)';"
      onmouseout="this.style.backgroundColor='rgb(33, 82, 162)';"
    >
      Confirm
    </button>
  </a>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const conformLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Conform your email",
    html: `<h1 style="text-align: center; color: rgb(7, 7, 7)">
      Reset your password
    </h1>

    <p style="font-size: 18px; text-align: center">
      Click the button to confirm email.
    </p>
    <a style="text-decoration: none;" href="${conformLink}">
    <button
      style="
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: rgb(33, 82, 162);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 18px;
      "
      onmouseover="this.style.backgroundColor='rgb(57, 105, 183)';"
      onmouseout="this.style.backgroundColor='rgb(33, 82, 162)';"
    >
      Confirm
    </button>
  </a>`,
  });
};
