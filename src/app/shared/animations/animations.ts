import { trigger, transition, style, animate } from "@angular/animations";

export const fadeInOutAnimation = trigger("fadeInOut", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("300ms", style({ opacity: 1 })),
  ]),
  transition(":leave", [animate("300ms", style({ opacity: 0 }))]),
]);

export const slideInFromRightAnimation = trigger("slideInFromRight", [
  transition(":enter", [
    style({ transform: "translateX(100%)" }),
    animate("300ms", style({ transform: "translateX(0)" })),
  ]),
  transition(":leave", [
    animate("300ms", style({ transform: "translateX(100%)" })),
  ]),
]);

export const slideInFromBottomAnimation = trigger("slideInFromBottom", [
  transition(":enter", [
    style({ transform: "translateY(100%)" }),
    animate("300ms", style({ transform: "translateY(0)" })),
  ]),
  transition(":leave", [
    animate("300ms", style({ transform: "translateY(100%)" })),
  ]),
]);
