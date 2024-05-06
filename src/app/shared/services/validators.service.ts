import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public isInvalidField( formGroup: FormGroup, field: string): boolean | null {
    const control = formGroup.controls[field];
    
    // Verifica si el campo ha sido tocado y tiene errores
    if (control.errors && control.touched) {
      return true; // Devuelve true si el campo tiene errores y ha sido tocado
    } else if (!control.errors && control.touched) {
      return false; // Devuelve false si el campo es no tiene errores y ha sido tocado
    } else {
      return null; // Devuelve null si el campo no ha sido tocado
    }
  }
  
  public getErrorMessage( formGroup: FormGroup, field: string): string | null {
    const formControl = formGroup.get(field);

    if (!formControl || !formControl.errors || !formControl.touched) {
      return null;
    }

    // Mapear los errores a los mensajes correspondientes
    const errorMessages: { [key: string ]: string } = {
      required: 'Este campo es requerido',
      passwordComplexity: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      mustBeEqual: 'Las contraseñas no coinciden',
      emailValid: 'El email ingresado no tiene un formato válido',
      minlength: 'La longitud mínima requerida es de {{requiredLength}} caracteres',
      maxlength: 'La longitud máxima requerida es de {{requiredLength}} caracteres',
      fileExtension: 'El archivo debe ser una imagen con extensión jpg, jpeg o png',
      fileSize: 'El tamaño del archivo no debe superar los {{requiredLength}} bytes',
    };
    
    // Obtener el primer error y devolver su mensaje correspondiente
    const firstErrorKey = Object.keys(formControl.errors)[0];
    const error = formControl.errors[firstErrorKey];

    if (firstErrorKey === 'minlength' || firstErrorKey === 'maxlength') {
      return errorMessages[firstErrorKey].replace('{{requiredLength}}', error.requiredLength);
    }
    
    if (firstErrorKey === 'fileSize') {
      return errorMessages[firstErrorKey].replace('{{requiredLength}}', error.requiredLength);
    }
    
    return errorMessages[firstErrorKey] || 'Error desconocido';
  }
  
  
}
