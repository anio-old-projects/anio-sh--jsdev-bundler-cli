import loadResourceFromDisk from "./loadResourceFromDisk.mjs"
import loadProjectPackageJSON from "./loadProjectPackageJSON.mjs"

export const loadResource = loadResourceFromDisk
export const loadPackageJSON = loadProjectPackageJSON

export {
	default as getBundlerInformation
} from "./getBundlerInformation.mjs"
