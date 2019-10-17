package com.oblador.keychain;

import android.app.KeyguardManager;
import android.content.Context;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;

import static androidx.biometric.BiometricManager.BIOMETRIC_SUCCESS;

/**
 *
 * @see <a href="https://stackoverflow.com/questions/50968732/determine-if-biometric-hardware-is-present-and-the-user-has-enrolled-biometrics">Biometric hradware</a>
 * */
public class DeviceAvailability {
  @SuppressWarnings("deprecation")
  public static boolean isFingerprintAuthAvailable(@NonNull final Context context) {
    return BiometricManager.from(context).canAuthenticate() == BIOMETRIC_SUCCESS;
  }

  public static boolean isDeviceSecure(Context context) {
    final KeyguardManager km =
      (KeyguardManager) context.getSystemService(Context.KEYGUARD_SERVICE);

    return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
      km != null &&
      km.isDeviceSecure();
  }
}
