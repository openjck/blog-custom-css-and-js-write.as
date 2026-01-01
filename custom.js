// Umami provides a <script> tag to add to the <head> of the document, without
// specifying where in the <head> it should appear.
//
// WriteFreely does not allow modifying any page templates or providing a tag
// that should appear in the <head>, but it does allow authors to inject
// arbitrary JavaScript, so I've written some JavaScript which injects the tag.
//
// This is based on the following, where others try to accomplish the same
// thing with both Umami and Fathom:
//
// https://github.com/umami-software/umami/discussions/646
// https://usefathom.com/docs/integrations/gohighlevel
// https://usefathom.com/docs/integrations/shopify
const script = document.createElement("script");
script.setAttribute("defer", true);
script.setAttribute("src", "https://cloud.umami.is/script.js");
script.setAttribute("data-website-id", "e28973f9-e5ca-4d45-8162-79a1c1c4cd9f");
document.getElementsByTagName("head")[0].appendChild(script);

// Add "Tag: " before the title and content heading on a category page.
if (window.location.pathname.includes("/tag:")) {
  const title = document.querySelector("title");
  title.textContent = `Tag: ${title.textContent}`;

  const contentHeading = document.querySelector("#wrapper h1");
  contentHeading.textContent = `Tag: ${contentHeading.textContent}`;
}
