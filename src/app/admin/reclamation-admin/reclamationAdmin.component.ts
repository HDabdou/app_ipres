import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamationAdmin.component.html',
  styleUrls: ['./reclamationAdmin.component.scss']
})
export class ReclamationAdminComponent implements OnInit {
  closeResult
  selected;
  listeReclamation = [
    {prenom:"Abdoulaye",nom:"Diouf",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Fatou",nom:"Diop",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Demba",nom:"Gueye",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Adama",nom:"Barry",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Ibrahima",nom:"Dieng",description:"il n'a pas reçu sa pension",etat:0},
  ]
  myListe =  [
    {prenom:"Abdoulaye",nom:"Diouf",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Fatou",nom:"Diop",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Demba",nom:"Gueye",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Adama",nom:"Barry",description:"il n'a pas reçu sa pension",etat:0},
    {prenom:"Ibrahima",nom:"Dieng",description:"il n'a pas reçu sa pension",etat:0},
  ]
  constructor(private modalService: NgbModal) { }
  validerTraitement(){
    this.selected.etat = 1
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  ngOnInit(): void {
    console.log(this.listeReclamation)
  }

}
