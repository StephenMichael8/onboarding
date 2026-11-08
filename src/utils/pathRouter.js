// Path routing logic - determines which canonical path a user should follow
// Based on role and collected data

export const routeToPath = (onboardingData) => {
  const { primary_role, primary_intent, stage_type, role_data } = onboardingData

  if (!primary_role) return null

  // Founder paths
  if (primary_role === 'founder') {
    if (primary_intent === 'money' || role_data?.bottleneck === 'funding') {
      return 'F3_Fundraise'
    }
    if (primary_intent === 'people' || role_data?.bottleneck === 'team') {
      return 'F2_Build_Team'
    }
    if (primary_intent === 'progress' || role_data?.bottleneck === 'product') {
      return 'F5_Build_Product'
    }
    // "Find Work" (get clients/projects) → acquire customers & partners.
    if (primary_intent === 'work' || role_data?.bottleneck === 'customers') {
      return 'F4_Customers_Partners'
    }
    // Operations bottleneck → operations & execution path.
    if (role_data?.bottleneck === 'ops') {
      return 'F6_Operations_Execution'
    }
    if (primary_intent === 'support' || role_data?.bottleneck === 'focus') {
      return 'F1_Focus_Roadmap'
    }
    if (stage_type === 'idea') {
      return 'F1_Focus_Roadmap'
    }
    if (stage_type === 'project') {
      return 'F2_Build_Team'
    }
    return 'F1_Focus_Roadmap' // Default
  }

  // Provider paths
  if (primary_role === 'provider') {
    if (primary_intent === 'work') {
      return 'P2_Find_Leads'
    }
    if (role_data?.deliveryStyle === 'product') {
      return 'P1_Package_Offer'
    }
    return 'P2_Find_Leads' // Default
  }

  // Investor paths
  if (primary_role === 'investor') {
    if (role_data?.thesisDefined) {
      return 'I2_Dealflow_Scouting'
    }
    return 'I1_Thesis_Filters' // Default
  }

  // Changemaker paths
  if (primary_role === 'changemaker') {
    if (primary_intent === 'work') {
      return 'C2_Offer_Skills'
    }
    if (primary_intent === 'people') {
      return 'C1_Join_Project'
    }
    return 'C1_Join_Project' // Default
  }

  return null
}

