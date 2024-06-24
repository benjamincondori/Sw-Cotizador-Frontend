import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ChatService } from '../../services/chat.service';
import { lastValueFrom } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-modal-prompt',
  templateUrl: './modal-prompt.component.html',
  styleUrls: ['./modal-prompt.component.css'],
})
export class ModalPromptComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  public loading: boolean = false;
  public pendingRequests: number = 0;
  public limit: number = 10;

  public opcionesTipo: string[] = [];
  public tipoHabitaciones!: string[];
  public tipoCocinas!: string[];
  public tipoLabel!: string;

  public myForm!: FormGroup;

  public prompts: string[] = [];
  public resultPromptPresupuesto = '';
  public resultPromptsImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private chatService: ChatService,
    private alertsService: AlertsService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      tipo: ['Habitación', Validators.required],
      estilo: ['', Validators.required],
      tipoHabitacion: ['', Validators.required],
      ancho: ['', Validators.required],
      largo: ['', Validators.required],
      alto: ['', Validators.required],
      tipoObra: ['', Validators.required],
    });

    this.tipoHabitaciones = [
      'Matrimonial',
      'Infantil',
      'Para huéspedes',
      'Personal',
    ];

    this.tipoCocinas = [
      'Cocina en línea',
      'Cocina en paralelo o dos frentes',
      'Cocina en L',
      'Cocina en U',
    ];

    this.onTipoSeleccionadoChange();
  }

  onTipoSeleccionadoChange(): void {
    const tipoSeleccionado = this.myForm.get('tipo')?.value;
    if (tipoSeleccionado === 'Habitación') {
      this.opcionesTipo = this.tipoHabitaciones;
      this.tipoLabel = 'habitación';
    } else if (tipoSeleccionado === 'Cocina') {
      this.opcionesTipo = this.tipoCocinas;
      this.tipoLabel = 'cocina';
    } else {
      this.opcionesTipo = [];
    }
    // Reseteamos el valor del tipoHabitacion cuando cambia el tipoSeleccionado
    this.myForm.get('tipoHabitacion')?.setValue('');
  }

  addPrompt() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const data = this.myForm.value;
    
    if (this.resultPromptsImages.length >= this.limit) {
      this.alertsService.toast('No puedes agregar más prompts', 'info');
      console.error('ModalPromptComponent::Error limit reached');
      return;
    }

    this.agregarPrompt(data);
    this.generarPromptImage(data);
  }

  generarPromptImage(data: any) {
    const { estilo, tipoHabitacion } = data;
    const promptImage = `Genera una imagen de un plano de planta en 3D con vista de frente de un ${tipoHabitacion} con un estilo ${estilo}.`;
    this.resultPromptsImages.push(promptImage);

    console.log('Results Images', this.resultPromptsImages);
  }

  agregarPrompt(data: any) {
    const { tipo, estilo, tipoHabitacion, ancho, largo, alto, tipoObra } = data;

    if (tipo == 'Habitación') {
      const habitacion = `una habitación ${tipoHabitacion} con un ancho de ${ancho} metros, un largo de ${largo} metros y un alto de ${alto} metros`;
      this.prompts.push(habitacion);
    } else if (tipo == 'Cocina') {
      const cocina = `una ${tipoHabitacion} con un ancho de ${ancho} metros, un largo de ${largo} metros y un alto de ${alto} metros`;
      this.prompts.push(cocina);
    } else if (tipo == 'Baño') {
      const baño = `un baño con un ancho de ${ancho} metros, un largo de ${largo} metros y un alto de ${alto} metros`;
      this.prompts.push(baño);
    }

    this.generarPromptPresupuesto(data);
  }

  generarPromptPresupuesto(data: any) {
    const habitacionesString = this.prompts.join(', ');
    this.resultPromptPresupuesto = `Genera un presupuesto aproximado para la construcción de ${habitacionesString} en Bolivia. El estilo que debe tener esta construcción es ${data.estilo} y el tipo de obra es ${data.tipoObra}.`;
    console.log('Result Prompt Presupuesto: ', this.resultPromptPresupuesto);
  }

  async onSubmit() {
    const idChatAi = this.chatService.getCurrentIdChatAi();
    if (!idChatAi) {
      console.error('ModalPromptComponent::Error idChatAi is not defined');
      return;
    }
    this.loading = true;
    this.pendingRequests = this.resultPromptsImages.length;

    await this.createImages(this.resultPromptsImages, idChatAi);
    // this.createImageSequentially(this.resultPromptsImages, 0, idChatAi);

    const promptPresupuesto = `${this.resultPromptPresupuesto}
      Por favor, incluye los siguientes detalles en el presupuesto:
      1. Materiales de construcción necesarios.
      2. Mano de obra requerida.
      3. Costos estimados para cada categoría.
      4. Un total final del presupuesto.

      Asegúrate de formatear el presupuesto de manera clara y legible, utilizando saltos de línea entre los diferentes elementos.`;

    await this.createPresupuesto(promptPresupuesto, idChatAi);
    this.chatService.setCurrentIdChatAi(idChatAi);
    this.loading = false;

    this.closeModal();
  }

  // private createImageSequentially(promptImages: string[], index: number, idChatAi: number): void {
  //   if (index >= promptImages.length) {
  //     console.log('All images have been uploaded');
  //     return;
  //   }

  //   const image = promptImages[index];
  //   this.chatService.createImage(image, idChatAi).subscribe({
  //     next: (resp) => {
  //       console.log('Response: ', resp);
  //       this.checkLoadingState();
  //       this.createImageSequentially(promptImages, index + 1, idChatAi); // Llamada recursiva
  //     },
  //     error: (err) => {
  //       console.error('ModalPromptComponent::Error Create Image: ', err);
  //       this.checkLoadingState();
  //     }
  //   });
  // }

  async createImages(promptImages: string[], idChatAi: number): Promise<void> {
    for (const image of promptImages) {
      try {
        const response = await lastValueFrom(
          this.chatService.createImage(image, idChatAi)
        );
        console.log('Images create successfully:', response);
      } catch (error) {
        console.error('ModalPromptComponent::Error Create Image: ', error);
      }
      // this.checkLoadingState();
    }
  }

  async createPresupuesto(
    promptPresupuesto: string,
    idChatAi: number
  ): Promise<void> {
    await lastValueFrom(
      this.chatService.createPresupuesto(promptPresupuesto, idChatAi)
    )
      .then((resp) => {
        console.log('Presupuesto create successfully:', resp);
      })
      .catch((error) => {
        console.error(
          'ModalPromptComponent::Error Create Presupuesto: ',
          error
        );
      });
  }

  checkLoadingState() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }

  resetAll() {
    this.myForm.reset({
      tipo: 'Habitación',
      estilo: '',
      tipoHabitacion: '',
      ancho: '',
      largo: '',
      alto: '',
      tipoObra: '',
    });
    this.prompts = [];
    this.resultPromptPresupuesto = '';
    this.resultPromptsImages = [];
    this.onTipoSeleccionadoChange();
  }

  closeModal() {
    this.onClose.emit();
    this.resetAll();
  }

  isInvalidField(field: string): boolean | null {
    return this.validatorsService.isInvalidField(this.myForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.myForm, field);
  }
}
