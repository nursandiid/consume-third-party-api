import supertest from 'supertest'
import web from '../../src/applications/web.js'

describe('GET /api/random', () => {
  it('should can get image response', async () => {
    const result = await supertest(web).get('/api/random')

    expect(result.status).toBe(200)
    expect(result.headers['content-disposition']).toContain('attachment')
    expect(result.headers['content-type']).toContain('image/jpeg')
  })
})
