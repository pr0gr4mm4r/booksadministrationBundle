import {Component, OnInit} from '@angular/core';
import {OfficeService} from "../../services/office/office.service";

declare var $: any;

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css']
})
export class AddOfficeComponent implements OnInit {
  officeName: String = "";
  alreadyPresent: boolean;
  successfulSave: boolean;

  constructor(private officeService: OfficeService) {
  }

  ngOnInit() {
    const officeNameFromStorage = localStorage.getItem("officeName");
    if (officeNameFromStorage !== "") {
      this.officeName = officeNameFromStorage;
    }
  }

  addOffice(officeName: String) {
    this.officeService.addOffice(officeName).subscribe(message => {
      this.resetVariables();
      if (message.includes("Successful")) {
        this.successfulSave = true;
      } else if (message.includes("already present")) {
        this.alreadyPresent = true;
      }
      this.activateModal();
    });
  }

  resetVariables() {
    this.alreadyPresent = false;
    this.successfulSave = false;
  }

  activateModal() {
    $('#modal').modal({backdrop: 'static', keyboard: false});
  }

  updateLocalStorage() {
    localStorage.setItem("officeName", this.officeName.toString());
  }
}
