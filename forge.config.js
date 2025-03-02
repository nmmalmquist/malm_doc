import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

export default {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel", // For Windows (.exe)
      platforms: ["win32"],
      config: {},
    },
    {
      name: "@electron-forge/maker-zip", // For macOS and Windows (.zip)
      platforms: ["darwin", "win32"],
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg", // For macOS (.dmg)
      platforms: ["darwin"],
      config: {},
    },
    {
      name: "@electron-forge/maker-deb", // For Linux (.deb)
      platforms: ["linux"],
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm", // For Linux (.rpm)
      platforms: ["linux"],
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
