# Next patch validation

Next and eslint-config-next are updated together to15.5.28. The audit also
identified lint-tool cross-spawn and Ajv vulnerabilities; patched7.0.6/6.14.0
resolutions are applied. The private match adapter's declared picomatch4.0.7
engine is restored with a scoped resolution instead of the older global pin.

```sh
yarn install --frozen-lockfile
yarn test:security
yarn lint
NEXT_TELEMETRY_DISABLED=1 yarn build
yarn audit
```

Security tests, lint and production build pass. The real production page was
also checked in headless Chromium: the speech button sends the expected Japanese
text/style, consumes a synthetic API response, displays it and resets its pending
state. All external API requests were intercepted; no speech service, credentials
or audio hardware was accessed.

## Audit identity limitation

Raw Yarn classic audit still reports micromatch below4.0.8 under the dependency
alias. That entry is the existing private file package @schroneko/match-compat
1.0.1, not upstream micromatch code. Its actual installed matching engine is
picomatch4.0.7. The package identity and resolved engine were inspected and the
real glob/matching regression suite passes. This audit result is retained and
not suppressed; no package version was falsified. All other observed audit
findings were patched.

The PR is draft/unmerged and hosted application CI has not passed for its final
head. Default-branch alerts require separate verification after approval.
