/**
 * 一个哈希函数，使用 SHA-256 算法从给定字符串生成一个哈希值。
 */
const getDerivation = async (param: {
  /** 给定字符串 */
  stringToHash: string;
  /** 迭代次数，默认为 1048576 次 */
  iterations?: number;
  /** 哈希值长度，默认为 256 */
  length?: number;
  /** 盐字符串 */
  salt: string;
}) => {
  const textEncoder = new TextEncoder();
  const stringToHashBuffer = textEncoder.encode(param.stringToHash);
  const importedKey = await crypto.subtle.importKey('raw', stringToHashBuffer, 'PBKDF2', false, [
    'deriveBits',
  ]);
  const saltAry = textEncoder.encode(param.salt);
  const derivation = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt: saltAry,
      iterations: param.iterations || 1048576,
    },
    importedKey,
    param.length || 256,
  );
  return derivation;
};

export const uAryToB64 = (uary: Uint8Array) => {
  let str = '';
  for (let i = 0; i < uary.byteLength; i += 1) {
    str += uary[i];
  }
  return window.btoa(str);
};

const hashForPassword = async (mainPassword: string, stringToHash: string) => {
  if (!mainPassword || !stringToHash) return '生成的密码将会显示在此处';
  const der = await getDerivation({
    stringToHash,
    salt: mainPassword,
    length: 48,
  });
  const uary = new Uint8Array(der);
  return '!' + uAryToB64(uary);
};

export default hashForPassword;
