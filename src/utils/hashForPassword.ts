export const uAryToB64 = (uary: Uint8Array) => {
  let str = '';
  for (let i = 0; i < uary.byteLength; i += 1) {
    str += uary[i];
  }
  return window.btoa(str);
};

const hashForPassword = async (mainPassword: string, stringToHash: string, iterations: number) => {
  if (!mainPassword || !stringToHash) return '主密码或副密码为空';
  if (iterations <= 0) return '迭代次数需大于0';
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
        iterations,
      },
      importedKey,
      param.length || 256,
    );
    return derivation;
  };

  /**
   * 从密码生成加密用的密钥。
   * 接受一个参数作为密码，默认使用 JWT_SECRET 作为密码。
   * @param password 自定义密码，暂未使用。
   */
  const getKey = async (password: string) => {
    const derivation = await getDerivation({
      stringToHash: password,
      salt: '1145141919810',
    });
    const importedEncryptionKey = await crypto.subtle.importKey(
      'raw',
      derivation,
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign', 'verify'],
    );
    return importedEncryptionKey;
  };
  const hmacKey = await getKey(mainPassword);
  const textEncoder = new TextEncoder();
  const stringToHashBuffer = textEncoder.encode(stringToHash);
  const signature = await crypto.subtle.sign('HMAC', hmacKey, stringToHashBuffer);
  const der = await getDerivation({
    stringToHash: uAryToB64(new Uint8Array(signature)),
    salt: '',
    length: 48,
    iterations,
  });
  const uary = new Uint8Array(der);
  return '!' + uAryToB64(uary);
};

export default hashForPassword;
