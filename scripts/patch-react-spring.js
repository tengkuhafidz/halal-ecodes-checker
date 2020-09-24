// Patch react-spring issue that only happens in production build.
// Github issue: https://github.com/react-spring/react-spring/issues/1078

const replace = require('replace-in-file')

const removeAllSideEffectsFalseFromReactSpringPackages = async () => {
  try {
    const results = await replace({
      files: 'node_modules/@react-spring/*/package.json',
      from: `"sideEffects": false`,
      to: `"sideEffects": true`,
    })

    // Uncomment to log changed files
    // console.log(results);
  } catch (e) {
    console.log('error while trying to remove string "sideEffects:false" from react-spring packages', e)
  }
}

removeAllSideEffectsFalseFromReactSpringPackages()
