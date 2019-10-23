#!/usr/bin/env bash

set -x

rm -rf node_modules/react-native-keychain/.gradle
rm -rf node_modules/react-native-keychain/gradle
rm -rf node_modules/react-native-keychain/.idea
rm -rf node_modules/react-native-keychain/.git
rm -rf node_modules/react-native-keychain/KeychainExample
rm -rf node_modules/react-native-keychain/android/build
find . -type f -name *.iml -delete


# Expectations:
#  - RN jetifier package will reverse/convert all the node_modules libraries source code
#    and switch them to 'com.android.support.*'
#  - keychain library will automatically detects that and switch own code to compatibility
#    mode
yarn android:support
