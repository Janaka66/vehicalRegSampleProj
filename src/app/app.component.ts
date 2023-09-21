import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExtApiService } from './ext-api.service';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ImageRenderComponent } from './image-render/image-render.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular | any;
  
  title = ""
  checkoutForm: any;
  vehicalData: any;
  imageSrc: string | ArrayBuffer | any;
  images : any = [];

    columnDefs : any = [
      { field: 'userID', width: 200 },
      { field: 'vehicleNumber', width: 350  },
      { field: 'vehicleName', width: 350  },
      { field: 'contact',width: 210  }
      // { field: 'vehicalImage',width: 400, autoHeight: true , cellRendererFramework: ImageRenderComponent  }
    ];

    rowData = [];


  constructor(private formBuilder: FormBuilder, private extApi : ExtApiService){

    this.checkoutForm = this.formBuilder.group({
      'userID': '',
      'vehicleNumber': '',
      'vehicleName': '',
      'contact': '',
    });
  
  }

  ngOnInit(): void {

    this.getAllvehicalDetails()
  }

  ngAfterViewInit(){ 

    
  }


  async onSubmit(form : any) {

    form['vehicalImage'] = this.imageSrc;

    await this.extApi.addVehicals(form);

  }

  async getAllvehicalDetails(){

    this.rowData = await this.extApi.getVehicals();

    this.rowData.forEach((el : any) => {

      if(el.vehicalImage)
        this.images.push({'vehicalImage' : el.vehicalImage, 'vehicalNumber' : el.vehicleNumber})
    });

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertImageToBase64(file);
    }
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    };

    reader.readAsDataURL(file);
  }

}
