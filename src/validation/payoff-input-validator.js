import {ExpressionEngine} from '../expression-engine'
import {Utils} from "../utils";

export class PayoffInputValidator{
    expressionEngine;
    constructor(expressionEngine){
        this.expressionEngine=expressionEngine;
    }

    validate(value, edge){
        if(value===null || value === undefined){
            return false;
        }
        value += "";
        if(!value.trim()){
            return false;
        }
        if(ExpressionEngine.hasAssignmentExpression(value)) {
            return false;
        }
        return this.expressionEngine.validate(value);
    }

}
