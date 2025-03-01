import { LinkKey, links } from "./links.ts";
import clsx from "clsx";
import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  mergeProps,
  onCleanup,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import { useLinkPreviews } from "./link-preview-provider.tsx";
import { Tooltip } from "./tooltip.tsx";

type LinkProps = {
  linkKey: LinkKey;
  asTag?: boolean;
  as?: ValidComponent;
};

export const Link: Component<LinkProps> = (_props) => {
  const props = mergeProps({ as: "a" }, _props);

  const { getLinkPreview } = useLinkPreviews();
  const linkPreview = () => getLinkPreview(props.linkKey);

  const classes = () =>
    props.asTag ? "badge badge-outline no-underline hover:underline" : "";

  const [showTooltip, setShowTooltip] = createSignal(false);
  const imageLink = () => (showTooltip() ? linkPreview()?.image : undefined);
  const [image] = createResource(imageLink, (imageLink) => {
    const image = new Image();
    image.src = imageLink;
    return new Promise<typeof image>((resolve, reject) => {
      image.onload = () => {
        resolve(image);
      };
      image.onerror = reject;
    });
  });
  createEffect(() => {
    if (image.loading) {
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(`* { cursor: wait !important; }`);
      onCleanup(() => {
        document.head.removeChild(style);
      });
    }
  });

  const showLinkPreview = () => {
    if (!linkPreview() || image.loading) {
      return false;
    }
    const hasImage = !!(imageLink() && !image.error);
    const hasDescription = !!linkPreview()?.description?.length;
    return hasImage || hasDescription;
  };

  return (
    <Tooltip
      delay={500}
      hideTooltip={!showLinkPreview()}
      placement="bottom"
      tooltip={
        <>
          <Show when={imageLink() && !image.error}>
            <figure>
              <img src={imageLink()} />
            </figure>
          </Show>
          <div class="card-body">
            <h2 class="card-title text-base">{linkPreview()?.title}</h2>
            <Show when={linkPreview()?.description}>
              <p class="text-sm">{linkPreview()?.description}</p>
            </Show>
          </div>
        </>
      }
      tooltipContainerClass={clsx(
        "card card-compact bg-base-100 w-80 shadow-xl transition-opacity transition-transform",
      )}
    >
      {(anchorProps) => {
        const [, forwardedProps] = splitProps(anchorProps.forwardedProps, [
          "onFocus",
          "onBlur",
        ]);
        return (
          <Dynamic
            class={classes()}
            component={props.as}
            href={links[props.linkKey].link}
            target="_blank"
            {...forwardedProps}
            onMouseEnter={() => {
              setShowTooltip(true);
              forwardedProps.onMouseEnter();
            }}
            onMouseLeave={() => {
              setShowTooltip(false);
              forwardedProps.onMouseLeave();
            }}
          >
            {links[props.linkKey].name}
          </Dynamic>
        );
      }}
    </Tooltip>
  );
};
