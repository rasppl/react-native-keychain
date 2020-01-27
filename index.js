// @flow
import { NativeModules, Platform } from 'react-native';
const { RNKeychainManager } = NativeModules;

export const SECURITY_LEVEL = Object.freeze({
  ANY: RNKeychainManager.SECURITY_LEVEL_ANY,
  SECURE_SOFTWARE: RNKeychainManager.SECURITY_LEVEL_SECURE_SOFTWARE,
  SECURE_HARDWARE: RNKeychainManager.SECURITY_LEVEL_SECURE_HARDWARE,
});

export const ACCESSIBLE = Object.freeze({
  WHEN_UNLOCKED: 'AccessibleWhenUnlocked',
  AFTER_FIRST_UNLOCK: 'AccessibleAfterFirstUnlock',
  ALWAYS: 'AccessibleAlways',
  WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: 'AccessibleWhenPasscodeSetThisDeviceOnly',
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
  AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY:
    'AccessibleAfterFirstUnlockThisDeviceOnly',
  ALWAYS_THIS_DEVICE_ONLY: 'AccessibleAlwaysThisDeviceOnly',
});

export const ACCESS_CONTROL = Object.freeze({
  USER_PRESENCE: 'UserPresence',
  BIOMETRY_ANY: 'BiometryAny',
  BIOMETRY_CURRENT_SET: 'BiometryCurrentSet',
  DEVICE_PASSCODE: 'DevicePasscode',
  APPLICATION_PASSWORD: 'ApplicationPassword',
  BIOMETRY_ANY_OR_DEVICE_PASSCODE: 'BiometryAnyOrDevicePasscode',
  BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: 'BiometryCurrentSetOrDevicePasscode',
});

export const AUTHENTICATION_TYPE = Object.freeze({
  DEVICE_PASSCODE_OR_BIOMETRICS: 'AuthenticationWithBiometricsDevicePasscode',
  BIOMETRICS: 'AuthenticationWithBiometrics',
});

export const BIOMETRY_TYPE = Object.freeze({
  TOUCH_ID: 'TouchID',
  FACE_ID: 'FaceID',
  FINGERPRINT: 'Fingerprint',
});

export const STORAGE_TYPE = Object.freeze({
  FB: 'FacebookConceal',
  AES: 'KeystoreAESCBC',
  RSA: 'KeystoreRSAECB',
});

export const SECURITY_RULES = Object.freeze({
  NONE: 'none',
  AUTOMATIC_UPGRADE: 'automaticUpgradeToMoreSecuredStorage',
});

export type SecAccessible = $Values<typeof ACCESSIBLE>;

export type SecAccessControl = $Values<typeof ACCESS_CONTROL>;

export type LAPolicy = $Values<typeof AUTHENTICATION_TYPE>;

export type SecMinimumLevel = $Values<typeof SECURITY_LEVEL>;

export type SecStorageType = $Values<typeof STORAGE_TYPE>;

export type SecSecurityRules = $Values<typeof SECURITY_RULES>;

export type Options = {
  accessControl?: SecAccessControl,
  accessGroup?: string,
  accessible?: SecAccessible,
  authenticationPrompt?: string,
  authenticationType?: LAPolicy,
  service?: string,
  securityLevel?: SecMinimumLevel,
  storage?: SecStorageType,
  rules?: SecSecurityRules,
};

export type Result = {|
  +service: string,
  +storage: string,
|};

export type UserCredentials = {|
  +username: string,
  +password: string,
  ...Result,
|};

export type SharedWebCredentials = {|
  +server: string,
  ...UserCredentials,
|};

function getOptionsArgument(serviceOrOptions?: string | Options) {
  if (Platform.OS !== 'ios') {
    return typeof serviceOrOptions === 'object'
      ? serviceOrOptions.service
      : serviceOrOptions;
  }
  return typeof serviceOrOptions === 'string'
    ? { service: serviceOrOptions }
    : serviceOrOptions;
}

function getAccessControl(serviceOrOptions?: string | Options) {
  var accessControl = null;

  if (typeof serviceOrOptions === 'object') {
    accessControl = serviceOrOptions.accessControl;
  }

  return accessControl;
}

function getMinimumSecurityLevel(serviceOrOptions?: string | Options) {
  var specifiedLevel = undefined;

  if (typeof serviceOrOptions === 'object') {
    specifiedLevel = serviceOrOptions.securityLevel;
  }

  return specifiedLevel || SECURITY_LEVEL.ANY;
}

/**
 * Saves the `username` and `password` combination for `service`.
 * @param {string} username Associated username or e-mail to be saved.
 * @param {string} password Associated password to be saved.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `{ service, storage }` when successful
 */
export function setGenericPassword(
  username: string,
  password: string,
  options?: Options
): Promise<false | Result> {
  var obj: { service?: string } = options || {};

  if (Platform.OS !== 'ios') {
    return RNKeychainManager.setGenericPasswordForOptions(
      obj.service,
      username,
      password,
      options
    );
  }
  return RNKeychainManager.setGenericPasswordForOptions(
    getOptionsArgument(options),
    username,
    password,
    getMinimumSecurityLevel(options)
  );
}

