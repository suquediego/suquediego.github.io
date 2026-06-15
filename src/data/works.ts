import { basePath } from "@/lib/base-path";

export type Work = {
  title: string;
  translationKey: "vanir" | "heimdall" | "parkingpix";
  image: string;
  hoverImage: string;
  href: string;
};

export const works: Work[] = [
  {
    title: "Vanir",
    translationKey: "vanir",
    image: `${basePath}/images/vanir/vanir-preview.png`,
    hoverImage: `${basePath}/images/vanir/vanir-previwe2.png`,
    href: "/portfolio/vanir",
  },
  {
    title: "Heimdall",
    translationKey: "heimdall",
    image: `${basePath}/images/heimdall/heimdall-preview1.png`,
    hoverImage: `${basePath}/images/heimdall/heimdall-previwe2.png`,
    href: "/portfolio/heimdall",
  },
  {
    title: "ParkingPix",
    translationKey: "parkingpix",
    image: `${basePath}/images/parkingpix/parkingpix-preview2.png`,
    hoverImage: `${basePath}/images/parkingpix/parkingpix-previwe2.png`,
    href: "/portfolio/parkingpix",
  },
];
