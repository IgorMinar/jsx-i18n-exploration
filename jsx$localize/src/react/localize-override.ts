import {ɵ$localize as $localizeOriginal} from '@angular/localize';

/**
 * This override/patch for $localize is here to enable runtime localization support of $localize calls at the top level of a module.
 * 
 * Historically $localize didn't support this scenario which seems to be on oversight.
 * 
 * This patch is a workaround to enable this feature.
 */

// Extend the String class to pass instanceof check and inherit all String methods
class LocalizedString extends String {
  constructor(strings: TemplateStringsArray, ...values: unknown[]) {
    super();
    
    const localizedStringFn = () => $localizeOriginal(strings, ...values);

    // Override toString and valueOf to support string concatenation and stringification
    this.toString = localizedStringFn;
    this.valueOf = localizedStringFn;
  }

  // Implementing the iterator protocol on the class because React otherwise considers this object to be an iterable array and renders the string one character at a time.
  // @ts-ignore
  [Symbol.iterator] = () => {
    // Use the class instance in the iterator
    return {
      // Using the class context to track state
      done: false,
      toString: this.toString,
      
      next() {
        if (this.done) {
          return { value: undefined, done: true };
        } else {
          // Mark as read so future iterations return nothing
          this.done = true;
          // Return the translated string as a single value and only value from this iterator
          return { value: this.toString(), done: false };
        }
      }
    };
  }
}

export function initializeJsxLocalize() {

  // @ts-ignore
  globalThis.$localize = function $localizeDeferred(strings: TemplateStringsArray, ...values: unknown[]) {
    // This is a bit funky way to create the object, but we need to be able to override the length getter which is non-configurable on the String prototype
    return Object.create(new LocalizedString(strings, ...values), {
      length: {
        get() {
          return this.toString().length;
        }
      }
    });
  }

  // monkey patch the original $localize so that it can find the translations loaded via `loadTranslations` during runtime localization (SSR)
  Object.defineProperty($localizeOriginal, 'translate', {
    get() {
      return $localize.translate;
    }
  });
}