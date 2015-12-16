var assert = require('assert')

describe('Test 1', function () {
    it("Should pass", function () {
        assert.equal(true, true)
    })
})

describe('Test 2', function () {
    it("Should not pass", function () {
        assert.equal(true, false)
    })
})
