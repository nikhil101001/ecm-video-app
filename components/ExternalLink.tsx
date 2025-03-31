import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type LinkHref =
  | RelativePathString
  | ExternalPathString
  | "/_sitemap"
  | `/_sitemap?${string}`;

interface Props extends Omit<ComponentProps<typeof Link>, "href"> {
  href: LinkHref;
}
export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
