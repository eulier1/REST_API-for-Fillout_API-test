import process from "node:process";
import { URLSearchParams } from "node:url"
import axios from "axios";

export const getfilteredResponses = async (req, res) => {
    try {
        const { formId } = req.params;
        const { filters, ...params } = req.query;
        const filloutQueryParams = new URLSearchParams(params).toString()

        // Fetch responses from Fillout.com's API
        const resFillout = await axios.get(`https://api.fillout.com/v1/api/forms/${formId}/submissions?${filloutQueryParams}`, {
            headers: {
                'Authorization': `Bearer ${process.env.FILLOUT_API_KEY}`
            }
        });
        
        const data = resFillout.data
        res.json(data)

    } catch (error) {
        console.error('Error fetching or filtering responses:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};