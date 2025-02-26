import env from './environment';

export const FILE_SEPARATOR = env.OS_ENV === 'win' ? '\\' : '/';
