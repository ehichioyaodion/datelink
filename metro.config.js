const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('cjs');

module.exports = withNativeWind(config, { input: './global.css' });
