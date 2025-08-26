import kebabCase from 'lodash/kebabCase'

export const generateMenuPath = (
  path: string,
  parentPath: string | null = null
) => {
  return parentPath ? `${parentPath}__${kebabCase(path)}` : kebabCase(path)
}
