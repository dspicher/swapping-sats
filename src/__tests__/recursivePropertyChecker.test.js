import { recursivePropertyChecker, PropertyViolation } from '../recursivePropertyChecker';
import { expect } from 'chai';

it('runs through',() => {
    var mymap = new Map([[1,[2,3]], [2,[3]], [3,[4,5]], [4,[11]], [5,[12]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 10;
    predicates.fail = (nr) => nr < 0;

    recursivePropertyChecker(1,[],(el)=>mymap.get(el), predicates)
});


it('fails',() => {
    var mymap = new Map([[1,[2,3]], [2,[12]], [3,[16,5]], [4,[11]], [5,[-2]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 10;
    predicates.fail = (nr) => nr < 0;

    expect(() => recursivePropertyChecker(1,[],(el)=>mymap.get(el), predicates)).to.throw(PropertyViolation).with.property('line', "1,2,3,5,-2");
});
