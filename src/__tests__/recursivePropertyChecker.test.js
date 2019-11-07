import { recursivePropertyChecker } from '../util/recursivePropertyChecker';
import { expect } from 'chai';

it('runs through', async () => {
    var mymap = new Map([[1, [2, 3]], [2, [3]], [3, [4, 5]], [4, [11]], [5, [12]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 10;
    predicates.fail = (nr) => nr < 0;

    let res = await recursivePropertyChecker(1, (el) => mymap.get(el), predicates);

    expect(res.holds).to.equal(true);
    expect(res.counterExample).to.be.undefined;
});

it('runs through with no more children', async () => {
    var mymap = new Map([[1, [2, 3]], [2, [3]], [3, [4, 5]], [4, [11]], [5, [12]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 100;
    predicates.fail = (nr) => nr < 0;

    let res = await recursivePropertyChecker(1, (el) => mymap.get(el), predicates);

    expect(res.holds).to.equal(true);
    expect(res.counterExample).to.be.undefined;
});

it('runs through with strings', async () => {
    var mymap = new Map([["1", ["2", "3"]], ["2", ["3"]], ["3", ["4", "5"]], ["4", ["1123234"]], ["5", ["123422"]]]);

    let predicates = {};
    predicates.stop = (str) => str.length > 5;
    predicates.fail = (str) => str.length == 3;

    let res = await recursivePropertyChecker("1", (el) => mymap.get(el), predicates);

    expect(res.holds).to.equal(true);
    expect(res.counterExample).to.be.undefined;
});

it('runs through with async', async () => {
    var mymap = new Map([[1, [2, 3]], [2, [3]], [3, [4, 5]], [4, [11]], [5, [12]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 10;
    predicates.fail = (nr) => nr < 0;

    let res = await recursivePropertyChecker(1, async (el) => await Promise.resolve(mymap.get(el)), predicates);

    expect(res.holds).to.equal(true);
    expect(res.counterExample).to.be.undefined;
});


it('fails correctly', async () => {
    var mymap = new Map([[1, [2, 3]], [2, [12]], [3, [16, 5]], [4, [11]], [5, [-2]]]);

    let predicates = {};
    predicates.stop = (nr) => nr > 10;
    predicates.fail = (nr) => nr < 0;

    let res = await recursivePropertyChecker(1, (el) => mymap.get(el), predicates);

    expect(res.holds).to.equal(false);
    expect(res.counterExample).to.eql([1,3,5,-2]);
});

it('fails correctly with strings', async () => {
    var mymap = new Map([["1", ["2", "3"]], ["2", ["3"]], ["3", ["4", "5"]], ["4", ["1123234"]], ["5", ["123"]]]);

    let predicates = {};
    predicates.stop = (str) => str.length > 5;
    predicates.fail = (str) => str.length === 3;

    let res = await recursivePropertyChecker("1", (el) => mymap.get(el), predicates);

    expect(res.holds).to.equal(false);
    expect(res.counterExample).to.eql(["1", "2", "3", "5", "123"]);
});