describe("Objective rules", function() {
    var containerId = 'container';
    var container;
    var app;

    var fixtures = jasmine.getFixtures();
    fixtures.fixturesPath = "base/test/trees";
    var json = JSON.parse(readFixtures("payoffrules_pass.json"));


    container = document.createElement("div");
    container.id = containerId;
    document.getElementsByTagName('body')[0].appendChild(container);
    app = new SilverDecisions(containerId, {}, json);
    app.checkValidityAndRecomputeObjective(true, true, true);
    var result = JSON.parse(app.serialize());

    app.objectiveRulesManager.rules.forEach(function(rule){
        var ruleName = rule.name;

        describe(ruleName, function(){
            it("should be computed correctly", function () {

                result.trees.forEach(function(root, index){
                    compare(ruleName, root, json.trees[index]);
                })
            })
        })
    });


    function compare(ruleName, computedNode, expectedNode){

        expect(computedNode.computed[ruleName]).toEqual(expectedNode.computed[ruleName]);

        computedNode.childEdges.forEach(function(e,i){
            var expectedEdge = expectedNode.childEdges[i];
            expect(e.computed[ruleName]).toEqual(expectedEdge.computed[ruleName]);
            compare(ruleName, e.childNode, expectedEdge.childNode)
        });
    }
});
