import { Cache } from "./cache";

type ArrayGroup<TKey, TItem> = {
  key: TKey;
  items: TItem[];
};

export function groupBy<TItem, TKey extends keyof TItem>(
  array: TItem[],
  groupProp: keyof TItem
): ArrayGroup<TItem[TKey], TItem>[];
export function groupBy<TItem, TKey>(
  array: TItem[],
  groupFn: (item: TItem) => TKey
): ArrayGroup<TKey, TItem>[];

export function groupBy<TItem, TKey = any>(
  array: TItem[],
  grouper: keyof TItem | ((item: TItem) => TKey)
) {
  const cache = new Cache<any, any>();
  const fn =
    typeof grouper === "function" ? grouper : (item: TItem) => item[grouper];

  return array.reduce((groups, item) => {
    const key = fn(item);
    let group: any;
    if (!cache.has(key)) {
      group = {
        key,
        items: [],
      };
      groups.push(group);
      cache.set(key, group);
    }

    group = cache.get(key);
    group.items.push(item);
    return groups;
  }, [] as ArrayGroup<TKey extends keyof TItem ? TItem[TKey] : TKey, TItem>[]);
}
