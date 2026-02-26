/**
 * Umami provides a <script> tag to add to the <head> of the document, without
 * specifying where in the <head> it should appear.
 *
 * WriteFreely does not allow modifying any page templates or providing a tag
 * that should appear in the <head>, but it does allow authors to inject
 * arbitrary JavaScript, so I've written some JavaScript which injects the tag.
 *
 * This is based on the following, where others try to accomplish the same
 * thing with both Umami and Fathom:
 *
 * https://github.com/umami-software/umami/discussions/646
 * https://usefathom.com/docs/integrations/gohighlevel
 * https://usefathom.com/docs/integrations/shopify
 */
function setUpUmami(): void {
  const script: HTMLScriptElement = document.createElement("script");
  script.defer = true;
  script.setAttribute("src", "https://cloud.umami.is/script.js");
  script.setAttribute(
    "data-website-id",
    "e28973f9-e5ca-4d45-8162-79a1c1c4cd9f",
  );
  document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Add "Tag: " before the title and content heading on a category page.
 */
function customizeTagTitle(): void {
  if (!window.location.pathname.includes("/tag:")) {
    return;
  }

  const title: HTMLTitleElement | null = document.querySelector("title");

  if (title === null) {
    return;
  }

  title.textContent = `Tag: ${title.textContent}`;

  const contentHeading: HTMLHeadingElement | null = document.querySelector(
    "#wrapper h1",
  );

  if (contentHeading === null) {
    return;
  }

  contentHeading.textContent = `Tag: ${contentHeading.textContent}`;
}

/**
 * Redirect from popular "thoughts" post IDs to their new URLs.
 *
 * I'm surprised by some of the thoughts posts that get clicks. I haven't
 * redirected all thoughts posts to their new URLs on WriteFreely, but these get
 * enough traffic to warrant it.
 */
function redirectThoughts(): void {
  // Don't run this on write.as or any page other than the homepage.
  //
  // If we wanted this to work correctly on write.as, we would need to check for
  // the write.as domain and prepend "/johnkarahalis/" in that case. My old
  // thoughts domain redirects to blog.johnkarahalis.com, not write.as, so
  // there's no reason to do that.
  //
  // If the user is on a page other than the homepage, then they must not be
  // trying to access a thoughts post, since those were always at the root URL
  // (/), with fragments used for direct links to specific posts.
  if (
    window.location.hostname !== "blog.johnkarahalis.com" ||
    window.location.pathname !== "/"
  ) {
    return;
  }

  // This is safe because window.location.hash is _always_ set. When there is no
  // fragment, window.location.hash is the empty string. Additionally, the
  // substring of the empty string always the empty string, and we check for the
  // empty string right after this.
  const fragmentText = window.location.hash.substring(1);

  if (fragmentText === "") {
    return;
  }

  const redirects: Record<string, string> = {
    "1707178476": "/road-safety",
  };

  const destination: string | undefined = redirects[fragmentText];

  if (destination !== undefined) {
    window.location.href = destination;
  }
}

setUpUmami();
customizeTagTitle();
redirectThoughts();
