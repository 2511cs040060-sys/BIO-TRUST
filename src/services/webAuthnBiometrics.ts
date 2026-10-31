// Real WebAuthn / Touch ID / Face ID Biometric Service

export interface WebAuthnResult {
  success: boolean;
  credentialId?: string;
  authenticatorAttachment?: string;
  message: string;
}

class WebAuthnBiometricService {
  // Check if system supports WebAuthn / Touch ID / Face ID / Fingerprint
  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.PublicKeyCredential !== undefined &&
      typeof window.PublicKeyCredential === 'function'
    );
  }

  // Check if platform biometric hardware (Touch ID / Face ID / Windows Hello) is available
  public async isPlatformAuthenticatorAvailable(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  }

  // Trigger Native Touch ID / Face ID / Fingerprint Biometric Challenge
  public async triggerNativeBiometricAuth(userName: string = 'Alex Johnson'): Promise<WebAuthnResult> {
    if (!this.isSupported()) {
      return {
        success: false,
        message: 'WebAuthn hardware biometrics not supported on this browser.'
      };
    }

    try {
      // Challenge buffer
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const userIdBytes = new TextEncoder().encode(userName);

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: challenge,
        rp: {
          name: 'BioTrust Cloud Zero Trust API',
          id: window.location.hostname
        },
        user: {
          id: userIdBytes,
          name: userName,
          displayName: userName
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform', // Touch ID / Face ID / Fingerprint
          userVerification: 'preferred'
        },
        timeout: 60000,
        attestation: 'direct'
      };

      // Call Native System Fingerprint / FaceID Prompt
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      }) as PublicKeyCredential;

      if (credential) {
        return {
          success: true,
          credentialId: credential.id,
          authenticatorAttachment: 'Platform Touch ID / Fingerprint',
          message: 'Hardware Touch ID / Fingerprint Biometric Verified'
        };
      } else {
        return {
          success: false,
          message: 'Biometric verification cancelled or timed out.'
        };
      }
    } catch (err: any) {
      console.warn('Native WebAuthn biometric error:', err);
      return {
        success: false,
        message: err.message || 'Hardware biometric prompt failed or cancelled.'
      };
    }
  }
}

export const webAuthnBiometrics = new WebAuthnBiometricService();
