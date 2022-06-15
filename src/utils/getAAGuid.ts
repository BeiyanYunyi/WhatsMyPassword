import { decode } from 'cbor-x/decode';
import { uAryToB64 } from './hashForPassword';

const getAAGuid = async () => {
  const res = await navigator.credentials.create({
    publicKey: {
      attestation: 'direct',
      authenticatorSelection: {
        authenticatorAttachment: 'cross-platform',
        requireResidentKey: false,
        userVerification: 'discouraged',
      },
      challenge: new Uint8Array(16),
      pubKeyCredParams: [],
      rp: { name: 'wmpwd' },
      user: {
        id: new Uint8Array(16),
        displayName: 'wmpwd',
        name: "What's my password",
      },
      timeout: 3000,
    },
  });
  const attestation = decode(new Uint8Array((res as any).response.attestationObject));
  const uary: Uint8Array = attestation.authData;
  return uAryToB64(uary.slice(37, 53));
};

export default getAAGuid;
