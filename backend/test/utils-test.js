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
            const expirationDate = Date.now() + 1337
            const inputData = "Fact #32: Society does not includes you"
            const token = utils.genToken(inputData, expirationDate)
            const { data, expiration } = utils.readToken(token)
            expect(data).to.equal(inputData)
            expect(expiration).to.be(expirationDate)
        })
    })
})
