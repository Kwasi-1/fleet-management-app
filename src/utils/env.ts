const environment = import.meta.env;

const types = ['', 'control-tower'] as const;

export const variables = (currentModule: (typeof types)[number] = '') => ({
  BASE_URL: baseUrlMap[currentModule],
  MESSAGING_URL: environment.VITE_MESSAGING_URL,
  AUTH0_DOMAIN: environment.VITE_AUTH0_DOMAIN,
  AUTH0_CLIENTID: environment.VITE_AUTH0_CLIENTID,
  AUTH0_AUDIENCE: environment.VITE_AUTH0_AUDIENCE,
  THIRDPARTY_SERVICES: environment.VITE_THIRDPARTY_SERVICES,
  ENVIRONMENT: environment.VITE_ENVIRONMENT,
  VERIFY_PHONE: environment.VITE_VERIFY_API,
  VITE_CT_API: environment.VITE_CT_API,
  COMPANY_NAME: environment.VITE_COMPANY_NAME,
  HR_ACCOUNTING_BASE_URL: environment.VITE_API_BASE_URL,
});

const baseUrlMap: any = {
  'control-tower': environment.VITE_CT_API,
  '': environment.VITE_CCT_API,
};
