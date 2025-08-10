// import type { Feature } from './Feature';
// import { DEFAULT_KEYS, type HotKeyMap } from './HotKeyMap';

// class Storage {
//   private initStorage(): void {
//     chrome.storage.onChanged
//   }

//   public getFeature(hotKeyString: string): Promise<Feature | null> {
//     return new Promise((resolve) => {
//       chrome.storage.local.get('hotKeys', (result) => {
//         if (result.hotKeys) {
//           return Object.keys(result).find(
//             (k) => result[k as Feature] === hotKeyString
//           ) as Feature | undefined;
//         } else {
//           resolve(null);
//         }
//       });
//     });
//   }
// }

// export const storage = new Storage();