export const getPathInfo = (pathId) => {
  const paths = {
    // Founder paths
    'F1_Focus_Roadmap': {
      name: 'Focus & Roadmap',
      description: 'Clarify your vision and create a clear path forward',
      actions: [
        'Define your core value proposition',
        'Create a 30-day roadmap',
        'Set up weekly check-ins'
      ]
    },
    'F2_Build_Team': {
      name: 'Build Team',
      description: 'Find co-founders, advisors, and early team members',
      actions: [
        'Post your co-founder search',
        'Connect with 3 potential advisors',
        'Define your ideal team structure'
      ]
    },
    'F3_Fundraise': {
      name: 'Fundraise',
      description: 'Raise capital through grants, angels, or investors',
      actions: [
        'Draft your pitch deck',
        'Identify 5 potential investors',
        'Apply to 3 relevant grants'
      ]
    },
    'F4_Customers_Partners': {
      name: 'Customers & Partners',
      description: 'Acquire users and build strategic partnerships',
      actions: [
        'Define your target customer',
        'Reach out to 3 potential partners',
        'Launch your first marketing campaign'
      ]
    },
    'F5_Build_Product': {
      name: 'Build the Product',
      description: 'Develop and ship your MVP',
      actions: [
        'Define MVP scope',
        'Hire or connect with providers',
        'Set launch milestone'
      ]
    },
    'F6_Operations_Execution': {
      name: 'Operations & Execution',
      description: 'Scale your operations and maintain momentum',
      actions: [
        'Set up operational systems',
        'Establish weekly cadence',
        'Track key metrics'
      ]
    },
    // Provider paths
    'P1_Package_Offer': {
      name: 'Package Your Offer',
      description: 'Create productized services and clear offerings',
      actions: [
        'Define your service packages',
        'Set pricing structure',
        'Create your first offer post'
      ]
    },
    'P2_Find_Leads': {
      name: 'Find Leads',
      description: 'Get matched with founders who need your services',
      actions: [
        'Complete your provider profile',
        'Browse active needs',
        'Send your first proposal'
      ]
    },
    'P3_Proposals_Pricing': {
      name: 'Proposals & Pricing',
      description: 'Create winning proposals and optimize pricing',
      actions: [
        'Template your proposal process',
        'Set competitive pricing',
        'Submit 3 proposals this week'
      ]
    },
    'P4_Deliver_Work': {
      name: 'Deliver Work',
      description: 'Execute projects with workflow and payments',
      actions: [
        'Set up project workflow',
        'Establish communication cadence',
        'Track project milestones'
      ]
    },
    'P5_Get_Paid': {
      name: 'Get Paid & Payouts',
      description: 'Streamline payments and manage finances',
      actions: [
        'Set up payment methods',
        'Create invoice templates',
        'Track payment status'
      ]
    },
    'P6_Reputation_Proof': {
      name: 'Reputation & Proof',
      description: 'Build your reputation and showcase your work',
      actions: [
        'Collect testimonials',
        'Update your portfolio',
        'Share case studies'
      ]
    },
    // Investor paths
    'I1_Thesis_Filters': {
      name: 'Thesis & Filters',
      description: 'Define your investment thesis and filter rules',
      actions: [
        'Document your thesis',
        'Set up deal filters',
        'Define check size ranges'
      ]
    },
    'I2_Dealflow_Scouting': {
      name: 'Dealflow & Scouting',
      description: 'Get matched with deals that fit your thesis',
      actions: [
        'Review matched deals',
        'Set up intro preferences',
        'Connect with 3 founders'
      ]
    },
    'I3_Diligence': {
      name: 'Diligence',
      description: 'Conduct thorough due diligence on opportunities',
      actions: [
        'Request founder materials',
        'Schedule diligence calls',
        'Complete diligence checklist'
      ]
    },
    'I4_Invest': {
      name: 'Invest',
      description: 'Execute investments and manage portfolio',
      actions: [
        'Finalize investment terms',
        'Complete legal documents',
        'Transfer funds'
      ]
    },
    'I5_Support_Intros': {
      name: 'Support & Intros',
      description: 'Help portfolio companies and make introductions',
      actions: [
        'Review portfolio needs',
        'Make 3 introductions',
        'Schedule portfolio check-ins'
      ]
    },
    'I6_Portfolio_Updates': {
      name: 'Portfolio Updates',
      description: 'Track portfolio performance and needs',
      actions: [
        'Set up update cadence',
        'Review portfolio metrics',
        'Identify support opportunities'
      ]
    },
    // Changemaker paths
    'C1_Join_Project': {
      name: 'Join a Project',
      description: 'Find teams and projects that need your help',
      actions: [
        'Browse active projects',
        'Apply to 3 projects',
        'Schedule intro calls'
      ]
    },
    'C2_Offer_Skills': {
      name: 'Offer Skills',
      description: 'Volunteer your skills or take on gigs',
      actions: [
        'Complete your skills profile',
        'Browse volunteer opportunities',
        'Post your availability'
      ]
    },
    'C3_Learn_Level_Up': {
      name: 'Learn & Level Up',
      description: 'Develop skills and advance your career',
      actions: [
        'Find mentorship opportunities',
        'Join learning communities',
        'Set skill development goals'
      ]
    },
    'C4_Research_Tasks': {
      name: 'Research Tasks',
      description: 'Contribute to research and knowledge base',
      actions: [
        'Browse research opportunities',
        'Contribute to Impact Wikipedia',
        'Share your perspective'
      ]
    },
    'C5_Community_Events': {
      name: 'Community & Events',
      description: 'Organize events and build community',
      actions: [
        'Browse upcoming events',
        'Host a community event',
        'Make introductions'
      ]
    },
    'C6_Start_Something': {
      name: 'Start Something',
      description: 'Become a founder, provider, or investor',
      actions: [
        'Define your venture idea',
        'Complete founder onboarding',
        'Post your first need'
      ]
    }
  }

  return paths[pathId] || {
    name: 'Getting Started',
    description: 'Welcome to Propel!',
    actions: ['Complete your profile', 'Explore the community', 'Make your first connection']
  }
}

export const generateFirstPost = (onboardingData) => {
  const { primary_role, dream_text, primary_intent, role_data } = onboardingData

  if (primary_role === 'founder') {
    return `I'm working on: ${dream_text}

What I need: ${primary_intent === 'money' ? 'Funding' : primary_intent === 'people' ? 'Team members' : 'Support'}

${role_data?.bottleneck ? `Current challenge: ${role_data.bottleneck}` : ''}

Let's connect!`
  }

  if (primary_role === 'provider') {
    return `I offer: ${role_data?.offerCategory || 'Services'}

Who I serve: ${role_data?.whoYouServe || 'Founders and organizations'}

${role_data?.availability ? `Availability: ${role_data.availability}` : ''}

Let's work together!`
  }

  if (primary_role === 'investor') {
    return `Investment Thesis: ${role_data?.thesisThemes?.join(', ') || 'Impact-focused'}

Stage: ${role_data?.stagePreference || 'Early stage'}

${role_data?.checkSize ? `Check size: ${role_data.checkSize}` : ''}

Open to introductions!`
  }

  if (primary_role === 'changemaker') {
    return `I want to contribute: ${role_data?.contributionMode || 'Skills and time'}

Skills: ${role_data?.skills?.join(', ') || 'Various'}

${role_data?.availability ? `Availability: ${role_data.availability}` : ''}

Looking for opportunities to make an impact!`
  }

  return 'Welcome to Propel!'
}

