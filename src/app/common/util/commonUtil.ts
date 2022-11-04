export function getModuleFileName(fullFileName: string): string {
  const filenameMatch = /([^/\\]+?).(js|ts)$/.exec(fullFileName);
  return (filenameMatch && filenameMatch[1]) ?? '';
}

/**
 * Resolve after given ms
 * @param ms
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
