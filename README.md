# PEIR Client

## Installation

Run the command 'npm deploy' at the terminal (inside this folder).

This should result in a series of dependency packages being install via the npm package manager, followed by a series of dependency packages being installed from the bower package manager. Lastly, bower any packages that require a build process be run will be built automatically.

## Usage

The PEIR Client consists of static files hosted by the PEIR Server. For a production site, the PEIR Server should be configured to use 'client/production' as its 'wwwRoot'. This will use minified and optimized production copies of all PEIR Client files to reduce bandwidth consumption and load times for users.

If debugging the site, you may with to set the PEIR Server's wwwRoot to 'client/build' to use non-minified files.
