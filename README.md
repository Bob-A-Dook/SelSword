# SelSword

A browser extension for selecting a post/comment from Facebook, Twitter or Nitter with a double click or press anywhere inside it. The selected post is surrounded with a red border and its contents are copied into the clipboard as HTML text.

Use case: when we want to archive posts from large social networks as HTML, without copying their content via the browser's developer tools every single time.

I created it with the aim of making it easier to [mark fake accounts](https://www.ciemnastrona.com.pl/2022/04/15/trolle-rosja-ukraina) (blog post **in Polish only**), but thought that it might also be useful as a standalone extension.

## Installation

In all cases, get the contents of this repository as a ZIP file.  
Click the green `Code` button, and then select the `Download ZIP` option from the bottom.

### Firefox

1. Unpack the zipped folder somewhere,
2. open Firefox and type `about:debugging` in the top address bar,
3. select `This Firefox` from the left-hand menu,
4. click the `Load Temporary Add-on` button and choose any file from the unpacked extension (e.g. *manifest.json*).
5. **You have to repeat steps 2-5 every time you launch Firefox**.

### Chromium/Chrome

*It should also work on other Chromium-based browsers, like Edge, Opera, Brave... only tested on Chromium and Opera, though.*

1. Unpack the zipped folder somewhere,
2. type `chrome://extensions` into the top bar or navigate to the extension window via menu,
3. make sure the `Developer mode` toggle on the right is on,
4. click `Load unpacked` and select the folder where you unpacked the extension files.

### Kiwi Browser

**Note:** This is a browser extension, so you have to use a browser, not an app (duh). Also, most mobile browsers don't support extensions. You are limited to *Kiwi Browser* (Chromium-based) or some less-known alternatives.

1. Open the extension menu by selecting it from the main menu or typing `kiwi://extensions` into the top bar,
2. make sure the `Developer mode` toggle is on,
3. choose the `+ (from .zip/.crx/.user js)` option and select the zipped file.

## Design choices and known limitations

* The extension only copies the HTML to clipboard, it does not save it anywhere.
* If the social media sites change their element names and attributes, the extension won't be able to find the right elements.
* Additionally, some versions of websites might be restricted  
  (example: *m.facebook.com* has a version where links to the author's account, comment etc. are not directly available in the HTML).
* The copied HTML is not a fully formed website. It only contains the selected element, without the `html`, `head` or `body` tags.
* The extension does not save the CSS stylesheets, only raw HTML.  
  This means that if we saved the copied HTML to a file, it would not look like the original website. If you need visual fidelity, consider saving the page with the [SingleFile](https://github.com/gildas-lormeau/SingleFile) extension.

## Acknowledgements

The dagger icon was taken from the [OpenMoji project](https://openmoji.org/php/download_asset.php?type=emoji&emoji_hexcode=1F5E1&emoji_variant=color) and created by Liz Bravo.

I'm a stranger to JavaScript, so making this extension would not be possible without some good inspirations.  
Parts of the code come from Mozilla's [example extensions](https://github.com/mdn/webextensions-examples/blob/master/selection-to-clipboard/content-script.js) and StackOverflow [answers](https://stackoverflow.com/questions/7215479/get-parent-element-of-a-selected-text).

A huge thank-you to the author of Kiwi Browser for making it possible to run on mobile!
