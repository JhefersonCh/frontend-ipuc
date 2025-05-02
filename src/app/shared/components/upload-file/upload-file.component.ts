import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FilesService } from '../../services/files.service';
import { finalize } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-upload-file',
  imports: [MatIconModule, NgClass, MatButtonModule, MatTooltipModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  standalone: true,
})
export class UploadFileComponent implements OnInit {
  private readonly _filesService: FilesService = inject(FilesService);
  progress: number = 0;
  isUploading: boolean = false;
  isDragging: boolean = false;

  @Output() onFileUploaded: EventEmitter<{ url: string; publicId: string }> =
    new EventEmitter<{ url: string; publicId: string }>();
  fileName: InputSignal<string> = input<string>('');
  folder: InputSignal<string> = input<string>('');
  fileUrl: InputSignal<string> = input<string>('');
  filePublicId: InputSignal<string> = input<string>('');

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  publicId: string = '';
  displayedFileName: string = '';
  hasExistingFile: boolean = false;

  ngOnInit() {
    if (this.fileUrl() && this.fileUrl().trim() !== '') {
      this.displayedFileName = this.extractFileNameFromUrl(this.fileUrl());
      this.hasExistingFile = true;
    }
  }

  private extractFileNameFromUrl(url: string): string {
    try {
      const urlParts = new URL(url).pathname.split('/');
      return urlParts[urlParts.length - 1];
    } catch (error) {
      return url.split('/').pop() || 'archivo';
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.selectedFile || !this.fileName()) return;
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (this.selectedFile || !this.fileName()) return;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.handleFileUpload(input.files[0]);
  }

  private handleFileUpload(file: File) {
    this.selectedFile = file;
    this.isUploading = true;
    this._filesService
      .uploadFile({
        file: this.selectedFile,
        folder: this.folder(),
        fileName: this.fileName(),
      })
      .pipe(finalize(() => (this.isUploading = false)))
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(
              100 * (event.loaded / (event.total || 1))
            );
          } else if (event.type === HttpEventType.Response) {
            this.onFileUploaded.emit(event.body?.data);
            this.publicId = event.body?.data?.publicId || '';
          }
        },
        error: (error) => {
          console.error('Error al subir el archivo', error);
        },
      });
  }

  uploadFile() {
    this.fileInput.nativeElement.click();
  }

  removeFile(publicId?: string) {
    if (this.selectedFile || this.hasExistingFile) {
      const idToDelete = publicId || this.publicId || this.filePublicId();
      if (idToDelete) {
        this._filesService.deleteFile(idToDelete).subscribe();
      }
      this.selectedFile = null;
      this.progress = 0;
      this.hasExistingFile = false;
      this.displayedFileName = '';
      this.fileInput.nativeElement.value = '';
      this.onFileUploaded.emit({ url: '', publicId: '' });
    }
  }
}
