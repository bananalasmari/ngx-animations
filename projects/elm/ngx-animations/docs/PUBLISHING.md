# Publishing Guide for @elm/ngx-animations

This guide will walk you through the process of building and publishing your Angular animation library to NPM.

## Prerequisites

Before publishing, ensure you have:

1. **NPM Account** - Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **NPM CLI** - Installed with Node.js
3. **Git Repository** - For version control and changelog
4. **Verified Email** - On your NPM account

## Step 1: Configure Your Library

### Update package.json

Your library's `package.json` is located at:
```
projects/elm/ngx-animations/package.json
```

Ensure all fields are correct:

```json
{
  "name": "@elm/ngx-animations",
  "version": "1.0.0",
  "description": "Next-level animation library for Angular",
  "keywords": ["angular", "animation", "gsap", "motion", "rtl"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/bananalasmari/ngx-animations.git"
  }
}
```

### Update Repository URLs

Replace placeholder URLs in:
- `projects/elm/ngx-animations/package.json`
- `projects/elm/ngx-animations/README.md`

## Step 2: Build the Library

### Development Build

```bash
ng build @elm/ngx-animations
```

### Production Build

```bash
ng build @elm/ngx-animations --configuration production
```

The built library will be in: `dist/elm/ngx-animations/`

## Step 3: Test Your Library Locally

Before publishing, test the library locally:

### Option 1: npm link

```bash
# In the library dist folder
cd dist/elm/ngx-animations
npm link

# In your test project
npm link @elm/ngx-animations
```

### Option 2: Local Install

```bash
# In your test project
npm install ../path/to/dist/elm/ngx-animations
```

## Step 4: Login to NPM

```bash
npm login
```

Enter your credentials:
- Username
- Password
- Email
- OTP (if 2FA is enabled)

Verify login:
```bash
npm whoami
```

## Step 5: Publish to NPM

### First Time Publishing

Navigate to the built library:
```bash
cd dist/elm/ngx-animations
```

Publish:
```bash
npm publish --access public
```

> **Note:** The `--access public` flag is required for scoped packages (@elm/ngx-animations)

### Publishing Updates

1. **Update Version** in `projects/elm/ngx-animations/package.json`:
   ```json
   {
     "version": "1.0.1"  // Increment version
   }
   ```

2. **Rebuild**:
   ```bash
   ng build @elm/ngx-animations --configuration production
   ```

3. **Publish**:
   ```bash
   cd dist/elm/ngx-animations
   npm publish
   ```

## Step 6: Verify Publication

Check your package on NPM:
```
https://www.npmjs.com/package/@elm/ngx-animations
```

Install and test:
```bash
npm install @elm/ngx-animations
```

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### NPM Version Commands

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build library
        run: npm run build @elm/ngx-animations -- --configuration production
      
      - name: Publish to NPM
        run: |
          cd dist/elm/ngx-animations
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Setup NPM Token

1. Generate token at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Add to GitHub: Settings → Secrets → Actions → `NPM_TOKEN`

## Package Scripts

Add helpful scripts to root `package.json`:

```json
{
  "scripts": {
    "build:lib": "ng build @elm/ngx-animations --configuration production",
    "test:lib": "ng test @elm/ngx-animations",
    "pack:lib": "cd dist/elm/ngx-animations && npm pack",
    "publish:lib": "npm run build:lib && cd dist/elm/ngx-animations && npm publish --access public"
  }
}
```

Usage:
```bash
npm run publish:lib
```

## Pre-Publish Checklist

Before each publish, verify:

- [ ] All tests pass: `ng test @elm/ngx-animations`
- [ ] Library builds successfully: `ng build @elm/ngx-animations`
- [ ] Version number updated in `package.json`
- [ ] `README.md` is up to date
- [ ] `CHANGELOG.md` is updated (recommended)
- [ ] No sensitive data in code
- [ ] License file is included
- [ ] Examples work with new version
- [ ] Breaking changes documented

## Common Issues

### Issue: "Package already exists"

**Solution:** You can't republish the same version. Increment version number.

### Issue: "403 Forbidden"

**Solution:** 
- Check you're logged in: `npm whoami`
- Verify package name isn't taken
- Use `--access public` for scoped packages

### Issue: "ENEEDAUTH"

**Solution:** Run `npm login` again

### Issue: Build errors

**Solution:**
```bash
# Clear cache
rm -rf node_modules dist
npm install
ng build @elm/ngx-animations --configuration production
```

## NPM Tags

Use tags for different release channels:

```bash
# Latest (default)
npm publish --access public --tag latest

# Beta release
npm publish --access public --tag beta

# Next release
npm publish --access public --tag next
```

Install specific tag:
```bash
npm install @elm/ngx-animations@beta
```

## Unpublishing

You can unpublish within 72 hours:

```bash
npm unpublish @elm/ngx-animations@1.0.0
```

> **Warning:** Unpublishing can break projects that depend on your package!

## Post-Publishing

After publishing:

1. **Update Documentation**
   - Update GitHub README
   - Create release notes
   - Update changelog

2. **Announce**
   - Twitter/X
   - Reddit (r/Angular, r/webdev)
   - Dev.to article
   - Angular Discord/Slack

3. **Monitor**
   - Watch for issues on GitHub
   - Monitor NPM download stats
   - Respond to user feedback

## Best Practices

1. **Test Thoroughly** - Always test before publishing
2. **Document Changes** - Maintain a CHANGELOG.md
3. **Version Properly** - Follow semantic versioning
4. **Support Users** - Respond to issues promptly
5. **Security** - Keep dependencies updated
6. **Backward Compatibility** - Avoid breaking changes when possible
7. **Performance** - Monitor bundle size
8. **Examples** - Keep examples up to date

## Useful NPM Commands

```bash
# View package info
npm info @elm/ngx-animations

# View all versions
npm view @elm/ngx-animations versions

# Check package files before publishing
npm pack --dry-run

# Check what will be published
npm publish --dry-run
```

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Angular Library Guide](https://angular.io/guide/creating-libraries)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## Quick Publish Command

One-liner for experienced users:

```bash
npm run build:lib && cd dist/elm/ngx-animations && npm version patch && npm publish --access public
```

---

**Happy Publishing! 🚀**

