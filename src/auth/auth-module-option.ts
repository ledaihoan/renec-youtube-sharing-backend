export type AuthModuleOption = {
  authSecret: string;
  authExpiry: string;
};

export const DEFAULT_AUTH_EXPIRY = '1h';

export const AUTH_MODULE_OPTION = Symbol.for('AUTH_MODULE_OPTION');
