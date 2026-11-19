/**
 * Who this build is: its name and where it is published. One file, so a fork
 * that ships its own builds changes it here and nowhere else — and a merge
 * from the original project touches the lines that use it, not the values.
 *
 * PRODUCT_NAME must match `build.productName` in package.json: Electron names
 * the user-data folder after it, and the CLI and the PATH cache, which cannot
 * ask Electron, rebuild the same path from this constant.
 */

/** The app's name, and the name of its settings folder. */
export const PRODUCT_NAME = 'GitHuttBr'

/** Where releases are published and auto-updates are read from (`owner/repo`). */
export const RELEASES_REPO = 'StarleyDev/gitcito'

/** Where "report a problem" opens a new issue. The fork has Issues turned off,
 *  so reports go to the original project until they are turned on there. */
export const ISSUES_REPO = 'MyAppDesk/gitcito'
