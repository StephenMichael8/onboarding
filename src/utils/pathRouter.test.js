import { describe, it, expect } from 'vitest'
import { routeToPath, getPathInfo, generateFirstPost } from './pathRouter'

describe('routeToPath', () => {
  it('returns null when no primary_role is set', () => {
    expect(routeToPath({})).toBeNull()
    expect(routeToPath({ primary_role: null })).toBeNull()
  })

  it('returns null for an unknown role', () => {
    expect(routeToPath({ primary_role: 'wizard' })).toBeNull()
  })

  describe('founder', () => {
    it('routes money/funding to fundraise', () => {
      expect(routeToPath({ primary_role: 'founder', primary_intent: 'money' })).toBe('F3_Fundraise')
      expect(
        routeToPath({ primary_role: 'founder', role_data: { bottleneck: 'funding' } })
      ).toBe('F3_Fundraise')
    })

    it('routes people/team to build team', () => {
      expect(routeToPath({ primary_role: 'founder', primary_intent: 'people' })).toBe('F2_Build_Team')
    })

    it('routes progress/product to build product', () => {
      expect(routeToPath({ primary_role: 'founder', primary_intent: 'progress' })).toBe('F5_Build_Product')
    })

    it('routes "find work" intent to customers & partners (F4 is reachable)', () => {
      expect(routeToPath({ primary_role: 'founder', primary_intent: 'work' })).toBe('F4_Customers_Partners')
      expect(
        routeToPath({ primary_role: 'founder', role_data: { bottleneck: 'customers' } })
      ).toBe('F4_Customers_Partners')
    })

    it('routes an ops bottleneck to operations & execution (F6 is reachable)', () => {
      expect(
        routeToPath({ primary_role: 'founder', role_data: { bottleneck: 'ops' } })
      ).toBe('F6_Operations_Execution')
    })

    it('defaults to focus roadmap', () => {
      expect(routeToPath({ primary_role: 'founder' })).toBe('F1_Focus_Roadmap')
      expect(routeToPath({ primary_role: 'founder', stage_type: 'idea' })).toBe('F1_Focus_Roadmap')
    })
  })

  describe('provider', () => {
    it('routes work intent to find leads', () => {
      expect(routeToPath({ primary_role: 'provider', primary_intent: 'work' })).toBe('P2_Find_Leads')
    })

    it('routes product delivery to package offer', () => {
      expect(
        routeToPath({ primary_role: 'provider', role_data: { deliveryStyle: 'product' } })
      ).toBe('P1_Package_Offer')
    })

    it('defaults to find leads', () => {
      expect(routeToPath({ primary_role: 'provider' })).toBe('P2_Find_Leads')
    })
  })

  describe('investor', () => {
    it('routes defined thesis to dealflow', () => {
      expect(
        routeToPath({ primary_role: 'investor', role_data: { thesisDefined: true } })
      ).toBe('I2_Dealflow_Scouting')
    })

    it('defaults to thesis filters', () => {
      expect(routeToPath({ primary_role: 'investor' })).toBe('I1_Thesis_Filters')
    })
  })

  describe('changemaker', () => {
    it('routes work to offer skills', () => {
      expect(routeToPath({ primary_role: 'changemaker', primary_intent: 'work' })).toBe('C2_Offer_Skills')
    })

    it('defaults to join a project', () => {
      expect(routeToPath({ primary_role: 'changemaker' })).toBe('C1_Join_Project')
    })
  })
})

describe('getPathInfo', () => {
  it('returns full info for a known path', () => {
    const info = getPathInfo('F3_Fundraise')
    expect(info.name).toBe('Fundraise')
    expect(Array.isArray(info.actions)).toBe(true)
    expect(info.actions.length).toBeGreaterThan(0)
  })

  it('returns a safe fallback for an unknown path', () => {
    const info = getPathInfo('does_not_exist')
    expect(info.name).toBe('Getting Started')
    expect(info.actions.length).toBeGreaterThan(0)
  })

  it('never throws for null/undefined', () => {
    expect(() => getPathInfo(null)).not.toThrow()
    expect(() => getPathInfo(undefined)).not.toThrow()
  })
})

describe('generateFirstPost', () => {
  it('generates a founder post from the dream text', () => {
    const post = generateFirstPost({
      primary_role: 'founder',
      dream_text: 'A tool for reforestation',
      primary_intent: 'money',
    })
    expect(post).toContain('A tool for reforestation')
    expect(post).toContain('Funding')
  })

  it('generates posts for every role without throwing on empty data', () => {
    for (const role of ['founder', 'provider', 'investor', 'changemaker']) {
      expect(() => generateFirstPost({ primary_role: role })).not.toThrow()
      expect(typeof generateFirstPost({ primary_role: role })).toBe('string')
    }
  })

  it('falls back to a welcome message for an unknown role', () => {
    expect(generateFirstPost({ primary_role: 'wizard' })).toBe('Welcome to Propel!')
    expect(generateFirstPost({})).toBe('Welcome to Propel!')
  })
})
