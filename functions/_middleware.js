export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "www.suncoastservers.com") {
    url.hostname = "suncoastservers.com";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
