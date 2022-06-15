import { decode } from 'cbor-x/decode';
import { uAryToB64 } from './hashForPassword';

const getCredID = async () => {
  const res = await navigator.credentials.create({
    publicKey: {
      attestation: 'direct',
      authenticatorSelection: {
        authenticatorAttachment: 'cross-platform',
        requireResidentKey: false,
        userVerification: 'discouraged',
      },
      challenge: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      pubKeyCredParams: [],
      rp: { name: 'wmpwd' },
      user: {
        id: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        displayName: 'wmpwd',
        name: "What's my password",
      },
      timeout: 3000,
    },
  });
  const attestation = decode(new Uint8Array((res as any).response.attestationObject));
  const uary: Uint8Array = attestation.authData;
  const lenary = uary.slice(53, 55);
  const length = lenary[0] * 255 + lenary[1];

  return uAryToB64(uary.slice(55, 55 + length));
};

export default getCredID;
