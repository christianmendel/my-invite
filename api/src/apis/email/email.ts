import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
    url: process.env.HOST_EMAIL || "",
    address: process.env.ADDRESS_EMAIL || "",
    name: process.env.NAME_EMAIL || "",
    token: process.env.PASS_EMAIL || ""
};

export async function sendEmail(email: string | string[], subject: string, inviteLink: string, eventName: string) {
    try {
        const response = await axios.post(
            credentials.url,
            {
                from: {
                    address: credentials.address,
                    name: credentials.name
                },
                to: [
                    {
                        email_address: {
                            address: email
                        }
                    }
                ],
                subject: subject,
                htmlbody: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h2 style="color: #333;">Seu convite está pronto! 🎉</h2>
                            <p style="color: #555;">Olá,</p>
                            <p style="color: #555;">O pagamento do seu convite "<strong>${eventName}</strong>" foi confirmado!</p>
                            <p style="color: #555;">Agora, você pode acessar e compartilhar seu convite clicando no botão abaixo:</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="${inviteLink}" target="_blank" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    Ver Meu Convite
                                </a>
                            </div>
                            <p style="color: #777; font-size: 14px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
                            <p style="color: #007bff; word-break: break-word;">${inviteLink}</p>
                        </div>
                        <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
                            <p>© 2025 GoInvity. Todos os direitos reservados.</p>
                        </div>
                    </div>
                `
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${credentials.token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
