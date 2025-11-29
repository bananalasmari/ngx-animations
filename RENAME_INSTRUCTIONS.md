# Folder Rename Instructions

## ⚠️ Important: Rename Project Folder

The package name has been changed from `@elm/ngx-animations` to `@elm/ngx-animations`, but the physical folder structure still uses "elm". 

You need to rename the folder manually:

### Option 1: Using Terminal

```bash
cd /Users/elmalasmari/Desktop/animation-lib/projects
mv elm elm
```

### Option 2: Using Finder

1. Navigate to `/Users/elmalasmari/Desktop/animation-lib/projects/`
2. Rename the folder `elm` to `elm`

## After Renaming

Once you've renamed the folder, you'll need to update the Angular configuration:

### Update angular.json

Change the paths in `angular.json`:

```json
"@elm/ngx-animations": {
  "projectType": "library",
  "root": "projects/elm/ngx-animations",           // ← Changed from elm to elm
  "sourceRoot": "projects/elm/ngx-animations/src", // ← Changed from elm to elm
  "prefix": "ngx",
  "architect": {
    "build": {
      "builder": "@angular/build:ng-packagr",
      "configurations": {
        "production": {
          "tsConfig": "projects/elm/ngx-animations/tsconfig.lib.prod.json" // ← Changed
        },
        "development": {
          "tsConfig": "projects/elm/ngx-animations/tsconfig.lib.json" // ← Changed
        }
      },
      "defaultConfiguration": "production"
    },
    "test": {
      "builder": "@angular/build:unit-test",
      "options": {
        "tsConfig": "projects/elm/ngx-animations/tsconfig.spec.json" // ← Changed
      }
    }
  }
}
```

### Update tsconfig.json

Already updated in paths section.

### Update Demo Component Imports

Change all imports in `src/app/demo/demo.component.ts` from:

```typescript
import { FadeInDirective } from '../../../../../projects/elm/ngx-animations/...';
```

To:

```typescript
import { FadeInDirective } from '../../../../../projects/elm/ngx-animations/...';
```

### Update Package Scripts

Package.json scripts have been updated to use `dist/elm/ngx-animations` instead of `dist/elm/ngx-animations`.

## Quick Command to Rename Everything

After renaming the folder, run these commands to update all file paths:

```bash
# Update angular.json
sed -i '' 's|projects/elm/ngx-animations|projects/elm/ngx-animations|g' angular.json

# Update tsconfig.json references
sed -i '' 's|projects/elm/ngx-animations|projects/elm/ngx-animations|g' tsconfig.json

# Update demo component imports
sed -i '' 's|projects/elm/ngx-animations|projects/elm/ngx-animations|g' src/app/demo/demo.component.ts
```

Or simply use find and replace in your editor:
- Find: `projects/elm/ngx-animations`
- Replace: `projects/elm/ngx-animations`

## Verification

After making all changes, verify everything works:

```bash
# Clean and reinstall
rm -rf node_modules dist
npm install

# Build the library
npm run build:lib

# Run the demo
npm start
```

---

**Note:** All package names and documentation have already been updated to use `@elm/ngx-animations`. You just need to rename the physical folder and update the file paths.

