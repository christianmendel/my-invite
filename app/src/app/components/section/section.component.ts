import { Component, Input } from "@angular/core";

export type ScreenWidthType = "full" | "half_full" | "half";
export type AlignTextType = "start" | "center";
@Component({
    selector: "app-section",
    templateUrl: "./section.component.html",
    styleUrls: ["./section.component.css"]
})
export class SectionComponent {
    @Input() megaTitle = "";
    @Input() title = "";
    @Input() iconTitle = "";
    @Input() subTitle = "";
    @Input() route = "";
    @Input() backgroundSecundaryLight = false;
    @Input() screen: ScreenWidthType = "full";
    @Input() alignText: AlignTextType = "center";
}