/**
 * Fetches login combination for `service`.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `{ service, username, password, storage }` when successful
 */
export function getGenericPassword(
  options?: Options
): Promise<false | SharedWebCredentials> {
  var obj: { service?: string } = options || {};

  if (Platform.OS !== 'ios') {
    return RNKeychainManager.getGenericPasswordForOptions(obj.service, options);
  }
  return RNKeychainManager.getGenericPasswordForOptions(
    getOptionsArgument(options)
  );
}

/**
 * Deletes all generic password keychain entries for `service`.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `true` when successful
 */
export function resetGenericPassword(options?: Options): Promise<boolean> {
  var obj: { service?: string } = options || {};

  if (Platform.OS !== 'ios') {
    return RNKeychainManager.resetGenericPasswordForOptions(
      obj.service,
      options
    );
  }
  return RNKeychainManager.resetGenericPasswordForOptions(
    getOptionsArgument(options)
  );
}

/**
 * Checks if we have a login combination for `server`.
 * @param {string} server URL to server.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `{service, storage}` when successful
 */
export function hasInternetCredentials(
  server: string,
  options?: Options
): Promise<false | Result> {
  return RNKeychainManager.hasInternetCredentialsForServer(server, options);
}

/**
 * Saves the `username` and `password` combination for `server`.
 * @param {string} server URL to server.
 * @param {string} username Associated username or e-mail to be saved.
 * @param {string} password Associated password to be saved.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `{service, storage}` when successful
 */
export function setInternetCredentials(
  server: string,
  username: string,
  password: string,
  options?: Options
): Promise<false | Result> {
  return RNKeychainManager.setInternetCredentialsForServer(
    server,
    username,
    password,
    options
  );
}

/**
 * Fetches login combination for `server`.
 * @param {string} server URL to server.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `{ server, username, password }` when successful
 */
export function getInternetCredentials(
  server: string,
  options?: Options
): Promise<false | UserCredentials> {
  return RNKeychainManager.getInternetCredentialsForServer(server, options);
}

/**
 * Deletes all internet password keychain entries for `server`.
 * @param {string} server URL to server.
 * @param {object} options Keychain options, iOS only
 * @return {Promise} Resolves to `true` when successful
 */
export function resetInternetCredentials(
  server: string,
  options?: Options
): Promise<void> {
  return RNKeychainManager.resetInternetCredentialsForServer(server, options);
}

/** IOS ONLY */

/**
 * Asks the user for a shared web credential.
 * @return {Promise} Resolves to `{ server, username, password }` if approved and
 * `false` if denied and throws an error if not supported on platform or there's no shared credentials
 */
export function requestSharedWebCredentials(
  options: ?Options
): Promise<false | SharedWebCredentials> {
  if (Platform.OS !== 'ios') {
    return Promise.reject(
      new Error(
        `requestSharedWebCredentials() is not supported on ${Platform.OS} yet`
      )
    );
  }
  return RNKeychainManager.requestSharedWebCredentials(options);
}

/**
 * Sets a shared web credential.
 * @param {string} server URL to server.
 * @param {string} username Associated username or e-mail to be saved.
 * @param {string} password Associated password to be saved.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `true` when successful
 */
export function setSharedWebCredentials(
  server: string,
  username: string,
  password: ?string,
  options: ?Options
): Promise<void> {
  if (Platform.OS !== 'ios') {
    return Promise.reject(
      new Error(
        `setSharedWebCredentials() is not supported on ${Platform.OS} yet`
      )
    );
  }
  return RNKeychainManager.setSharedWebCredentialsForServer(
    server,
    username,
    password,
    options
  );
}

/**
 * Inquire if the type of local authentication policy (LAPolicy) is supported
 * on this device with the device settings the user chose.
 * @param {object} options LAPolicy option, iOS only
 * @return {Promise} Resolves to `true` when supported, otherwise `false`
 */
export function canImplyAuthentication(options?: Options): Promise<boolean> {
  if (!RNKeychainManager.canCheckAuthentication) {
    return Promise.resolve(false);
  }
  return RNKeychainManager.canCheckAuthentication(options);
}

/** ANDROID ONLY */

/**
 * (Android only) Returns guaranteed security level supported by this library
 * on the current device.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to `SECURITY_LEVEL` when supported, otherwise `null`.
 */
export function getSecurityLevel(
  options?: Options
): Promise<?$Values<typeof SECURITY_LEVEL>> {
  if (!RNKeychainManager.getSecurityLevel) {
    return Promise.resolve(null);
  }
  return RNKeychainManager.getSecurityLevel(options);
}

/**
 * Get what type of hardware biometry support the device has.
 * @param {object} options An Keychain options object.
 * @return {Promise} Resolves to a `BIOMETRY_TYPE` when supported, otherwise `null`
 */
export function getSupportedBiometryType(
  options?: Options
): Promise<?$Values<typeof BIOMETRY_TYPE>> {
  if (!RNKeychainManager.getSupportedBiometryType) {
    return Promise.resolve(null);
  }
  return RNKeychainManager.getSupportedBiometryType(options);
}

/** Refs: https://www.saltycrane.com/cheat-sheets/flow-type/latest/ */
