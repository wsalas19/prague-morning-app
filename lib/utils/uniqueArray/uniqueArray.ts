export function uniqueArray(items: { id: string, label: string }[]) {
  const seenLabels = new Set();
  return items.filter(item => {
    if (seenLabels.has(item.label)) {
      return false;
    }
    seenLabels.add(item.label);
    return true;
  });
}