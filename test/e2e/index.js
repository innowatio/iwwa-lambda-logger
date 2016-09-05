import "babel-polyfill";

import chai, {expect} from "chai";
import {spy} from "sinon";
import sinonChai from "sinon-chai";
import {v4} from "node-uuid";

chai.use(sinonChai);

import {getEventFromObject} from "../mocks";
import {handler} from "index";

describe("Log some data", () => {

    let context = {
        succeed: spy(),
        fail: spy()
    };

    beforeEach(async () => {
        context.succeed.reset();
        context.fail.reset();
    });

    it("Never fail", async () => {

        const userEvent = {
            id: v4(),
            data: {
                element: {
                    somedata: {}
                },
                id: v4()
            },
            type: "element inserted in collection ${collection}"
        };

        await handler(getEventFromObject(userEvent), context);
        expect(context.succeed).to.have.been.calledOnce;
    });
});
