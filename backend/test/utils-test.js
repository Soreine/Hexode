const expect = require('expect.js')
const utils = require('../src/utils.js')

describe("Utility functions", () => {
    context("Hashing a password", () => {
        it("should hash correctly the string 'begood' with sha256", () => {
            expect(utils.hashPassword("begood"))
                .to.equal('i+TOGJcUmia5p18l4eVrFMNqeVrBn07Ya4Vg6nYDm90=')
        })
    })

    context("Making tokens", () => {
        it("should be able to encrypt data in a token and read it back", () => {
            const creationDate = Date.now()
            const data = "Fact #32: Society does not includes you"
            const token = utils.genToken(data)
            const { data:readData, expiration } = utils.readToken(token)
            expect(readData).to.equal(data)
            expect(expiration).to.be.greaterThan(creationDate)
        })
    })
})
