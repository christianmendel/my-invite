import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageFile } from "src/app/models/imageFile";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent {
    constructor(private snackBar: MatSnackBar) {}

    selectedFiles: File[] = [];
    @Input() acceptedFormats = ".jpeg,.jpg,.png";
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() value = [] as File[];
    @Input() images = [] as ImageFile[];
    @Input() image = {} as ImageFile;
    @Output() valueChange = new EventEmitter();

    onFilesSelected(event: any): void {
        const files: FileList = event.target.files;
        this.selectedFiles = Array.from(files);
        this.value = Array.from(files);
        this.valueChange.emit(Array.from(files));
    }
}
