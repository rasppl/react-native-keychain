package com.oblador.keychain.exceptions;

import java.security.GeneralSecurityException;

public class CryptoFailedException extends GeneralSecurityException {
  public CryptoFailedException(String message) {
    super(message);
  }

  public CryptoFailedException(String message, Throwable t) {
    super(message, t);
  }
}
