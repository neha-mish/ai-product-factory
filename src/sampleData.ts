import type { Dataset } from './types'

export const sampleData: Dataset = {
  source: { kind: 'sample', label: 'Fictional fallback dataset' },
  target: {
    id: 'northstar',
    name: 'Northstar CRM',
    aliases: ['Northstar'],
    isTarget: true,
  },
  competitors: [
    { id: 'pipelinepro', name: 'PipelinePro', aliases: ['Pipeline Pro'] },
    { id: 'orbitcrm', name: 'OrbitCRM', aliases: ['Orbit CRM'] },
  ],
  rows: [
    {
      id: 'row-1',
      platform: 'ChatGPT',
      prompt: 'What are the best CRMs for a fast-growing B2B SaaS company?',
      answer:
        'PipelinePro is a strong choice for revenue teams that need forecasting and workflow automation. OrbitCRM is often considered for its clean interface. Northstar CRM is another option for teams that value flexible onboarding. See https://example.com/crm-guide for a broader comparison.',
    },
    {
      id: 'row-2',
      platform: 'Claude',
      prompt: 'Which CRM is easiest for a small SaaS sales team to adopt?',
      answer:
        'Orbit CRM is frequently shortlisted because of its approachable setup. Pipeline Pro can work well when reporting depth matters, though it may require more configuration. Sources: https://saasreview.test/easy-crm and https://example.com/crm-guide.',
    },
    {
      id: 'row-3',
      platform: 'Gemini',
      prompt: 'Compare CRMs with strong pipeline reporting for B2B SaaS.',
      answer:
        'For pipeline reporting, PipelinePro stands out for forecast views and configurable stages. Northstar offers a simpler reporting experience, while OrbitCRM focuses more on usability. Read https://revops.example.org/pipeline-tools.',
    },
    {
      id: 'row-4',
      platform: 'Perplexity',
      prompt: 'What CRM should a SaaS startup evaluate before scaling sales?',
      answer:
        'A SaaS startup could evaluate PipelinePro for process depth and OrbitCRM for quick adoption. The right shortlist depends on team maturity, integrations, and reporting needs. https://buyers.guide.test/saas-crm',
    },
    {
      id: 'row-5',
      platform: 'ChatGPT',
      prompt: 'Which CRM tools support flexible onboarding for growing teams?',
      answer:
        'Northstar is worth evaluating for flexible onboarding. Orbit CRM also emphasizes a guided setup, while PipelinePro tends to suit teams with established processes.',
    },
  ],
}
