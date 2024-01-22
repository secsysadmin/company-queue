import { Request, Response } from 'express';

export const adminLogin = async (req: Request, res: Response) => {
    const { pin } = req.query;

    try {
        if (!pin || pin !== process.env.ADMIN_PIN) {
            throw new Error("Invalid PIN");
        }

        return res.status(200).json({ message: "Admin login successful" });
    } catch (error: any) {
        console.error("Error:", error);
        res.status(400).json({ error: error.message || "An error occurred" });
    }
};