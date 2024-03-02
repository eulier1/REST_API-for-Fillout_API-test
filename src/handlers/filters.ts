import process from "node:process";
import { URLSearchParams } from "node:url"
import axios from "axios";
import { FilterClauseType } from "../types/filter";

export const getfilteredResponses = async (req, res) => {
    try {
        const { formId } = req.params;
        const filters : FilterClauseType[] = req.query.filters

        const {...params } = req.query;
        const filloutQueryParams = new URLSearchParams(params).toString()

        // Fetch responses from Fillout.com's API
        const resFillout = await axios.get(`https://api.fillout.com/v1/api/forms/${formId}/submissions?${filloutQueryParams}`, {
            headers: {
                'Authorization': `Bearer ${process.env.FILLOUT_API_KEY}`
            }
        });
        
        const data = resFillout.data

        const results = data.responses.filter( submission => {

            return filters.every( (filter) => {
                const question = submission.questions.find( (question) =>  question.id === filter.id )

                if(!question) return false

                if(filter.condition === 'equals')
                    return filter.value === question.value

                if(filter.condition === 'does_not_equal')
                    return filter.value !== question.value

                if(filter.condition === 'greater_than')
                    return new Date(question.value) > new Date(filter.value)

                if(filter.condition === 'less_than')
                    return new Date(question.value) < new Date(filter.value)

            })
        })

        // Pagination
        const totalResponses = results.length;
        const limit = params["limit"] ? params["limit"] : 150
        const pageCount = Math.ceil(totalResponses/limit)

        res.json({
            respoonse : results,
            totalResponses,
            pageCount
        })

    } catch (error) {
        console.error('Error fetching or filtering responses:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};