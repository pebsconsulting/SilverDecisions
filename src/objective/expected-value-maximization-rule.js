import {Utils} from '../utils'
import * as model from '../model/index'
import {ObjectiveRule} from './objective-rule'

/*expected value maximization rule*/
export class ExpectedValueMaximizationRule extends ObjectiveRule{

    static NAME = 'expected-value-maximization';

    constructor(expressionEngine){
        super(ExpectedValueMaximizationRule.NAME, expressionEngine);
    }

    // payoff - parent edge payoff, aggregatedPayoff - aggregated payoff along path
    computePayoff(node, payoff=0, aggregatedPayoff=0){
        payoff=this.eval(payoff);

        var childrenPayoff = 0;
        if (node.childEdges.length) {
            if(node instanceof model.DecisionNode) {
                var bestchild = -99999999999;
                node.childEdges.forEach(e=>{
                    var childPayoff = this.computePayoff(e.childNode, e.payoff, this.add(e.payoff, aggregatedPayoff));
                    bestchild = Math.max(bestchild, childPayoff);
                });
                node.childEdges.forEach(e=>{
                    this.clearComputedValues(e);
                    this.cValue(e, 'probability', this.cValue(e.childNode, 'payoff') < bestchild ? 0.0 : 1.0);
                });
            }else{
                node.childEdges.forEach(e=>{
                    this.computePayoff(e.childNode, e.payoff, this.add(e.payoff, aggregatedPayoff));
                    this.clearComputedValues(e);
                    this.cValue(e, 'probability', this.eval(e.probability));
                });
            }

            var sumweight = 0 ;
            node.childEdges.forEach(e=>{
                sumweight=this.add(sumweight, this.cValue(e, 'probability'));
            });

            // console.log(payoff,node.childEdges,'sumweight',sumweight);

            node.childEdges.forEach(e=>{
                childrenPayoff= this.add(childrenPayoff, this.multiply(this.cValue(e, 'probability'),this.cValue(e.childNode, 'payoff')).div(sumweight));
            });

        }




        payoff=this.add(payoff, childrenPayoff);
        this.clearComputedValues(node);

        if(node instanceof model.TerminalNode){
            this.cValue(node, 'aggregatedPayoff', aggregatedPayoff);
        }else{
            this.cValue(node, 'childrenPayoff', childrenPayoff);
        }

        return this.cValue(node, 'payoff', payoff);
    }

    //  payoff - parent edge payoff
    computeOptimal(node, payoff=0){
        node.childEdges.forEach(e=>{

            if ( this.subtract(this.cValue(node,'payoff'),payoff).equals(this.cValue(e.childNode, 'payoff')) || !(node instanceof model.DecisionNode) ) {
                this.cValue(e, 'optimal', true);
                this.computeOptimal(e.childNode);
            }else{
                this.cValue(e, 'optimal', false);
            }
        })
    }

}