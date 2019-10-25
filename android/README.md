# Android Support Library and AndroidX

# KeychainExampleRN59

example project configured for usage of `Android Support Library`.

```gradle
# cd KeychainExampleRN59/android

# print the dependencies of th Android Support Library
/gradlew :react-native-keychain:dependencies --configuration support  

# print dependencies of the AndroidX
/gradlew :react-native-keychain:dependencies --configuration androidx
```

Output

```text
> Configure project :react-native-keychain
androidx: false, support lib: true

> Task :react-native-keychain:dependencies

------------------------------------------------------------
Project :react-native-keychain
------------------------------------------------------------

support
+--- com.android.support:appcompat-v7:28.0.0
|    +--- com.android.support:support-annotations:28.0.0
|    +--- com.android.support:support-compat:28.0.0
|    |    +--- com.android.support:support-annotations:28.0.0
|    |    +--- com.android.support:collections:28.0.0
|    |    |    \--- com.android.support:support-annotations:28.0.0
|    |    +--- android.arch.lifecycle:runtime:1.1.1
|    |    |    +--- android.arch.lifecycle:common:1.1.1
|  ...
|         \--- com.android.support:support-core-ui:28.0.0 (*)
\--- com.android.support:support-v4:28.0.0
     +--- com.android.support:support-compat:28.0.0 (*)
     +--- com.android.support:support-media-compat:28.0.0
     |    +--- com.android.support:support-annotations:28.0.0
     |    +--- com.android.support:support-compat:28.0.0 (*)
     |    \--- com.android.support:versionedparcelable:28.0.0 (*)
     +--- com.android.support:support-core-utils:28.0.0 (*)
     +--- com.android.support:support-core-ui:28.0.0 (*)
     \--- com.android.support:support-fragment:28.0.0 (*)
```

## KeychainExample - ReactNative 0.61+

This project is configured to use the latest react native, that migrated to AndroidX.

for making possible to run this project with AndroidX used special configuration that 
overrides dependencies, patching the binaries with jetifier tool.

RN jetifier post-install step also patching source code of the `node_modules` to force
them AndroidX usage. 

Results of override are quite easy to demonstrate:

```gradle
# cd KeychainExample/android

# print the dependencies of th Android Support Library
/gradlew :react-native-keychain:dependencies --configuration support  
```

Output:

```text
> Configure project :react-native-keychain
androidx: true, support lib: false

> Task :react-native-keychain:dependencies

------------------------------------------------------------
Project :react-native-keychain
------------------------------------------------------------

support
+--- com.android.support:appcompat-v7:28.0.0 -> androidx.appcompat:appcompat:1.0.0
|    +--- androidx.annotation:annotation:1.0.0
|    +--- androidx.core:core:1.0.0
|    |    +--- androidx.annotation:annotation:1.0.0
|    |    +--- androidx.collection:collection:1.0.0
|    |    |    \--- androidx.annotation:annotation:1.0.0
|    |    +--- androidx.lifecycle:lifecycle-runtime:2.0.0
|    |    |    +--- androidx.lifecycle:lifecycle-common:2.0.0
|    |    |    |    \--- androidx.annotation:annotation:1.0.0
|    |    |    +--- androidx.arch.core:core-common:2.0.0
|         \--- androidx.legacy:legacy-support-core-ui:1.0.0 (*)
| ...
\--- com.android.support:support-v4:28.0.0 -> androidx.legacy:legacy-support-v4:1.0.0
     +--- androidx.core:core:1.0.0 (*)
     +--- androidx.media:media:1.0.0
     |    +--- androidx.annotation:annotation:1.0.0
     |    +--- androidx.core:core:1.0.0 (*)
     |    \--- androidx.versionedparcelable:versionedparcelable:1.0.0 (*)
     +--- androidx.legacy:legacy-support-core-utils:1.0.0 (*)
     +--- androidx.legacy:legacy-support-core-ui:1.0.0 (*)
     \--- androidx.fragment:fragment:1.0.0 (*)
```

As you can see `support` configuration is forced in hidden way to `androidx`


## References

- https://www.syncfusion.com/ebooks/gradle_succinctly/build-hooks
- https://linchpiner.github.io/gradle-for-devops-4.html
- https://docs.gradle.org/current/userguide/build_lifecycle.html
- https://docs.gradle.org/current/userguide/multi_project_builds.html
- https://www.oreilly.com/library/view/gradle-beyond-the/9781449373801/ch04.html
- https://docs.gradle.org/current/dsl/org.gradle.api.Task.html?_ga=2.14834998.1059113641.1571731021-508730939.1565357848#org.gradle.api.Task.dependencies
- https://pspdfkit.com/blog/2019/gradle-task-configuration-avoidance-in-android-builds/
- https://docs.gradle.org/current/userguide/writing_build_scripts.html
- https://developer.android.com/studio/projects/android-library#aar-contents

