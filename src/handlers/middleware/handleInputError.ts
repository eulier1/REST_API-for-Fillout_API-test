import { FilterClauseType } from "../../types/filter";


export const handleInputErrors = (req, res, next) => {
    // Caveat, potential bottleneck, for very larger filters object, handling very large n° requests
    const filters : FilterClauseType[]  = JSON.parse(req.query.filters)
    const conditions = ['equals', 'does_not_equal','greater_than','less_than']

    const isValid = filters.every( (filter) => conditions.includes( filter.condition ) )
    
    if(!isValid){
        res.status(400)
        res.json({msg: "Invalid condition. Allow conditions : 'equals' | 'does_not_equal' | 'greater_than' | 'less_than'"})
    } else {
        req.query.filters = filters
        next()
    }

}