const Verifier = artifacts.require('Verifier.sol')

contract('Verifier', accounts => {
  describe('setup', () => {
    it('should get the correct address from the address from the ecrecover in the smart contract', async () => {
      const signerAccount = accounts[0]
      verifier = await Verifier.new({ from: signerAccount })
      const rawMessage = 'Some Data'
      const hash = web3.sha3(rawMessage)
      const signature = web3.eth.sign(signerAccount, hash)
      const r = signature.slice(0, 66)
      const s = '0x' + signature.slice(66, 130)
      const v = web3.toDecimal('0x' + signature.slice(130, 132))
      const solidityHash = await verifier.hasher(rawMessage)
      const ecAddress = await verifier.getAddress(hash, v, r, s)

      assert.equal(solidityHash, hash)
      assert.equal(ecAddress, signerAccount)
    })
  })
})
