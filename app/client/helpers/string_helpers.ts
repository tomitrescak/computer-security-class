export function makeSafeFileName(name: string) {
  return name.replace(/\.\./g, '');
}

export function encodeUrlName(name: string): string {
  if (!name) {
    return 'EMPTY';
  }
  let result = name.replace(/\:/g, '');
  result = result.replace(/ - /g, '-');
  result = result.replace(/\W/g, '-');
  return result.replace(/--/g, '-');
}
