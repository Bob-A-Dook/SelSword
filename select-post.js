/*
Acknowledgements:

 1. Mozilla's example extension
    (https://github.com/mdn/webextensions-examples/blob/master/
     selection-to-clipboard/content-script.js)

 2. SO answer about getting parent element of a selection:
    (https://stackoverflow.com/questions/7215479/
     get-parent-element-of-a-selected-text)
*/

function copyToClipboard(event) {

    container = event.target;

    // Different ways of getting post/comment, depending on website
    var hostname = window.location.hostname;
    var mainbody;
    var is_app_like = false;

    if (!hostname) {
        alert('[WARNING] No domain specified. You are probably using the '
              + 'script on a file saved to disk. It cannot find any '
              + 'comments like this');
    }

    if (hostname.endsWith('nitter.net')) {
        mainbody = container.closest('.timeline-item');
    }
    else if (hostname == 'mbasic.facebook.com') {
        mainbody = container.closest('article, div[id], [role]');
    }
    else if (hostname == 'www.facebook.com') {
        mainbody = container.closest('[role="article"]');
        if (mainbody == null ) {
           mainbody = container.closest('[aria-posinset]')
        }
    }
    else if (hostname.endsWith('twitter.com')) {
        mainbody = container.closest('article');
    }
    else if (hostname == 'm.facebook.com') {
        mainbody = container.closest('[data-uniqueid], .story_body_container');
        if (mainbody == null ) {
            // Try the attributes from the troublesome app-like version
            mainbody = container.closest('[data-tracking-duration-id], [data-comp-id]');
            if (mainbody) {
                is_app_like = true;
                alert('[WARNING] This is an app-like version of Facebook! '
                      + 'The post will be copied, but extracting the link '
                      + 'to an exact comment might be impossible');
            }
        }
    }

    // If it succeeds, copy the comment text to clipboard
    if (mainbody) {

        //Try to remove the reply window on Facebook
        if (hostname.endsWith('facebook.com')) {
            var reply_form = mainbody.querySelector('form');
            if (reply_form) {reply_form.parentNode.removeChild(reply_form);}
        }

        // Get the website's main URL
        var original_url = window.location.href;

        // Construct the HTML, adding link to optional CSS and original post URL
        var html_text = mainbody.outerHTML.toString().trim();    
        var meta_tag = '';
        if (original_url) {
            meta_tag = `<meta itemprop="orig_url" content="'${original_url}'">\n`;
        }
        var doc_html = meta_tag + html_text;

        // Add the resulting HTML to the clipboard as text
        function oncopy(ev) {
            document.removeEventListener("copy", oncopy, true);
            // Hide the event from the page to prevent tampering.
            ev.stopImmediatePropagation();
            ev.preventDefault();
            ev.clipboardData.setData("text/plain", doc_html);
            ev.clipboardData.setData("text/html", doc_html);
        }
        document.addEventListener("copy", oncopy, true);
        document.execCommand("copy");
       
        // Then mark the copied content with a red border
        mainbody.style['box-shadow'] = '0 0 0 2px red';
    }   
}

//Make the function above run after double clicks/presses
document.addEventListener("dblclick", copyToClipboard, true);

