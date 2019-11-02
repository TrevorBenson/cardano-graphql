import gql from 'graphql-tag'
import { TestClient } from './TestClient'

export function run (createClient: () => Promise<TestClient>) {
  describe('cardano', () => {
    let client: TestClient

    beforeEach(async () => {
      client = await createClient()
    }, 60000)

    it('Returns key information about the network', async () => {
      const result = await client.query({
        query: gql`query {
            cardano {
                blockHeight
                currentEpoch {
                    number
                }
                protocolConst
                slotDuration
                startTime
            }
        }`
      })
      expect(result.data).toMatchSnapshot()
    })
  })
}
